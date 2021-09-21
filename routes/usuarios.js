const router = require('express').Router();
const auth=require('./auth')
const {
	crearUsuario,
	obtenerUsuarios,
	modificarUsuario,
	eliminarUsuario,
	iniciarSesion
} = require('../controllers/usuarios');


router.get('/', auth.requerido,obtenerUsuarios);
router.get('/:id', auth.requerido,obtenerUsuarios); //si 1queremos que sean privados lo definimos aqui 
router.post('/', auth.opcional,crearUsuario);
router.post('/entrar',iniciarSesion)
router.put('/:id',auth.requerido, modificarUsuario);
router.delete('/:id',auth.requerido, eliminarUsuario);

module.exports = router;