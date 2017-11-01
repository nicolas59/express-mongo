const fs = require("fs");
const os = require("os");
const request = require("request");
const MongoClient = require("mongodb").MongoClient;
const config = require("./config");

const url =
  "https://opendata.paris.fr/explore/dataset/liste-des-antennes-wifi/download/?format=csv&timezone=Europe/Berlin&use_labels_for_header=true";

const dbUrl = config.mongo.url;
console.log("Chargement des données.");

const Borne = require("./dao/Borne.js");
const borne = new Borne();

borne.connect().then(()=> {
    borne.count().then(count => {
        if(count === 0){
            console.log("Chargement de données...");
            request(url, (error, response, body) => {
                var lines = [];
                body.split("\r\n").forEach(line => {
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
                        lines.push(borne);
                    }
                });
                borne.insert(lines).then(()=> borne.close());
        })
    }else{
        borne.close();
    }
    })
})