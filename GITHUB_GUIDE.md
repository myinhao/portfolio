# GitHub 推送指南

## 方式一：命令行推送（推荐）

### 1. 下载代码包

下载 `portfolio-github.tar.gz` 到你的电脑，解压。

### 2. 在 GitHub 创建新仓库

1. 访问 https://github.com/new
2. 填写仓库名称，例如 `portfolio`
3. 选择公开或私有
4. **不要**勾选 "Initialize this repository with a README"
5. 点击 "Create repository"

### 3. 本地初始化并推送

```bash
# 进入项目目录
cd portfolio

# 初始化 git 仓库
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: 个人网站完整代码"

# 关联远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/myinhao/portfolio.git

# 推送
git branch -M main
git push -u origin main
```

---

## 方式二：GitHub Desktop（图形界面）

1. 下载安装 [GitHub Desktop](https://desktop.github.com/)
2. 解压代码包
3. 打开 GitHub Desktop
4. File → Add local repository
5. 选择解压后的文件夹
6. 填写提交信息，点击 "Commit to main"
7. 点击 "Publish repository"
8. 填写仓库名称，选择公开/私有，点击 "Publish"

---

## 方式三：VS Code（编辑器内）

1. 用 VS Code 打开项目文件夹
2. 点击左侧源代码管理图标（Ctrl+Shift+G）
3. 点击 "Initialize Repository"
4. 输入提交信息，点击 ✓ Commit
5. 点击 "Publish Branch"
6. 选择 GitHub，登录授权
7. 填写仓库名称，点击发布

---

## 项目结构说明

```
portfolio/
├── app/              # 前端 React 项目
│   ├── src/          # 源代码
│   ├── dist/         # 构建输出
│   └── ...
├── server/           # 后端 Node.js API
│   ├── server.js     # 主服务器
│   └── ...
├── .gitignore        # Git 忽略配置
├── DEPLOY.md         # 部署指南
├── README.md         # 项目说明
└── GITHUB_GUIDE.md   # 本文件
```

---

## 后续更新代码

```bash
# 修改代码后
git add .
git commit -m "描述你的修改"
git push
```

---

## 常见问题

### 1. 提示 "fatal: not a git repository"

```bash
git init
```

### 2. 提示 "Permission denied"

使用 SSH 方式：
```bash
git remote set-url origin git@github.com:myinhao/portfolio.git
```

或者使用 Personal Access Token：
- 访问 https://github.com/settings/tokens
- 生成 token
- 推送时密码填 token

### 3. 提示 "rejected: non-fast-forward"

```bash
git pull origin main --rebase
git push
```
