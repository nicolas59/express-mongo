const express = require('express')
const app = express()
const os = require("os");
const MongoClient = require('mongodb').MongoClient;

console.log('Initialisation connexion avec mongo')
MongoClient.connect('mongodb://mongo:27017/todo', function(err, db) { console.log(db); });

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get("/health", (req, res) =>{
    res.send({status:"OK", hostname:os.hostname()});
});

app.get("/kill", (req, res) => {
    process.exit();
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})