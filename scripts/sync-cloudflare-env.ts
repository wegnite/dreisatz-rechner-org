/**
 * Cloudflare 环境变量同步脚本
 * ------------------------------------------------------------
 * 使用说明：
 * 1. 将生产环境所需变量维护在项目根目录的 `.env.production`。
 * 2. 运行 `npx tsx scripts/sync-cloudflare-env.ts --push-secrets --deploy`
 *    即可完成以下操作：
 *    - 依据约定规则自动拆分 vars（公开配置）与 secrets（敏感信息）。
 *    - 调用 `wrangler secret bulk` 批量更新 Worker 的机密变量。
 *    - 生成带最新 vars 的临时 `wrangler.generated.json` 并执行部署。
 * 3. 若仅想生成文件而不推送，可省略参数；脚本结尾会提示下一步指令。
 *
 * 约定：
 * - 默认情况下，凡是 `NEXT_PUBLIC_` 前缀或列在 forceVarKeys 内的键视为公开配置。
 * - 其余变量若命中 secret 前后缀、或列在 forceSecretKeys 内，则视为敏感信息。
 * - 新增变量时请根据业务含义加入对应集合，保持自动分类准确。
 */

import { spawnSync } from 'child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { parse } from 'dotenv';

const PROJECT_ROOT = process.cwd();
const ENV_FILE = path.join(PROJECT_ROOT, '.env.production');
const WRANGLER_CONFIG = path.join(PROJECT_ROOT, 'wrangler.jsonc');
const OUTPUT_DIR = path.join(PROJECT_ROOT, '.cloudflare');
const VARS_FILE = path.join(OUTPUT_DIR, 'worker-vars.json');
const SECRETS_FILE = path.join(OUTPUT_DIR, 'worker-secrets.json');
const GENERATED_CONFIG_FILE = path.join(OUTPUT_DIR, 'wrangler.generated.json');

if (!existsSync(ENV_FILE)) {
  console.error(`Missing ${ENV_FILE}. Add it before running this script.`);
  process.exit(1);
}

if (!existsSync(WRANGLER_CONFIG)) {
  console.error(`Missing ${WRANGLER_CONFIG}.`);
  process.exit(1);
}

const rawEnv = readFileSync(ENV_FILE, 'utf8');
const parsedEnv = parse(rawEnv);

/**
 * 处理 .env 读取到的原始值，去掉包裹引号与多余空白。
 */
const cleanValue = (value?: string) => {
  if (value === undefined) return undefined;
  const trimmed = value.trim();
  if (trimmed === '') return '';
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
};

/**
 * 强制判定为公开 vars 的键列表。
 * 用于存储非敏感、但不带 NEXT_PUBLIC 前缀的配置。
 */
const forceVarKeys = new Set([
  'DISABLE_IMAGE_OPTIMIZATION',
  'NEXT_PUBLIC_DEMO_WEBSITE',
  'STORAGE_REGION',
  'STORAGE_BUCKET_NAME',
  'STORAGE_ENDPOINT',
  'STORAGE_PUBLIC_URL',
]);

/**
 * 强制判定为 secret 的键列表。
 * 主要覆盖 OAuth、数据库、第三方 API 等敏感凭证。
 */
const forceSecretKeys = new Set([
  'BETTER_AUTH_SECRET',
  'DATABASE_URL',
  'GITHUB_CLIENT_ID',
  'GITHUB_CLIENT_SECRET',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'RESEND_API_KEY',
  'RESEND_AUDIENCE_ID',
  'STORAGE_ACCESS_KEY_ID',
  'STORAGE_SECRET_ACCESS_KEY',
  'STRIPE_SECRET_KEY',
  'STRIPE_WEBHOOK_SECRET',
  'TURNSTILE_SECRET_KEY',
  'DISCORD_WEBHOOK_URL',
  'FEISHU_WEBHOOK_URL',
  'CRON_JOBS_USERNAME',
  'CRON_JOBS_PASSWORD',
]);

/**
 * 若变量名以这些后缀结尾，则默认视为 secret。
 */
const secretSuffixes = [
  '_SECRET',
  '_TOKEN',
  '_PASSWORD',
  '_API_KEY',
  '_CLIENT_SECRET',
  '_CLIENT_ID',
  '_ACCESS_KEY_ID',
  '_ACCESS_KEY',
  '_PRIVATE_KEY',
];

/**
 * 若变量名以这些前缀开头（且未被强制归入 vars），默认视为 secret。
 */
const secretPrefixes = [
  'AI_',
  'OPENAI_',
  'REPLICATE_',
  'FIREWORKS_',
  'FIRECRAWL_',
  'DEEPSEEK_',
  'OPENROUTER_',
  'TURNSTILE_',
  'STRIPE_',
  'RESEND_',
  'GOOGLE_',
];

const vars: Record<string, string> = {};
const secrets: Record<string, string> = {};

const addVar = (key: string, value?: string) => {
  if (value === undefined || value === '') return;
  vars[key] = value;
};

const addSecret = (key: string, value?: string) => {
  if (value === undefined || value === '') return;
  secrets[key] = value;
};

