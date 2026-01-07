import MessageModel from '../model/MessageModel.js';

const MessageService = {
    getMessagesByConversationId: async (conversationId) => {
        if (!conversationId) {
            throw new Error('Conversation ID is required');
        }
        const messages = await MessageModel.getMessagesByConversationId(conversationId);
        return messages;
    }
};

export default MessageService;
        
