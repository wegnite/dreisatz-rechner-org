# MkSaaS

Make AI SaaS in a weekend.

The complete Next.js boilerplate for building profitable SaaS, with auth, payments, i18n, newsletter, dashboard, blog, docs, blocks, themes, SEO and more.

## Author

This project is created by [Fox](https://x.com/indie_maker_fox), the founder of [MkSaaS](https://mksaas.com) and [Mkdirs](https://mkdirs.com). The official X account for [MkSaaS](https://mksaas.com) is [@mksaascom](https://x.com/mksaascom), you can follow this account for the updates about MkSaaS.

## Documentation

The documentation is available on the [website](https://mksaas.com/docs). It includes guides, tutorials, and detailed explanations of the code. I designed it to be as beginner-friendly as possible, so you can start making money from day one.

If you found anything that could be improved, please let me know.

## Links

- 🔥 website: [mksaas.com](https://mksaas.com)
- 🌐 demo: [demo.mksaas.com](https://demo.mksaas.com)
- 📚 documentation: [mksaas.com/docs](https://mksaas.com/docs)
- 🗓️ roadmap: [mksaas roadmap](https://mksaas.link/roadmap)
- 👨‍💻 discord: [mksaas.link/discord](https://mksaas.link/discord)
- 📹 video: [mksaas.link/youtube](https://mksaas.link/youtube)

## Repositories

By default, you should have access to all 5 repositories. If you find that you’re unable to access any of them, please don’t hesitate to reach out to me, and I’ll assist you in resolving the issue.

- [mksaas-template (ready)](https://github.com/MkSaaSHQ/mksaas-template): https://demo.mksaas.com
- [mksaas-blog (ready)](https://github.com/MkSaaSHQ/mksaas-blog): https://mksaas.me
- [mksaas-haitang (ready)](https://github.com/MkSaaSHQ/mksaas-haitang): https://haitang.app
- [mksaas-outfit (ready)](https://github.com/MkSaaSHQ/mksaas-outfit)
- [mksaas-app (WIP)](https://github.com/MkSaaSHQ/mksaas-app): https://mksaas.app

## Notice

> If you have any questions, please [submit an issue](https://github.com/MkSaaSHQ/mksaas-template/issues/new), or contact me at [support@mksaas.com](mailto:support@mksaas.com), or join our [discord community](https://mksaas.link/discord) and ask for help there.

> If you want to receive notifications whenever code changes, please click `Watch` button in the top right.

> When submitting any content to the  issues of the repository, please use **English** as the main Language, so that everyone can read it and help you, thank you for your supports.

## Cloudflare 部署 SOP

1. 保证项目根目录存在最新的 `.env.production`。公开配置使用 `NEXT_PUBLIC_` 前缀，其余变量默认视为敏感信息，脚本会自动分类。
2. 运行 `npm run cf:preview`（推荐但非必选），生成并检查 `.cloudflare/worker-vars.json`、`.cloudflare/worker-secrets.json`、`.cloudflare/wrangler.generated.json` 是否符合预期。  其中worker-vars.json：Cloudflare Worker 的公开配置；  worker-secrets.json：即将通过 wrangler secret bulk 上传的机密变量；  wrangler.generated.json：包含最新 vars 的临时部署配置。
3. 运行 `npm run cf:deploy`，脚本会重新解析 `.env.production`，批量推送 secrets，并使用 `.cloudflare/wrangler.generated.json` 完成部署。
4. 部署完成后执行 `wrangler secret list --config .cloudflare/wrangler.generated.json` 与 `cat .cloudflare/worker-vars.json`，确认线上机密与公开配置正确。
5. 若 `.env.production` 删除了某个机密变量，额外执行 `wrangler secret delete <NAME>`，确保 Worker 不残留旧值。

## License

For any details on the license, please refer to the [License](LICENSE) file.
