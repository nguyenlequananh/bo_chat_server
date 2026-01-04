import db from "../config/db.js";
const UserModel = {
   login: async (username, password) => {
       const [rows] = await db.query(
           'SELECT * FROM users WHERE username = ? AND password = ?',
           [username, password]
       );
       return rows[0];
   }
};