const {Router} = require('express');
const expressFileUpload = require('express-fileupload');
const { getImg,fileUpload } = require('../controllers/uploads');
const validarJwt = require('../middlewares/validar-jwt');

const router = Router();

router.use(expressFileUpload());

router.put('/:tipo/:id',validarJwt,fileUpload);
router.get('/:tipo/:img',getImg);


module.exports = router;