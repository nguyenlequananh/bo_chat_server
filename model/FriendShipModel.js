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
   }    
};
export default FriendShipModel;
