import mongoose from 'mongoose';
const SongSchema = new mongoose.Schema({
    id: String,
    title: String,
    artist: String,
    imgUrl: {type: String, default: ''},
    year: String,
    duo: String,
    explicit: String,
    language: String,
});
const QueueSchema = new mongoose.Schema({
    title: String,
    artist: String,
    singer: String,
    imgUrl: String,
    requestTime: { type: Date, default: Date.now },
    done: { type: Boolean, default: false },
    doneAt: { type: Date, required: false  },
});

const ConfigSchema = new mongoose.Schema({
    open: { type: Boolean, default: false }
});



const Config = mongoose.model('Config', ConfigSchema);
const Queue = mongoose.model('Queue', QueueSchema);
const Song = mongoose.model('Songs', SongSchema);
export async function insertData(data){
    console.log("insert data")

    try{
        const entries = await Song.insertMany(data);
        console.log(entries.length);
    }catch (err){
        console.log(err);
    }
}

export async function getFullQueue(){

    try{
        return await Queue.find();
    }catch (err){
        console.log(err);
    }
}

export async function crossOutSong(id, done){

    try{
        return await Queue.updateOne({_id: id}, {done: done, doneAt: Date.now()});
    }catch (err){
        console.log(err);
    }
}
export async function changeQueue(open){

    console.log("New Queue Status : " + !open)
    try{
        return await Config.findOneAndUpdate({}, {open: !open}, {new: open})
    }catch (err){
        console.log(err);
    }
}

export async function getQueueStatus(){
    try{
        return await Config.findOne({});
    }catch (err){
        console.log(err);
    }
}

export async function initConfig(){

   const res = await Config.create({
        open: false
    });
   console.log(res);
}


export async function getData(searchString){

    if(typeof searchString !== "string" || searchString === ''){
    console.log("return empty")
        return [];
   }

    const regex = new RegExp(searchString, 'i');
    try{
        return await Song.find({ $or: [{ title: regex }, { artist: regex }] }).limit(80)
    }catch (err){
        console.log(err);
    }
}

export async function addSongToQueue(song){

    if(typeof song !== "object" || song === null){
        return [];
    }
    try{
        return await Queue.create(song);
    }catch (err){
        console.log(err);
    }
}
