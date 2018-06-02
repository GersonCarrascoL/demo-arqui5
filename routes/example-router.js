'use strict'

const express = require('express'),
    router = express.Router(),
    ExampleController = require('../controllers/example-controller'),
    ec = new ExampleController()

router
    .get('/api/v1/',ec.index)

module.exports = router
