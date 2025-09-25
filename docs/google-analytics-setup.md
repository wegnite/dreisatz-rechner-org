# Google Analytics 自动化配置指南

## 概述

本项目提供了一个自动化脚本，用于在创建新项目时自动配置 Google Analytics 4 (GA4)，无需手动在 GA 界面进行繁琐的设置。

## 功能特性

- ✅ 自动创建 GA4 媒体资源（Property）
- ✅ 自动创建网站数据流（Web Data Stream）
- ✅ 获取并保存测量 ID（Measurement ID）
- ✅ 配置增强型测量
- ✅ 自动保存配置到环境变量
- ✅ 支持多种认证方式

## 前置准备

### 1. 启用 Google Analytics Admin API

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建或选择一个项目
3. 在 API 和服务中搜索 "Google Analytics Admin API"
4. 点击启用

### 2. 创建服务账户

```bash
# 在 Google Cloud Console 中：
1. 转到 "IAM 和管理" > "服务账户"
2. 点击 "创建服务账户"
3. 填写服务账户详情
4. 授予角色：选择 "Google Analytics Admin"
5. 创建密钥（JSON 格式）
6. 下载密钥文件
```

### 3. 授权服务账户

在 Google Analytics 中：
1. 进入 GA4 管理界面
2. 在账户或媒体资源级别添加用户
3. 输入服务账户邮箱（格式：xxx@xxx.iam.gserviceaccount.com）
4. 授予 "编辑者" 权限

## 安装依赖

```bash
# 安装必要的 npm 包
pnpm add -D @google-analytics/admin commander chalk ora dotenv
pnpm add -D @types/node tsx
```

## 使用方式

### 方式一：命令行参数

```bash
# 基础用法
pnpm tsx scripts/setup-google-analytics.ts \
  --site-name "My Awesome Site" \
  --url "https://mysite.com"

# 完整参数
pnpm tsx scripts/setup-google-analytics.ts \
  --site-name "My Awesome Site" \
  --url "https://mysite.com" \
  --service-account ./path/to/service-account.json \
  --timezone "Asia/Shanghai" \
  --currency "CNY" \
  --industry "TECHNOLOGY"
```

### 方式二：环境变量

在 `.env` 文件中设置：
```env
GOOGLE_APPLICATION_CREDENTIALS=./path/to/service-account.json
GA_ACCOUNT_ID=accounts/123456789
```

然后运行：
```bash
pnpm tsx scripts/setup-google-analytics.ts \
  --site-name "My Site" \
  --url "https://mysite.com"
```

### 方式三：集成到项目初始化流程

在 `package.json` 中添加脚本：
```json
{
  "scripts": {
    "setup:ga": "tsx scripts/setup-google-analytics.ts",
    "setup:project": "npm run setup:ga && npm run setup:other"
  }
}
```

### 方式四：作为 NPM 初始化脚本

创建 `.npmrc` 文件：
```
# 在项目初始化后自动运行
post-install = npm run setup:ga
```

## 配置选项

| 参数 | 必需 | 描述 | 默认值 |
|-----|------|-----|-------|
| `--site-name, -n` | ✅ | 网站名称 | - |
| `--url, -u` | ✅ | 网站 URL | - |
| `--account-id, -a` | ❌ | GA 账户 ID | 使用第一个可用账户 |
| `--service-account, -s` | ❌ | 服务账户密钥路径 | 从环境变量读取 |
| `--timezone, -t` | ❌ | 时区 | America/Los_Angeles |
| `--currency, -c` | ❌ | 货币代码 | USD |
| `--industry, -i` | ❌ | 行业类别 | - |

## 行业类别选项

- AUTOMOTIVE - 汽车
- BUSINESS_AND_INDUSTRIAL_MARKETS - 商业和工业市场
- FINANCE - 金融
- HEALTHCARE - 医疗保健
- TECHNOLOGY - 技术
- TRAVEL - 旅游
- ARTS_AND_ENTERTAINMENT - 艺术和娱乐
- BEAUTY_AND_FITNESS - 美容和健身
- BOOKS_AND_LITERATURE - 书籍和文学
- FOOD_AND_DRINK - 餐饮
- GAMES - 游戏
- 等等...

## 输出结果

脚本执行成功后会：

1. **创建 GA 资源**：
   - GA4 媒体资源
   - 网站数据流
   - 增强型测量配置

2. **保存配置到 `.env.local`**：
```env
# Google Analytics Configuration (Auto-generated)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
GA_PROPERTY_ID=123456789
```

3. **控制台输出**：
```
✅ Google Analytics 设置完成!

配置信息:
  账户: accounts/123456789
  媒体资源: My Awesome Site
  数据流: My Awesome Site - Web Stream
  测量 ID: G-XXXXXXXXXX
  属性 ID: 123456789
```

## 在项目中使用

### 1. 安装 Google Analytics

```tsx
// app/layout.tsx 或 pages/_app.tsx
import Script from 'next/script';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### 2. 发送自定义事件

```typescript
// utils/analytics.ts
export const sendGAEvent = (
  eventName: string,
  parameters?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

// 使用示例
sendGAEvent('purchase', {
  transaction_id: '12345',
  value: 99.99,
  currency: 'USD',
  items: [...]
});
```

## 高级配置

### 配置文件 `ga-setup-config.json`

脚本支持通过配置文件进行高级设置：

```json
{
  "defaultSettings": {
    "timezone": "Asia/Shanghai",
    "currency": "CNY",
    "enhancedMeasurement": {
      "scrolls": true,
      "outboundClicks": true,
      "siteSearch": true,
      "videoEngagement": true,
      "fileDownloads": true
    }
  },
  "conversionEvents": [
    {
      "name": "purchase",
      "displayName": "购买"
    }
  ],
  "customDimensions": [
    {
      "parameterName": "user_type",
      "displayName": "用户类型",
      "scope": "USER"
    }
  ]
}
```

## 故障排除

### 常见问题

1. **认证失败**
   - 确保服务账户有正确的权限
   - 检查密钥文件路径是否正确
   - 验证 API 是否已启用

2. **创建媒体资源失败**
   - 检查账户配额限制
   - 确认账户级别权限

3. **测量 ID 未生成**
   - 等待几秒后重试
   - 检查数据流配置

### 调试模式

```bash
# 启用调试日志
DEBUG=* pnpm tsx scripts/setup-google-analytics.ts ...
```

## 安全建议

1. **不要提交服务账户密钥到代码库**
   - 添加到 `.gitignore`
   - 使用环境变量
   - 考虑使用密钥管理服务

2. **限制服务账户权限**
   - 仅授予必要的权限
   - 定期审查和轮换密钥

3. **使用 CI/CD 环境变量**
   ```yaml
   # .github/workflows/deploy.yml
   env:
     GOOGLE_APPLICATION_CREDENTIALS: ${{ secrets.GA_SERVICE_ACCOUNT }}
   ```

## API 限制

- 每个账户最多 2000 个媒体资源
- 每个媒体资源最多 50 个数据流
- API 请求限制：每秒 10 个请求

## 相关链接

- [Google Analytics Admin API 文档](https://developers.google.com/analytics/devguides/config/admin/v1)
- [GA4 设置指南](https://support.google.com/analytics/answer/9304153)
- [服务账户创建指南](https://cloud.google.com/iam/docs/creating-managing-service-accounts)
- [Node.js 客户端库](https://www.npmjs.com/package/@google-analytics/admin)

## 许可证

MIT