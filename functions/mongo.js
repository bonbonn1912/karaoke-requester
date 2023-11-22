const mongoose = require('mongoose')


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
const Song = mongoose.model('Songs', SongSchema);
module.exports = async function insertData(data){
    console.log("insert data")
    await mongoose.connect('mongodb://127.0.0.1:27017/karafun');
    try{
        const entries = await Song.insertMany(data);
        console.log(entries.length);
    }catch (err){
        console.log(err);
    }
}

module.exports = async function getData(searchString){

if(typeof searchString !== "string" || searchString === ''){
    console.log("return empty")
        return [];
   }
    await mongoose.connect('mongodb://127.0.0.1:27017/karafun');
    const regex = new RegExp(searchString, 'i');
    try{
        return await Song.find({title: regex}).limit(300);
    }catch (err){
        console.log(err);
    }
}