const router = require('express').Router();
const verifyJWT = require("../services/verifyJWT");
const usuarioController = require('../controllers/usuarioController');

//rotas userController
 router.post('/user', usuarioController.createUser);
 router.post('/login', verifyJWT, usuarioController.loginUser);

module.exports = router;
