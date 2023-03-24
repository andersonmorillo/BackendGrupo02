const { Router } = require('express');
const { check } = require('express-validator');
const { getMedicos, crearMedico, ActualizarMedico, BorrarMedico,medicoById } = require('../controllers/medicos');
const validarCampos = require('../middlewares/validar-campos');
const {validarJwt} = require('../middlewares/validar-jwt');
const router = Router();

router.get('/',validarJwt,getMedicos);

router.post('/',[
    validarJwt,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('hospital','El hospital Id debe de ser válido').isMongoId(),
    validarCampos
],crearMedico);

router.put('/:id',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('hospital','El hospital Id debe de ser válido').isMongoId(),
], ActualizarMedico);

router.delete('/:id',validarJwt,BorrarMedico);
router.get('/:id',validarJwt,medicoById);

module.exports = router;
