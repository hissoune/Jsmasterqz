const db = require('../config/db'); 

class Student {
    static async insert(studentData) {
        const { firstname,lastname,created_at,email,password } = studentData;
        try {
            const result = await db.promise().query(
                'INSERT INTO students (firstname,lastname,created_at,email,password) VALUES (?, ?, ?,?,?)',
                [firstname,lastname,created_at,email,password]
            );
            return result[0];
        } catch (error) {
            throw error;
        }
    }

    static async getAll() {
        try {
            const [rows] = await db.promise().query('SELECT * FROM students');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async getById(id) {
        try {
            const [rows] = await db.promise().query('SELECT * FROM students WHERE id = ?', [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async update(id, studentData) {
        const { name, age, email } = studentData;
        try {
            const result = await db.promise().query(
                'UPDATE students SET name = ?, age = ?, email = ? WHERE id = ?',
                [name, age, email, id]
            );
            return result[0];
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        try {
            const result = await db.promise().query('DELETE FROM students WHERE id = ?', [id]);
            return result[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Student;
