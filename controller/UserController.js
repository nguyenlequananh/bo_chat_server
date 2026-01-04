import UserService from '../services/UserService.js';

const UserController = {
    login: async (req, res) => {
        const { username, password } = req.body;
        try {
            const user = await UserService.login(username, password);   
            if (user) {
                res.status(200).json({ message: 'Login successful', user });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }   
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default UserController;