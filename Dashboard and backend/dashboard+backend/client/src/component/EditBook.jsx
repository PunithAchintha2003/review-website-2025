import { useState } from 'react';
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/UploadImage';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';

const EditBook = ({ close, fetchData, data: bookData }) => {
    const [data, setData] = useState({
        _id: bookData._id,
        title: bookData.title,
        author: bookData.author,
        image: bookData.image
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
                ...SummaryApi.updateBook,
                url: `${SummaryApi.updateBook.url}/${data._id}`,
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
                image: imageResponse.data.url
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
                        <label htmlFor='bookTitle'>Title</label>
                        <input
                            type='text'
                            id='bookTitle'
                            name='title'
                            value={data.title}
                            onChange={handleOnChange}
                            placeholder='Enter Book Title'
                            className='p-1 border border-[#6cae09] bg-white outline-none mt-1 rounded-sm focus:ring-2 focus:ring-[#6cae09]'
                        />
                    </div>

                    <div className='grid gap-1'>
                        <label htmlFor='bookAuthor'>Author</label>
                        <input
                            type='text'
                            id='bookAuthor'
                            name='author'
                            value={data.author}
                            onChange={handleOnChange}
                            placeholder='Enter Author Name'
                            className='p-1 border border-[#6cae09] bg-white outline-none mt-1 rounded-sm focus:ring-2 focus:ring-[#6cae09]'
                        />
                    </div>

                    <div className='grid gap-1'>
                        <p>Cover Image</p>
                        <div className='flex gap-4 flex-col lg:flex-row items-center'>
                            <div className='border border-[#6cae09] bg-white h-36 w-full lg:w-36 flex items-center justify-center rounded-sm'>
                                {
                                    data.image ? (
                                        <img
                                            alt='book cover'
                                            src={data.image}
                                            className='w-full h-full object-scale-down'
                                        />
                                    ) : (
                                        <p className='text-sm text-black'>No Image</p>
                                    )
                                }
                            </div>
                            <label htmlFor='uploadBookImage'>
                                <div className={`
                                    ${!data.title ? "bg-[#6cae09]" : "border-[#6cae09] hover:bg-[#6cae09]"}
                                    px-4 py-2 rounded cursor-pointer bg-[#6cae09] hover:bg-[#6cae09] border-[#6cae09] border font-medium
                                `}>
                                    {loading ? "Loading..." : "Upload Image"}
                                </div>
                                <input
                                    disabled={!data.title}
                                    onChange={handleUploadImage}
                                    type='file'
                                    id='uploadBookImage'
                                    className='hidden'
                                />
                            </label>
                        </div>
                    </div>

                    <button
                        className={`
                            ${data.title && data.author && data.image ? "bg-[#6cae09]" : "bg-[#6cae09]"}
                            px-4 py-2 rounded cursor-pointer mx-auto w-40 mt-2 bg-[#6cae09] hover:bg-[#6cae09] font-medium
                        `}
                    >
                        Update Book
                    </button>
                </form>
            </div>
        </section>
    );
};

export default EditBook;
