'use strict'

const UserModel = require('../models/user-model'),
    um = new UserModel(),
    jwtService = require('../services/jwt'),
    jwt = new jwtService(),
    bcrypt = require('bcrypt')  

class UserController{
    userRegister(req,res) {
        let user = {
            userName: req.body.userName,
            userLastName1: req.body.userLastName1,
            userLastName2: req.body.userLastName2,
            userEmail: req.body.userEmail,
            userPassword: req.body.userPassword,
            userPhone: req.body.userPhone,
            userType : req.body.userType
        }
        console.log(user)
        bcrypt.hash(user.userPassword, 10, function (err, hash) {
            user.userPassword = hash
            if (err) {
                return res.status(500).send({
                    message: err.stack
                })
            }
            um.userRegister(user, (err, data ) => {
                if (err) {
                    return res.status(500).send({
                        message: err.stack
                    })
                } else {
                    return res.status(201).send({
                        token: jwt.createToken(user)
                    })
                }
            })
        })
    }

    userLogin(req,res){
        let user = {
            userEmail: req.body.userEmail,
            userPassword: req.body.userPassword,
            userType: req.body.userType
        }

        um.userLogin(user, (err, data) => {
            if (err) {
                return res.status(500).send({
                    message: err.stack
                })
            } else if (data[0].length == 0) {
                return res.status(202).send({
                    message: `No data`
                })
            } else {
                console.log(data)
                bcrypt.compare(user.userPassword, data[0][0].UserPassword, function (err, response) {
                    if (response == true) {                
                        return res.status(200).send({
                            token: jwt.createToken(user),
                            user:{
                                idUser:data[0][0].idUser,
                                userName:data[0][0].UserName,
                                userLastName1:data[0][0].UserLastName1,
                                userLastName2:data[0][0].UserLastName2,
                                userEmail:data[0][0].UserEmail,
                                userPhone:data[0][0].UserPhone,
                                userType:data[0][0].UserType
                            }
                        })
                    } else {
                        return res.status(202).send({
                            message: 'Email or Password wrong'
                        })
                    }
                })
            }
        })
    }
}

module.exports = UserController