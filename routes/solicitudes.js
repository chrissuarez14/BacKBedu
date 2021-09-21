var router = require('express').Router()

var {
	crearSolicitud,
	obtenerSolicitud,
	modificarSolicitud,
	eliminarSolicitud,
	count
} = require('../controllers/solicitudes');

router.get('/', obtenerSolicitud);
router.get('/count/:solicitud',count)
router.post('/', crearSolicitud);
router.put('/:id', modificarSolicitud);
router.delete('/:id', eliminarSolicitud);

module.exports = router;
