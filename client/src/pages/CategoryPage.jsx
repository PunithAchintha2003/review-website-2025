import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import AxiosToastError from "../utils/AxiosToastError"
import { useSelector } from "react-redux"
import CofirmBox from "../component/CofirmBox"
import SummaryApi from "../common/SummaryApi"
import Axios from "../utils/Axios"
import Loading from "../component/Loading"
import NoData from "../component/NoData"

import UploadCategoryModel from "../component/UploadCategoryModel"
import EditCategory from "../component/EditCategory"



const CategoryPage = () => {

    const [openUploadCategory,setOpenUploadCategory] = useState(false)
    const [loading,setLoading] = useState(false)
    const [categoryData,setCategoryData] = useState([])
    const [openEdit,setOpenEdit] = useState(false)
    const [editData,setEditData] = useState({
        name : "",
        image : "",
    })
    const [openConfimBoxDelete,setOpenConfirmBoxDelete] = useState(false)
    const [deleteCategory,setDeleteCategory] = useState({
        _id : ""
    })
    const allCategory = useSelector(state => state.product.allCategory)

    useEffect(()=>{
         setCategoryData(allCategory)
     },[allCategory])

    const fetchCategory = async()=>{
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.getCategory
            })
            const { data : responseData } = response

            if(responseData.success){
                setCategoryData(responseData.data)
            }
        } catch (error) {
            
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchCategory()
    },[])

    const handleDeleteCategory = async()=>{
        try {
            const response = await Axios({
                ...SummaryApi.deleteCategory,
                data : deleteCategory
            })

            const { data : responseData } = response

            if(responseData.success){
                toast.success(responseData.message)
                fetchCategory()
                setOpenConfirmBoxDelete(false)
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }


  return (
    <section>
        <div className='p-2 bg-green-200 shadow-md flex items-center justify-between'>
            <h2 className='font-semibold'>Category</h2>
            <button onClick={()=>setOpenUploadCategory(true)} className='text-sm border cursor-pointer border-green-600 hover:bg-green-400 bg-green-300 px-3 py-1 rounded-sm'>Add Category</button>
        </div>
        {
            !categoryData[0] && !loading && (
                <NoData/>
            )
        }

        <div className='p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
            {
                categoryData.map((category, index) => {
                    return (
                        <div className='group border border-green-600 rounded-lg overflow-hidden 
                            shadow-mg hover:shadow-lg transition duration-300 flex flex-col
                            items-center p-2 bg-green-100' key={category._id}>
                                <img 
                                    alt={category.name}
                                    src={category.image}
                                    className='w-full h-32 object-contain mb-2'
                                />
                            <p className="text-center font-semibold text-gray-700 mb-3">{category.name}</p>
                            <div className='flex gap-2 w-full'>
                                <button onClick={() => {
                                    setOpenEdit(true)
                                    setEditData(category)
                                }} className='flex-1 bg-green-200 hover:bg-green-300 text-green-600 
                                    font-semibold py-1 rounded text-sm transition duration-200 cursor-pointer'>
                                    Edit
                                </button>

                                <button 
                                onClick={() => {
                                    setOpenConfirmBoxDelete(true)
                                    setDeleteCategory(category)
                                }} className='flex-1 bg-red-200 hover:bg-red-300 text-red-600 
                                    font-semibold py-1 rounded text-sm transition duration-200 cursor-pointer'>
                                    Delete
                                </button>
                            </div>
                        </div>
                    )
                })
            }
        </div>


        {
            loading && (
                <Loading/>
            )
        }

        {
            openUploadCategory && (
                <UploadCategoryModel fetchData={fetchCategory} close={()=>setOpenUploadCategory(false)}/>
            )
        }

        {
            openEdit && (
                <EditCategory data={editData} close={()=>setOpenEdit(false)} fetchData={fetchCategory}/>
            )
        }

        {
           openConfimBoxDelete && (
            <CofirmBox close={()=>setOpenConfirmBoxDelete(false)} cancel={()=>setOpenConfirmBoxDelete(false)} confirm={handleDeleteCategory}/>
           ) 
        }
    </section>
  )
}

export default CategoryPage