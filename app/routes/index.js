const express = require('express');
const router = express.Router();
const logincontroller = require('../controllers/loginccontroller');
const classecontroller =require('../controllers/classecontroller');
const isLoggedIn = require('../middlewares/isLoggedIn'); 
const isGest = require('../middlewares/isGest'); 
const checkRole = require('../middlewares/CheckRole');

router.get('/',isGest, (req, res) => {
    res.render('index');
});

router.get('/Login',isGest, (req, res) => {
    const role = req.query.type;
    res.render('Auth/login',{role});
});

router.post('/registred', logincontroller.register);

router.post('/logined', logincontroller.login);

router.get('/register',isGest, (req, res) => {
    
        res.render('Auth/register');
});



router.get('/Dashboard', isLoggedIn, (req, res) => {
   
    res.render('Dashboard/index');
});

router.get('/classe',checkRole('Formateur'), classecontroller.getclasses);

router.get('/logout',isLoggedIn,logincontroller.logout);
module.exports = router;