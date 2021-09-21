//informacion general de la aplicacion definimos atributos y  variables en general de la app 

//aqui se define en que ambiente estamos desarrollando en genral se usa proudccion o desarrollo es imporatate separa
//por que en desarrollo estran datos testing, 
//proudccion para lo que es consumo toda la informacion no tiene setnido que exista por ejemplo no puedo hacer oruebas con informacion real
//

//esto para saber en qe ambiente estamos trabajando 
module.exports = {
  secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'secret' //la variabvle secret la usamos para caluclar el jwt, estp
};


//arcvui donde configuramos passport que nos ayuda el amejo de sesiones y necesirta un archivo passport

