# 主页内容维护说明

这里的文件就是主页内容的直接编辑入口。修改并提交后，无需重新打包，GitHub Pages 会直接读取新内容。

- `publications.js`：论文
- `books.js`：图书
- `patents.js`：发明专利
- `software-copyrights.js`：软件著作权
- `honors.js`：荣誉奖项
- `experience.js`：工作经历

## 新增论文

在 `publications.js` 的数组中复制一个完整的 `{ ... },` 条目，修改字段后提交。常用字段：

- `year`：年份
- `group`：只能使用“英文期刊论文”“中文期刊论文”或“学术会议论文”
- `venue`：期刊或会议简称
- `title`：标题
- `authors`：作者
- `publication`：期刊或会议全称
- `webpage`：论文网页，可删除
- `download`：下载链接
- `image`：配图路径，可删除
- `imageFit`：可选 `"cover"` 或 `"contain"`

新增配图时，把图片上传到仓库的 `images/` 文件夹，再填写 `image: "/images/文件名"`。

请勿修改 `assets/index-*.js`；那是浏览器运行所需的自动构建文件。
