const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 提供静态文件服务
app.use(express.static(path.join(__dirname, '../app/dist')));

// 确保消息存储目录存在
const messagesDir = path.join(__dirname, 'messages');
if (!fs.existsSync(messagesDir)) {
  fs.mkdirSync(messagesDir, { recursive: true });
}

// 创建邮件发送器
const createTransporter = () => {
  // 使用Gmail SMTP
  return nodemailer.createTransporter({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER || 'superheroymh@Gmail.com',
      pass: process.env.EMAIL_PASS || '', // 需要在环境变量中设置Gmail应用密码
    },
  });
};

// 保存消息到文件
const saveMessageToFile = (messageData) => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `message_${timestamp}.json`;
  const filepath = path.join(messagesDir, filename);
  
  fs.writeFileSync(filepath, JSON.stringify(messageData, null, 2), 'utf8');
  return filename;
};

// 发送邮件通知
const sendEmailNotification = async (messageData) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER || 'superheroymh@Gmail.com',
      to: 'superheroymh@Gmail.com',
      subject: `【网站留言】来自 ${messageData.name} 的新消息`,
      html: `
        <h2>收到新的网站留言</h2>
        <hr>
        <p><strong>姓名：</strong>${messageData.name}</p>
        <p><strong>邮箱：</strong>${messageData.email}</p>
        <p><strong>时间：</strong>${new Date(messageData.timestamp).toLocaleString('zh-CN')}</p>
        <hr>
        <p><strong>留言内容：</strong></p>
        <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${messageData.message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">此邮件由个人网站自动发送</p>
      `,
      text: `
收到新的网站留言

姓名：${messageData.name}
邮箱：${messageData.email}
时间：${new Date(messageData.timestamp).toLocaleString('zh-CN')}

留言内容：
${messageData.message}

---
此邮件由个人网站自动发送
      `,
    };
    
    await transporter.sendMail(mailOptions);
    console.log('邮件通知发送成功');
    return true;
  } catch (error) {
    console.error('邮件发送失败:', error.message);
    return false;
  }
};

// 健康检查接口
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: '服务器运行正常',
    timestamp: new Date().toISOString(),
  });
});

// 接收表单消息的接口
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // 验证必填字段
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: '请填写所有必填字段',
      });
    }
    
    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: '请输入有效的邮箱地址',
      });
    }
    
    // 创建消息数据
    const messageData = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      timestamp: new Date().toISOString(),
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.headers['user-agent'],
    };
    
    // 保存到文件
    const filename = saveMessageToFile(messageData);
    console.log(`消息已保存: ${filename}`);
    
    // 尝试发送邮件通知（如果配置了邮箱）
    let emailSent = false;
    if (process.env.EMAIL_PASS) {
      emailSent = await sendEmailNotification(messageData);
    }
    
    res.json({
      success: true,
      message: '消息发送成功',
      data: {
        id: messageData.id,
        emailSent,
      },
    });
    
  } catch (error) {
    console.error('处理消息时出错:', error);
    res.status(500).json({
      success: false,
      message: '服务器内部错误，请稍后重试',
    });
  }
});

// 获取所有消息（需要密码验证）
app.get('/api/messages', (req, res) => {
  const { password } = req.query;
  
  // 简单的密码验证
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({
      success: false,
      message: '未授权访问',
    });
  }
  
  try {
    const files = fs.readdirSync(messagesDir);
    const messages = files
      .filter(file => file.endsWith('.json'))
      .map(file => {
        const content = fs.readFileSync(path.join(messagesDir, file), 'utf8');
        return JSON.parse(content);
      })
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    res.json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '读取消息失败',
    });
  }
});

// SPA 路由支持 - 所有其他路由返回 index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../app/dist/index.html'));
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
  console.log(`API地址: http://localhost:${PORT}/api`);
  console.log(`消息存储目录: ${messagesDir}`);
});
