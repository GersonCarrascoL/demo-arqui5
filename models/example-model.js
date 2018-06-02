'use strict'

const conn = require('./model')

class ExampleModel{
    example(){
        //queries database
        conn.query()
    }
}

module.exports = ExampleModel