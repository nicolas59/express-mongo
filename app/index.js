const express = require('express')
const app = express()
const os = require("os");
const MongoClient = require('mongodb').MongoClient;
const config = require("./config"),
  logger = config.logger;
const Borne = require("./dao/Borne.js");

const dbUrl = config.mongo.url;


app.get('/', function (req, res) {
  res.send({status:"OK", hostname:os.hostname()});
})

app.get("/health", (req, res) =>{
  logger.info("récupération du statut de l'application");
  res.send({status:"OK", hostname:os.hostname()});
});

app.get("/kill", (req, res) => {
    process.exit();
});



function populateQuery(query, property, value){
  if(value){
    query[property] = value;
  }
  return query;
}

app.get("/borne",  (req, resp) => {
  const reference = req.query.reference;
  var query = {};
  query = populateQuery(query, "reference", reference);
  findByCirteria(query, req, resp);
});

app.get("/borne/count",  (req, resp) => {
  resp.setHeader("Content-Type", "application/json");
  var borne = new Borne();
  borne.connect().then(
    () => borne.count().then((count) => resp.send("{length:"+count+ "}")).then(()=>borne.close()));
 
});

function findByCirteria(query, req, resp) {
  var borne = new Borne();
  borne.connect().then(() => borne.find(query).then((docs) => {
    resp.setHeader("Content-Type", "application/json");
    resp.send(docs);
  }).then(() => borne.close()));
}

app.get("/borne/:reference", (req, resp) => {
  const reference = req.params.reference;
  logger.info("Recherche de la borne %s", reference);
  var query = populateQuery({}, "reference", reference);
  findByCirteria(query, req, resp);
});

app.listen(3000, function () {
  logger.info('Example app listening on port 3000!')
})