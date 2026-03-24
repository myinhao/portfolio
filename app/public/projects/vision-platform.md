# 视觉流程平台

## 项目概述

工业生产流水线视觉流程平台，实现自动对焦、找点、找线、找圆等视觉功能。

## 技术栈

- **UI 框架**: Qt 5.15
- **图像处理**: OpenCV 4.x
- **商业库**: VisionPro
- **通信**: Socket TCP/IP

## 核心功能

### 1. 自动对焦
- 清晰度评估算法
- 快速对焦搜索
- 对焦结果保存

### 2. 几何测量
```cpp
// 找圆示例
Circle findCircle(Mat image, Point center, int radius) {
    vector<Vec3f> circles;
    HoughCircles(image, circles, HOUGH_GRADIENT, 
                 1, 20, 100, 30, radius-10, radius+10);
    
    if (!circles.empty()) {
        return Circle(circles[0]);
    }
    return Circle();
}
```

### 3. 通信接口
- 相机控制（网口/串口）
- PLC 通信
- 其他工控软件对接

## 性能优化

| 优化项 | 优化前 | 优化后 | 提升 |
|--------|--------|--------|------|
| 处理速度 | 100ms | 60ms | 40% |
| 准确率 | 85% | 95% | 10% |

## 项目成果

- 成功部署到 3 条生产线
- 视觉工程师开发效率提升 3 倍
