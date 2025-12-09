import reviewModel from "../models/review.model.js";

// Create a new review
export async function createReviewController(request, response) {
    try {
        const { user, media, rating, reviewText, reviewHeading, reviewLink } = request.body;

        if (!user || !media || !reviewText || !reviewHeading) {
            return response.status(400).json({
                message: "Provide all required fields",
                error: true,
                success: false
            });
        }

        const newReview = new reviewModel(request.body);
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

        const { reviewId } = request.params;
        const updateData = request.body;

        const updatedReview = await reviewModel.findByIdAndUpdate(reviewId, updateData, { new: true });

        if (!updatedReview) {
            return response.status(404).json({
                message: "Review not found",
                error: true,
                success: false
            });
        }

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
        const { reviewId } = request.params;

        if (!reviewId) {
            return response.status(400).json({
                message: "Provide review ID",
                error: true,
                success: false
            });
        }

        await reviewModel.findByIdAndDelete(reviewId);

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

        const review = await reviewModel.findById(reviewId);

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

        const reviews = await reviewModel.find({ user: userId });

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

        const reviews = await reviewModel.find({ media: mediaId });

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
