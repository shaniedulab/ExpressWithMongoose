// const fs =require('fs');
const Movie=require('./../Models/movieModel')

// let  movies=JSON.parse(fs.readFileSync('./data/movies.json'));




exports.getAllMovies = (req,res)=>{
   
}

exports.createMovie= async (req, res) => {
    try{
        const movie=await Movie.create(req.body);
        res.status(201).json({
            status:"success",
            data:{
                movie
            }
        })
    }catch(err){
        res.status(404).json({
            status:'fail',
            message:err.message
        })
    }
}

exports.getMovie=(req,res)=>{
    
}

exports.updateMovie = (req,res)=>{
    
}

exports.deleteMovie =(req,res)=>{
    
}




// exports.checkId=(req,res,next,value) => {
//     console.log("id: " + value);
//     const movie=movies.find((el)=>{
//         return el.id===value*1
//     }) 

//     if(!movie){
//         return res.status(404).json({
//             status:"fail",
//             message:"Movie with id '"+value+"' not found"
//         })
//     }

//     next()
// }

// exports.validateBody = (req,res,next) => {
//     if(!req.body.name || !req.body.releaseYear){
//         return res.status(400).json({
//             status:'fail',
//             message:"Not a valid movies data"
//         })
//     }
//     next()
// }

//route handler function
// exports.getAllMovies = (req,res)=>{
//     res.status(200).json({
//         status:"Success",
//         requestedAt:req.requestedAt,
//         count:movies.length,
//         data:{
//             movies:movies
//         }
//     });
// }

// exports.createMovie= (req, res) => {
//     // console.log(req.body);
//     const newId=movies[movies.length-1].id+1;
//     console.log(newId);
//     const newmovies=Object.assign({id:newId},req.body);
//     movies.push(newmovies)
//     fs.writeFile('./data/movies.json', JSON.stringify(movies),(err)=>{
//         res.status(201).json({
//             status:"success",
//             data:{movies:newmovies}
//         })
//     })
//     // res.send('Created')
// }

// exports.getMovie=(req,res)=>{
//     console.log(req.params);
//     const id=req.params.id*1
//     const movie=movies.find((el)=>{
//         return el.id==id
//     }) 

//     // if(!movie){
//     //     return res.status(404).json({
//     //         status:"fail",
//     //         message:"Movie with id '"+id+"' not found"
//     //     })
//     // }

//     res.status(200).json({
//         status:"success",
//         data:{
//             movie:movie,
//         }
//     })
// }

// exports.updateMovie = (req,res)=>{
//     let id=req.params.id*1
//     let moviesToUpdate=movies.find((el)=>{
//         return el.id===id
//     })
//     // if(!moviesToUpdate){
//     //     return res.status(404).json({
//     //         status:"fail",
//     //         message:"Movie with id '"+id+"' not found"
//     //     })
//     // }
//     let index=movies.indexOf(moviesToUpdate);
//     const updateMovies=Object.assign(moviesToUpdate,req.body)
//     movies[index]=updateMovies

//     fs.writeFile('./data/movies.json',JSON.stringify(movies),(err)=>{
//         res.status(200).json({
//             status:"success",
//             data:{
//                 movies:updateMovies
//             }
//         })
//     })
// }

// exports.deleteMovie =(req,res)=>{
//     const id=req.params.id*1;
//     const movieToDelete=movies.find((el)=>el.id===id)

//     // if(!movieToDelete){
//     //     return res.status(404).json({
//     //         status:"fail",
//     //         message:"Movie with id '"+id+"' not found to delete"
//     //     })
//     // }

//     const index=movies.indexOf(movieToDelete);

//     movies.splice(index,1);
//     fs.writeFile('./data/movies.json',JSON.stringify(movies),(err)=>{
//         res.status(204).json({
//             status:"success",
//             data:{
//                 movies:null
//             }
//         })
//     })
// }
