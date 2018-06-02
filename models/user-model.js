'use strict'

const conn = require('../models/model')

class UserModel{
    userRegister(user,cb){
        console.log(user)
        conn.query('CALL sp_post_user(?,?,?,?,?,?,?)',[user.userName,user.userLastName1,user.userLastName2,user.userEmail,user.userPhone,user.userPassword,user.userType],cb)
    }

    userLogin(user,cb){
        //console.log(user)
        conn.query('CALL sp_post_login(?,?)',[user.userEmail,user.userType],cb)
    }
}

module.exports = UserModel