const express = require("express");
const router = express.Router();
const adminControllers = require("../controllers/adminControllers");
const registerControllers = require("../models/controller/registerControllers");
//Route for CReating an Admin USer

router.post("admin-create", adminControllers.createAdminUser);
router.post("/register", registerControllers.register);
module.exports = router;
