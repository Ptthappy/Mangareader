const express = require('express');
const passport = require('passport');
const auth = require('../middlewares/isAuth');
const users = require('../helpers/comments');
const bcrypt = require('bcryptjs');
let router = express.Router();

//Obtener like propio, lista de likes de manga y chapter
router.get('/', (req, res) => {

});

//Likear. Verificar si ya el like existe
router.post('/', (req, res) => {

});

//Modificar comment
router.put('/', (req, res) => {
    
});

//Eliminar like
router.delete('/', (req, res) => {

});