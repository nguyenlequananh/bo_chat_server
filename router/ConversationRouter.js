import express from 'express';
import ConversationController from '../controller/ConversationController.js';
import MessageController from '../controller/MessageController.js';
const router = express.Router();
router.get('/conversations/:userId', ConversationController.getConversationsByUserId);
router.get('/conversation/:conversationId/messages', MessageController.getMessagesByConversationId);
export default router;