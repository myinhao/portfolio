#!/bin/bash

# GitHub 推送脚本
# 使用方法: ./push-to-github.sh <你的GitHub Token>

TOKEN=$1
REPO_NAME="portfolio"
USER="myinhao"

if [ -z "$TOKEN" ]; then
    echo "请提供 GitHub Personal Access Token"
    echo "获取方式: https://github.com/settings/tokens"
    echo "使用方法: ./push-to-github.sh ghp_xxxxxxxx"
    exit 1
fi

echo "正在创建 GitHub 仓库..."

# 创建仓库
curl -X POST \
  -H "Authorization: token $TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/user/repos \
  -d "{\"name\":\"$REPO_NAME\",\"private\":false}"

echo ""
echo "仓库创建完成: https://github.com/$USER/$REPO_NAME"
echo ""
echo "接下来请在本地执行以下命令:"
echo ""
echo "cd $(pwd)"
echo "git init"
echo "git add ."
echo "git commit -m 'Initial commit'"
echo "git remote add origin https://$TOKEN@github.com/$USER/$REPO_NAME.git"
echo "git branch -M main"
echo "git push -u origin main"
