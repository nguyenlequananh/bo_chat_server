import FriendShipModel from '../model/FriendShipModel.js';
import UserModel from '../model/UserModel.js';

const FriendShipService = {
    getFriendsByUserId: async (userId) => {
        if (!userId) {
            throw new Error('User ID is required');
        }
        const friends = await FriendShipModel.getFriendsByUserId(userId);
        return friends;
    },
    getFriendshipByKeyword: async (userId, keyword) => {
        if (!userId ) {
            throw new Error('User ID is required');
        }   
        if (!keyword) {
            throw new Error('Keyword is required');
        }
        if(keyword.match(/^0[0-9]{9,10}$/)){
            const friends = await UserModel.getUserByPhone(keyword);
            return friends ? [friends] : [];
        } else {
            const friends = await FriendShipModel.getFriendshipByKeyword(userId, keyword);
            return friends ? friends : [];
        }
    }
};

export default FriendShipService; 
       
