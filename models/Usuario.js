const mongoose = require('../db/Database')

const Schema = mongoose.Schema

const usuarioSchema = new Schema({
    cedula: String,
    nombre: String,
    correo: String,
    acceso: String,
    contraseña: String
})

const Usuario = mongoose.model('usuarios', usuarioSchema)

module.exports = Usuario