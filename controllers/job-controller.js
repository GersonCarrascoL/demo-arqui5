'use strict'

const JobModel = require('../models/job-model'),
    jm = new JobModel()

class JobController{
    getJobs(req,res){
        jm.getJobs((err,data)=>{
            if(err){
                return res.status(500).send({
                    message:err.stack
                })
            }

            return res.status(200).send({
                jobs:data[0]
            })
        })
    }

    getAdminJobs(req,res){
        let idAdmin = req.params.id
        console.log(idAdmin)
        jm.getJobAdmin(idAdmin,(err,data)=>{
            if(err){
                return res.status(500).send({
                    message:err.stack
                })
            }
            return res.status(200).send({
                jobs:data[0]
            })
        })
    }

    postUserAplicationOffer(req,res){
        let data = {
            idUser : req.body.idUser,
            idJob : req.body.idJob
        }

        jm.postUserAplicationOffer(data,(err,response)=>{
            if(err){
                return res.status(500).send({
                    message:err.stack
                })
            }
            if(response[0][0].response == 1){
                return res.status(201).send({
                    message:'Correctly insert'
                }) 
            }else{
                return res.status(400).send({
                    message:'Error insert'
                })
            }
            
        })
    }

    getListAplicationUsers(req,res){
        let data ={
            idJob: req.params.id
        }
        jm.getListAplicationUsers(data,(err,data)=>{
            if(err){
                return res.status(500).send({
                    message:err.stack
                })
            }

            return res.status(200).send({
                users:data[0]
            })
        })
    }
}

module.exports = JobController