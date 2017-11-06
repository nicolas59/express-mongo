const winston = require('winston')

const fs = require("fs");
const os = require("os");
const request = require("request");
const MongoClient = require("mongodb").MongoClient;
const config = require("./config");

const url =
  "https://opendata.paris.fr/explore/dataset/liste-des-antennes-wifi/download/?format=csv&timezone=Europe/Berlin&use_labels_for_header=true";

const dbUrl = config.mongo.url,
    logger = config.logger;
const Borne = require("./dao/Borne.js");
const borne = new Borne();


borne.connect().then(()=> {
    logger.info("Vérification contenu de la base de données");
    borne.count().then(count => {
        if(count === 0){
            request(url, (error, response, body) => {
                const lines = body.split("\r\n")
                .filter(line => {return line && line.length >0})
                .map(line => {
                    const [reference, lieu, adresse, cp, ville, coord] = line.split(";");
                    return {
                        reference:reference,
                        lieu:lieu,
                        adresse:adresse,
                        cp:cp,
                        ville:ville,
                        coord:coord
                    }
                });
                logger.info("Nombre de lignes : %d", lines.length);
                borne.insertRow(lines).then(()=> borne.close());
        })
    }else{
        logger.info("Base de données déjà peuplée");
        borne.close();
    }
    })
})