// Snippets de código para poder componer el programa

//Usado?: Si
  const middlewares = require('./middlewares');
//--- Explicación: 

// -----Importantano el middleware--------------------------------------------------------------------------------

//Usado?: SI
const bodyParser = require('body-parser');
//--- Explicación:

// ------------Administrar la solicitudes-------------------------------------------------------------------------

//Usado?: SI
const session = require('express-session');
//--- Explicación:

// ------------Abrir una sesion nueva y guardar datos del usuario-------------------------------------------------------------------------

//Usado?: SI
const express = require('express');
//--- Explicación:

// Estamos requiriendo Express

//Usado?: SI
const bodyParser = require('body-parser');
//--- Explicación:

// --------Administrar la solicitudes-----------------------------------------------------------------------------

//Usado?: SI
const session = require('express-session');
//--- Explicación:

// ---------Abrir una sesion nueva y guardar datos del usuario----------------------------------------------------------------------------

//Usado?: No
const dotenv = require('dotenv');
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?: No
const middlewares = require('./middlewares');
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?: SI
const routes = require('./routes');
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?: No
dotenv.config();
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?: SI
const app = express();
//--- Explicación:

// Es el siguiente paso para trabajar con Express según documentación

//Usado?: SI
const PORT = 4000;
//--- Explicación:

// --------Asignanos a la variable PORT el puerto 4000-----------------------------------------------------------------------------

//Usado?: No
const dotenv = require('dotenv');
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?: No
dotenv.config();
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?: SI
middlewares.setupApp(app);
//--- Explicación: 

// -------------------------------------------------------------------------------------

//Usado?: SI
routes.setup(app);
//--- Explicación: 

// -------------------------------------------------------------------------------------

//Usado?: SI
const validarPalabraMiddleware = (req, res, next) => {
  const palabraCorrecta = process.env.PALABRA_SECRETA || '';

  if (req.body.palabra === palabraCorrecta) {
    req.session.palabraSecreta = req.body.palabra;
    next();
  } else {
    res.redirect('/?error=1');
  }
};
//--- Explicación: 


// ---------------funcion de validar la palabra en el Middleware----------------------------------------------------------------------


//Usado?: Si
const setup = (app) => {
  app.get('/', (req, res) => {
    const mensajeError = req.query.error
      ? (req.query.error === '1' ? 'Palabra incorrecta, inténtalo de nuevo.' : 'No estás logado.')
      : '';
    if (req.session.palabraSecreta) {
      return res.redirect('/profile');
    }
  //Aquí va código dentro
})}
//--- Explicación: 


// Primer endpoint, "Home"


//Usado?: Si
res.send(`
  <html>
    <body>
      <h1>Página de Inicio</h1>
      <p>${mensajeError}</p>
      <form method="post" action="/profile">
        <label for="palabra">Introduce la palabra:</label>
        <input type="text" name="palabra" required>
        <button type="submit">Enviar</button>
      </form>
    </body>
  </html>
`);
//--- Explicación: 


// Te vuelve redirigir a al input


const setupAPP = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session({
    secret: 'secretoSuperSecreto',
    resave: false,
    saveUninitialized: true,
  }));
};

//Usado?: SI
app.post('/profile', middlewares.validarPalabraMiddleware, (req, res) => {
  res.send(`
    <h1>Ruta del Perfil</h1>
    <form method="post" action="/logout">
      <button type="submit">Log Out</button>
    </form>
  `);
});
//--- Explicación: 

// --Una ruta que llama a la función del middleware-----------------------------------------------------------------------------------

//Usado?: No
app.use(bodyParser.urlencoded({ extended: true }));

//--- Explicación: 

// -------------------------------------------------------------------------------------

//Usado?: No
app.use(session({
  secret: process.env.PALABRA_SECRETA || 'secretoSuperSecreto',
  resave: false,
  saveUninitialized: true,
}));

//--- Explicación: 

// -------------------------------------------------------------------------------------

//Usado?: Si
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
//--- Explicación: 

// -------escuchar el servidor en el puerto desigando por PORT------------------------------------------------------------------------------

//Usado?: SI
const verificarSesionMiddleware = (req, res, next) => {
  if (req.session.palabraSecreta) {
    next();
  } else {
    res.redirect('/?error=2');
  }
};
//--- Explicación: 

// -------------------Verificar si es correcta la sesion------------------------------------------------------------------


//Usado?: No
app.get('/profile', middlewares.verificarSesionMiddleware, (req, res) => {
  res.send(`
    <h1>Ruta del Perfil (Sesión activa)</h1>
    <form method="post" action="/logout">
      <button type="submit">Log Out</button>
    </form>
  `);
});
//--- Explicación: 

// -------------------------------------------------------------------------------------


//Usado?: SI
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
    }
    res.redirect('/');
  });
});
//--- Explicación: 

// -------------------------------------------------------------------------------------

//Usado?: SI
module.exports = {
  setup,
};
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?: SI
module.exports = {
  validarPalabraMiddleware,
  verificarSesionMiddleware,
  setupAPP,
};
//--- Explicación:

// -----Exporetamos las funciones del middleware--------------------------------------------------------------------------------

