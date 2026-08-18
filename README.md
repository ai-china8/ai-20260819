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

## 绑定自有域名（可选）

若要把域名解析到 GitHub Pages，参考同工作区内的
`腾讯云域名解析到GitHub_Pages教程.html`。绑定后，在仓库根目录放一个
只有一行的 `CNAME` 文件，内容为你的域名（如 `example.com`），避免每次推送后域名设置被清空。
