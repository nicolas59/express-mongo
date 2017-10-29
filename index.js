const express = require('express')
const app = express()
const os = require("os");
const MongoClient = require('mongodb').MongoClient;
const config = require("./config");

console.log('Initialisation connexion avec mongo')

const dbUrl = config.mongo.url;


app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get("/health", (req, res) =>{
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

function findByCirteria(query, req, resp) {
  MongoClient.connect(dbUrl, (err, db) => { 
    db.collection("bornesWifi").find(query).toArray((err, docs) =>{
      resp.setHeader("Content-Type", "application/json");
      resp.send(docs);
      db.close();
    });
  });
}

app.get("/borne/:reference", (req, resp) => {
  const reference = req.params.reference;
  var query = {};
  query = populateQuery(query, "reference", reference);
  findByCirteria(query, req, resp);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})