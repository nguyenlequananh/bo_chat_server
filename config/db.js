import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Tạo connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'bochat',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test kết nối DB (chạy khi node db.js)
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ MySQL connected successfully');
        connection.release();
    } catch (error) {
        console.error('❌ MySQL connection failed:', error.message);
    }
}

testConnection();

// Export để dùng cho server.js
export default pool;
