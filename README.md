# ChenAxic 官网

纯静态站点，无构建步骤、无外部依赖（不引用任何 CDN / 字体 / JS 库），可直接部署到 GitHub Pages。

## 文件

```
site/
├── index.html      首页（功能 / 下载 / FAQ）
├── guide.html      使用教程（对应 App 内教程）
├── style.css       样式（自带深色 / 浅色自适应）
├── app.js          版本信息读取 + 中英切换
├── .nojekyll       让 Pages 跳过 Jekyll 处理
└── assets/
    └── icon.webp   应用图标（取自 mipmap-xxxhdpi）
```

## 部署

两种方式，任选其一。

### 方式 A：独立站点仓库（推荐）

1. 新建仓库 `TGRAsa7.github.io`（用户名必须是 `TGRAsa7`）
2. 把 `site/` 里的**全部文件**推到该仓库根目录
3. 访问 `https://TGRAsa7.github.io`

这种方式 URL 最短，且不影响主仓库。

### 方式 B：主仓库子目录 + Pages

1. 把 `site/` 整个目录推到 `TGRAsa7/ChenAxic` 的 `main` 分支
2. 仓库 Settings → Pages → Source 选 `Deploy from a branch`
3. Branch 选 `main`，目录选 `/site`
4. 访问 `https://TGRAsa7.github.io/ChenAxic/`

## 版本信息如何同步

`app.js` 会并发请求下面三个源读取仓库根目录的 `version.txt`，取版本号最高的结果：

```
https://ghfast.top/https://raw.githubusercontent.com/TGRAsa7/ChenAxic/main/version.txt
https://gh-proxy.com/https://raw.githubusercontent.com/TGRAsa7/ChenAxic/main/version.txt
https://raw.githubusercontent.com/TGRAsa7/ChenAxic/main/version.txt
```

这与 App 内 `UpdateChecker.kt` 的策略完全一致，所以网站和 App 显示的版本号不会打架。

### version.txt 支持的两种格式

**格式 1（只有版本号）**

```
2.7.11
```

这时下载按钮会指向 GitHub Releases 页面。

**格式 2（完整信息，推荐）**

```
versionCode=25
versionName=2.7.11
url=https://github.com/TGRAsa7/ChenAxic/releases/download/v2.7.11/app-release.apk
notes=修复 misc 分区清数据逻辑
优化 super 分区重建速度
```

- `url` 会被用作下载按钮的直链
- `notes` 支持多行，只要不在行首写 `key=` 就会续接到上一条
- 也支持 `\n` 转义换行

改完 `version.txt` 推上去，网站会在下次访问时自动显示新版本，不需要重新部署。

## 本地预览

直接双击 `index.html` 即可。注意：用 `file://` 打开时，跨域请求 `version.txt` 会被浏览器拦截，版本区会显示「正在读取版本…」并退化成 Releases 链接。用本地服务器就正常：

```bash
cd site
python3 -m http.server 8000
# 浏览器打开 http://localhost:8000
```

## 多语言（中文 / English）

站点用 **`data-i18n` 属性驱动**翻译，不依赖任何库。

- `data-i18n="key"` —— 替换元素的 `textContent`
- `data-i18n-attr="content:key"` —— 替换元素的指定属性，可写多条用逗号分隔

所有文案集中放在 `app.js` 的 `I18N.zh` / `I18N.en` 两个对象里，键名一一对应。切换语言时，`app.js` 会扫描整页所有带这两个属性的节点并重写，因此**新加文案只需要在 HTML 上打标 + 在字典里补两条**，不会再有漏翻的硬编码文字。

语言判定顺序：`localStorage` 存档 → 浏览器语言 → 默认中文。切换结果会写入 `localStorage`，刷新后保持。

`<html lang>` 会随语言同步更新（`zh-CN` / `en`），`<title>` 和 `<meta name="description">` 也一起切换。

## 定制
| 想改什么 | 改哪里 |
|---|---|
| 仓库地址 / 分支 | `app.js` 里的 `REPO`、`VER_PATH` |
| 文案（中 / 英） | `app.js` 里的 `I18N` 对象 |
| 主色调 | `style.css` 顶部 `--accent` 变量 |
| 功能卡片 | `index.html` 里 `.grid` 下的 `<article class="card">`，文案键为 `c1t`~`c6t` / `c1d`~`c6d` |
| 教程内容 | `guide.html`，文案键以 `g` 开头 |
| 图标 | 替换 `assets/icon.webp`（建议 512×512） |

## 本地调试

`app.js` 暴露了一个调试入口，可在浏览器控制台里直接调用：

```js
ChenAxic.setLang('en');   // 强制切到英文
ChenAxic.getLang();       // 当前语言
ChenAxic.i18n.en.g1h;     // 查看某条译文的英文
```

## 说明

- 页面无任何第三方请求，不收集任何数据，无 Cookie、无统计脚本
- 唯一的外部链接是 `github.com` 与你配置的 `version.txt` / APK 直链
- 深色 / 浅色跟随系统 `prefers-color-scheme`
- 移动端已适配（导航折叠、栅格断点 900px / 720px / 600px）

## 关于「非开源」

ChenAxic 应用本体**不开源**，仓库中没有 `LICENSE` 文件，未授予任何复制、修改或再分发源码的许可。所有权利保留（All rights reserved）。

因此本站刻意**不出现**任何暗示源码公开的表述：

| 位置 | 正确写法 | 不要写成 |
|---|---|---|
| 下载区链接 | 项目主页 / Project page | 源码仓库 / Source repository |
| 教程结尾 | 在项目页面提 Issue | 提 Issue 或 Pull Request |
| 页脚 | GitHub | Source code on GitHub |

仓库对外只承担两件事：**放 `version.txt` 供更新检查读取**，以及**在 Releases 里分发 APK**。Issue 区仍可用于反馈问题，但通过 Issue 提交的代码不会被合并。

如果你后续决定开源，需要同步做三件事，否则站点的表述会与事实不符：

1. 在仓库根目录添加 `LICENSE` 文件
2. 把 `app.js` 的 `I18N.zh.altRepo` / `I18N.en.altRepo` 改回「源码仓库」/「Source repository」
3. 更新本节，删掉「非开源」的说明
