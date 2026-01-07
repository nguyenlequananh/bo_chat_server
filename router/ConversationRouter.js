import express from 'express';
import ConversationController from '../controller/ConversationController.js';
import MessageController from '../controller/MessageController.js';
const router = express.Router();
router.get('/:conversationId/messages', MessageController.getMessagesByConversationId ); // Lấy tin nhắn theo conversation ID

export default router;