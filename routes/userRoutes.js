const express = require("express");
const router = express.Router();
const adminControllers = require("../controllers/adminControllers");

//Route for CReating an Admin USer

router.post("admin-create", adminControllers.createAdminUser);

module.exports = router;
