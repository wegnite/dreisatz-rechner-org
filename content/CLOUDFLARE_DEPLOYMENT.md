# Cloudflare 部署指南

这个指南将帮助你将 AI Polaroid Photo 项目部署到 Cloudflare Workers 和 Pages。

## 🚀 部署概览

你的项目已经配置了：
- **OpenNext.js Cloudflare** 适配器
- **Wrangler** 配置文件 (`wrangler.jsonc`)
- **Hyperdrive** 数据库连接优化
- **R2** 存储桶用于缓存和文件存储
- **环境变量** 类型定义

## 📋 部署前检查清单

### 1. Cloudflare 账户设置
- [ ] 已注册 Cloudflare 账户
- [ ] 域名已添加到 Cloudflare
- [ ] 已安装 Wrangler CLI: `npm install -g wrangler`

### 2. 登录 Cloudflare
```bash
wrangler login
```

### 3. 创建必要的资源

#### 创建 R2 存储桶
```bash
# 创建缓存存储桶
wrangler r2 bucket create aipolaroidphoto-cache

# 创建文件存储桶（如果需要）
wrangler r2 bucket create aipolaroidphoto-files
```

#### 创建 Hyperdrive 配置
```bash
# 替换为你的实际数据库连接字符串
wrangler hyperdrive create my-hyperdrive-config --connection-string="postgresql://user:password@host:port/database"
```

### 4. 配置环境变量

#### 设置 Cloudflare Workers 密钥
```bash
# 必需的密钥变量
wrangler secret put DATABASE_URL
wrangler secret put BETTER_AUTH_SECRET
wrangler secret put GITHUB_CLIENT_SECRET
wrangler secret put GOOGLE_CLIENT_SECRET
wrangler secret put RESEND_API_KEY
wrangler secret put STRIPE_SECRET_KEY
wrangler secret put STRIPE_WEBHOOK_SECRET
wrangler secret put STORAGE_ACCESS_KEY_ID
wrangler secret put STORAGE_SECRET_ACCESS_KEY
wrangler secret put TURNSTILE_SECRET_KEY

# AI API 密钥
wrangler secret put OPENAI_API_KEY
wrangler secret put REPLICATE_API_TOKEN
wrangler secret put FAL_API_KEY
wrangler secret put FIREWORKS_API_KEY
wrangler secret put DEEPSEEK_API_KEY
wrangler secret put GOOGLE_GENERATIVE_AI_API_KEY
wrangler secret put OPENROUTER_API_KEY

# 其他可选密钥
wrangler secret put DISCORD_WEBHOOK_URL
wrangler secret put FEISHU_WEBHOOK_URL
wrangler secret put FIRECRAWL_API_KEY
```

#### 环境变量配置
你的 `wrangler.jsonc` 已经包含了公开的环境变量：

```json
"vars": {
  "NEXT_PUBLIC_BASE_URL": "https://aipolaroidphoto.org",
  "NEXT_URL": "https://aipolaroidphoto.org",
  "VERCEL_URL": "aipolaroidphoto.org",
  "DISABLE_IMAGE_OPTIMIZATION": "true",
  "NEXT_PUBLIC_DEMO_WEBSITE": "false"
}
```

根据需要添加其他公开变量：

```bash
# 更新 wrangler.jsonc 中的 vars 部分
```

## 🏗️ 构建和部署

### 1. 安装依赖
```bash
pnpm install
```

### 2. 生成类型文件
```bash
pnpm run cf-typegen
```

### 3. 构建项目
```bash
pnpm run build
```

### 4. 预览部署（本地测试）
```bash
pnpm run preview
```

### 5. 部署到 Cloudflare
```bash
# 完整部署
pnpm run deploy

# 或者分步执行
pnpm run upload  # 只上传，不部署
```

## 🔧 配置说明

### Wrangler 配置要点

#### 兼容性设置
- `nodejs_compat`: 启用 Node.js API 兼容性
- `nodejs_compat_populate_process_env`: 自动填充 process.env
- `global_fetch_strictly_public`: 允许应用中的 URL 获取

#### 资源绑定
- **Hyperdrive**: 数据库连接优化
- **R2 Buckets**: 文件存储和缓存
- **Assets**: 静态文件托管

#### 性能优化
- **minify**: 启用代码压缩
- **logpush**: 启用日志推送
- **observability**: 启用可观测性

## 🌐 域名配置

### 1. 添加自定义域名
```bash
wrangler pages domain add <your-domain.com>
```

### 2. 配置 DNS
在 Cloudflare DNS 设置中：
- 添加 A 记录指向你的 Worker
- 或者使用 CNAME 记录

### 3. SSL/TLS 设置
- 在 Cloudflare Dashboard 中启用 "Full (strict)" SSL/TLS

## 🗄️ 数据库设置

### 使用 Hyperdrive 优化
你的配置已经包含 Hyperdrive 绑定：

```json
"hyperdrive": [
  {
    "binding": "HYPERDRIVE",
    "id": "1d1e705de4b348499085fbf5fdf823f3",
    "localConnectionString": "postgresql://..."
  }
]
```

### 数据库迁移
```bash
# 运行数据库迁移
pnpm run db:migrate

# 推送架构更改
pnpm run db:push
```

## 📊 监控和调试

### 查看日志
```bash
wrangler tail
```

### 监控指标
- 在 Cloudflare Dashboard 中查看 Workers 分析
- 设置告警和通知

### 调试
```bash
# 本地开发和调试
pnpm run dev

# 本地预览生产构建
pnpm run preview
```

## 🔒 安全注意事项

### 1. 环境变量安全
- 使用 `wrangler secret` 存储敏感信息
- 避免在代码中硬编码密钥
- 定期轮换 API 密钥

### 2. CORS 配置
- 在 Next.js 配置中设置适当的 CORS 策略
- 限制允许的域名

### 3. 速率限制
- 实施 API 速率限制
- 使用 Cloudflare 的 DDoS 保护

## 🚨 故障排除

### 常见问题

#### 1. 构建失败
```bash
# 清理缓存
rm -rf .next
rm -rf .open-next
pnpm run build
```

#### 2. 环境变量未生效
```bash
# 检查密钥设置
wrangler secret list

# 重新设置密钥
wrangler secret put <KEY_NAME>
```

#### 3. 数据库连接问题
- 检查 Hyperdrive 配置
- 验证数据库连接字符串
- 确保数据库允许外部连接

#### 4. 静态资源 404
- 检查 assets 绑定配置
- 验证文件路径
- 确保构建输出正确

### 获取帮助
```bash
# 查看 Wrangler 帮助
wrangler --help

# 查看特定命令帮助
wrangler deploy --help
```

## 📝 部署检查清单

部署完成后，检查以下项目：

- [ ] 网站可以正常访问
- [ ] 用户注册/登录功能正常
- [ ] AI 图像生成功能工作
- [ ] 支付流程测试通过
- [ ] 文件上传/下载正常
- [ ] 邮件发送功能正常
- [ ] 数据库连接稳定
- [ ] 静态资源加载正常
- [ ] SSL 证书有效
- [ ] 性能指标满足要求

## 🎯 性能优化建议

1. **启用缓存**
   - 使用 R2 增量缓存
   - 配置适当的缓存策略

2. **优化图片**
   - 使用 Cloudflare Image Optimization
   - 实施懒加载

3. **代码分割**
   - 使用 Next.js 动态导入
   - 优化包大小

4. **监控指标**
   - 设置性能预算
   - 监控 Core Web Vitals

现在你可以开始部署了！🚀