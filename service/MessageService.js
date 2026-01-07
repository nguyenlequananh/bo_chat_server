import MessageModel from '../model/MessageModel.js';
import db from '../config/db.js';
import ConversationModel from '../model/ConversationModel.js';

const MessageService = {
    getMessagesByConversationId: async (conversationId) => {
        if (!conversationId) {
            throw new Error('Conversation ID is required');
        }
        const messages = await MessageModel.getMessagesByConversationId(conversationId);
        return messages;
    },
    createMessage: async (conversationId, senderId, content, type) => {
        if (!conversationId || !senderId || !content || !type) {
            throw new Error('All parameters are required to create a message');
        }
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();
            const messageId = await MessageModel.createMessage(connection, conversationId, senderId, content, type);
            if (!messageId) {
                throw new Error('Error creating message');
            }
            const result = await ConversationModel.updateLastMessage(connection, conversationId, messageId);
            if (result.affectedRows === 0) {
                throw new Error('No conversation found with the given ID');
            }
            await connection.commit();
            const createdMessage = await MessageModel.getMessageById(messageId);
            return createdMessage;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }
};

export default MessageService;

