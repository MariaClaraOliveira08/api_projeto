const router = require('express').Router();
const verifyJWT = require("../services/verifyJWT");
const usuarioController = require('../controllers/usuarioController');
const estabelecimentosController = require('../controllers/estabelecimentoController');

//rotas userController
 router.post('/user', usuarioController.createUsuario);
 router.post('/login', usuarioController.loginUsuario);
 router.get('/user', usuarioController.getAllUsers)
 router.delete("/user/:id", usuarioController.deleteUser);


 //rotas para estabelecimentoController
 router.get('/buscar', estabelecimentosController.buscarEstabelecimentos);

module.exports = router;
