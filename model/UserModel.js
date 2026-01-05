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
   }    
};
export default UserModel;
