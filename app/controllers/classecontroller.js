

const Classe = require('../models/Classemodel');

const getclasses = async (req, res) => { 
    const formateurId =req.session.user.id;
   console.log(formateurId);
   
    try {
        if (formateurId) {
             const classes = await Classe.GetClasses(formateurId);
        res.render('lesclasses/index', { classes,formateurId });
        }
       
    } catch (error) {
        console.error('Error fetching classes:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
   getclasses
};
