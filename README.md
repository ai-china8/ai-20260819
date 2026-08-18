# MySite — 静态网站（GitHub Pages）

这是一个纯静态网站骨架，由 HTML / CSS / JavaScript 构成，可一键托管到 GitHub Pages。

## 目录结构

```
my-website/
├── index.html            # 首页（入口页面）
├── assets/
│   ├── css/style.css     # 样式
│   └── js/main.js        # 交互脚本（移动端菜单、页脚年份）
├── .nojekyll             # 告诉 GitHub Pages 不要跑 Jekyll
├── CNAME                 # 自定义域名：ai-chin-a.space
├── .gitignore
└── README.md
```

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
| www | CNAME | 默认 | 你的用户名.github.io | 600 |

> 把 `你的用户名.github.io` 换成你实际的 GitHub Pages 默认域名（例如 `octocat.github.io`）。

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
