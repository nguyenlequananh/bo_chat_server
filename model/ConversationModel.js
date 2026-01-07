import db from "../config/db.js";
const ConversationModel = {
   getAllConversations: async () => {
       const [rows] = await db.query('SELECT * FROM conversations');
       return rows;
   },
   getConversationByUserId: async (userId) => {
       const [rows] = await db.query(`SELECT
                                        c.conversation_id,
                                        ANY_VALUE(c.type) AS type,
                                        ANY_VALUE(c.name) AS group_name,
                                        ANY_VALUE(c.avatar) AS group_avatar,
                                        ANY_VALUE(last_msg.content) AS last_message_content,
                                        ANY_VALUE(last_msg.type) AS last_message_type,
                                        ANY_VALUE(last_msg.sender_id) AS last_message_sender_id,
                                        ANY_VALUE(c.updated_at) AS updated_at,
                                        ANY_VALUE(partner_info.full_name) AS partner_name,
                                        ANY_VALUE(partner_info.avatar) AS partner_avatar,
                                        (SELECT COUNT(*)
                                        FROM messages m_unread
                                        WHERE m_unread.conversation_id = c.conversation_id
                                        AND m_unread.sender_id != ? -- THAY BẰNG ID USER
                                        AND m_unread.status != 'read') AS unread_count
                                    FROM
                                        conversations c
                                    JOIN
                                        participants p ON c.conversation_id = p.conversation_id AND p.user_id = ? -- THAY BẰNG ID USER
                                    LEFT JOIN
                                        messages last_msg ON c.last_message_id = last_msg.message_id
                                    LEFT JOIN
                                        participants partner_p ON c.conversation_id = partner_p.conversation_id AND partner_p.user_id != ? -- THAY BẰNG ID USER
                                    LEFT JOIN
                                        users partner_info ON partner_p.user_id = partner_info.user_id
                                    GROUP BY
                                        c.conversation_id
                                    ORDER BY
                                        updated_at DESC;`, [userId, userId, userId]);
        return rows;
   },
   updateLastMessage: async (connection, conversationId, messageId) => {
        const [result] = await connection.query('UPDATE conversations SET last_message_id = ? WHERE conversation_id = ?', [messageId, conversationId]);
        return result;
   }
};
export default ConversationModel;