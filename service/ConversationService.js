import ConversationModel from '../model/ConversationModel.js';

const ConversationService = {
    login: async (userId) => {
        if (!userId) {
            throw new Error('User ID is required');
        }
        const conversations = await ConversationModel.getConversationByUserId(userId);
        return conversations;
    }   
};

export default ConversationService;