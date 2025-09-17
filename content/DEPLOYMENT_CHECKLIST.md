# 🚀 Cloudflare 部署检查清单

## 📋 部署前准备

### 1. 账户和工具设置
- [ ] 已注册 Cloudflare 账户
- [ ] 已安装 Node.js (v18+)
- [ ] 已安装 pnpm: `npm install -g pnpm`
- [ ] 已安装 Wrangler: `npm install -g wrangler`
- [ ] 已登录 Cloudflare: `wrangler login`

### 2. 域名配置
- [ ] 域名已添加到 Cloudflare
- [ ] DNS 设置为 Cloudflare 名称服务器
- [ ] SSL/TLS 设置为 "Full (strict)"

### 3. 数据库准备
- [ ] PostgreSQL 数据库已创建 (推荐使用 Neon 或 Supabase)
- [ ] 数据库连接字符串已获取
- [ ] 数据库迁移已完成: `pnpm run db:migrate`

## 🔧 环境配置

### 4. 运行环境配置脚本
```bash
./scripts/setup-cloudflare-env.sh
```

### 5. 必需的密钥变量 (通过 wrangler secret 设置)
- [ ] `DATABASE_URL` - 数据库连接字符串
- [ ] `BETTER_AUTH_SECRET` - 认证密钥 (运行: `openssl rand -base64 32`)
- [ ] `RESEND_API_KEY` - 邮件服务 API 密钥
- [ ] `STRIPE_SECRET_KEY` - Stripe 私钥
- [ ] `STRIPE_WEBHOOK_SECRET` - Stripe Webhook 密钥
- [ ] `STORAGE_ACCESS_KEY_ID` - 存储访问密钥
- [ ] `STORAGE_SECRET_ACCESS_KEY` - 存储私钥
- [ ] `STORAGE_ENDPOINT` - 存储端点
- [ ] `STORAGE_PUBLIC_URL` - 存储公开 URL

### 6. OAuth 配置 (可选)
- [ ] `GITHUB_CLIENT_ID` 和 `GITHUB_CLIENT_SECRET`
- [ ] `GOOGLE_CLIENT_ID` 和 `GOOGLE_CLIENT_SECRET`

### 7. AI 服务配置 (至少配置一个)
- [ ] `OPENAI_API_KEY` - OpenAI GPT/DALL-E
- [ ] `REPLICATE_API_TOKEN` - Replicate AI 模型
- [ ] `FAL_API_KEY` - Fal AI 服务
- [ ] `FIREWORKS_API_KEY` - Fireworks AI
- [ ] `DEEPSEEK_API_KEY` - DeepSeek AI
- [ ] `GOOGLE_GENERATIVE_AI_API_KEY` - Google Gemini

### 8. 公开环境变量 (在 wrangler.jsonc 中配置)
更新 `wrangler.jsonc` 中的 `vars` 部分：

```json
"vars": {
  "NEXT_PUBLIC_BASE_URL": "https://your-domain.com",
  "NEXT_URL": "https://your-domain.com",
  "VERCEL_URL": "your-domain.com",
  "DISABLE_IMAGE_OPTIMIZATION": "true",
  "NEXT_PUBLIC_DEMO_WEBSITE": "false"
}
```

## 🏗️ Cloudflare 资源创建

### 9. 创建必需的资源
```bash
# R2 存储桶
wrangler r2 bucket create aipolaroidphoto-cache
wrangler r2 bucket create aipolaroidphoto-files

# Hyperdrive 配置 (替换为你的数据库 URL)
wrangler hyperdrive create my-hyperdrive --connection-string="postgresql://user:password@host:port/database"
```

### 10. 更新 Hyperdrive ID
- [ ] 将新的 Hyperdrive ID 更新到 `wrangler.jsonc` 中的 `hyperdrive` 配置

## 🚀 部署过程

### 11. 运行部署脚本
```bash
# 预览部署
./scripts/deploy-cloudflare.sh production preview

# 实际部署
./scripts/deploy-cloudflare.sh production
```

### 12. 或者手动步骤
```bash
# 安装依赖
pnpm install

# 生成类型文件
pnpm run cf-typegen

# 代码检查
pnpm run lint

# 构建项目
pnpm run build

# 部署
pnpm run deploy
```

## ✅ 部署后验证

### 13. 功能测试
- [ ] 网站可以正常访问: `https://your-domain.com`
- [ ] 首页加载正常
- [ ] AI 图像生成工具工作正常
- [ ] 用户注册功能正常
- [ ] 用户登录功能正常
- [ ] OAuth 登录正常 (如果配置)
- [ ] 邮件发送功能正常
- [ ] 支付流程测试通过
- [ ] 文件上传/下载正常
- [ ] 响应式设计在各设备上正常

### 14. 性能检查
- [ ] 页面加载速度 < 3秒
- [ ] Core Web Vitals 指标良好
- [ ] SSL 证书有效
- [ ] CDN 缓存正常工作

### 15. 监控设置
- [ ] Cloudflare Analytics 已启用
- [ ] 错误日志监控设置
- [ ] 性能监控配置
- [ ] 告警通知设置

## 🔧 故障排除

### 常见问题和解决方案

#### 构建失败
```bash
# 清理并重新构建
rm -rf .next .open-next
pnpm run build
```

#### 环境变量问题
```bash
# 检查已设置的密钥
wrangler secret list

# 重新设置密钥
wrangler secret put KEY_NAME
```

#### 数据库连接问题
- 检查 Hyperdrive 配置
- 验证数据库连接字符串
- 确保数据库允许外部连接

#### 域名访问问题
- 检查 DNS 设置
- 验证 SSL/TLS 配置
- 确认 Worker 路由配置

## 📊 监控和维护

### 16. 定期检查
- [ ] 每周检查错误日志
- [ ] 每月检查性能指标
- [ ] 每季度更新依赖包
- [ ] 定期备份数据库

### 17. 扩展配置
- [ ] 设置自动备份
- [ ] 配置 CDN 缓存策略
- [ ] 实施安全策略
- [ ] 设置监控告警

## 🎯 优化建议

### 性能优化
- 启用 Cloudflare 图像优化
- 配置适当的缓存策略
- 使用 R2 增量缓存
- 实施代码分割

### 安全优化
- 定期轮换 API 密钥
- 启用 DDoS 保护
- 配置 WAF 规则
- 实施速率限制

### 成本优化
- 监控 Cloudflare 使用量
- 优化数据传输
- 合理配置缓存策略
- 定期清理未使用的资源

---

## 🚨 紧急联系信息

- **Cloudflare 状态页面**: https://www.cloudflarestatus.com/
- **技术支持**: 通过 Cloudflare Dashboard 提交工单
- **社区论坛**: https://community.cloudflare.com/

---

✅ **部署完成后，在此检查清单上标记所有完成的项目！**