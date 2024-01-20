// Snippets de código para poder componer el programa

//Usado?: Si
const middlewares = require('./middlewares');
//--- Explicación: 

// -----Importar el contenido del middleware y lo usamos en app.js --------------------------------------------------------------------------------

//Usado?: SI
const bodyParser = require('body-parser');
//--- Explicación:

// -Se utiliza para procesar datos enviados a traves del cuerpo de la solicitud HTTP este se usa en app.js-------------------------------------------------------------------------

//Usado?: SI
const session = require('express-session');
//--- Explicación:

// -Modulo de express para crear sesiones en una web y guarda datos de la sesion en app.js se usa para guardar el obj de la palabra secreta-------------------------------------------------------------------------

//Usado?: SI
const express = require('express');
//--- Explicación:

// ---Estamos requiriendo Express en app.js------

//Usado?: SI
const bodyParser = require('body-parser');
//--- Explicación:

// ---Se utiliza para procesar datos enviados a traves del cuerpo de la solicitud HTTP este se usa en middleware.js----------------------------------------------------------------------------

//Usado?: SI
const session = require('express-session');
//--- Explicación:

// -Modulo de express para crear sesiones en una web y guarda datos de la sesion en middleware.js se usa para guardar el obj de la palabra secreta----------------------------------------------------------------------------

//Usado?: SI
const dotenv = require('dotenv');
//--- Explicación:

// ----Modulo para cargar variables de entorno y se usa en middleware.js---------------------------------------------------------------------------------

//Usado?: SI
const middlewares = require('./middlewares');
//--- Explicación:

// ---Importar el contenido del middleware y lo usamos en routes.js----------------------------------------------------------------------------------

//Usado?: SI
const routes = require('./routes');
//--- Explicación:

// ----Importar el contenido del routes.js y lo usamos en app.js ---------------------------------------------------------------------------------

//Usado?: SI
dotenv.config();
//--- Explicación:

// ---------Es para poder usar las variable de entorno usado en app.js----------------------------------------------------------------------------

//Usado?: SI
const app = express();
//--- Explicación:

// Es el siguiente paso para trabajar con Express según documentación

//Usado?: SI
const PORT = 4000;
//--- Explicación:

// --------Asignanos a la variable PORT el puerto 4000-----------------------------------------------------------------------------

//Usado?: SI
const dotenv = require('dotenv');
//--- Explicación:

// ----Modulo para cargar variables de entorno y se usa en app.js---------------------------------------------------------------------------------

//Usado?: SI
dotenv.config();
//--- Explicación:

// -----Es para poder usar las variable de entorno usado en middlewares.js--------------------------------------------------------------------------------

//Usado?: SI
middlewares.setupApp(app);
//--- Explicación: 

// ----llamada a la funcion de middleware.js setupAPP pasandole el parametro (app) en app.js---------------------------------------------------------------------------------

//Usado?: SI
routes.setup(app);
//--- Explicación: 

// ---llamada a la funcion de routes.js setup pasandole el parametro (app) en app.js----------------------------------------------------------------------------------

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


//Usado?: SI
const setup = (app) => {
        app.get('/', (req, res) => {
            const mensajeError = req.query.error ?
                (req.query.error === '1' ? 'Palabra incorrecta, inténtalo de nuevo.' : 'No estás logado.') :
                '';
            if (req.session.palabraSecreta) {
                return res.redirect('/profile');
            }
            //Aquí va código dentro
        })
    }
    //--- Explicación:

//---- función que te devuelve el error al logearte y si no con el re.send de abajo te deja en la pg de inicio para que vuelva a intentarlo
//----está en routes.js


//Usado?: SI
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
//--------------- te deja en la pg de inicio para que vuelva a intentarlo está en routes.js-----------------


//Usado?: SI

const setupAPP = (app) => {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(session({
        secret: 'secretoSuperSecreto',
        resave: false,
        saveUninitialized: true,
    }));
};
//----Explicación:
//--------llama o carga la función que crea el obj con la contraseña de acceso y está en middleware.js-------------------------------------------------

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

// --Metodo que enruta las solicitude HTTP POST a la ruta especificada '/profile' y usando las funciones de middleware.js validarPalabraMiddleware---------------------------------------------------------------------------------

//Usado?: SI
app.use(bodyParser.urlencoded({ extended: true }));

//--- Explicación: 

// --Es para  analizar los datos de url--- en app.js--------------------------------------------------------------------------------

//Usado?: SI
app.use(session({
    secret: process.env.PALABRA_SECRETA || 'secretoSuperSecreto',
    resave: false,
    saveUninitialized: true,
}));

//--- Explicación: 

// ----Estamos usando o cargando el obj de la contraseña para luego hacer la validación está en app.js---------------------------------------------------------------------------------

//Usado?: SI
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

// -----------Verificar si es correcta la sesion y sino nos redireciona al error se usa en middleware.js-----------------------------------------------------------------


//Usado?: SI
app.get('/profile', middlewares.verificarSesionMiddleware, (req, res) => {
    res.send(`
    <h1>Ruta del Perfil (Sesión activa)</h1>
    <form method="post" action="/logout">
      <button type="submit">Log Out</button>
    </form>
  `);
});
//--- Explicación: 

// -Accedemos el la direccion que pone a la funcion verificarSesiónMiddleware que está en middleware.js y la usamos desde routes.js------------------------------------------------------------------------------------


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

// ---Metodo que enruta las solicitude HTTP POST a la ruta especificada-''/logout y o nos muestra el error o nos redireciona a la raiz '/'----------------------------------------------------------------------------------

//Usado?: SI
module.exports = {
    setup,
};
//--- Explicación:

// ----Exportamos el modulo setup para luego poder usar esa funcion del archivo routes.js, en este caso en app.js--------------------------------------------------------------------------------

//Usado?: SI
module.exports = {
    validarPalabraMiddleware,
    verificarSesionMiddleware,
    setupAPP,
};
//--- Explicación:

// -----Exporetamos las funciones del middleware--------------------------------------------------------------------------------