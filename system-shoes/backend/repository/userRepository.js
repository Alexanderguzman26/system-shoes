const mysql = require('mysql2');

// Configura tu conexión a MySQL
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'electiva',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const promisePool = pool.promise();

class UserRepository {
    async findByDocumentNumber(documentNumber) {
        console.log(documentNumber)
        const[rows]= await promisePool.query('SELECT * FROM users WHERE documentNumber = ?', [documentNumber]);
        return rows.length > 0 ? rows[0] : null;

    }
    async findByUsername(username) {
            
        return rows.length > 0 ? rows[0] : null;
    }
    
    async registerUser(user) {
        const { fullName, documentType, documentNumber, email, phone, username, password } = user;
        try {
            const [result] = await promisePool.query(
                `INSERT INTO users (fullName, documentType, documentNumber, email, phone, username, password) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [fullName, documentType, documentNumber, email, phone, username, password]
            );
            return { id: result.insertId, ...user };
        } catch (err) {
            console.log("error registering")
            throw new Error(err.message);
        }
    }
}

module.exports = new UserRepository();
