# 魏雨昂个人学术主页

正式主页：<https://philrainv.github.io/>

## 最常用：更新个人成果

以后新增或修改成果，只需编辑仓库根目录的 `content/`：

- `content/publications.js`：论文
- `content/profile.js`：个人简介、研究领域、邮箱、单位、头像与学术链接
- `content/books.js`：图书
- `content/patents.js`：发明专利
- `content/software-copyrights.js`：软件著作权
- `content/honors.js`：荣誉奖项
- `content/experience.js`：工作经历

修改后直接提交到 `master`，主页会读取这些独立文件，无需重新打包。详细字段、个人信息修改说明和新增论文示例见 [content/README.md](content/README.md)。

新增论文配图时，将图片上传到 `images/`，再在论文条目中填写 `image: "/images/文件名"`。

## 程序文件

`assets/` 中是浏览器运行文件，已按功能拆分为页面逻辑、React 运行库、图标库和世界地图数据。通常不需要手动修改这些文件。

Google Scholar 数据由 `.github/workflows/google_scholar_crawler.yaml` 每日更新至 `google-scholar-stats` 分支。访客地图只展示匿名访客标识和大致地区，不公开完整 IP。
