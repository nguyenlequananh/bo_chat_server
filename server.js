import express from 'express';
const app = express();

import UserRouter from './router/UserRouter.js';
import UserModel from './model/UserModel.js';


app.use(express.json());
app.use('/api/users', UserRouter);

const users = await UserModel.getAllUsers();
console.log('Danh sách người dùng:', users);
app.listen(3000, () => {
    console.log('Server chạy tại http://localhost:3000');
});
// https://github.com/nguyenlequananh/bo_chat_server
// git add .
// git commit -m "Cap nhat toan bo du an tu root"
// git push origin main
