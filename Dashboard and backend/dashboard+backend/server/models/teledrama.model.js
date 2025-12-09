import mongoose from 'mongoose';

const teledramaSchema = mongoose.Schema({
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
        required: [true, "Provide Header Image"]
    },
    synopsis: {
        type: String,
        required: [false, "Provide Synopsis"]
    },
    rating: {
        type: Number,
        required: [false, "Provide Rating"]
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
    aspectRatio: {
        type: String,
        required: [false, "Provide Aspect Ratio"]
    }
}, {
    timestamps: true
});

const teledramaModel = mongoose.model('Teledrama', teledramaSchema);

export default teledramaModel;