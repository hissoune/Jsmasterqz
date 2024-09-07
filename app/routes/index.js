const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});
router.get('/Login', (req, res) => {
    const role = req.query.type;
    res.render('Auth/login',{role});
});

// Add more routes here

module.exports = router;