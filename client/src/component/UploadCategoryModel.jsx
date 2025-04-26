import PropTypes from 'prop-types';
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import uploadImage from "../utils/UploadImage";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError';

const UploadCategoryModel = ({close, fetchData}) => {
    const [data,setData] = useState({
        name : "",
        image : ""
    })
    const [loading,setLoading] = useState(false)
    const [uploadingImage, setUploadingImage] = useState(false)

    const handleOnChange = (e)=>{
        const { name, value} = e.target

        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()

        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.addCategory,
                data : data
            })
            const { data : responseData } = response

            if(responseData.success){
                toast.success(responseData.message)
                close()
                fetchData()
            }
        } catch (error) {
            AxiosToastError(error)
        }finally{
            setLoading(false)
        }
    }

    const handleUploadCategoryImage = async(e) => {
        const file = e.target.files[0];
    
        if (!file) {
            return;
        }
    
        try {
            setUploadingImage(true)
            const response = await uploadImage(file);
            const { data: ImageResponse } = response;
    
            setData((prev) => ({
                ...prev,
                image: ImageResponse.data.url
            }));
        } catch (error) {
            console.error(error);
            toast.error("Image upload failed!");
        } finally {
            setUploadingImage(false)
        }
    }
    

  return (
    <section className='fixed top-0 bottom-0 left-0 right-0 p-4 bg-green-800/60 flex items-center justify-center'>
        <div className='bg-green-100 max-w-4xl w-full p-4 rounded-sm'>
            <div className='flex items-center justify-between'>
                    <h1 className='font-semibold'>Category</h1>
                    <button onClick={close} className='w-fit rounded-sm bg-green-300 hover:bg-green-400 cursor-pointer block ml-auto'>
                        <IoClose size={25}/>
                    </button>
            </div>
            <form className='my-3 grid gap-2' onSubmit={handleSubmit}>
                <div className='grid gap-1'>
                        <label id='categoryName'>Name</label>
                        <input
                            type='text'
                            id='categoryName'
                            placeholder='Enter Category Name'
                            value={data.name}
                            name='name'
                            onChange={handleOnChange}
                            className='p-1 border bg-green-200 outline-none mt-1 rounded-sm'
                        />
                </div>
                
                <div className='grid gap-1'>
                    <p>Image</p>
                    <div className='flex gap-4 flex-col lg:flex-row items-center'>
                        <div className='border bg-green-200 h-36 w-full lg:w-36 flex items-center justify-center rounded-sm'>
                                {
                                    data.image ? (
                                        <img
                                            alt='category'
                                            src={data.image}
                                            className='w-full h-full object-scale-down'
                                        />
                                    ) : (
                                        <p className='text-sm  text-green-600'>No Image</p>
                                    )
                                }                  
                        </div>
                        <label htmlFor='uploadCategoryImage'>
                        <div  className={`
                        ${!data.name ? "bg-green-200" : "border-green-600 hover:bg-green-200" }  
                            px-4 py-2 rounded cursor-pointer bg-green-300 hover:bg-green-400 border-green-600 border font-medium
                            ${uploadingImage ? "cursor-not-allowed" : ""}
                        `}>
                            {
                                uploadingImage ? "Uploading..." : "Upload Image"
                            }   
                        </div>

                            <input disabled={!data.name} onChange={handleUploadCategoryImage} type='file' id='uploadCategoryImage' className='hidden'/>
                        </label>
                    </div>
                </div>

                <button
                    className={`
                    ${data.name && data.image ? "bg-green-200" : "border-green-600 hover:bg-green-200"}
                    px-4 py-2 rounded cursor-pointer mx-auto w-40 mt-2 bg-green-300 hover:bg-green-400 border-green-600 border font-medium`}>
                    Add Category</button>
            </form>
        </div>
    </section>
  )
}

UploadCategoryModel.propTypes = {
    close: PropTypes.func.isRequired,
    fetchData: PropTypes.func.isRequired,
  };

export default UploadCategoryModel