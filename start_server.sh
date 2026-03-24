#!/bin/bash

echo "=== 启动个人简历网站 ==="

# 检查前端服务是否已运行
FRONTEND_PID=$(ps aux | grep -E 'python3.*http.server' | grep -v grep | awk '{print $2}')
if [ ! -z "$FRONTEND_PID" ]; then
    echo "前端服务已在运行 (PID: $FRONTEND_PID)"
else
    echo "启动前端服务..."
    cd /home/简历/app/dist && python3 -m http.server 80 &
    FRONTEND_PID=$!
    echo "前端服务启动成功 (PID: $FRONTEND_PID)"
fi

# 检查后端服务是否已运行
BACKEND_PID=$(ps aux | grep -E 'node.*portfolio-server/server.js' | grep -v grep | awk '{print $2}')
if [ ! -z "$BACKEND_PID" ]; then
    echo "后端服务已在运行 (PID: $BACKEND_PID)"
else
    echo "启动后端服务..."
    cd /root/portfolio-server && /opt/mcsmanager/node-v20.12.2-linux-x64/bin/node server.js &
    BACKEND_PID=$!
    echo "后端服务启动成功 (PID: $BACKEND_PID)"
fi

echo ""
echo "=== 服务状态 ==="
echo "前端服务: http://服务器IP:80"
echo "后端API: http://服务器IP:3001"
echo ""
echo "启动完成！"
