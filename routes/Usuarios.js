const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, crearUsuarios, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const validarCampos = require('../middlewares/validar-campos');
const validarJwt = require('../middlewares/validar-jwt');
const router = Router();

router.get('/',validarJwt,getUsuarios);

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    validarCampos
],crearUsuarios);

router.put('/:id',[
    validarJwt,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('role','El role es obligatorio').not().isEmpty(),
], actualizarUsuario);

router.delete('/:id',validarJwt,borrarUsuario);


module.exports = router;
