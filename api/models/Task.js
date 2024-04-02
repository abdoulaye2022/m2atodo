const mysql = require('mysql2/promise');
const dbConfig = require('../config');

class Task {
    constructor(id, title, status, priority_id, priority_name) {
        this.id = id;
        this.title = title;
        this.status = status;
        this.priority_id = priority_id;
        this.priority_name = priority_name
    }

    static async getAll() {
        const connection = await mysql.createConnection(dbConfig);
        const [rows, _] = await connection.execute('SELECT t.*, p.name as priority_name FROM tasks t INNER JOIN priorities p ON p.id = t.priority_id');
        connection.end();

        return rows.map(row => new Task(row.id, row.title, row.status, row.priority_id, row.priority_name));
    }

    static async create(title, status, priority_id) {
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute('INSERT INTO `tasks`(`title`, `status`, `priority_id`) VALUES (?, ?, ?)', [title, status, priority_id]);
        connection.end();
        
        return new Task(null, title, status, priority_id);
    }

    static async update(title, status, priority_id, id) {
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute('UPDATE `tasks` SET `title`=?, `status`=?, `priority_id`=? WHERE `id`=?', [title, status, priority_id, id]);
        connection.end();
        
        return new Task(id, title, status, priority_id);
    }

    static async delete(taskId) {
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute('DELETE FROM tasks WHERE id = ?', [taskId]);
        connection.end();
    }

    static async done(status, id) {
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute('UPDATE `tasks` SET `status`=? WHERE `id`=?', [status, id]);
        connection.end();
    }

}

module.exports = Task;