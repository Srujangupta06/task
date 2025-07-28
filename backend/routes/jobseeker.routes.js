const express = require('express');
const { getRegisteredJobSeekers, registerNewJobSeeker, uploadJobSeekerResumeFile } = require('../controllers/jobseeker.controllers');
const  upload  = require('../config/multer')

const router = express.Router();

router.get('/list', getRegisteredJobSeekers)
router.post('/registration', registerNewJobSeeker)
router.post('/uploads', upload.single('resume'), uploadJobSeekerResumeFile)

module.exports = router