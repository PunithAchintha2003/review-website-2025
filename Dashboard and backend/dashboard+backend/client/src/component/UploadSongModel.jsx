import PropTypes from 'prop-types';
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import uploadImage from "../utils/UploadImage";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';

const UploadSongModel = ({ close, fetchData }) => {
    const [data, setData] = useState({
        title: "",
        artist: "",
        headerImage: ""
    });
    const [loading, setLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUploadImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setUploadingImage(true);
            const response = await uploadImage(file);
            const { data: imageResponse } = response;
            if (imageResponse?.data?.url) {
                setData(prev => ({
                    ...prev,
                    headerImage: imageResponse.data.url
                }));
            } else {
                throw new Error("Invalid image response structure");
            }
        } catch (error) {
            console.error(error);
            toast.error("Image upload failed!");
        } finally {
            setUploadingImage(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.addSong,
                data: data
            });
            const { data: responseData } = response;
            if (responseData.success) {
                toast.success(responseData.message);
                close();
                fetchData();
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className='fixed top-0 bottom-0 left-0 right-0 p-4 bg-black/80 flex items-center justify-center'>
            <div className='bg-white max-w-4xl w-full p-4 rounded-sm'>
                <div className='flex items-center justify-between'>
                    <button onClick={close} className='w-fit rounded-sm bg-red-400 hover:bg-red-400/80 cursor-pointer block ml-auto'>
                        <IoClose size={25} />
                    </button>
                </div>
                <form className='my-3 grid gap-2' onSubmit={handleSubmit}>
                    <div className='grid gap-1'>
                        <label htmlFor='songTitle' className='text-black font-semibold'>Title</label>
                        <input
                            type='text'
                            id='songTitle'
                            name='title'
                            value={data.title}
                            onChange={handleOnChange}
                            placeholder='Enter Song Title'
                            className='p-1 border border-[#6cae09] bg-white outline-none mt-1 rounded-sm focus:ring-2 focus:ring-[#6cae09]'
                        />
                    </div>

                    <div className='grid gap-1'>
                        <label htmlFor='songArtist' className='text-black font-semibold'>Artist</label>
                        <input
                            type='text'
                            id='songArtist'
                            name='artist'
                            value={data.artist}
                            onChange={handleOnChange}
                            placeholder='Enter Artist Name'
                            className='p-1 border border-[#6cae09] bg-white outline-none mt-1 rounded-sm focus:ring-2 focus:ring-[#6cae09]'
                        />
                    </div>

                    <div className='grid gap-1'>
                        <p className='text-black font-semibold'>Header Image</p>
                        <div className='flex gap-4 flex-col lg:flex-row items-center'>
                            <div className='border border-[#6cae09] bg-white h-36 w-full lg:w-36 flex items-center justify-center rounded-sm'>
                                {
                                    data.headerImage ? (
                                        <img
                                            alt='song header'
                                            src={data.headerImage}
                                            className='w-full h-full object-scale-down rounded-sm'
                                        />
                                    ) : (
                                        <p className='text-sm text-black'>No Image</p>
                                    )
                                }
                            </div>
                            <label htmlFor='uploadSongImage'>
                                <div className={`
                                    ${!data.title ? "bg-[#6cae09]" : "border-[#6cae09] hover:bg-[#6cae09]"}  
                                    px-4 py-2 rounded cursor-pointer bg-[#6cae09] hover:bg-[#6cae09] 
                                    border-[#6cae09] border font-medium
                                    ${uploadingImage ? "cursor-not-allowed" : ""}
                                `}>
                                    {uploadingImage ? "Uploading..." : "Upload Image"}
                                </div>
                                <input
                                    disabled={!data.title}
                                    onChange={handleUploadImage}
                                    type='file'
                                    id='uploadSongImage'
                                    className='hidden'
                                />
                            </label>
                        </div>
                    </div>

                    <button
                        disabled={!data.title || !data.artist || !data.headerImage || loading}
                        className={`
                            ${data.title && data.artist && data.headerImage ? "bg-[#6cae09]" : "bg-[#6cae09]"} 
                            px-4 py-2 rounded cursor-pointer mx-auto w-40 mt-2 hover:bg-[#6cae09] 
                            border-[#6cae09] border font-medium
                        `}>
                        {loading ? "Submitting..." : "Add Song"}
                    </button>
                </form>
            </div>
        </section>
    );
};

UploadSongModel.propTypes = {
    close: PropTypes.func.isRequired,
    fetchData: PropTypes.func.isRequired,
};

export default UploadSongModel;
