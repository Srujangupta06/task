const express = require('express');
const { registerEmployer , imageUpload} = require('../controllers/employer.controllers');
const upload=require('../config/multer');


const router = express.Router();

router.post('/registration',registerEmployer)
router.post('/imageupload',upload.single("image"),imageUpload);

module.exports = router;