const db = require('../config/db'); 
class Formateur {
    static async insert(formateurData) {
        const { firstname,lastname,created_at,email,password,adress,datenessance ,specialty  } = formateurData;
        try {
            const result = await db.query(
                'INSERT INTO Formateur (firstname,lastname,created_at,email,password,adresse,date_de_naissance,specialite ) VALUES (?, ?, ?,?,?,?,?,?)',
                [firstname,lastname,created_at,email,password,adress,datenessance,specialty ]
            );
            return result[0];
        } catch (error) {
            throw error;
        }
    }

   static async checkcridencials(formateurData) {
    const { email, password } = formateurData;
    try {
        const [result] = await db.query(
            'SELECT * FROM Formateur WHERE email = ? AND password = ?',
            [email, password]
        );
        
        return result.length > 0 ? result[0] : null;

    } catch (error) {
        console.error('Error checking credentials:', error);
        throw error;
    }
}

    static async getAll() {
        try {
            const [rows] = await db.promise().query('SELECT * FROM formateurs');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async getById(id) {
        try {
            const [rows] = await db.promise().query('SELECT * FROM formateurs WHERE id = ?', [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async update(id, formateurData) {
        const { name, specialty, email } = formateurData;
        try {
            const result = await db.promise().query(
                'UPDATE formateurs SET name = ?, specialty = ?, email = ? WHERE id = ?',
                [name, specialty, email, id]
            );
            return result[0];
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        try {
            const result = await db.promise().query('DELETE FROM formateurs WHERE id = ?', [id]);
            return result[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Formateur;
