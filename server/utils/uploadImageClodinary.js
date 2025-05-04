import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name : process.env.CLODINARY_CLOUD_NAME,
    api_key : process.env.CLODINARY_API_KEY,
    api_secret : process.env.CLODINARY_API_SECRET_KEY
})

const uploadImageClodinary = async(image)=>{
    const buffer = image?.buffer || Buffer.from(await image.arrayBuffer());

    try {
        const uploadImage = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ folder: "green-grass" }, (error, uploadResult) => {
                if (error) {
                    console.error("Cloudinary upload error:", error); // Log Cloudinary errors
                    return reject(error);
                }
                resolve(uploadResult);
            }).end(buffer);
        });

        return {
            url: uploadImage.secure_url, // Explicitly return the URL
            ...uploadImage
        };
    } catch (error) {
        console.error("Error in uploadImageClodinary:", error); // Log any unexpected errors
        throw error;
    }
};

export default uploadImageClodinary
