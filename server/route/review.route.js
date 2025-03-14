import express from 'express';
import {
    createReviewController,
    updateReviewController,
    deleteReviewController,
    viewReviewController,
    viewAllReviewsByUserController,
    viewAllReviewsByMovieController
} from '../controllers/review.controller.js';

const reviewRouter = express.Router();

// Create a new review
reviewRouter.post('/create', createReviewController);

// Update an existing review
reviewRouter.put('/update', updateReviewController);

// Delete a review
reviewRouter.delete('/delete', deleteReviewController);

// View a single review
reviewRouter.get('/view/:reviewId', viewReviewController);

// View all reviews by a user
reviewRouter.get('/user/:userId', viewAllReviewsByUserController);

// View all reviews for a movie
reviewRouter.get('/movie/:mediaId', viewAllReviewsByMovieController);

export default reviewRouter;
