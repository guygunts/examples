var express = require('express');
const router = express.Router();
const login =require('../src/controller/LoginController')
router.post('/login',login.loginUser)
router.post('/register',login.registerUser)
router.get('/listUser',login.listUser)
module.exports = router;
