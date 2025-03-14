import { Router } from 'express'
import { createBookController, updateBookController, deleteBookController, viewBookController } from "../controllers/book.controller.js";
import auth from '../middleware/auth.js';

const bookRouter = Router()

bookRouter.post('/create', auth, createBookController)
bookRouter.put('/update/:id', auth, updateBookController)
bookRouter.delete('/delete/:id', auth, deleteBookController)
bookRouter.get('/view/:id', viewBookController)

export default bookRouter
