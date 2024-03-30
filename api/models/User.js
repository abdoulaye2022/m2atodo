const mysql = require('mysql2/promise');
const dbConfig = require('../config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class User {
    constructor(id, firstname, lastname, email, password) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
    }

    static async getAll() {
        const connection = await mysql.createConnection(dbConfig);
        const [rows, _] = await connection.execute('SELECT * FROM users');
        connection.end();
        
        return rows.map(row => new User(row.id, row.firstname, row.lastname, row.email, row.password));
    }

    static async getUserByEmail(email) {
        const connection = await mysql.createConnection(dbConfig);
        const [rows, _] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
        connection.end();
        
        return new User(rows[0].id, rows[0].firstname, rows[0].lastname, rows[0].email, rows[0].password);
    }

    static async create(firstname, lastname, email, password) {
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute('INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)', [firstname, lastname, email, password]);
        connection.end();
        
        return new User(null, firstname, lastname, email, password);
    }

    static async update(firstname, lastname, email, password, id) {
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute('UPDATE users SET firstname = ?, lastname = ?,email = ?, password = ? WHERE id = ?', [firstname, lastname, email, password, id]);
        connection.end();
        
        return new User(null, firstname, lastname, email, password);
    }

    static async getOne(userId) {
        const connection = await mysql.createConnection(dbConfig);
        const [rows, _] = await connection.execute('SELECT * FROM users WHERE id = ?', [userId]);
        connection.end();

        if (rows.length === 0) {
            return null;
        }

        const userRow = rows[0];
        return new User(userRow.id, userRow.name, userRow.email);
    }

    static async delete(userId) {
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute('DELETE FROM users WHERE id = ?', [userId]);
        connection.end();
    }

    static async hashPassword(password) {
        return await bcrypt.hash(password, 10);
    }
    
    static async comparePasswords(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
    
    static generateToken(user) {
        return jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' }); // Expire dans 1 heure
    }
}

module.exports = User;
