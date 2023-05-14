const {Router} = require('express');
const {validarJwt} = require('../middlewares/validar-jwt');
const { getCitas, crearCita, cancelarCita } = require('../controllers/citas');

const router = Router();

router.get('/:id',getCitas);
router.post('/',validarJwt,crearCita);
router.delete('/:id',validarJwt,cancelarCita);

module.exports = router;