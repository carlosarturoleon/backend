const mongoose = require('../db/Database')

const Schema = mongoose.Schema

const EquiposSchema = new Schema({
    nombre: String,
    correo: String,
    nombre_equipo: String,
    numero_camisa: String,
    logo: String
})

const EquiposEx = mongoose.model('Equipos', EquiposSchema)

module.exports = EquiposEx