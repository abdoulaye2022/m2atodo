const mysql = require('mysql2/promise');
const dbConfig = require('../config');

class Task {
    constructor(id, title, status, priority_id) {
        this.id = id;
        this.title = title;
        this.status = status;
        this.priority_id = priority_id;
    }

    static async getAll() {
        const connection = await mysql.createConnection(dbConfig);
        const [rows, _] = await connection.execute('SELECT * FROM tasks');
        connection.end();

        return rows.map(row => new Task(row.id, row.title, row.status, row.priority_id));
    }

    static async create(title, status, priority_id) {
        console.log(title + " - " + status + " - " + priority_id)
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute('INSERT INTO `tasks`(`title`, `status`, `priority_id`) VALUES (?, ?, ?)', [title, status, priority_id]);
        connection.end();
        
        return new Task(null, title, status, priority_id);
    }

}

module.exports = Task;