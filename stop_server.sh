#!/bin/bash

echo "=== 停止个人简历网站 ==="

# 停止前端服务
FRONTEND_PID=$(ps aux | grep -E 'python3.*http.server' | grep -v grep | awk '{print $2}')
if [ ! -z "$FRONTEND_PID" ]; then
    echo "停止前端服务 (PID: $FRONTEND_PID)"
    kill $FRONTEND_PID
    echo "前端服务已停止"
else
    echo "前端服务未运行"
fi

# 停止后端服务
BACKEND_PID=$(ps aux | grep -E 'node.*portfolio-server/server.js' | grep -v grep | awk '{print $2}')
if [ ! -z "$BACKEND_PID" ]; then
    echo "停止后端服务 (PID: $BACKEND_PID)"
    kill $BACKEND_PID
    echo "后端服务已停止"
else
    echo "后端服务未运行"
fi

echo ""
echo "停止完成！"
