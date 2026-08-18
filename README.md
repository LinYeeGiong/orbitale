# Orbitale

Orbitale 是一个中文优先的 Astro 个人数字花园主题，适合同时发布技术笔记、长篇随笔和 Daily 日常记录。主题包含交互式探索轨道、命令行导航、写作热力图、标签归档、永久文章链接和 RSS。

当前版本：`v0.2.0 Preview`

## Preview

截图暂由主题作者手动补充。请将截图保存到以下路径，再取消对应图片引用外层的 HTML 注释：

- `docs/images/orbitale-home-desktop.png`：1440px 首页
- `docs/images/orbitale-home-mobile.png`：390px 首页
- `docs/images/orbitale-post.png`：1440px 文章详情页

<!--
![Orbitale 桌面端首页](docs/images/orbitale-home-desktop.png)

![Orbitale 移动端首页](docs/images/orbitale-home-mobile.png)

![Orbitale 文章详情页](docs/images/orbitale-post.png)
-->

## Features

- 中文优先的静态博客，基于 Astro 7 和 TypeScript。
- Notes、Essays、Daily 三类内容及各自的永久链接。
- 使用真实文章数据生成探索领域、标签云和写作热力图。
- 支持鼠标、键盘和减少动态效果的系统偏好。
- 内置命令行导航、深色/浅色主题、标签归档和摘要 RSS。
- 文章页包含 canonical、Open Graph、JSON-LD、复制链接和前后篇导航。
- 使用 GitHub Actions 自动构建并部署到 GitHub Pages。
- 所有个人信息集中在 `src/config/site.ts`。

## Use This Template

Orbitale 推荐作为 GitHub Template 使用，而不是作为 npm 包安装。

1. 在 Orbitale 仓库页面点击 **Use this template**，选择 **Create a new repository**。
2. 如果要使用 GitHub 用户主页地址，将仓库准确命名为 `LinYeeGiong.github.io`。其他用户名需要替换为自己的 `<username>.github.io`。
3. 将新仓库设为公开仓库并创建。
4. 克隆你的个人博客仓库，安装依赖并修改 `src/config/site.ts`。
5. 删除或替换 `src/content/` 中的演示文章，再推送到 `main`。

```powershell
git clone https://github.com/LinYeeGiong/LinYeeGiong.github.io.git
cd LinYeeGiong.github.io
npm install
npm run dev
```

## Repository Model

建议维护两个独立仓库：

| 仓库 | 用途 | 是否包含个人内容 |
| --- | --- | --- |
| `LinYeeGiong/orbitale` | 公开主题、模板功能、示例内容和版本发布 | 否 |
| `LinYeeGiong/LinYeeGiong.github.io` | 实际个人博客、文章、照片和个性化配置 | 是 |

主题仓库可以持续发布新版；个人博客仓库从模板创建后独立维护。这样公开主题不会混入私人草稿，主题更新也不会覆盖你的文章历史。

## Configure Your Site

只需编辑 [`src/config/site.ts`](src/config/site.ts)。配置按以下分组集中管理：

| 配置项 | 作用 |
| --- | --- |
| `name`、`shortName`、`title`、`brand` | 姓名、简称、页面标题和站点品牌 |
| `description`、`locale`、`timezone`、`location` | 站点描述、语言、时区和地区 |
| `siteUrl`、`github`、`repository`、`email` | 正式网址和公开联系方式 |
| `hero` | 首页标题、简介和主按钮 |
| `navigation` | 顶部导航项目 |
| `terminal` | 命令行身份、标题、提示文字和快捷命令 |
| `exploration` | 探索领域、匹配标签和目标页面 |
| `footer` | 页脚署名和链接 |

部署前至少确认以下地址属于你的个人博客，而不是主题仓库：

```ts
siteUrl: 'https://linyeegiong.github.io',
github: 'https://github.com/LinYeeGiong',
repository: 'https://github.com/LinYeeGiong/LinYeeGiong.github.io',
```

`exploration[].tags` 会与文章标签进行不区分大小写的匹配，首页展示的文章数量和最新文章标题均来自真实内容，无需手动填写。

## Write Content

内容文件支持 Markdown 和 MDX，分别放在：

```text
src/content/notes/
src/content/essays/
src/content/daily/
```

Notes 适合技术笔记和系列学习记录：

```yaml
---
title: 让 Agent 记住真正重要的事
description: 从短期上下文到长期可检索记忆。
date: 2026-08-18
tags: [AI, Agent, Memory]
lang: zh
published: true
series: Agent Systems
readingMinutes: 12
---
```

Essays 适合随笔和完整观点：

```yaml
---
title: 写博客不是为了证明自己已经想明白
description: 公开写作更像是在时间里留下一个坐标。
date: 2026-08-10
tags: [写作, 思考]
lang: zh
published: true
---
```

Daily 适合短想法、照片和类似朋友圈的日常记录：

```yaml
---
title: 博客开始像自己的空间
description: 今天把博客的第二版结构画出来了。
date: 2026-08-17
tags: [Daily, 设计]
lang: zh
published: true
location: LAB
images: [/images/daily/2026-08-17/lab.jpg]
---
```

`published: false` 可保留草稿但不生成公开页面。`v0.2.0` 只为 `lang: zh` 且已发布的内容生成路由。

建议把文章图片放入 `public/images/`，然后在 Markdown 中使用 `/images/...` 绝对路径。这样图片会随静态站点一起部署；较大的原始照片可另存于对象存储或图床。

仓库自带的三篇文章只是演示数据。创建个人博客后，请替换这些文章；它们不代表主题使用者的真实内容。

## Local Development

需要 Node.js `22.12.0` 或更高版本和 npm：

```powershell
npm install
npm run dev
```

开发服务器会显示本地访问地址。提交前运行完整验证：

```powershell
npm run verify
```

该命令依次运行 Vitest、Astro 类型与内容检查，并生成生产构建。

## Deploy To GitHub Pages

仓库已包含 `.github/workflows/deploy.yml`。使用用户主页时，仓库名必须是 `<username>.github.io`，Lin 对应 `LinYeeGiong.github.io`。

1. 在 `src/config/site.ts` 中设置正确的 `siteUrl` 和 `repository`。
2. 将代码推送到个人博客仓库的 `main` 分支。
3. 打开仓库 **Settings → Pages**。
4. 在 **Build and deployment** 中把 **Source** 设为 **GitHub Actions**。
5. 等待 `Deploy Orbitale to GitHub Pages` 工作流完成。

发布地址将是 `https://LinYeeGiong.github.io/`。工作流会自动把 GitHub Pages 提供的正式 origin 传给 Astro，用于 canonical、RSS 和页面元数据。

## Update From Upstream

在个人博客仓库中添加主题仓库作为 `upstream`：

```powershell
git remote add upstream https://github.com/LinYeeGiong/orbitale.git
git fetch upstream --tags
```

查看新版本后，将需要的主题提交合并或挑选到个人博客分支。更新前先提交自己的文章和配置；遇到 `src/config/site.ts` 或演示内容冲突时，以个人博客内容为准。

## License And Content Copyright

Orbitale 的主题代码使用 [MIT License](LICENSE)。这意味着你可以使用、修改和发布主题代码，但需要保留 MIT 版权与许可声明。

MIT 授权只覆盖主题代码。博客文章、Notes、Essays、Daily 内容、头像、照片及其他个人媒体，除非作者另行声明许可，否则版权仍归各自作者所有。使用本主题不会把你的博客内容自动改为 MIT，也不会把内容版权转让给主题作者。
