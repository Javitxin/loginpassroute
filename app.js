const express = require('express');
const app = express();
const session = require('express-session');
const middlewares = require('./middlewares');
const routes = require('./routes');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();


const PORT = 4000;


app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.PALABRA_SECRETA || 'secretoSuperSecreto',
    resave: false,
    saveUninitialized: true,
}));

middlewares.setupAPP(app);

routes.setup(app);


app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
})