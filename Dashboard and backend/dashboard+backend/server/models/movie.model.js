import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Provide Title"]
    },
    description: {
        type: String,
        required: [false, "Provide Description"]
    },
    poster: {
        type: String,
        required: [false, "Provide Poster"]
    },
    headerImage: {
        type: String,
        required: [false, "Provide Header Image"]
    },
    rating: {
        type: Number,
        required: [false, "Provide Rating"]
    },
    synopsis: {
        type: String,
        required: [false, "Provide Synopsis"]
    },
    genre: {
        type: String,
        required: [false, "Provide Genre"]
    },
    releaseDate: {
        type: Date,
        required: [false, "Provide Release Date"]
    },
    director: {
        type: String,
        required: [true, "Provide Director"]
    },
    producer: {
        type: String,
        required: [false, "Provide Producer"]
    },
    writer: {
        type: String,
        required: [false, "Provide Writer"]
    },
    cast: {
        type: [String],
        required: [false, "Provide Cast"]
    },
    language: {
        type: String,
        required: [false, "Provide Language"]
    },
    duration: {
        type: String,
        required: [false, "Provide Duration"]
    },
    aspectRatio: {
        type: String,
        required: [false, "Provide Aspect Ratio"]
    }
}, {
    timestamps: true
});

const movieModel = mongoose.model("Movie", movieSchema);

export default movieModel;