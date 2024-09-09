const db = require('../config/db'); 

class Classe {

    static async GetClasses() {
        try {
            const [rows] = await db.query('SELECT * FROM Classe');
            return rows;
        } catch (error) {
            throw error;
        }
    }
}
module.exports = Classe;
