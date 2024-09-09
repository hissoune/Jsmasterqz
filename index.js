const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const db = require('./app/config/db');
const ejsLayouts = require('express-ejs-layouts'); 
const session = require('express-session');
const setUserMiddleware = require('./app/middlewares/setUser');

app.use(session({
    secret: 'jhgaehfzjQKZKNSLBRYIAZ74GBQN',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  
}));
app.use(morgan('dev'));
app.use(setUserMiddleware);

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(ejsLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app/views'));


// Routes
const routes = require('./app/routes'); 
app.use('/', routes); 

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
