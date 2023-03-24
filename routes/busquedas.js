const {Router} = require('express');
const { getTodo, getDocumentosColeccion } = require('../controllers/busquedas');
const {validarJwt} = require('../middlewares/validar-jwt');

const router = Router();

router.get('/:busqueda',validarJwt,getTodo);
router.get('/coleccion/:tabla/:busqueda',validarJwt,getDocumentosColeccion);


module.exports = router;