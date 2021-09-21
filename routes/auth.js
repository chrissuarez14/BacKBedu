const jwt = require('express-jwt');
const secret = require('../config').secret;


// Obtenemos el jwt del header de la petición y verificamos su existencia.
function getTokenFromHeader(req) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
    req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }

  return null;
}

const auth = {
  requerido: jwt({
    secret: secret,
    algorithms: ['HS256'],
    userProperty: 'usuario',
    getToken: getTokenFromHeader
  }),
  opcional: jwt({
    secret: secret,
    algorithms: ['HS256'],
    userProperty: 'usuario',
    credentialsRequired: false,
    getToken: getTokenFromHeader
  })
};

module.exports = auth;




//  //exportamos el jwt .
// const jwt = require('express-jwt');
// const secret = require('../config').secret; //cons esto generamos el jwt 


// //en un servicio podria traer cierta informacion en ciertos campso por que nos puede pasar infor por body,paras 
// //otra forma donde se pasa de forma cifrada se le conoce como los headers
// //dentro de ellos puede mandar infor
// //en el header esta la confguracin ahi no pasamoc correos, password, solo paso informacion de configuracion
// //un header es una coleccion de llaves con valores, le decimos el valor de llave y pasamos el valor y ese ser el jwt
// //que se genera en  mi proceso de autenticacion 

// //tengo que recuperar el jwt que nosotros firamos como app y que este vigente  



// //como recuperar jwt de los headers

// function getTokenFromHeader(req){
//     //son las dos coasa que necesito para asber qe viiene el jwt 
//     if(req.headers.authorization && (req.headers.authorization.split(' ')[0]==='Token' || //buscamos la palabra token 
//     req.headers.authorization && req.headers.authorization.split(' ')[0]==='Bearber')) //son los dos nombre que se utilizan para idenfiticar el token 
//     {
//             //verificar que lo que mandaron es correcto
//             return req.headers.authorization.split(' ')[1]//valor uno el valor el c
//     }

//     return null //si realemente esmos usando wl jwt si regresa un valor si usamos eljwt si es null no 

// }

// //json de autenticacion
//     //definimos el objeto de autentcacion que se duive enb jwt en caso de que sea opcional si esta autenticado puede aceeder
//     //privador para los cuales necesito que se aun usuario autenticado y aquello publicos onde puede usar el servicio sin problema 

//     // const auth = {
//     //     requerido: jwt({
//     //       secret: secret, //o qque creamos
//     //       algorithms: ['HS256'], //que algoritmo usamos
//     //       userProperty: 'usuario', //los que tiene el jqt
//     //       getToken: getTokenFromHeader //como puedo acceder 
//     //     }),
//     //     opcional: jwt({
//     //       secret: secret,
//     //       algorithms: ['HS256'],
//     //       userProperty: 'usuario',
//     //       credentialsRequired: false,
//     //       getToken: getTokenFromHeader
//     //     })
//     //   };



//     const auth = {
//           //los que me importa que este logeado 
//         requerido: jwt({
//           secret: secret,
//           algorithms: ['HS256'],
//           userProperty: 'usuario',
//           credentialsRequired: true, //redundante por que por defalut el true por eos lo puedo quitar 
//           getToken: getTokenFromHeader
//         }),
//         //los que no me importa que este logeado 
//         opcional: jwt({
//           secret: secret,
//           algorithms: ['HS256'],
//           userProperty: 'usuario',
//           credentialsRequired: false, //este aqui le pasamo false por que deccimos que la utenticacion es opcinal 
//           getToken: getTokenFromHeader //para la funcion parametro 
//         })
//       };
      
//       module.exports = auth; //unica exportacion 