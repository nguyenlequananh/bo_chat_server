import FriendShipService from '../service/FriendShipService.js';

const FriendShipController = {
    getFriendsByUserId: async (req, res) => {
        const { userId } = req.params;
        try {
            const friends = await FriendShipService.getFriendsByUserId(userId);
            if (friends) {
                // TRẢ VỀ CHUẨN WRAPPED RESPONSE
                res.status(200).json({
                    success: true,
                    message: "Lấy danh sách bạn bè thành công",
                    data: friends  // Dữ liệu chính nằm ở đây
                });
            } else {
                res.status(401).json({
                    success: false,
                    message: "Không tìm thấy bạn bè",
                    data: null
                });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getFriendshipByKeyword: async (req, res) => {
        const { userId, keyword } = req.params;
        try {
            const friends = await FriendShipService.getFriendshipByKeyword(userId, keyword);
            if (friends && friends.length > 0) {
                // TRẢ VỀ CHUẨN WRAPPED RESPONSE
                res.status(200).json({
                    success: true,
                    message: "Tìm kiếm bạn bè thành công",
                    data: friends  // Dữ liệu chính nằm ở đây
                });
            } else {
                res.status(401).json({
                    success: false,
                    message: "Không tìm thấy bạn bè",
                    data: null
                });
            }

        } catch (error) {
            res.status(500).json({ message: error.message });
        }   
    }
};

export default FriendShipController;
              