const passport = require('passport');                       //Importando passport, middleware para autenticación.
const LocalStrategy = require('passport-local').Strategy;   //Importando estrategia autenticación. --> passport-local
const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

passport.use(new LocalStrategy({                            //Configurando elementos utilizados para habilitar sesión.
  usernameField: 'email',
  passwordField: 'password'
}, function (email, password, done) {
  Usuario.findOne({ email: email }).then(function (user) {
    if (!user || !user.validarPassword(password)) {
      return done(null, false, { errors: { 'email o contraseña': 'equivocado(a)' } });
    }
    return done(null, user);
  }).catch(done);
}));



// //todo lo que se neceista par que funione
// const passport = require('passport');

// //estrategia de autenticacion esta no es la unica es la mas popular pero existen mas esta se conce como localStrategy

// const localStrategy=require('passport').Strategy;

// //mongoose como toda la autenticaciones oara ver quine tiene acceso a todo usamos mongoose

// const mongoose=require('mongoose');
// const Usuario=mongoose.model('Usuario');//que usario va a acceder




// passport.use( new localStrategy({//le decimos que usa aqui se usa la estraegia creando una nueva instancia 
//     //campos para asber como inicia sesion los de abajo son como identificadores 

//     usernameField:'email', //le decimos que inicia por email  el usernameField es esttico por que asi los espera psswprt y lo que  '' es como yo lo tengo
//     passwordField:'password' //decirle como auntenticare a los usuarios 
// },function(email,password,done){
//     Usuario.findOne({email:email}) //esto dice que se traiga el primero que tenga este correo
//     .then( function(user){ //si regresa vacio se ejecuto correctamente
//         if(!user || !user.validarPassword(password)){ //si el usuari no existe o no corresponde la constrasena 
//             //null por que no encontre nada falso que no lo estoy dando permiso de entrar
//             return next(null,false,{errors:{"El usuario o constrasena": 'incorrecta'}})  //null es un parametro como un especio de informacion adicional u caso donde se modela un caso de login difernte
//         }
//         return next(null,user) //cuando si paso la constrane
//     }

//         //aqui nos trae el email u tenemos que checar la constrasea
//     ) //caso donde salioo bioen
//     .catch(done) //si sale un error 
// }))//la funciones como tiene qeu modelar el inicio de sesion  


// //podemos hacer dos passport para autenticar por email o username pero ambos deben tener constrasena