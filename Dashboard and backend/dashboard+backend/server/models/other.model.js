import mongoose from "mongoose";

const otherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Provide Title"]
    },
    description: {
        type: String,
        required: [true, "Provide Description"]
    },
    headerImage: {
        type: String,
        required: [true, "Provide Header Image"]
    },
    posterImage: {
        type: String,
        required: [true, "Provide Poster Image"]
    },
    rating: {
        type: Number,
        required: [true, "Provide Rating"]
    },
    author: {
        type: String,
        required: [true, "Provide Author"]
    },
    genre: {
        type: String,
        required: [true, "Provide Genre"]
    },
    releaseDate: {
        type: Date,
        required: [true, "Provide Release Date"]
    },
    language: {
        type: String,
        required: [true, "Provide Language"]
    }
}, { timestamps: true });

const otherModel = mongoose.model("other", otherSchema);

export default otherModel;