import UserModel from '../model/UserModel.js';

const UserService = {
    login: async (phone, password) => {
        if (!phone || !password) {
            throw new Error('Phone and password are required');
        }
        const user = await UserModel.login(phone, password);
        return user;
    }   
};

export default UserService;
