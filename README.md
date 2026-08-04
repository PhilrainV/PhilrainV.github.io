# 魏雨昂个人学术主页

这是 `https://philrainv.github.io/` 的新版源码，采用 React、TypeScript 与 Vite 构建。

## 本地运行

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

GitHub Pages 实际发布的是仓库根目录中的已构建静态文件。源码位于 `src/`，图片位于 `public/images/`。

Google Scholar 数据由 `.github/workflows/google_scholar_crawler.yaml` 每日更新至 `google-scholar-stats` 分支；页面读取该分支的数据，并在读取失败时使用内置的最近一次指标。

访客地图仅展示匿名访客标识和大致地区，不公开完整 IP 地址。
