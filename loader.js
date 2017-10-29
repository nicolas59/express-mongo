const fs = require("fs");
const os = require("os");
const request = require("request");
const MongoClient = require("mongodb").MongoClient;
const config = require("./config");

const url =
  "https://opendata.paris.fr/explore/dataset/liste-des-antennes-wifi/download/?format=csv&timezone=Europe/Berlin&use_labels_for_header=true";

const dbUrl = config.mongo.url;
console.log("Chargement des données.");

MongoClient.connect(dbUrl, (err, db) => {
    db.collection("bornesWifi").count((err, count) =>{
    if(count == 0) {
        console.log("Chargement de données...");
        request(url, (error, response, body) => {
            if (error || response.statusCode != 200) {
            console.error("Recupération des données en echec");
            } else {
            
            body.split("\n").forEach(line => {
                const [reference, lieu, adresse, cp, ville, coord] = line.split(";");
                if (reference) {
                    const borne = {
                        reference:reference,
                        lieu:lieu,
                        adresse:adresse,
                        cp:cp,
                        ville:ville,
                        coord:coord
                    }
                    db.collection("bornesWifi").insertOne(borne);
                    console.log("Enregistrement effectué ", borne.reference);
                }
            });
            }
        });
    }else{
        console.log("Données déjà présentes. Elements : " , count );
    }
    db.close(); 
    })
});
