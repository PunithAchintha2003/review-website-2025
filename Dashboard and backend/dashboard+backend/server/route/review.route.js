import express from 'express';
import { createReviewController, updateReviewController, deleteReviewController, viewReviewController, viewAllReviewsByUserController, viewAllReviewsByMovieController } from '../controllers/review.controller.js';
import auth from '../middleware/auth.js';

const reviewRouter = express.Router();

reviewRouter.post('/create', createReviewController);
reviewRouter.put('/update/:reviewId', auth, updateReviewController);
reviewRouter.delete('/delete/:reviewId', auth, deleteReviewController);
reviewRouter.get('/view/:reviewId', viewReviewController);
reviewRouter.get('/user/:userId', viewAllReviewsByUserController);
reviewRouter.get('/media/:mediaId', viewAllReviewsByMovieController);

export default reviewRouter;
