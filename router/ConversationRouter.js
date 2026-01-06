import express from 'express';
import ConversationController from '../controller/ConversationController.js';
const router = express.Router();
router.get('/conversations/:userId', ConversationController.getConversationsByUserId);
export default router;