const express = require("express");
const bcrypt = require("bcrypt");
const routes = express.Router();

const Tournaments = require("../models/Tournament");
const Usuario = require("../models/Usuario");
const Notificacion = require('../models/Notificacion')

const get_tournament = async () => {
  const data = await Tournaments.find();
  return data;
};

routes.get("/get_tournaments", async (req, res) => {
  res.json(await get_tournament());
});

routes.get("/get_tournaments/:id", async (req, res) => {
  let tournament_id = req.params.id;
  let tournament = await Tournaments.findById(tournament_id);

  res.json(tournament);
});

routes.post("/create_tournamet", async (req, res) => {
  let body = req.body;
  let tournament = new Tournaments(body);

  await tournament.save();

  res.json(tournament);
});

routes.delete("/delete_tournament/:id_tournament", async (req, res) => {
  const id_fruta = req.params.id_tournament;

  const tournament = Tournaments.findById(id_tournament);
  await tournament.deleteOne();

  res.json({
    mensaje: "Tournamet deleted",
  });
});

routes.put("/actualizar_usuario/:id_usuario", async (req, res) => {
  const id_usuario = req.params.id_usuario;

  const usuario = await Usuario.findById(id_usuario);
  usuario.nombre = req.body.nombre
  usuario.correo = req.body.correo
  usuario.celular = req.body.celular
  usuario.rol = req.body.rol

  await usuario.save()

  res.json({
    mensaje: "usuario actualizado correctamente",
  });
});

routes.get("/get_usuarios", async (req, res) => {
  const usuarios = await Usuario.find();

  res.json(usuarios);
});

routes.get("/get_usuario/:id_usuario", async (req, res) => {
  const id_usuario = req.params.id_usuario;

  const usuarios = await Usuario.findById(id_usuario);

  res.json(usuarios);
});

routes.post("/crear_usuario", async (req, res) => {
  let body = req.body;

  let salto = await bcrypt.genSalt(10);

  let password = await bcrypt.hash(body.password, salto);

  let nuevo_usuario = {
    nombre: body.nombre,
    correo: body.correo,
    celular: body.celular,
    rol: body.rol,
    password: password,
  };

  let usuario = new Usuario(nuevo_usuario);

  await usuario.save();

  res.json(usuario);
});

routes.get('/get_notificacion/:id_usuario', async (req, res) => {

  const id_usuario = req.params.id_usuario

  const notificaciones = await Notificacion.find({id_usuario: id_usuario})

  res.json(notificaciones)

})

routes.post('/crear_notificacion', async (req, res) => {

  const notificacion = new Notificacion(req.body)

  await notificacion.save()

  res.json({
    mensaje: 'notificacion creada correctamente'
  })

})


module.exports = routes;
