import { Router } from 'express'
import { createMovieController, updateMovieController, deleteMovieController, viewMovieController } from "../controllers/movie.controller.js";
import auth from '../middleware/auth.js';

const movieRouter = Router()

movieRouter.post('/create', auth, createMovieController)
movieRouter.put('/update/:id', auth, updateMovieController)
movieRouter.delete('/delete/:id', auth, deleteMovieController)
movieRouter.get('/view/:id', viewMovieController)

export default movieRouter
