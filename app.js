// Express
const express = require('express');
const app = express();

//Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuración de base de datos
const mongoose = require('mongoose');
// require('./config/passport') //trae la informacio par apoder trabajar con passport 

mongoose.connect(
	"mongodb+srv://Christian:Mierda1486@cluster0.p6jzv.mongodb.net/Adoptapet?retryWrites=true&w=majority"
	);

mongoose.set("debug", true)

require('./models/Usuario')
require('./models/Mascota')
require('./models/Solicitud')

require('./config/passport')


//Rutas
app.use('/v1', require('./routes'));

// Iniciando el servidor
const PORT = 4001;
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`)
})

