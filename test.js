const mongoose = require('mongoose')
const dotenv = require('dotenv')
const fs = require('fs')
const Movie=require('./Models/movieModel');

dotenv.config({path:'./config.env'})

//connection to database
mongoose.connect(process.env.LOCAL_CONN_STR,{
    useNewUrlParser: true,
}).then((conn) => {
    console.log("DB connection established");
}).catch((err) => {
    console.log("Something went wrong");
})

//read movies.json file
const movies =JSON.parse(fs.readFileSync('./data/movies.json','utf-8'))

//delete data from movies.json file
const deleteMovie = async ()=>{
    try{
        await Movie.deleteMany();
        console.log("Data Successfully deleted");
    }catch(err){
        console.log(err.message);
    }
    process.exit();
}


////import data from movies.json file
const importMovie = async ()=>{
    try{
        await Movie.create(movies);
        console.log("Data Successfully imported");
    }catch(err){
        console.log(err.message);
    }
    process.exit();
}

// deleteMovie()
// importMovie()

console.log(process.argv);


if(process.argv[2]=== '--import'){
    importMovie()
}
if(process.argv[2]=== '--delete'){
    deleteMovie()
}
