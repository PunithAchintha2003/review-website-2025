import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import AxiosToastError from "../utils/AxiosToastError"
import { useSelector } from "react-redux"
import CofirmBox from "../component/CofirmBox"
import SummaryApi from "../common/SummaryApi"
import Axios from "../utils/Axios"
import Loading from "../component/Loading"
import NoData from "../component/NoData"

import UploadTeledramaModel from "../component/UploadTeledramaModel"
import EditTeledrama from "../component/EditTeledrama"

const TeledramaAdmin = () => {
  const [openUpload, setOpenUpload] = useState(false)
  const [loading, setLoading] = useState(false)
  const [teledramaData, setTeledramaData] = useState([])
  const [openEdit, setOpenEdit] = useState(false)
  const [editData, setEditData] = useState({
    title: "",
    director: "",
    headerImage: "",
  })
  const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false)
  const [deleteTeledrama, setDeleteTeledrama] = useState({
    _id: ""
  })

  const fetchTeledramas = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getTeledrama
      })
      const { data: responseData } = response

      if (responseData.success) {
        setTeledramaData(responseData.data)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTeledramas()
  }, [])

  const handleDeleteTeledrama = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteTeledrama,
        url: SummaryApi.deleteTeledrama.url + deleteTeledrama._id,
        method: SummaryApi.deleteTeledrama.method,
      })

      const { data: responseData } = response

      if (responseData.success) {
        toast.success(responseData.message)
        fetchTeledramas()
        setOpenConfirmBoxDelete(false)
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <section>
      <div className='p-2 bg-[#6cae09] shadow-md flex items-center justify-between'>
        <h2 className='font-semibold'>Manage Teledramas</h2>
        <button
          onClick={() => setOpenUpload(true)}
          className='text-sm border cursor-pointer border-black hover:bg-[#0a730a]/50 bg-[#0a730a] text-white px-3 py-1 rounded-sm'>
          Add Teledrama
        </button>
      </div>

      {!teledramaData[0] && !loading && <NoData />}

      <div className='p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {teledramaData.map((item) => (
          <div
            className='group border border-[#0a730a] rounded-lg overflow-hidden 
              shadow-md hover:shadow-lg transition duration-300 flex flex-col
              items-center p-2'
            key={item._id}>
            <img
              alt={item.title}
              src={item.headerImage}
              className='w-full h-32 object-contain mb-2'
            />
            <p className="text-center font-semibold text-gray-700">{item.title}</p>
            <p className="text-sm text-gray-600 italic mb-2">Directed by {item.director}</p>
            <div className='flex gap-2 w-full'>
              <button
                onClick={() => {
                  setOpenEdit(true)
                  setEditData(item)
                }}
                className='flex-1 bg-blue-200 hover:bg-blue-300 text-blue-600 
                  font-semibold py-1 rounded text-sm transition duration-200 cursor-pointer'>
                Edit
              </button>

              <button
                onClick={() => {
                  setOpenConfirmBoxDelete(true)
                  setDeleteTeledrama(item)
                }}
                className='flex-1 bg-red-200 hover:bg-red-300 text-red-600 
                  font-semibold py-1 rounded text-sm transition duration-200 cursor-pointer'>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {loading && <Loading />}

      {openUpload && (
        <UploadTeledramaModel
          fetchData={fetchTeledramas}
          close={() => setOpenUpload(false)}
        />
      )}

      {openEdit && (
        <EditTeledrama
          data={editData}
          close={() => setOpenEdit(false)}
          fetchData={fetchTeledramas}
        />
      )}

      {openConfirmBoxDelete && (
        <CofirmBox
          close={() => setOpenConfirmBoxDelete(false)}
          cancel={() => setOpenConfirmBoxDelete(false)}
          confirm={handleDeleteTeledrama}
        />
      )}
    </section>
  )
}

export default TeledramaAdmin
