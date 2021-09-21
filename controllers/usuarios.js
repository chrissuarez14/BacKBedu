// const Usuario = require('../models/Usuario');
const mongoose = require("mongoose")
const Usuario = mongoose.model("Usuario")
const passport = require('passport');

// CRUD

function crearUsuario (req, res,next){
	
	const body=req.body
	const password=body.password

		delete body.password
		const user = new Usuario(body)

		user.crearPassword(password) //mandar el cirfrado la contrasena 
		user.save().
		then(user=>{
			res.status(200).json(user.toAuthJSON()) //cada que se cree un usuario 
		})
		.catch(next)

}

function obtenerUsuarios(req, res,next){
	//este no tiene acceso a TODA la info de la bd 
	Usuario.findById(req.usuario.id) //este es el usuario los camos del token mandar la info solo del que esta usando este servicio  info del usauri que autentico no de otros 
	.then(user=>{
		if(!user){
			return res.sendStatus(401) //modela na respuesta vaic ale sendStatus send y satus se cobimnan se usa en metodo get donde no tengo info que regresar
		}
		res.json(user.publicData())
	})
	.catch(next)
}


	
	function modificarUsuario(req, res, next) {
		console.log(req.usuario)
		Usuario.findById(req.usuario.id).then(user => { //el usuaro del que que esta logueado
		  if (!user) { return res.sendStatus(401); }
		  let nuevaInfo = req.body
		  if (typeof nuevaInfo.username !== 'undefined')
			user.username = nuevaInfo.username
		  if (typeof nuevaInfo.bio !== 'undefined')
			user.bio = nuevaInfo.bio
		  if (typeof nuevaInfo.foto !== 'undefined')
			user.foto = nuevaInfo.foto
		  if (typeof nuevaInfo.ubicacion !== 'undefined')
			user.ubicacion = nuevaInfo.ubicacion
		  if (typeof nuevaInfo.telefono !== 'undefined')
			user.telefono = nuevaInfo.telefono
		  if (typeof nuevaInfo.password !== 'undefined')
			user.crearPassword(nuevaInfo.password) //volvemosa cifrar contrsena
		  user.save().then(updatedUser => {                                   //Guardando usuario modificado en MongoDB.
			res.status(201).json(updatedUser.publicData())
		  }).catch(next)
		}).catch(next)
	  }



function eliminarUsuario(req, res,next){
	Usuario.findOneAndDelete({_id:req.usuario.id})
	.then(
		res.status(200).send(`Usuario  eliminado`) //para solo eliminarme a mi mismo 
	)	
	.catch(next)

}
/**
 * Checa que recibe el correo o password, si no viene nos regresa el al body
 * si se rpasa el correo y pass vamos passport pro que el sabe como auenticar 
 * el metodo autenticate es la configuracin y estrategia de login, el callback de la autenticacion 
 * si existe el usuario, entonce usa su token y genera con el la funcion generaJWT que definimos 
 * passport lo que tiene a este usaario le corresponde este jwt 
 * passport solo tiene una relacion de los usuarios con su jwt 
 */
function iniciarSesion(req,res,next){
	if(!req.body.email|| !req.body.password){ //si no tiene correo o contrasena no se puede iniciar sesion
		return res.status(422).json({error:{email:'Falta informacion'}})
	}
	//permite iniciar sesion  el primero la estrategia y despues definir un bojeto donde decimos que el majeo de sesiones se uinice en falso lo que quiere decir 
	//que un usuario solo puede tener una sesion activa
	//aqui le decimos que nos autenticamos 
	passport.authenticate('local',
	{session:false}, //para evitar multiples sesiones 
	function(err,user,info){ //estos paraametros es lo que recibe autenticate 
		if(err){return (err)}
		if(user){
			user.token= user.generaJWT();
		}else{
			return res.status(422).json(info)
		}
	})(req,res,next) //autenticadte regresa una funcion y aplicamos la funcion esto es como volver a llamarse la funcion sin poner el nombre //con esto ejecutamos la funcion sin usar el nombre de l funcion como acer  foo(5)

}

module.exports = {
	crearUsuario,
	obtenerUsuarios,
	modificarUsuario,
	eliminarUsuario,
	iniciarSesion
}
















