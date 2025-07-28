const express = require('express');
const { registerEmployer } = require('../controllers/employer.controllers');

const router = express.Router();

router.post('/registration',registerEmployer)

module.exports = router;