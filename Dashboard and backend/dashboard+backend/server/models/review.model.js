import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    media: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Media',
        required: true
    },
    rating: {
        type: Number,
        required: false,
        min: 1,
        max: 5
    },
    reviewText: {
        type: String,
        required: true
    },
    reviewHeading: {
        type: String,
        required: true
    },
    reviewLink: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

const reviewModel = mongoose.model("review", reviewSchema);

export default reviewModel;