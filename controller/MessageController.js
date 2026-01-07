import MessageService from '../service/MessageService.js';

const MessageController = {
    getMessagesByConversationId: async (req, res) => {
        const { conversationId } = req.params;
        try {
            const messages = await MessageService.getMessagesByConversationId(conversationId);
            if (messages) {
                // TRẢ VỀ CHUẨN WRAPPED RESPONSE
                res.status(200).json({
                    success: true,
                    message: "Lấy danh sách tin nhắn thành công",
                    data: messages  // Dữ liệu chính nằm ở đây
                });
            } else {
                res.status(401).json({
                    success: false,
                    message: "Không tìm thấy tin nhắn",
                    data: null
                });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    createMessage: async (req, res) => {
        const { conversationId, senderId, content, type } = req.body;   
        try {
            const message = await MessageService.createMessage(conversationId, senderId, content, type);
            // TRẢ VỀ CHUẨN WRAPPED RESPONSE
            if (message) {
                res.status(201).json({
                    success: true,
                    message: "Tạo tin nhắn thành công",
                    data:  message   // Trả về message mới tạo
                }); 
            } else {
                res.status(400).json({
                    success: false,
                    message: "Tạo tin nhắn thất bại",
                    data: null
                });

            }
        } catch (error) {
            res.status(500).json({ 
                success: false,
                message: error.message 
            });
        }           
    }
};  

export default MessageController;