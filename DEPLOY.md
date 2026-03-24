# 部署指南

## 项目结构

```
/mnt/okcomputer/output/
├── app/          # 前端 React 项目
├── server/       # 后端 Node.js API
└── DEPLOY.md     # 本文件
```

---

## 一、后端部署

### 1. 上传后端代码到服务器

```bash
# 在你的云服务器上创建目录
mkdir -p /opt/portfolio-server
cd /opt/portfolio-server

# 上传 server 文件夹中的所有文件
# 包括: package.json, server.js, .env
```

### 2. 安装依赖

```bash
cd /opt/portfolio-server
npm install
```

### 3. 配置环境变量

```bash
# 复制示例文件
cp .env.example .env

# 编辑 .env 文件
nano .env
```

配置内容：
```env
PORT=3001
EMAIL_USER=superheroymh@Gmail.com
EMAIL_PASS=你的Gmail应用密码
ADMIN_PASSWORD=你的管理员密码
```

**获取 Gmail 应用密码：**
1. 访问 https://myaccount.google.com/
2. 开启"两步验证"
3. 生成"应用专用密码"
4. 将生成的密码填入 EMAIL_PASS

### 4. 使用 PM2 启动服务（推荐）

```bash
# 安装 PM2
npm install -g pm2

# 启动服务
pm2 start server.js --name portfolio-server

# 设置开机自启
pm2 startup
pm2 save
```

### 5. 或者使用 systemd 启动

创建服务文件：
```bash
sudo nano /etc/systemd/system/portfolio-server.service
```

内容：
```ini
[Unit]
Description=Portfolio Server
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/portfolio-server
ExecStart=/usr/bin/node server.js
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

启动服务：
```bash
sudo systemctl daemon-reload
sudo systemctl enable portfolio-server
sudo systemctl start portfolio-server
sudo systemctl status portfolio-server
```

---

## 二、前端部署

### 1. 修改生产环境 API 地址

编辑 `/mnt/okcomputer/output/app/.env.production`：

```env
VITE_API_URL=http://你的服务器IP:3001
```

### 2. 构建前端

```bash
cd /mnt/okcomputer/output/app
npm run build
```

构建后的文件在 `dist/` 目录中。

### 3. 部署到 Nginx

```bash
# 复制构建文件到 Nginx 目录
sudo cp -r dist/* /var/www/html/

# 或者创建单独的站点目录
sudo mkdir -p /var/www/portfolio
sudo cp -r dist/* /var/www/portfolio/
```

### 4. Nginx 配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;  # 或你的服务器IP
    
    root /var/www/portfolio;
    index index.html;
    
    # 前端路由支持
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # API 代理（如果使用域名）
    location /api/ {
        proxy_pass http://localhost:3001/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 三、防火墙配置

```bash
# 开放 3001 端口（后端 API）
sudo ufw allow 3001/tcp

# 开放 80 端口（HTTP）
sudo ufw allow 80/tcp

# 如果使用 HTTPS
sudo ufw allow 443/tcp
```

---

## 四、验证部署

### 测试后端 API

```bash
# 健康检查
curl http://你的服务器IP:3001/api/health

# 应该返回:
# {"status":"ok","message":"服务器运行正常","timestamp":"..."}
```

### 测试前端

浏览器访问：
- 前端: `http://你的服务器IP`
- 后端: `http://你的服务器IP:3001/api/health`

---

## 五、查看留言消息

### 方式 1：直接在服务器查看文件

```bash
# 消息保存在服务器的 messages/ 目录
cd /opt/portfolio-server/messages
ls -la

# 查看最新消息
cat message_xxx.json
```

### 方式 2：通过 API 查看（需要密码）

```bash
curl "http://你的服务器IP:3001/api/messages?password=你的管理员密码"
```

---

## 六、常见问题

### 1. 跨域问题

确保后端 `server.js` 中的 CORS 配置正确：
```javascript
app.use(cors());
```

或者指定允许的域名：
```javascript
app.use(cors({
  origin: ['http://你的前端域名', 'http://localhost:5173']
}));
```

### 2. 邮件发送失败

- 检查 Gmail 应用密码是否正确
- 确保 Gmail 账号开启了两步验证
- 检查服务器是否能访问 Gmail SMTP (端口 587)

### 3. 端口被占用

```bash
# 查看 3001 端口占用
sudo lsof -i :3001

# 杀掉占用进程
sudo kill -9 <PID>
```

---

## 七、更新部署

### 更新前端

```bash
cd /mnt/okcomputer/output/app
npm run build
sudo cp -r dist/* /var/www/portfolio/
```

### 更新后端

```bash
cd /opt/portfolio-server
# 上传新代码
npm install  # 如果有新依赖
pm2 restart portfolio-server
```
