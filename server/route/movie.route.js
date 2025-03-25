import { Router } from 'express'
import { createMovieController, updateMovieController, deleteMovieController, viewMovieController } from "../controllers/movie.controller.js";
import auth from '../middleware/auth.js';

const movieRouter = Router()

movieRouter.post('/create', auth, createMovieController)
movieRouter.put('/update/:movieId', auth, updateMovieController)
movieRouter.delete('/delete/:movieId', auth, deleteMovieController)
movieRouter.get('/view/:movieId', viewMovieController)

export default movieRouter
