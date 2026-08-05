# 主页内容维护说明

这里的文件就是主页内容的直接编辑入口。修改并提交后，无需重新打包，GitHub Pages 会直接读取新内容。

- `publications.js`：论文
- `profile.js`：姓名、职务、单位、头像、邮箱、简介、研究领域及学术链接
- `education.js`：教育经历、学校链接、校徽、学位、导师及地点
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

## 修改个人简介与联系方式

所有个人信息都集中在 `profile.js`。常用字段：

- `name`、`englishName`：中英文姓名
- `title`、`affiliation`：职称与工作单位
- `affiliationUrl`：工作单位官网
- `avatar`、`avatarAlt`：头像路径与替代文字
- `location`、`email`：所在城市与邮箱
- `bio`：个人简介；数组中的每一行对应一个段落
- `researchInterests`：研究领域标签
- `links`：ResearchGate、GitHub、Google Scholar 和 ORCID 链接

修改文字或链接后直接提交即可；不要删除字段名或最外层的大括号。

## 修改教育经历

所有教育经历都集中在 `education.js`。每个 `{ ... },` 条目对应一所学校或一段学习经历：

- `period`：起止时间
- `institution`、`institutionUrl`：学校名称与官网
- `program`：院系、专业及学位说明
- `logo`、`logoAlt`：校徽路径与替代文字
- `supervisor`、`supervisorUrl`：导师姓名与主页；没有导师时可删除这两个字段
- `location`：城市或国家/地区

新增经历时复制一个完整条目并修改。校徽请先上传到 `images/`，再填写图片路径。
