'use strict'

const express = require('express'),
    app = express(),
    ioServer = require('./services/socket')(app),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    restFul  = require('express-method-override')('_method'),
    userRoutes = require('./routes/user-router'),
    jobRoutes = require('./routes/job-router'),
    port = (process.env.PORT || 5000),
    cors = require('cors'),
    cluster = require('cluster'),
    os = require('os')

app
    .set('port', port)

    .use(cors())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: false}))
    .use(morgan('dev'))
    .use(restFul)
    .use(userRoutes)
    .use(jobRoutes)
    

if(cluster.isMaster){
    for (let i = 0; i < os.cpus().length ; i++) {
        console.log('CPU N°'+i+': '+os.cpus()[i])
        cluster.fork()
    }
}else{
    console.log('Server running in PORT:'+port)
    ioServer.listen(port)
}

