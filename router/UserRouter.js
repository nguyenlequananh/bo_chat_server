import express from 'express';
import UserController from '../controller/UserController.js';
import ConversationController from '../controller/ConversationController.js';
const router = express.Router();
router.post('/login', UserController.login);
router.get('/:userId/conversations', ConversationController.getConversationsByUserId);
export default router;