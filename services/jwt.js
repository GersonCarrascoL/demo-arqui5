'use strict'

const jwt = require('jsonwebtoken'),
    config = require('../config')

class JWTClass{
    createToken(user) {
        const payload = {
            sub : user.userEmail
        }

        return jwt.sign(payload,config.SECRET_TOKEN)
    }
}

module.exports = JWTClass