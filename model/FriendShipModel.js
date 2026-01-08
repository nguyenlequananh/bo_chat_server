import db from "../config/db.js";
const FriendShipModel = {
   getFriendsByUserId: async (userId) => {
       const [rows] = await db.query(`SELECT u.*
                                        FROM users u
                                        JOIN friendships f ON (
                                            -- Trường hợp 1: Mình (id=1) là người gửi -> Lấy thông tin người nhận (u.id)
                                            (f.requester_id = ? AND f.receiver_id = u.user_id)
                                            OR
                                            -- Trường hợp 2: Mình (id=1) là người nhận -> Lấy thông tin người gửi (u.id)
                                            (f.receiver_id = ? AND f.requester_id = u.user_id)
                                        )
                                        WHERE f.status = 'accepted'; -- Chỉ lấy những mối quan hệ đã đồng ý`, [userId, userId]);
       return rows;
   } ,
      getFriendshipByKeyword: async (userId, keyword) => {
       const likeKeyword = `%${keyword}%`;
       const [rows] = await db.query(`SELECT 
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
                                            -- LOGIC TÍNH TOÁN IS_STRANGER
                                            CASE 
                                                WHEN f.status = 'accepted' THEN 0  -- (false) Nếu đã kết bạn -> Không phải người lạ
                                                ELSE 1                             -- (true)  Còn lại (NULL hoặc pending) -> Là người lạ
                                            END AS isStranger
                                            
                                        FROM users u

                                        -- Sử dụng LEFT JOIN để giữ lại User ngay cả khi chưa kết bạn
                                        LEFT JOIN friendships f ON (
                                            (f.requester_id = ? AND f.receiver_id = u.user_id)
                                            OR 
                                            (f.receiver_id = ? AND f.requester_id = u.user_id)
                                        )

                                        WHERE 
                                            u.user_id != ? -- Loại bỏ chính bản thân mình ra khỏi kết quả
                                            AND (
                                                u.full_name LIKE CONCAT('%', ?, '%')  -- Tìm theo tên
                                                OR 
                                                u.phone LIKE CONCAT(?, '%')           -- Tìm theo SĐT (bắt đầu bằng...)
                                            );`, 
                                        [userId, userId, userId, likeKeyword, likeKeyword]);
       return rows;
   }
};
export default FriendShipModel;
