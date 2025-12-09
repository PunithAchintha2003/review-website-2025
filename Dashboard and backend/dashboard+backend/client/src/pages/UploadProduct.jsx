import { useState } from "react"
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../utils/UploadImage";
import { MdDelete } from "react-icons/md";
import ViewImage from "../component/ViewImage";
import Loading from "../component/Loading";
import { useSelector } from "react-redux"

const UploadProduct = () => {
  const [data,setData] = useState({
    name : "",
    image : [],
    category : [],
    director : "",
  })
  const [imageLoading,setImageLoading] = useState(false)
  const [ViewImageURL,setViewImageURL] = useState("")
  const allCategory = useSelector(state => state.product.allCategory)
  const [selectCategory,setSelectCategory] = useState("")

  const handlechange = (e)=>{
    const { name, value } = e.target

    setData((preve)=>{
      return{
        ...preve,
        [name] : value
      }
    })
  }

  const handleUploadImage = async(e)=>{
    const file = e.target.files[0]

    if(!file){
      return
    }
    setImageLoading(true)

    const response = await uploadImage(file)
    const { data : ImageResponse } = response
    const imageUrl = ImageResponse.data.url

    setData((preve)=>{
      return{
          ...preve,
          image : [...preve.image,imageUrl]
      }
    })
    setImageLoading(false)

  }

  const handleDeleteImage = async(index)=>{
    data.image.splice(index,1)
    setData((preve)=>{
      return{
          ...preve
      }
    })
}

  return (
    <section className="">
      <div className="p-2 bg-green-200 shadow-md flex items-center justify-between">
        <h2 className="font-semibold">Upload Product</h2>
      </div>
          <form className="grid gap-3 mx-auto p-4"> 
            <div className="grid">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter the Name"
                name="name"
                value={data.name}
                onChange={handlechange}
                required
                className="p-1 border bg-green-200 outline-none mt-1 rounded-sm"              />
            </div>

            <div className="grid">
              <label htmlFor="director">Director</label>
              <input
                id="director"
                type="text"
                placeholder="Enter the Director Name"
                name="director"
                value={data.director}
                onChange={handlechange}
                required
                className="p-1 border bg-green-200 mt-1 outline-none rounded-sm"              />
            </div>

            <p>Image</p>
            <div>
              <label htmlFor="productImage" className="bg-green-200  flex justify-center items-center h-24 rounded-sm border cursor-pointer">
                <div className="text-center flex justify-center items-center flex-col">
                {
                  imageLoading ?  <Loading/> : (
                    <>
                      <FaCloudUploadAlt size={35}/>
                      <p>Upload Image</p>
                    </>
                  )
                }
                </div>
                <input
                  type="file"
                  id="productImage"
                  className="hidden"
                  accept="image/*"
                  onChange={handleUploadImage}
                />
              </label>
              {/* Display uploaded images */}
              <div className='flex flex-wrap gap-4'>
                        {
                          data.image.map((img,index) =>{
                              return(
                                <div key={img+index} className='h-20 mt-2 w-20 min-w-20 bg-green-100 border rounded-sm relative group'>
                                  <img
                                    src={img}
                                    alt={img}
                                    className='w-full h-full object-scale-down cursor-pointer' 
                                    onClick={()=>setViewImageURL(img)}
                                  />
                                  <div onClick={()=>handleDeleteImage(index)} className='absolute bottom-0 right-0 p-1 rounded-sm bg-green-600 hover:bg-green-600 text-white hidden group-hover:block cursor-pointer'>
                                    <MdDelete/>
                                  </div>
                                </div>
                              )
                          })
                        }      
              </div>
            </div>

            <div className='grid gap-1'>
                <label className='font-medium'>Category</label>
                <div>
                  <select
                    className='p-1 border bg-green-200 mt-1 outline-none rounded-sm'
                    value={selectCategory}
                    onChange={(e)=>{
                      const value = e.target.value 
                      const category = allCategory.find(el => el._id === value )
                      
                      setData((preve)=>{
                        return{
                          ...preve,
                          category : [...preve.category,category],
                        }
                      })
                      setSelectCategory("")
                    }}
                  >
                    <option value={""}>Select Category</option>
                    {
                      allCategory.map((c, index) => {
                        return (
                          <option key={c._id + index} value={c?._id}>
                            {c.name}
                          </option>
                        )
                      })
                    }
                  </select>
                </div>
              </div>
          </form>
          {
            ViewImageURL && (
              <ViewImage url={ViewImageURL} close={()=>setViewImageURL("")}/>
            )
        }
    </section>
  )
}

export default UploadProduct