#!/bin/sh

# 确保日志目录存在
mkdir -p /home/简历/logs

echo "$(date): 监控服务启动" >> /home/简历/logs/monitor.log

while true; do
    # 检查前端服务
    FRONTEND_PID=$(ps -ef | grep "python3 -m http.server 80" | grep -v grep | awk "{print $2}")
    if [ -z "$FRONTEND_PID" ]; then
        echo "$(date): 前端服务已停止，重启中..." >> /home/简历/logs/monitor.log
        (cd /home/简历/app/dist && python3 -m http.server 80 > /home/简历/logs/frontend.log 2>&1 &)
        echo $! > /home/简历/frontend.pid
        echo "$(date): 前端服务重启成功" >> /home/简历/logs/monitor.log
    fi
    
    # 检查后端服务
    BACKEND_PID=$(ps -ef | grep "node.*portfolio-server/server.js" | grep -v grep | awk "{print $2}")
    if [ -z "$BACKEND_PID" ]; then
        echo "$(date): 后端服务已停止，重启中..." >> /home/简历/logs/monitor.log
        (cd /root/portfolio-server && /opt/mcsmanager/node-v20.12.2-linux-x64/bin/node server.js > /home/简历/logs/backend.log 2>&1 &)
        echo $! > /home/简历/backend.pid
        echo "$(date): 后端服务重启成功" >> /home/简历/logs/monitor.log
    fi
    
    sleep 30

done
