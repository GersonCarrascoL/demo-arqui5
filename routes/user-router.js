'use strict'

const express = require('express'),
    router = express.Router(),
    UserController = require('../controllers/user-controller'),
    uc = new UserController()

router
    .post('/api/v1/users/login',uc.userLogin)
    .post('/api/v1/users/register',uc.userRegister)

module.exports = router
