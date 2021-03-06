const router = require('express').Router();
const passport = require('passport')
const miscController = require('../controllers/misc.controller');
const authController = require('../controllers/auth.controller');
const usersController = require('../controllers/users.controller');
const projectsController = require('../controllers/projects.controller');
const upload = require('./storage.config')

const authMiddleware = require('../middlewares/auth.middleware');

const GOOGLE_SCOPES = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'
]

router.get('/', miscController.index);

// Register
router.get('/register', authMiddleware.isNotAuthenticated, authController.register);
router.post('/register', upload.single("image"), authController.doRegister);

// Login
router.get('/login', authMiddleware.isNotAuthenticated, authController.login);
router.post('/login', authMiddleware.isNotAuthenticated, authController.doLogin);
router.get('/auth/google', authMiddleware.isNotAuthenticated, passport.authenticate('google-auth', { scope: GOOGLE_SCOPES }))
router.get('/auth/google/callback', authMiddleware.isNotAuthenticated, authController.doLoginGoogle)
router.post('/logout', authMiddleware.isAuthenticated, authController.logout)

router.get('/activate/:token', authMiddleware.isNotAuthenticated, authController.activateAccount)

// Profile
router.get('/profile', authMiddleware.isAuthenticated, usersController.profile)
router.get('/users/:userId', usersController.profile)

// Projects
router.get('/projects/:id', projectsController.getProject)
router.post('/projects/:id/like', authMiddleware.isAuthenticated, projectsController.like)

// Users
router.get('/users', authMiddleware.isAuthenticated, authMiddleware.checkRole('ADMIN'), usersController.listUsers)

module.exports = router;