import reviewModel from "../models/review.model.js";

// Create a new review
export async function createReviewController(request, response) {
    try {
        const { user, media, rating, reviewText, reviewHeading } = request.body;

        if (!user || !media || !rating || !reviewText || !reviewHeading) {
            return response.status(400).json({
                message: "Provide all required fields",
                error: true,
                success: false
            });
        }

        const newReview = new ReviewModel({ user, media, rating, reviewText, reviewHeading });
        const savedReview = await newReview.save();

        return response.json({
            message: "Review created successfully",
            error: false,
            success: true,
            data: savedReview
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

// Update an existing review
export async function updateReviewController(request, response) {
    try {
        const { reviewId, rating, reviewText, reviewHeading } = request.body;

        if (!reviewId || (!rating && !reviewText && !reviewHeading)) {
            return response.status(400).json({
                message: "Provide review ID and at least one field to update",
                error: true,
                success: false
            });
        }

        const updatedReview = await ReviewModel.findByIdAndUpdate(reviewId, {
            ...(rating && { rating }),
            ...(reviewText && { reviewText }),
            ...(reviewHeading && { reviewHeading })
        }, { new: true });

        return response.json({
            message: "Review updated successfully",
            error: false,
            success: true,
            data: updatedReview
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

// Delete a review
export async function deleteReviewController(request, response) {
    try {
        const { reviewId } = request.body;

        if (!reviewId) {
            return response.status(400).json({
                message: "Provide review ID",
                error: true,
                success: false
            });
        }

        await ReviewModel.findByIdAndDelete(reviewId);

        return response.json({
            message: "Review deleted successfully",
            error: false,
            success: true
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

// View a single review
export async function viewReviewController(request, response) {
    try {
        const { reviewId } = request.params;

        if (!reviewId) {
            return response.status(400).json({
                message: "Provide review ID",
                error: true,
                success: false
            });
        }

        const review = await ReviewModel.findById(reviewId).populate('user').populate('media');

        return response.json({
            message: "Review fetched successfully",
            error: false,
            success: true,
            data: review
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

// View all reviews by a user
export async function viewAllReviewsByUserController(request, response) {
    try {
        const { userId } = request.params;

        if (!userId) {
            return response.status(400).json({
                message: "Provide user ID",
                error: true,
                success: false
            });
        }

        const reviews = await ReviewModel.find({ user: userId }).populate('media');

        return response.json({
            message: "Reviews fetched successfully",
            error: false,
            success: true,
            data: reviews
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

// View all reviews for a movie
export async function viewAllReviewsByMovieController(request, response) {
    try {
        const { mediaId } = request.params;

        if (!mediaId) {
            return response.status(400).json({
                message: "Provide media ID",
                error: true,
                success: false
            });
        }

        const reviews = await ReviewModel.find({ media: mediaId }).populate('user');

        return response.json({
            message: "Reviews fetched successfully",
            error: false,
            success: true,
            data: reviews
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}
