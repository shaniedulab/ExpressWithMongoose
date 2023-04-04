// const fs =require('fs');
const Movie=require('./../Models/movieModel')
const ApiFeatures = require('./../utils/ApiFeatures')

// let  movies=JSON.parse(fs.readFileSync('./data/movies.json'));


exports.getMovieByGenre= async (req,res)=>{
    try{
       const genre=req.params.genre
       const movie=await Movie.aggregate([
        {$unwind: '$genres'},
        {$group:{
            _id:'$genres',
            movieCount:{$sum:1},
            movies:{$push:'$name'},
            
        }},
        {$addFields: { genre:'$_id'}},
        {$project:{_id:0}},
        {$sort:{movieCount:-1}},
        // {$limit:2}
        {$match:{genre:genre}}
       ])
        res.status(200).json({
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

exports.getmovieStats=async (req,res)=>{
    try{
        const stats=await Movie.aggregate([
            {$match:{rating:{$gte:7}}},
            {$group:{_id:'$price',
                avgRating:{$avg:'$rating'},
                avgPrice:{$avg:'$price'},
                minPrice:{$min:'$price'},
                maxPrice:{$max:'$price'},
                PriceTotal:{$sum:'$price'},
                moviceCount:{$sum:1}
        }},
        {$sort:{minPrice:1}},
        {$match:{maxPrice:{$gte:81}}},
        ])

        res.status(200).json({
            status:"success",
            data:{
                stats
            }
        })
    }catch(err){
        res.status(404).json({
            status:'fail',
            message:err.message
        })
    }
}

exports.getAllMovies = async (req,res)=>{
    try{
        const features= new ApiFeatures(Movie.find(),req.query).sort().filter().limitFilters().paginate()

        let movie= await features.query;

        // console.log("q",req.query);
        // const excludeFields = ['sort','page','limit','fields']
        // const queryObj= {...req.query}
        // excludeFields.forEach((el)=>{
        //     delete queryObj[el]
        // })
        // console.log(queryObj);

        // var queryStr=JSON.stringify(req.query)
        // const queryObj = JSON.parse(queryStr.replace(/\b(get|gt|let|lt)\b/g, (match) => `$${match}`))
        // console.log(queryObj);

    //sort in data 

        // var query1= Movie.find()
        // if(req.query.sort){
        //     const sortBy= req.query.sort.split(',').join(' ')
        //     query1.sort(sortBy)
        // }else{
        //     query1.sort('createdAt')
        // }

    //field limit

        // if(req.query.fields){
        //     const fields = req.query.fields.split(',').join(' ')
        //     query1=query1.select(fields)
        // }else{
        //     query1=query1.select('__v')
        // }
        // query1.select('fields price')

        // const movie= await query1

        // const movie=await Movie.find({'duration':{$gte:120}})
        // const movie=await Movie.find().where('duration').equals(req.query.duration).where('rating').equals(req.query.rating)

        // const movie=await Movie.find().where('duration').gte(req.query.duration).where('rating').gte(req.query.rating).where('price').lte(req.query.price)

        //Pagination in express
        // const page=req.query.page*1 || 1
        // const limit=req.query.limit*1 || 10
        // const skip=(page - 1) * limit
        // query1.skip(skip).limit(limit)

        // if(req.query.page){
        //     const movieCount=await Movie.countDocuments();
        //     if(skip >= movieCount){
        //         throw new Error('this page not found')
        //     }
        // }

        // const movie= await query1

        res.status(200).json({
            status:"success",
            count:movie.length,
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

exports.getMovie= async (req,res)=>{
    try{
        const movie=await Movie.findById(req.params.id);
        res.status(200).json({
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

exports.updateMovie = async (req,res)=>{
    try{
        const movie=await Movie.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidater:true});
        res.status(200).json({
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

exports.deleteMovie = async (req,res)=>{
    try{
        const movie=await Movie.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status:"success",
            data:{
                movie:null
            }
        })
    }catch(err){
        res.status(404).json({
            status:'fail',
            message:err.message
        })
    }
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