for (const [key, originalValue] of Object.entries(parsedEnv)) {
  const value = cleanValue(originalValue);
  if (value === undefined || value === '') {
    continue;
  }

  if (key.startsWith('NEXT_PUBLIC_')) {
    addVar(key, value);
    continue;
  }

  if (forceVarKeys.has(key)) {
    addVar(key, value);
    continue;
  }

  if (forceSecretKeys.has(key)) {
    addSecret(key, value);
    continue;
  }

  if (secretSuffixes.some((suffix) => key.endsWith(suffix))) {
    addSecret(key, value);
    continue;
  }

  if (
    secretPrefixes.some(
      (prefix) => key.startsWith(prefix) && !forceVarKeys.has(key)
    )
  ) {
    addSecret(key, value);
    continue;
  }

  if (key === 'NEXT_PUBLIC_BASE_URL') {
    addVar(key, value);
    continue;
  }

  // Default to secret to avoid leaking unexpected variables
  addSecret(key, value);
}

const baseUrl = cleanValue(parsedEnv.NEXT_PUBLIC_BASE_URL);
if (baseUrl) {
  try {
    const url = new URL(baseUrl);
    addVar('NEXT_PUBLIC_BASE_URL', baseUrl);
    addVar('NEXT_URL', url.origin);
    addVar('VERCEL_URL', url.host);
  } catch (error) {
    console.warn('Unable to parse NEXT_PUBLIC_BASE_URL:', error);
  }
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(VARS_FILE, JSON.stringify(vars, null, 2));
writeFileSync(SECRETS_FILE, JSON.stringify(secrets, null, 2));

function stripJsonComments(input: string) {
  let result = '';
  let inString = false;
  let inSingleLineComment = false;
  let inMultiLineComment = false;

  for (let i = 0; i < input.length; i++) {
    const current = input[i];
    const next = input[i + 1];

    if (inSingleLineComment) {
      if (current === '\n') {
        inSingleLineComment = false;
        result += current;
      }
      continue;
    }

    if (inMultiLineComment) {
      if (current === '*' && next === '/') {
        inMultiLineComment = false;
        i++;
      }
      continue;
    }

    if (current === '"' && input[i - 1] !== '\\') {
      inString = !inString;
      result += current;
      continue;
    }

    if (!inString) {
      if (current === '/' && next === '/') {
        inSingleLineComment = true;
        i++;
        continue;
      }

      if (current === '/' && next === '*') {
        inMultiLineComment = true;
        i++;
        continue;
      }
    }

    result += current;
  }

  return result;
}

const baseConfigRaw = readFileSync(WRANGLER_CONFIG, 'utf8');
const sanitizedConfig = stripJsonComments(baseConfigRaw);
const parsedConfig = JSON.parse(sanitizedConfig);
parsedConfig.vars = vars;

/**
 * 由于生成的配置文件位于 .cloudflare 目录下，需要将路径转换为相对该目录的值，
 * 避免 Wrangler 在寻找 .open-next 产物时出错。
 */
const relativizePath = (relativeOrAbsolutePath: string | undefined) => {
  if (!relativeOrAbsolutePath) {
    return relativeOrAbsolutePath;
  }
  const absolutePath = path.isAbsolute(relativeOrAbsolutePath)
    ? relativeOrAbsolutePath
    : path.join(PROJECT_ROOT, relativeOrAbsolutePath);
  const normalized = path.relative(
    path.dirname(GENERATED_CONFIG_FILE),
    absolutePath
  );
  return normalized || '.';
};

parsedConfig.main = relativizePath(parsedConfig.main);
if (parsedConfig.assets?.directory) {
  parsedConfig.assets.directory = relativizePath(parsedConfig.assets.directory);
}

writeFileSync(GENERATED_CONFIG_FILE, JSON.stringify(parsedConfig, null, 2));

const args = new Set(process.argv.slice(2));
const shouldPushSecrets = args.has('--push-secrets');
const shouldDeploy = args.has('--deploy');

const runCommand = (command: string, commandArgs: string[]) => {
  const result = spawnSync(command, commandArgs, { stdio: 'inherit' });
  if (result.status !== 0) {
    console.error(`Command failed: ${command} ${commandArgs.join(' ')}`);
    process.exit(result.status ?? 1);
  }
};

if (shouldPushSecrets && Object.keys(secrets).length > 0) {
  runCommand('wrangler', ['secret', 'bulk', SECRETS_FILE]);
}

if (shouldDeploy) {
  const deployArgs = ['deploy', '--config', GENERATED_CONFIG_FILE];
  runCommand('wrangler', deployArgs);
}

console.log('\nCloudflare environment sync summary:');
console.log(`  Vars written to:       ${VARS_FILE}`);
console.log(`  Secrets written to:    ${SECRETS_FILE}`);
console.log(`  Generated config path: ${GENERATED_CONFIG_FILE}`);
console.log('  Detected vars:', Object.keys(vars).length);
console.log('  Detected secrets:', Object.keys(secrets).length);

if (Object.keys(secrets).length === 0) {
  console.warn(
    '  No secrets detected. Ensure .env.production contains secret values.'
  );
}

if (!shouldPushSecrets) {
  console.log('\nTo push secrets run:');
  console.log('  npx tsx scripts/sync-cloudflare-env.ts --push-secrets');
}

if (!shouldDeploy) {
  console.log('\nTo deploy with updated vars run:');
  console.log('  npx tsx scripts/sync-cloudflare-env.ts --deploy');
  console.log('  (Deploy command will rebuild the project before uploading.)');
}
