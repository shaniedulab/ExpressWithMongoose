const mongoose = require('mongoose');
const dotenv=require('dotenv');
// const movieModel=require('./models/movieTable')
dotenv.config({path:'./config.env'})
const app = require('./app')

// console.log(app.get('env'));
// console.log(process.env);

mongoose.connect(process.env.LOCAL_CONN_STR,{
    useNewUrlParser: true,
}).then((conn) => {
    // console.log(conn);
    console.log("DB connection established");
}).catch((err) => {
    console.log("Something went wrong");
})


//create a server
const port=process.env.PORT 

app.listen(port,()=>{
    console.log("Server has started...");
})