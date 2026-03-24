# 日志统筹管理系统

## 项目概述

基于 Vue3 + Gin 的 Web 端日志管理系统，配合 Dify 实现 AI Agent 自动定位环境问题。

## 技术栈

- **前端**: Vue3 + TypeScript + Element Plus
- **后端**: Go + Gin 框架
- **AI**: Dify + 自定义 Agent
- **数据库**: PostgreSQL

## 核心功能

### 1. 日志收集与分析
- 实时收集多源日志数据
- 智能分类与标签化
- 全文检索支持

### 2. AI 智能诊断
```python
# Agent 工作流程示例
def analyze_log(log_content):
    # 1. 解析日志结构
    parsed = parse_log(log_content)
    
    # 2. 匹配知识库
    matches = search_knowledge_base(parsed)
    
    # 3. 生成解决方案
    solution = generate_solution(matches)
    
    return solution
```

### 3. 可视化报表
- 错误趋势图表
- 系统健康度评分
- 告警通知

## 项目成果

- 日志分析效率提升 60%
- 问题定位时间从平均 30 分钟缩短到 5 分钟
- 获得团队创新奖

## 截图展示

> 此处可添加项目截图

## 源码链接

[GitHub Repository](https://github.com/myinhao)
