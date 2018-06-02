'use strict'

const ExampleModel = require('../models/example-model'),
    em = new ExampleModel()

class ExampleController{
    index(req, res){
        return res.send('Node version is: ' + process.version)
    }
}

module.exports = ExampleController