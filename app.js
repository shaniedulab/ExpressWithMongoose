//import package
const express = require('express');
const morgan = require('morgan');

const moviesRouter=require('./Routes/moviesRoutes')

const app = express();

const logger=(req,res,next)=>{
    console.log("custom logger");
    next();
}

app.use(express.json());
console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}
app.use(express.static('./public'));
app.use(logger);
app.use((req,res,next)=>{
    req.requestedAt=new Date().toISOString()
    next();
})


//route=HTTP method +url
// app.get('/',(rea,res)=>{
//     res.status(200).send("hello world")
// })

// app.post('/',(rea,res)=>{  
// })

// app.get('/api/movies',getAllMovies);

// app.post('/api/movies', createMovie);

// app.get('/api/movies/:id',getMovie);

// app.patch('/api/movies/:id',updateMovie)

// app.delete('/api/movies/:id',deleteMovie)



app.use('/api/movies',moviesRouter);

module.exports=app;