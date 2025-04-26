import mongoose from "mongoose";

const songsSchema = new mongoose.Schema({
    name : {
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
    artist: {
        type: String,
        required: [true, "Provide Artist"]
    },
    album: {
        type: String,
        required: [true, "Provide Album"]
    },
    genre: {
        type: String,
        required: [true, "Provide Genre"]
    },
    releaseDate: {
        type: Date,
        required: [true, "Provide Release Date"]
    },
    duration: {
        type: String,
        required: [true, "Provide Duration"]
    },
    producer: {
        type: String,
        required: [true, "Provide Producer"]
    },
    composer: {
        type: String,
        required: [true, "Provide Composer"]
    },
    language: {
        type: String,
        required: [true, "Provide Language"]
    }
}, { timestamps: true });

const songModel = mongoose.model("song", songsSchema);

export default songModel;