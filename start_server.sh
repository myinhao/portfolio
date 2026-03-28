#!/bin/bash

echo "=== 启动个人简历网站 ==="

# 创建日志目录
mkdir -p /home/简历/logs

# 启动前端服务函数
start_frontend() {
    echo "启动前端服务..."
    cd /home/简历/app/dist && python3 -m http.server 80 > /home/简历/logs/frontend.log 2>&1 &
    FRONTEND_PID=$!
    echo $FRONTEND_PID > /home/简历/frontend.pid
    echo "前端服务启动成功 (PID: $FRONTEND_PID)"
}

# 检查前端服务状态
FRONTEND_PID=$(ps aux | grep -E 'python3.*http.server' | grep -v grep | awk '{print $2}')
if [ ! -z "$FRONTEND_PID" ]; then
    echo "前端服务已在运行 (PID: $FRONTEND_PID)"
else
    start_frontend
fi

# 启动后端服务函数
start_backend() {
    echo "启动后端服务..."
    cd /root/portfolio-server && /opt/mcsmanager/node-v20.12.2-linux-x64/bin/node server.js > /home/简历/logs/backend.log 2>&1 &
    BACKEND_PID=$!
    echo $BACKEND_PID > /home/简历/backend.pid
    echo "后端服务启动成功 (PID: $BACKEND_PID)"
}

# 检查后端服务状态
BACKEND_PID=$(ps aux | grep -E 'node.*portfolio-server/server.js' | grep -v grep | awk '{print $2}')
if [ ! -z "$BACKEND_PID" ]; then
    echo "后端服务已在运行 (PID: $BACKEND_PID)"
else
    start_backend
fi

# 添加自动重启监控
cat > /home/简历/monitor_service.sh << 'EOF'
#!/bin/bash

while true; do
    # 检查前端服务
    FRONTEND_RUNNING=$(ps aux | grep -E 'python3.*http.server' | grep -v grep | wc -l)
    if [ $FRONTEND_RUNNING -eq 0 ]; then
        echo "$(date): 前端服务已停止，重启中..." >> /home/简历/logs/monitor.log
        cd /home/简历/app/dist && python3 -m http.server 80 > /home/简历/logs/frontend.log 2>&1 &
        echo $! > /home/简历/frontend.pid
        echo "$(date): 前端服务重启成功 (PID: $!)" >> /home/简历/logs/monitor.log
    fi
    
    # 检查后端服务
    BACKEND_RUNNING=$(ps aux | grep -E 'node.*portfolio-server/server.js' | grep -v grep | wc -l)
    if [ $BACKEND_RUNNING -eq 0 ]; then
        echo "$(date): 后端服务已停止，重启中..." >> /home/简历/logs/monitor.log
        cd /root/portfolio-server && /opt/mcsmanager/node-v20.12.2-linux-x64/bin/node server.js > /home/简历/logs/backend.log 2>&1 &
        echo $! > /home/简历/backend.pid
        echo "$(date): 后端服务重启成功 (PID: $!)" >> /home/简历/logs/monitor.log
    fi
    
    sleep 30

done
EOF

chmod +x /home/简历/monitor_service.sh

# 检查监控进程是否运行
MONITOR_PID=$(ps aux | grep 'monitor_service.sh' | grep -v grep | awk '{print $2}')
if [ -z "$MONITOR_PID" ]; then
    echo "启动服务监控进程..."
    /home/简历/monitor_service.sh > /dev/null 2>&1 &
    echo $! > /home/简历/monitor.pid
    echo "监控进程启动成功"
else
    echo "监控进程已在运行 (PID: $MONITOR_PID)"
fi

echo ""
echo "=== 服务状态 ==="
echo "前端服务: http://服务器IP:80"
echo "后端API: http://服务器IP:3001"
echo "监控进程: 已启动"
echo "日志目录: /home/简历/logs"
echo ""
echo "启动完成！"
