const {Router} = require('express');
const expressFileUpload = require('express-fileupload');
const { getImg,fileUpload } = require('../controllers/uploads');
const {validarJwt, validarAdminRoleOMismoUser} = require('../middlewares/validar-jwt');

const router = Router();

router.use(expressFileUpload());

router.put('/:tipo/:id',[validarJwt,validarAdminRoleOMismoUser],fileUpload);
router.get('/:tipo/:img',getImg);


module.exports = router;