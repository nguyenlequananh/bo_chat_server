import ConversationService from '../service/ConversationService.js';

const ConversationController = {
    getConversationsByUserId: async (req, res) => {
        const { userId } = req.params;
        try {
            const conversations = await ConversationService.getConversationsByUserId(userId);
            if (conversations) {
                // TRẢ VỀ CHUẨN WRAPPED RESPONSE
                res.status(200).json({
                    success: true,
                    message: "Lấy danh sách cuộc trò chuyện thành công",
                    data: conversations  // Dữ liệu chính nằm ở đây
                });
            } else {
                res.status(401).json({
                    success: false,
                    message: "Không tìm thấy cuộc trò chuyện",
                    data: null
                });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default ConversationController;
