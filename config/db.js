import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Cấu hình kết nối
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 4000, // QUAN TRỌNG: TiDB dùng cổng 4000
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: {
        rejectUnauthorized: false // QUAN TRỌNG: Bắt buộc để kết nối TiDB Cloud
    }
});

// Hàm kiểm tra kết nối
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Kết nối thành công tới TiDB Cloud!');
        connection.release();
    } catch (error) {
        console.error('❌ Lỗi kết nối Database:', error.message);
    }
}

// Chạy test thử
testConnection();

// Export để dùng ở file khác
export default pool;