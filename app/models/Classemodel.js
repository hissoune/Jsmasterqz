const db = require('../config/db'); 

class Classe {

    static async GetClasses(formateurId) {
        try {
            const [rows] = await db.query('SELECT * FROM Classe where formateur_id=?',[formateurId]);
            return rows;
        } catch (error) {
            throw error;
        }
    }
}
module.exports = Classe;
