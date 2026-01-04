import UserModel from '../model/UserModel.js';

const UserService = {
    login: async (username, password) => {
        if (!username || !password) {
            throw new Error('Username and password are required');
        }
        const user = await UserModel.login(username, password);
        return user;
    }   
};

export default UserService;