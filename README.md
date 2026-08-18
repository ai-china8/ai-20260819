# 至强 CPU 参数库 — 静态网站（GitHub Pages）

这是一个纯静态的 Intel Xeon 参数速查站，由单文件 HTML 构成，可一键托管到 GitHub Pages。
首页 `index.html` 按系列分类索引所有参数页，并带关键词实时搜索（样式内联，无外部依赖）。

## 目录结构

```
my-website/
├── index.html                              # 首页：分类导航 + 搜索（自包含）
├── 至强E-2100系列参数大全.html
├── 至强E-2200系列参数大全.html
├── 至强E3-1200-v1~v6系列参数大全.html      # 6 个文件（v1~v6）
├── 至强W-1200 / W-1300 / W-2100系列参数大全.html  # 3 个文件
├── i3-8100对比Xeon-E2124G与E3-1225v6.html  # 横向对比页
├── .nojekyll             # 禁用 Jekyll，静态文件原样发布
├── CNAME                 # 自定义域名：ai-chin-a.space
├── .gitignore
└── README.md
```

> 说明：`assets/` 为早期骨架遗留（本站所有页面均已内联样式，不再引用），可保留可删除。

## 内容页清单

| 分类 | 文件 |
| --- | --- |
| 至强 E-2100 / E-2200 | `至强E-2100系列参数大全.html`、`至强E-2200系列参数大全.html` |
| 至强 E3-1200 v1–v6 | `至强E3-1200-v1~v6系列参数大全.html`（共 6 个） |
| 至强 W 系列 | `至强W-1200`、`至强W-1300`、`至强W-2100系列参数大全.html` |
| 横向对比 | `i3-8100对比Xeon-E2124G与E3-1225v6.html` |

### 如何新增一个 CPU 参数页
1. 把做好的单文件 HTML 放进本目录（命名建议 `至强XXXX系列参数大全.html`）。
2. 打开 `index.html`，在对应 `<section class="cat">` 下复制一张 `<a class="card">` 卡片，改 `href`、标题与描述即可。
3. `git add . && git commit && git push`，GitHub Pages 会自动更新。



## 上线前最后 4 步（GitHub 网页端，必须由你点击）

代码、`CNAME`、域名解析（A / www CNAME / TXT）均已就绪并实测通过。仅差网页端启用：

1. 进仓库 `ai-20260819` → **Settings → Pages → Source**：选 `main` 分支、`/ (root)` 目录 → **Save**。
2. 同一页 **Custom domain**：因仓库根已有 `CNAME`（`ai-chin-a.space`），通常会自动填入；没自动填就手填 → Save。
3. 等状态变绿（DNS 校验通过，通常几分钟）后勾选 **Enforce HTTPS**（Let's Encrypt 免费证书，自动续期）。
4. 账号级验证：右上角头像 → **Settings → Pages → Add a verified domain** → 找到 `ai-chin-a.space` 点 **Verify**（TXT 已实测生效）。

完成后访问 https://ai-chin-a.space 即可；HTTPS 证书签发前的空窗期，可先用 https://ai-china8.github.io/ai-20260819 查看站点。

## 本地预览

直接用浏览器打开 `index.html` 即可；或起一个本地静态服务器：

```bash
# Python 自带
python -m http.server 8000
# 然后访问 http://localhost:8000
```

## 发布到 GitHub Pages

1. 在 GitHub 新建一个仓库（公开）。个人主页请用 `你的用户名.github.io`，普通项目页可用任意名字。
2. 在本目录初始化并推送到该仓库：

```bash
git init
git add .
git commit -m "init static site"
git branch -M main
git remote add origin https://github.com/你的用户名/你的仓库名.git
git push -u origin main
```

3. 仓库 → Settings → Pages → Source 选择 `main` 分支、`/ (root)` 目录 → Save。
4. 几分钟后访问 `https://你的用户名.github.io`（项目页为 `https://你的用户名.github.io/你的仓库名`）。

## 以后如何同步（更新网站）

本地改完文件后：

```bash
git add .
git commit -m "更新内容"
git push
```

需要把 GitHub 上的改动拉回本地时：

```bash
git pull
```

## 绑定自有域名 ai-chin-a.space

本站已配置自定义域名 `ai-chin-a.space`（仓库根目录的 `CNAME` 文件已写好该域名）。完整步骤：

### 1. 腾讯云 DNSPod 添加解析记录
控制台：https://console.dnspod.cn/dns ，进入 `ai-chin-a.space` 域名，添加以下记录。

**主域名（A 记录，指向 GitHub Pages 官方固定 IP，4 条都要加）：**

| 主机记录 | 记录类型 | 线路类型 | 记录值 | TTL |
| --- | --- | --- | --- | --- |
| @ | A | 默认 | 185.199.108.153 | 600 |
| @ | A | 默认 | 185.199.109.153 | 600 |
| @ | A | 默认 | 185.199.110.153 | 600 |
| @ | A | 默认 | 185.199.111.153 | 600 |

**www 子域名（CNAME，便于统一入口，GitHub 会自动在两者间跳转）：**

| 主机记录 | 记录类型 | 线路类型 | 记录值 | TTL |
| --- | --- | --- | --- | --- |
| www | CNAME | 默认 | ai-china8.github.io | 600 |

> 你的 GitHub 用户名为 `ai-china8`，默认域名为 `ai-china8.github.io`，已填入上表。

### 2. GitHub 仓库设置自定义域名
仓库 → Settings → Pages → Custom domain 填入 `ai-chin-a.space` → Save。
等待 DNS 校验变绿后，勾选 **Enforce HTTPS**（Let's Encrypt 免费证书，自动续期）。

### 3. 推送 CNAME 文件
本仓库根目录已包含 `CNAME`（内容为一行 `ai-chin-a.space`）。推送后 GitHub 不会因重新构建而清空域名设置：

```bash
git add .
git commit -m "add custom domain CNAME"
git push
```

### 4. 验证
```bash
dig ai-chin-a.space +noall +answer -t A
# 应返回 185.199.108~111.153 中的 IP
```

> 注意：`.space` 为国际后缀，需确认该域名在腾讯云已完成实名/激活，且 DNS 服务器为 DNSPod（ns1.dnspod.net / ns2.dnspod.net）。GitHub Pages 主机在境外，绑定该域名**无需 ICP 备案**。
