const router = require('express').Router();
const miscController = require('../controllers/misc.controller');
const authController = require('../controllers/auth.controller');
// const multer = require('multer')
// const upload = multer({ dest: "./public/uploads/" });
const upload = require('./storage.config')

router.get('/', miscController.index);

// Register
router.get('/register', authController.register);
router.post('/register', upload.single("image"), authController.doRegister);

// Login
router.get('/login', authController.login);
router.post('/login', authController.doLogin);

module.exports = router;