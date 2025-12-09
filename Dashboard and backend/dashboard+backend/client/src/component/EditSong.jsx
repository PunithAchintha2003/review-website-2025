import { useState } from 'react';
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/UploadImage';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';

const EditSong = ({ close, fetchData, data: songData }) => {
    const [data, setData] = useState({
        _id: songData._id,
        title: songData.title,
        artist: songData.artist,
        headerImage: songData.headerImage
    });

    const [loading, setLoading] = useState(false);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.updateSong,
                url: `${SummaryApi.updateSong.url}/${data._id}`,
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

    const handleUploadImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setLoading(true);
            const response = await uploadImage(file);
            const { data: imageResponse } = response;

            setData(prev => ({
                ...prev,
                headerImage: imageResponse.data.url
            }));
        } catch (error) {
            console.error(error);
            toast.error("Image upload failed!");
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
                        <label htmlFor='songTitle'>Title</label>
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
                        <label htmlFor='songArtist'>Artist</label>
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
                        <p>Cover Image</p>
                        <div className='flex gap-4 flex-col lg:flex-row items-center'>
                            <div className='border border-[#6cae09] bg-white h-36 w-full lg:w-36 flex items-center justify-center rounded-sm'>
                                {
                                    data.headerImage ? (
                                        <img
                                            alt='song cover'
                                            src={data.headerImage}
                                            className='w-full h-full object-scale-down'
                                        />
                                    ) : (
                                        <p className='text-sm text-black'>No Image</p>
                                    )
                                }
                            </div>
                            <label htmlFor='uploadSongImage'>
                                <div className={`px-4 py-2 rounded cursor-pointer bg-[#6cae09] hover:bg-[#6cae09] border-[#6cae09] border font-medium ${!data.title ? "cursor-not-allowed opacity-60" : ""}`}>
                                    {loading ? "Loading..." : "Upload Image"}
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
                        className={`px-4 py-2 rounded cursor-pointer mx-auto w-40 mt-2 bg-[#6cae09] hover:bg-[#6cae09] font-medium ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                        disabled={!data.title || !data.artist || !data.headerImage || loading}
                    >
                        Update Song
                    </button>
                </form>
            </div>
        </section>
    );
};

export default EditSong;
