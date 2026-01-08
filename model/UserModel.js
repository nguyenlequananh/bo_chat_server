import db from "../config/db.js";
const UserModel = {
   login: async (phone, password) => {
       const [rows] = await db.query(
           'SELECT * FROM users WHERE phone = ? AND password = ?',
           [phone, password]
       );
       return rows[0];
   },
   getAllUsers: async () => {
       const [rows] = await db.query('SELECT * FROM users');
       return rows;
   } ,
    getUserByPhone: async (currentUserId, phone) => {
        try {
            const query = `
                SELECT 
                    u.user_id,
                        u.phone,
                        u.full_name,
                        u.nickname,
                        u.avatar,
                        u.cover_image,
                        u.gender,
                        u.birthdate,
                        u.bio,
                        u.is_online,
                        u.last_active_at,
                        u.created_at, 
                    -- Logic: Nếu trạng thái là 'accepted' thì KHÔNG phải người lạ (0)
                    -- Ngược lại (NULL, pending...) thì LÀ người lạ (1)
                    CASE 
                        WHEN f.status = 'accepted' THEN 0 
                        ELSE 1 
                    END AS isStranger
                FROM users u
                -- Kết nối với bảng bạn bè để kiểm tra quan hệ với người đang tìm (currentUserId)
                LEFT JOIN friendships f ON (
                    (f.requester_id = ? AND f.receiver_id = u.user_id)
                    OR 
                    (f.receiver_id = ? AND f.requester_id = u.user_id)
                )
                WHERE u.phone = ?
            `;

            // Truyền 3 tham số: currentUserId (2 lần cho JOIN) và phone
            const [rows] = await db.query(query, [currentUserId, currentUserId, phone]);
            
            return rows[0]; // Trả về 1 user hoặc undefined
        } catch (error) {
            throw error;
        }
    }
};
export default UserModel;
