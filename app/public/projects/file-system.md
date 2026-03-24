# Linux 文件管理系统

## 项目概述

CS 架构文件管理系统，支持用户管理、文件上传下载、断点续传、快速上传等功能。

## 技术栈

- **开发语言**: C/C++
- **操作系统**: Linux
- **网络模型**: Proactor + 线程池
- **数据库**: MySQL
- **缓存**: Redis

## 系统架构

```
┌─────────────┐         ┌─────────────┐
│   Client    │ ←────→  │   Server    │
│  (多平台)   │  TCP/IP │  (Linux)    │
└─────────────┘         └──────┬──────┘
                               │
                    ┌─────────┼─────────┐
                    ↓         ↓         ↓
                ┌──────┐  ┌──────┐  ┌──────┐
                │ MySQL│  │ Redis│  │ File │
                └──────┘  └──────┘  └──────┘
```

## 核心功能

### 1. 用户管理
- 注册/登录验证
- 权限控制
- 会话管理

### 2. 文件操作
```cpp
// 文件上传接口
class FileUploader {
public:
    bool upload(const string& local_path, 
                const string& remote_path);
    bool download(const string& remote_path,
                  const string& local_path);
    bool deleteFile(const string& path);
    vector<FileInfo> listFiles(const string& path);
};
```

### 3. 高级特性
- **断点续传** - 网络中断后自动恢复
- **秒传功能** - 相同文件快速上传
- **分片上传** - 大文件分片并行传输

## 性能数据

- 查找效率提升: 20%
- 传输效率提升: 40%
- 并发支持: 100+ 客户端

## 源码链接

[GitHub Repository](https://github.com/myinhao)
