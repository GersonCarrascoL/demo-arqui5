'use strict'

const conn = require('../models/model')

class JobModel{
    getJobs(cb){
        conn.query('CALL sp_get_joboffer',cb)
    }

    getJobAdmin(idAdmin , cb){
        conn.query('CALL sp_get_adminjoboffer(?)',[idAdmin],cb)
    }

    postUserAplicationOffer(data,cb){
        conn.query('CALL sp_post_aplicationjoboffer(?,?)',[data.idUser,data.idJob],cb)
    }

    getListAplicationUsers(data,cb){
        conn.query('CALL sp_get_listuserapplication(?)',[data.idJob],cb)
    }
}

module.exports = JobModel