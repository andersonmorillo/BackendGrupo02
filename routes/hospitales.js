const { Router } = require('express');
const { check } = require('express-validator');
const { getHospitales, crearHospital, ActualizarHospital, BorrarHospital } = require('../controllers/hospitales');
const validarCampos = require('../middlewares/validar-campos');
const validarJwt = require('../middlewares/validar-jwt');
const router = Router();

router.get('/',getHospitales);

router.post('/',[
    validarJwt,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearHospital);

router.put('/:id',[
    validarJwt,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], ActualizarHospital);

router.delete('/:id',validarJwt,BorrarHospital);

module.exports = router;
