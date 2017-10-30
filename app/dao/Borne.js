
const MongoClient = require('mongodb').MongoClient;
const config = require("../config");

const collectionName = "bornesWifi"

function Borne(){
    this.db = null;
}

module.exports = Borne;

Borne.prototype.connect = () => {
    var _this = this;
    return new Promise((resolve, reject) =>{
        MongoClient.connect(config.mongo.url)
            .then(
                (db) =>{ 
                     _this.db = db;
                     console.log("Connexion db reussie");
                     resolve();},
                (err) => {reject(err.message);})
    })
}

Borne.prototype.count = (query) => {
    var _this = this;
    return new Promise((resolve, reject) =>{
        _this.db.collection(collectionName, {strict:false}, function(error, collection) {
            if(error) {
                reject(error.message);
            }else{
                collection.count().then(
                    (count) => { 
                        console.log("Ng enregistrements : ", count);
                        resolve(count);},
                    (error) => {reject(err.message);}
                )
            }
        });
    });
}

Borne.prototype.find = (criteria) => {
    var _this=this;
    return new Promise((resolve, reject) => {
        _this.db.collection(collectionName).find(criteria).toArray((err, docs) =>{
            if(err){
                reject(err);
            }else{
                resolve(docs);
            }
        })
    });
}

Borne.prototype.close = () => {
   if(this.db){
       console.log("Fermeture de la connexion");
       this.db.close();
   }
}