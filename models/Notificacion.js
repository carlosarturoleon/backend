const mongoose = require('../db/Database')

const Schema = mongoose.Schema

const NotificacionSchema = new Schema({
    id_usuario: String,
    mensaje: String,
    visible: Boolean
})

const Notificacion = mongoose.model('notificaciones', NotificacionSchema)

module.exports = Notificacion