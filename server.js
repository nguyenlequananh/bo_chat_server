import express from 'express';
const app = express();

import UserRouter from './router/UserRouter.js';
import TestModel from './model/MessageModel.js';
import ConversationRouter from './router/ConversationRouter.js';
import FriendShipRouter from './router/FriendShipRouter.js';
import MessageRouter from './router/MessageRouter.js';



app.use(express.json());
app.use('/api/users', UserRouter);
app.use('/api/friendship', FriendShipRouter);
app.use('/api/conversations', ConversationRouter);
app.use('/api/messages', MessageRouter);


const test = await TestModel.createMessage(1, 2, 'Hello, this is a test message', 'text');
console.log(test);

app.listen(3000, () => {
    console.log('Server chạy tại http://localhost:3000');
});
// https://github.com/nguyenlequananh/bo_chat_server
// git add .
// git commit -m "Cap nhat them chuc nang tao tin nhan moi"
// git push origin main
