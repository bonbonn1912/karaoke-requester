const express = require("express")
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const server = express();
const app = express()
const mongoose = require('mongoose')
const fs = require('fs')
var getCsvData = require('./functions/csvParser.js')
var insertData = require('./functions/mongo.js')
async function start(){
    const data = getCsvData();
    console.log(data.length)
   // insertData(data); // DONT REMOVE COMMENT
}

//start();


var getData = require('./functions/mongo.js')


const staticPath = path.join(__dirname, 'build/client')



server.use(express.static(staticPath))
server.use(express.json())
server.use(cors())
server.use(bodyParser.urlencoded({ extended: true }))


server.get("/api/suggest",handleGet)
server.post("/api/add", handleAdd)

async function handleAdd(req,res) {
    const data = req.body;
    if(data === undefined || data === ""){
        res.send("No data");
        return;
    }
   return res.status(200).send();
}
async function handleGet(req, res){
    const query = req.query.term;
    if(query === undefined || query === ""){
        res.send([]);
        return;
    }
   const songlist = await getData(query);
    res.send(songlist);
}

server.get('/*', (req , res) => {
    console.log(__dirname)
    const indexPath = path.resolve(__dirname, './build/client', 'index.html')  
    res.sendFile(indexPath)
})

server.listen(10000, () => { console.log("Server listening")})