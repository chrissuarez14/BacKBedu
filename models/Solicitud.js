// Solicitud.js
/** Clase que representa una solicitud de adopción */
const mongoose = require('mongoose');


const SolicitudesSchema = new mongoose.Schema({
  idMascota:String,
  fechaDeCreacion: String,
  idUsuarioAnunciante: String,
  idUsuarioSolicitante: String,
  estado: String,
}, {collection:"Solicitudes", timestamps: true});

SolicitudesSchema.methods.publicData=()=>{
    return {
    id:this.id, 
    idMascota:this.idMascota,
    fechaDeCreacion:this.fechaDeCreacion,
    idUsuarioAnunciante:this.idUsuarioAnunciante,
    idUsuarioSolicitante:this.idUsuarioSolicitante,
    estado:this.estado 
    }
}

module.exports=mongoose.model("Solicitud", SolicitudesSchema)