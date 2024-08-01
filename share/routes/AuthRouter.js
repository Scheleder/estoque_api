const express = require('express');
const AuthController = require('../controllers/AuthController');
const router = express.Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/confirm', AuthController.checkCode);
router.post('/reset', AuthController.reset);
router.get('/send', AuthController.send);
router.post('/update', AuthController.updatePassWord);

module.exports = router;