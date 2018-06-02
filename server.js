'use strict'

const express = require('express'),
    app = express(),
    ioServer = require('./services/socket')(app),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    restFul  = require('express-method-override')('_method'),
    userRoutes = require('./routes/user-router'),
    port = (process.env.PORT || 5000),
    cors = require('cors')

app
    .set('port', port)

    .use(cors())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: false}))
    .use(morgan('dev'))
    .use(restFul)
    .use(userRoutes)

ioServer.listen(port)
