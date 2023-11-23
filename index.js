import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser'
import cors from 'cors'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();

let QueueOpen = false;


import { getCsvData} from "./functions/csvParser.js";
import { insertData, addSongToQueue, getData, getFullQueue, crossOutSong, changeQueue, initConfig, getQueueStatus } from "./functions/mongo.js";

async function start(){
    const data = getCsvData();
    console.log(data.length)
   // insertData(data); // DONT REMOVE COMMENT
}
//initConfig();
//start();

import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO_URL+"karafun?authSource=admin").then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
});

const staticPath = path.join(__dirname, 'build/client')



server.use(express.static(staticPath))
server.use(express.json())
server.use(cors())
server.use(bodyParser.urlencoded({ extended: true }))


server.get("/api/suggest",handleGet)
server.post("/api/add", handleAdd)
server.get("/api/get-queue", handleGetQueue);
server.post("/api/cross-out", handleCrossout);
server.post("/api/open-queue", handleQueueOpen);
server.get("/api/is-queue-open", handleIsQueueOpen);

async function handleIsQueueOpen(req, res){
    const QueueOpen = await getQueueStatus();
    res.send(QueueOpen.open);
}

async function handleQueueOpen(req, res){
    const { open } = req.body;
    const data = await changeQueue(open);
    res.send(data.open);
}

async function handleCrossout(req, res){
    const data = req.body;
    await crossOutSong(data._id, data.done);
    return res.status(200).send();
}

async function handleGetQueue(req, res){
    const data = await getFullQueue();
    res.send(data);
}

async function handleAdd(req,res) {
    const data = req.body;
    console.log(data)
    const QueueOpen = await getQueueStatus();
    console.log("Warteschlange status: " + QueueOpen.open)
    if(!QueueOpen.open){
        console.log("queue closed")
        res.status(400).send();
        return;
    }
    if(data !== undefined){
        const entries = await addSongToQueue(data);
        res.send(entries);
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