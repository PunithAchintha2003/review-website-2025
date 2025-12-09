import mongoose from "mongoose";

const songsSchema = new mongoose.Schema({
    title : {
        type: String,
        required: [true, "Provide Title"]
    },
    description: {
        type: String,
        required: [false, "Provide Description"]
    },
    headerImage: {
        type: String,
        required: [true, "Provide Header Image"]
    },
    posterImage: {
        type: String,
        required: [false, "Provide Poster Image"]
    },
    rating: {
        type: Number,
        required: [false, "Provide Rating"]
    },
    artist: {
        type: String,
        required: [true, "Provide Artist"]
    },
    album: {
        type: String,
        required: [false, "Provide Album"]
    },
    genre: {
        type: String,
        required: [false, "Provide Genre"]
    },
    releaseDate: {
        type: Date,
        required: [false, "Provide Release Date"]
    },
    duration: {
        type: String,
        required: [false, "Provide Duration"]
    },
    producer: {
        type: String,
        required: [false, "Provide Producer"]
    },
    composer: {
        type: String,
        required: [false, "Provide Composer"]
    },
    language: {
        type: String,
        required: [false, "Provide Language"]
    }
}, { timestamps: true });

const songModel = mongoose.model("song", songsSchema);

export default songModel;