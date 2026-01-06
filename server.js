import express from 'express';
const app = express();

import UserRouter from './router/UserRouter.js';
import TestModel from './model/ConversationModel.js';
import ConversationRouter from './router/ConversationRouter.js';



app.use(express.json());
app.use('/api/users', UserRouter);
app.use('/api/conversations', ConversationRouter);


const conversations = await TestModel.getConversationByUserId(1);
console.log(conversations);

app.listen(3000, () => {
    console.log('Server chạy tại http://localhost:3000');
});
// https://github.com/nguyenlequananh/bo_chat_server
// git add .
// git commit -m "Cap nhat toan bo du an tu root"
// git push origin main
