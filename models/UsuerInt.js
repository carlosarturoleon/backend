const mongoose = require('../db/Database')

const Schema = mongoose.Schema

const UsuarioInSchema = new Schema({
    cedula: String,
    nombre: String,
    correo: String,
    acceso: String,
    contraseña: String
})

const UsuarioInt = mongoose.model('usuariointernos', UsuarioInSchema)

module.exports = UsuarioInt