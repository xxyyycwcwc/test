const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // 添加 CORS 中间件
const fs = require('fs');
const app = express();
const PORT = 3000;

// 使用 CORS 中间件
app.use(cors());

// 使用 body-parser 中间件解析 JSON 格式的请求体
app.use(bodyParser.json());

// 定义 POST 路由来接收表单数据
app.post('/submit-survey', (req, res) => {
    const data = req.body;

    // 构建日志条目
    const timestamp = new Date().toISOString();
    let logEntry = `${timestamp} - Survey Data:\n`;

    // 记录每个问题及其答案
    const questions = [
        { question: 'Q1: 你喜欢打胶吗？', options: ['喜欢', '不喜欢', '超级喜欢'] },
        { question: 'Q2: 你每天要打多少胶？', options: ['3-5次', '10次起步', '500ml+'] },
        { question: 'Q3: 你喜欢在什么时间段打胶？（可多选）', options: ['起床前', '午睡时', '洗澡时', '睡觉前', '上课时'] }
    ];

    questions.forEach((q, index) => {
        const answer = data[`q${index + 1}`];
        logEntry += `  ${q.question}: ${answer}\n`;
    });

    // 将数据写入文件
    fs.appendFile('survey-data.log', logEntry, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error saving data');
        }
        res.status(200).send('Data saved successfully');
    });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});