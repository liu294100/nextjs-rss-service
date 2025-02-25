```markdown
# Next.js RSS 转换服务应用

创建了一个完整的 Next.js RSS 转换服务应用。这个应用允许你从 CNN Lite 获取新闻并将其转换为标准的 RSS 格式，同时设计了可扩展的架构，便于添加更多新闻源。

## 主要功能

- **多源支持：** 基于模块化设计，可以轻松添加新的网站源。
- **动态路由：** 使用 Next.js 的动态 API 路由支持多网站。
- **首页展示：** 主页显示所有可用的 RSS 订阅源及其链接。
- **TypeScript 支持：** 使用 TypeScript 确保类型安全。
- **现代化配置：** 使用指定的 Next.js 13.4.19 和 Babel 配置。

## 如何使用

1.  **访问首页：** 显示所有可用的 RSS 源

    例如：`https://your-domain.com/`

2.  **获取 RSS 订阅：**

    - CNN Lite: `https://your-domain.com/api/rss/cnn`
    - 当添加新源后(如 BBC): `https://your-domain.com/api/rss/bbc`

## 如何添加新网站

要添加一个新的网站源 (例如 BBC)，你需要：

1.  创建一个新的源处理器文件 (如 `src/lib/sources/bbc.ts`)，参考代码中的示例。
2.  在 `src/lib/sources/index.ts` 中注册这个新源。

无需修改 API 路由或首页代码，系统会自动检测并显示新添加的源。

## 部署前的准备

在部署前，你需要设置环境变量 `NEXT_PUBLIC_BASE_URL` 为你的网站域名，例如：

```
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

这样可以确保 RSS 链接和其他 URL 正确生成。

这个应用现在已经准备好部署在任何支持 Next.js 的平台上，如 Vercel、Netlify 或自己的服务器。

你可以根据需要调整源处理器的 HTML 解析逻辑，以适应不同网站的结构变化。代码中已提供了 CNN Lite 的实现和 BBC 的示例框架。
```
