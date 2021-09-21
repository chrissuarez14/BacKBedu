var router = require('express').Router()

var {
	crearMascota,
	obtenerMascota,
	modificarMascota,
	eliminarMascota,
	count 
} = require('../controllers/mascotas');

//podemos constuir rutas como queramos tan largo como queramos las rutas deben ser especifica y descriptiva
//partir de los mas espefico a lo mas general de arrbia hacia abajo el acomod del router 
router.get('/', obtenerMascota);
router.get('/count/:cat',count); //primero esta para que si el usuario pone un id entre a esta 
router.get('/:id', obtenerMascota);
router.post('/', crearMascota);
router.put('/:id', modificarMascota);
router.delete('/:id', eliminarMascota);

module.exports = router;
