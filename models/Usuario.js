// // Usuario.js
// /** Clase que representa a un usuario de la plataforma*/
// class Usuario {
//   constructor(id, username, nombre, apellido, email, password, tipo) {
//     this.id = id;
//     this.username = username;
//     this.nombre = nombre;
//     this.apellido = apellido;
//     this.email = email;
//     this.password = password;
//     this.tipo = tipo; // tipo normal o anunciante
//   }
// }

// module.exports = Usuario;

const mongoose = require('mongoose');
const uniqueValidator=require('mongoose-unique-validator') //validar que loq ue dejimos que realmten se unico se usa este se tiene que installar verifica que todos los camos
//que dije que sea uncios realmente sean 

const crypto=require('crypto') //permite cirfrar toda la info que considere confidencial nip y password etc.
const jwt=require('jsonwebtoken');
const secret=require('../config').secret;  //cual es el ambiente donde estamos ejecutando el pgrama 



const UsuarioSchema = new mongoose.Schema({
  username:{type:String,
    unique:[true,'El usuario ya existe'], // que sea unico cad que inente generar un nuevo usuario v a aver que no sea igual 
    required:[true,'No puede estar vacio el campo username'], //que el valor sea necesario funccionalidad entre corchetes
    lowercase:true, //que todos sea minuscula estos lados se casan mas en front
    martch:[ /^[a-z0-9]+/,'Username Invalido'],          // con el mas le decimos que por lo menos tenga 1 mediante expresiones regulares l puedo decir que estructura quiero que tenga
    index:true
  },
  nombre: {type:String,require:true},
  apellido: {type:String,require:true},
  email: {type:String,
          unique:true,
          requirded:[true,"Falta email"],
          match:[/\S+@\s+.\s+/,'Email Invalido'], //la s significa cualquier simbolo cualquier caracter pero un @ cualquier carcater el . punto y cualquier carcter
          index:true,//indexar para hacer consultas por este campola forma de acceder mas facil por este campo es crear un indice
          //guarda este dato en otro lugar de memoria de mas rapido acceso y podamos acceder rapido,si es un campo que se usa mas 
          //util cuando queramos mejorar performace de consultas  los campos que uso para hacer busquedas podemos indexar
          //la idea de usar index es tener acceso rapido si tenemos muchos index  las consultas se vuelven lentas solo usar los mas  usados o importantes
          //los que tengamos que bucar rapido,el id ex indexado por defecto     
      
  },
 // password: String, //como tiene que ser encriptado ya no sera aqui la tenemos que cifrar primero por eso se quita
  tipo:{
    type:String,
    enum:['normal','Anunciante']
  },
  //estos datos son para calcular el cifrado estos no se piden
  hash:String,
  salt:String  
}, {collection:"Usuarios", timestamps: true});

UsuarioSchema.plugin(uniqueValidator,{message:'Ya existe el usuarios'}) //antes de hacer el proceso ver si no existe por eso va aqui


UsuarioSchema.methods.publicData = () => {
  return {
    id: this.id,
    username: this.username,
    nombre: this.nombre,
    apellido: this.apellido,
    email: this.email,
    tipo:this.tipo
  }
}

//decirle como almacenar las contrasenas 

//lo ultimo a definir es el encriptamiento

UsuarioSchema.methods.crearPassword=function(password){
  this.salt=crypto.randomBytes(16).toString('hex'); //cadena random dew longitud 16 salt todas las funciones reciben una semilla y con este genera el hash es como un valor inicial 
  this.hash=crypto.pbkdf2(password,this.salt,10000,512,'sha512') //esta es la funcion que permite ahora si cifrar la contrasena y generar un hash algo que nadie puede interpreatar el iteraccionson 10000
  .toString('hex'); //cadena de longitud de 512 caracteres, el algoritmos de cifrado sha512 usa el valor de salt y la contraena para hacer operaciones y generar un hash 

}

//validar que si sea la contrasena y pueda iniciar sesion cunado nos pase ;a contrasena seamos capas de decir que si es
UsuarioSchema.methods.validarPassword=function(password){
  const newHash=crypto.pbkdf2(password,this.salt,10000,512,'sha512')
  .toString('hex')
  return this.hash === newHash;
}


//Generar jwt
UsuarioSchema.methods.generaJWT=function (){
  const today=new Date();   //ver cuando se genero
  const expiracion=new Date(today); //cuando expira
  expiracion.setDate(today.getDate + 60) //le damos 60 dias 

  return jwt.sign({
    id:this._id, //para obtener el de la bd tiene que ser con  _
    username:this.username,
    expiracion:parseInt(expiracion.getTime()/1000) //nos dara cuando expira el jwt 
  },secret)
}
//permite definir un json de autenticacion que convierte el jwt en un json
//json que le dare al usuario cunado inicie sesion el navegador almacena el jwt 
UsuarioSchema.methods.toAuthJSON=function(){
  return {
    username:this.username,
    email:this.email,
    token:this.generaJWT()
  }
}

module.exports=mongoose.model("Usuario", UsuarioSchema)

















