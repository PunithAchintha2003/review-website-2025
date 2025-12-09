import { Router } from 'express'
import { createBookController, updateBookController, deleteBookController, viewBookController, getAllBooksController } from "../controllers/book.controller.js";
import auth from '../middleware/auth.js';

const bookRouter = Router()

bookRouter.get('/', getAllBooksController)
bookRouter.post('/create', auth, createBookController)
bookRouter.put('/update/:bookId', auth, updateBookController)
bookRouter.delete('/delete/:bookId', auth, deleteBookController)
bookRouter.get('/view/:bookId', viewBookController)

export default bookRouter
