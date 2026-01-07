import db from "../config/db.js";
const MessageModel = {
    getMessagesByConversationId: async (conversationId) => {    
        const [rows] = await db.query(
           `SELECT 
                m.message_id,
                m.conversation_id,
                m.sender_id,
                m.content,
                m.type,        -- text, image, video...
                m.created_at,
                u.full_name,   -- Để hiển thị tên người gửi (nếu cần)
                u.avatar       -- Để hiển thị avatar tròn bên trái
            FROM messages m
            JOIN users u ON m.sender_id = u.user_id
            WHERE m.conversation_id = ? -- Thay số 1 bằng biến ID bạn muốn lấy
            ORDER BY m.created_at ASC;  -- Sắp xếp tin nhắn cũ nhất lên đầu, mới nhất xuống dưới`,
            [conversationId]
        );
        return rows;
    } 
};
export default MessageModel;
