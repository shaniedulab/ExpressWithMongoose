const express = require('express');
const moviesControllers = require('./../Controllers/moviesControllers')

const router=express.Router();

// router.param('id',moviesControllers.checkId)

router.route('/movie-stats').get(moviesControllers.getmovieStats)
router.route('/movie-genre/:genre').get(moviesControllers.getMovieByGenre)

router.route('/')
    .get(moviesControllers.getAllMovies)
    .post(moviesControllers.createMovie)

router.route('/:id')
    .get(moviesControllers.getMovie)
    .patch(moviesControllers.updateMovie)
    .delete(moviesControllers.deleteMovie)


module.exports=router