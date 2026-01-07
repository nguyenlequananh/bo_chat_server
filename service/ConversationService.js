import ConversationModel from '../model/ConversationModel.js';
import db from '../config/db.js';
const ConversationService = {
    getConversationsByUserId: async (userId) => {
        if (!userId) {
            throw new Error('User ID is required');
        }
        const conversations = await ConversationModel.getConversationByUserId(userId);
        return conversations;
    }
};

export default ConversationService;