const mysql = require('mysql2/promise');
const dbConfig = require('../config');

class Priority {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    static async getAll() {
        const connection = await mysql.createConnection(dbConfig);
        const [rows, _] = await connection.execute('SELECT * FROM priorities');
        connection.end();
        
        return rows.map(row => new Priority(row.id, row.name));
    }

}

module.exports = Priority;