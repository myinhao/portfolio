# 袁铭昊个人网站 - 全栈部署包

## 项目结构

```
.
├── app/                  # 前端 React + TypeScript 项目
│   ├── dist/            # 构建后的前端文件
│   ├── src/             # 源代码
│   ├── .env             # 开发环境配置
│   └── .env.production  # 生产环境配置（需要修改）
│
├── server/              # 后端 Node.js API
│   ├── server.js        # 主服务器文件
│   ├── package.json     # 依赖配置
│   ├── .env.example     # 环境变量示例
│   └── messages/        # 消息存储目录（运行后生成）
│
├── DEPLOY.md            # 详细部署指南
└── README.md            # 本文件
```

---

## 快速开始

### 1. 配置后端

```bash
cd server/

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env
nano .env  # 编辑配置
```

`.env` 文件内容：
```env
PORT=3001
EMAIL_USER=superheroymh@Gmail.com
EMAIL_PASS=你的Gmail应用密码
ADMIN_PASSWORD=你的管理员密码
```

### 2. 启动后端

```bash
# 开发模式
npm run dev

# 生产模式
npm start
```

### 3. 配置前端

编辑 `app/.env.production`：
```env
VITE_API_URL=http://你的服务器IP:3001
```

### 4. 构建前端

```bash
cd app/
npm install
npm run build
```

构建后的文件在 `app/dist/` 目录。

### 5. 部署前端

将 `app/dist/` 目录下的文件部署到 Nginx 或其他 Web 服务器。

---

## 消息存储

访客提交的消息会：

1. **保存到文件** - 存储在 `server/messages/` 目录，文件名格式：`message_时间戳.json`
2. **发送邮件通知** - 如果配置了 Gmail 应用密码，会发送邮件到你的邮箱

---

## API 接口

| 接口 | 方法 | 说明 |
|------|------|------|
| `/api/health` | GET | 健康检查 |
| `/api/contact` | POST | 提交留言 |
| `/api/messages?password=xxx` | GET | 查看所有留言 |

---

## 详细部署指南

请参考 [DEPLOY.md](./DEPLOY.md) 获取完整的云服务器部署步骤。

---

## 技术栈

- **前端**: React + TypeScript + Vite + Tailwind CSS + shadcn/ui
- **后端**: Node.js + Express + Nodemailer
- **部署**: Nginx + PM2

---

## 联系方式

- 邮箱: superheroymh@Gmail.com
- GitHub: https://github.com/myinhao
