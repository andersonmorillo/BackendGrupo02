const {Router} = require('express');
const { login,googleSignin, renewToken } = require('../controllers/Auth');
const { check } = require('express-validator');

const validarCampos = require('../middlewares/validar-campos');
const validarJwt = require('../middlewares/validar-jwt');

const router = Router();

router.post('/',[
    check('email','El email es obligatorio').isEmail(),
    check('password','El password es obligatorio').not().isEmpty(),
    validarCampos
],login);

router.post('/google',[
    check('token','El token de google es obligatorio').not().isEmpty(),
    validarCampos
],googleSignin);
router.get('/renew',validarJwt,renewToken);

module.exports = router;

