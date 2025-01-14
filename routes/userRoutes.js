const express = require('express');
const router = express.Router();
const adminControllers = require(require('../models/adminControllers');

//Route for CReating an Admin USer

router.post('admin-create', adminControllers.createAdminUser);

module.exports = router;