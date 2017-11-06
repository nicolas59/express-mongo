
const MongoClient = require('mongodb').MongoClient;
const config = require("../config"),
    logger = config.logger;

const collectionName = "bornesWifi"

function Borne(){
    this.db = null;
}

module.exports = Borne;

Borne.prototype.connect = () => {
    return new Promise((resolve, reject) =>{
        MongoClient.connect(config.mongo.url)
            .then(
                (db) =>{ 
                     this.db = db;
                     logger.info("Connexion db reussie");
                     resolve();},
                (err) => {reject(err.message);})
    })
}

Borne.prototype.count = (query) => {
    return new Promise((resolve, reject) =>{
        this.db.collection(collectionName, {strict:false}, function(error, collection) {
            if(error) {
                reject(error.message);
            }else{
                collection.count().then(
                    (count) => { 
                        logger.info("Ng enregistrements : %d", count);
                        resolve(count);},
                    (error) => {reject(err.message);}
                )
            }
        });
    });
}

Borne.prototype.find = (criteria) => {
    return new Promise((resolve, reject) => {
        this.db.collection(collectionName).find(criteria).toArray((err, docs) =>{
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
       logger.info("Fermeture de la connexion");
       this.db.close();
   }
}

Borne.prototype.insertRow = (bornes) => {
    return new Promise((resolve, reject) => {
        this.db.collection(collectionName, {strict:false}, (err, col) => {
            if(err) {
                reject(err);
            }else{
                col.insert(bornes, (err, results) => {resolve(results)});
            }
        });
     })
};
