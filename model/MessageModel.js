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
    } ,
    createMessage: async (connection, conversationId, senderId, content, type) => {
        const [result] = await connection.query(
            `INSERT INTO messages (conversation_id, sender_id, content, type, created_at)
             VALUES (?, ?, ?, ?, NOW())`,   
            [conversationId, senderId, content, type]
        );
        return result.insertId; // Trả về ID của tin nhắn mới tạo
    },
    getMessageById: async (messageId) => {
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
            WHERE m.message_id = ?;`,
            [messageId] 
        );
        return rows[0]; // Trả về tin nhắn có ID tương ứng
    }
};
export default MessageModel;
