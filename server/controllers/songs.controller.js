import songModel from "../models/songs.model.js";
import reviewModel from "../models/review.model.js";

// Create Song
export async function createSongController(request, response) {
    try {
        const { title, description, headerImage, posterImage, rating, artist, album, genre, releaseDate, duration, producer, composer, language } = request.body;

        if (!title || !headerImage || !artist) {
            return response.status(400).json({
                message: "Provide all required fields",
                error: true,
                success: false
            });
        }

        const newSong = new songModel(request.body);
        const save = await newSong.save();

        return response.json({
            message: "Song created successfully",
            error: false,
            success: true,
            data: save
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

// Update Song
export async function updateSongController(request, response) {
    try {
        const { songId } = request.params;
        const updateData = request.body;

        const updateSong = await songModel.findByIdAndUpdate(songId, updateData, { new: true });

        if (!updateSong) {
            return response.status(404).json({
                message: "Song not found",
                error: true,
                success: false
            });
        }

        return response.json({
            message: "Song updated successfully",
            error: false,
            success: true,
            data: updateSong
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

// Delete Song
export async function deleteSongController(request, response) {
    try {
        const { songId } = request.params;

        const deleteSong = await songModel.findByIdAndDelete(songId);

        if (!deleteSong) {
            return response.status(404).json({
                message: "Song not found",
                error: true,
                success: false
            });
        }

        return response.json({
            message: "Song deleted successfully",
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

// View Song
export async function viewSongController(request, response) {
    try {
        const { songId } = request.params;

        const song = await songModel.findById(songId);

        if (!song) {
            return response.status(404).json({
                message: "Song not found",
                error: true,
                success: false
            });
        }

        return response.json({
            message: "Song retrieved successfully",
            error: false,
            success: true,
            data: song
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

//View all songs
export async function getAllSongsController(request, response) {
    try {
        // Fetch all songs
        const songs = await songModel.find();

        // Aggregate review counts for each song
        const reviewCounts = await reviewModel.aggregate([
            { $group: { _id: "$media", count: { $sum: 1 } } }
        ]);

        // Map review counts to songs
        const songsWithReviewCounts = songs.map(song => {
            const reviewCount = reviewCounts.find(rc => rc._id.toString() === song._id.toString());
            return {
                ...song.toObject(),
                reviewCount: reviewCount ? reviewCount.count : 0
            };
        });

        return response.json({
            message: "Songs retrieved successfully",
            error: false,
            success: true,
            data: songsWithReviewCounts
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

