import FriendShipModel from '../model/FriendShipModel.js';

const FriendShipService = {
    getFriendsByUserId: async (userId) => {
        if (!userId) {
            throw new Error('User ID is required');
        }
        const friends = await FriendShipModel.getFriendsByUserId(userId);
        return friends;
    }
};

export default FriendShipService; 
       
