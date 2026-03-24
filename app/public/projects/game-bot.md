# 游戏自动化工具

## 项目概述

使用 Python + OpenCV 开发的自动化工具，通过图像识别和模拟操作完成游戏每日任务。

## 技术栈

- **开发语言**: Python 3.9
- **图像识别**: OpenCV
- **UI 自动化**: PyAutoGUI
- **界面框架**: PyQt5

## 核心原理

### 1. 图像匹配
```python
import cv2
import pyautogui

def find_and_click(template_path):
    # 截图
    screenshot = pyautogui.screenshot()
    screenshot = cv2.cvtColor(np.array(screenshot), cv2.COLOR_RGB2BGR)
    
    # 读取模板
    template = cv2.imread(template_path, 0)
    
    # 模板匹配
    result = cv2.matchTemplate(screenshot, template, cv2.TM_CCOEFF_NORMED)
    min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(result)
    
    # 点击匹配位置
    if max_val > 0.8:
        pyautogui.click(max_loc[0], max_loc[1])
        return True
    return False
```

### 2. 优化技巧

| 技巧 | 效果 |
|------|------|
| 灰度图匹配 | 速度提升 2 倍 |
| 图像金字塔 | 适配不同分辨率 |
| ROI 区域 | 减少 80% 计算量 |

## 功能模块

1. **每日任务** - 自动完成日常任务
2. **副本任务** - 自动刷副本
3. **资源收集** - 定时收集游戏资源

## 项目收获

- 一周完成首个 Python 项目
- 深入理解 OpenCV 图像处理
- 每周节省 3 小时游戏时间

## 注意事项

> 本工具仅供学习交流，请勿用于商业用途或违反游戏条款。
