'use strict'

const JobModel = require('../models/job-model'),
    jm = new JobModel(),
    _performance = require('perf_hooks').performance,
    util = require('util'),
    debug = util.debuglog('performance')

class JobController{
    getJobs(req,res){
        _performance.mark('Start procedure')
        jm.getJobs((err,data)=>{
            _performance.mark('End procedure')

            __performance.measure('Beginning to End','Start procedure','End procedure')

            var measurements = _performance.getEntriesByType('measure')

            measurements.forEach( measurements => {
                console.log('\x1b[33m%s\x1b[0m',measurements.name+' '+measurements.duration)
            })
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
            console.log(data)
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