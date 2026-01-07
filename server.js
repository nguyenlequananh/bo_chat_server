import express from 'express';
const app = express();

import UserRouter from './router/UserRouter.js';
import TestModel from './model/FriendShipModel.js';
import ConversationRouter from './router/ConversationRouter.js';
import FriendShipRouter from './router/FriendShipRouter.js';



app.use(express.json());
app.use('/api/users', UserRouter);
app.use('/api/friendship', FriendShipRouter);
app.use('/api/conversations', ConversationRouter);


const test = await TestModel.getFriendsByUserId(1);
console.log(test);

app.listen(3000, () => {
    console.log('Server chạy tại http://localhost:3000');
});
// https://github.com/nguyenlequananh/bo_chat_server
// git add .
// git commit -m "Cap nhat toan bo du an tu root"
// git push origin main
