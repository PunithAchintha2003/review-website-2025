import OtherModel from "../models/other.model.js"

// Create Other
export async function createOtherController(request, response) {
    try {
        const { title, description, headerImage, posterImage, rating, author, genre, releaseDate, language } = request.body

        if (!title || !description || !headerImage || !posterImage || !rating || !author || !genre || !releaseDate || !language) {
            return response.status(400).json({
                message: "Provide all required fields",
                error: true,
                success: false
            })
        }

        const newOther = new OtherModel({ title, description, headerImage, posterImage, rating, author, genre, releaseDate, language })
        const save = await newOther.save()

        return response.json({
            message: "Other created successfully",
            error: false,
            success: true,
            data: save
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// Update Other
export async function updateOtherController(request, response) {
    try {
        const { id } = request.params
        const updateData = request.body

        const updateOther = await OtherModel.findByIdAndUpdate(id, updateData, { new: true })

        if (!updateOther) {
            return response.status(404).json({
                message: "Other not found",
                error: true,
                success: false
            })
        }

        return response.json({
            message: "Other updated successfully",
            error: false,
            success: true,
            data: updateOther
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// Delete Other
export async function deleteOtherController(request, response) {
    try {
        const { id } = request.params

        const deleteOther = await OtherModel.findByIdAndDelete(id)

        if (!deleteOther) {
            return response.status(404).json({
                message: "Other not found",
                error: true,
                success: false
            })
        }

        return response.json({
            message: "Other deleted successfully",
            error: false,
            success: true
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// View Other
export async function viewOtherController(request, response) {
    try {
        const { id } = request.params

        const other = await OtherModel.findById(id)

        if (!other) {
            return response.status(404).json({
                message: "Other not found",
                error: true,
                success: false
            })
        }

        return response.json({
            message: "Other fetched successfully",
            error: false,
            success: true,
            data: other
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//View all others
export async function getAllOthersController(request, response) {
    try {
        const others = await OtherModel.find();

        return response.json({
            message: "Others retrieved successfully",
            error: false,
            success: true,
            data: others
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}
