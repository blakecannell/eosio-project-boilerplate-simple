const express = require("express");
const bodyParser= require('body-parser');
const app = express();
// const config = require("../config/config");

const EosController = new (require("../controllers/EosController"));

// Body parse
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Enable cors
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  next()
});

// Listen
app.listen(3000, () => {
  console.log('listening on 3000');
});

// Get proposals
app.get("/proposals", (req, res) => {
  res.send({
      success: true,
      proposals: [
        { id: 0, name: 'proposal 1' },
        { id: 1, name: 'proposal 2' }
      ]
    });
});

app.post("/createProposal",(req, res) => EosController.createProposal(req,res));
app.post("/castVote", (req, res) => EosController.castVote(req,res));
app.get("/getAll", (req, res) => EosController.getAll(req, res));
app.get("/getById/:id", (req, res) => EosController.getById(req, res));
app.get("/getVotes", (req, res) => EosController.getVotes(req, res));

module.exports = app;
