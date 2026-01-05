import UserService from '../service/UserService.js';

const UserController = {
    login: async (req, res) => {
        const { phone, password } = req.body;
        try {
            const user = await UserService.login(phone, password);
            if (user) {
                const { password, ...userInfo } = user;

                // TRẢ VỀ CHUẨN WRAPPED RESPONSE
                res.status(200).json({
                    success: true,
                    message: "Đăng nhập thành công",
                    data: userInfo  // Dữ liệu chính nằm ở đây
                });
            } else {
                res.status(401).json({
                    success: false,
                    message: "Sai tài khoản hoặc mật khẩu",
                    data: null
                });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default UserController;
