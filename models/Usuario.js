const mongoose = require('../db/Database')

const Schema = mongoose.Schema

const usuarioSchema = new Schema({
    nombre: String,
    correo: String,
    celular: String,
    rol: String,
    password: String
})

const Usuario = mongoose.model('usuarios', usuarioSchema)

module.exports = Usuario