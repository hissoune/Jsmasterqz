

const Classe = require('../models/Classemodel');

const getclasses = async (req, res) => { 
        

    try {
        const classes = await Classe.GetClasses();
        res.render('lesclasses/index', { classes });
    } catch (error) {
        console.error('Error fetching classes:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
   getclasses
};
