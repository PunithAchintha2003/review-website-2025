import mongoose from 'mongoose';

const teledramaSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Provide Title"]
    },
    description: {
        type: String,
        required: [true, "Provide Description"]
    },
    poster: {
        type: String,
        required: [true, "Provide Poster"]
    },
    headerImage: {
        type: String,
        required: [true, "Provide Header Image"]
    },
    synopsis: {
        type: String,
        required: [true, "Provide Synopsis"]
    },
    rating: {
        type: Number,
        required: [true, "Provide Rating"]
    },
    genre: {
        type: String,
        required: [true, "Provide Genre"]
    },
    releaseDate: {
        type: Date,
        required: [true, "Provide Release Date"]
    },
    director: {
        type: String,
        required: [true, "Provide Director"]
    },
    producer: {
        type: String,
        required: [true, "Provide Producer"]
    },
    writer: {
        type: String,
        required: [true, "Provide Writer"]
    },
    cast: {
        type: [String],
        required: [true, "Provide Cast"]
    },
    language: {
        type: String,
        required: [true, "Provide Language"]
    },
    aspectRatio: {
        type: String,
        required: [true, "Provide Aspect Ratio"]
    }
}, {
    timestamps: true
});

const teledramaModel = mongoose.model('Teledrama', teledramaSchema);

export default teledramaModel;