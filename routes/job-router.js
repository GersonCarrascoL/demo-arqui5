'use strict'

const express = require('express'),
    router = express.Router(),
    JobController = require('../controllers/job-controller'),
    jc = new JobController()

router
    .get('/api/v1/jobs',jc.getJobs)
    .get('/api/v1/admin/:id/jobs',jc.getAdminJobs)
    .get('/api/v1/admin/jobs/:id/applicationoffer',jc.getListAplicationUsers)
    .post('/api/v1/users/aplicationoffer',jc.postUserAplicationOffer)

module.exports = router