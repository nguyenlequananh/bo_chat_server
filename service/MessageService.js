import MessageModel from '../model/MessageModel.js';

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
        const messageId = await MessageModel.createMessage(conversationId, senderId, content, type);
        return messageId;
    }
};

export default MessageService;
        
