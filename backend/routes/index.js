const express = require("express");
const router = express.Router();
const config = require("../config/config");

const EosController = new (require("../controllers/EosController"));

//posts and gets

router.post("/createProposal",(req, res) => EosController.createProposal(req,res));


module.exports = router;
