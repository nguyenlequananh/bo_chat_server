import express from 'express';
const app = express();

import UserRouter from './router/UserRouter.js';

app.use(express.json());
app.use('/api/users', UserRouter);
x``
app.listen(3000, () => {
    console.log('Server chạy tại http://localhost:3000');
});
// https://github.com/nguyenlequananh/bo_chat_server
