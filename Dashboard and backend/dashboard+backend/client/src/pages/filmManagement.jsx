import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import AxiosToastError from "../utils/AxiosToastError"
import { useSelector } from "react-redux"
import CofirmBox from "../component/CofirmBox"
import SummaryApi from "../common/SummaryApi"
import Axios from "../utils/Axios"
import Loading from "../component/Loading"
import NoData from "../component/NoData"

import UploadFilmModel from "../component/UploadFilmModel"
import EditFilm from "../component/EditFilm"

const FilmAdmin = () => {



  const [openUploadFilm, setOpenUploadFilm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [filmData, setFilmData] = useState([])
  const [openEdit, setOpenEdit] = useState(false)
  const [editData, setEditData] = useState({
      title: "",
      director: "",
      headerImage: "",
  })
  const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false)
  const [deleteFilm, setDeleteFilm] = useState({
      _id: ""
  })

  const fetchFilms = async () => {
      try {
          setLoading(true)
          const response = await Axios({
              ...SummaryApi.getFilm
          })
          const { data: responseData } = response

          if (responseData.success) {
              setFilmData(responseData.data)
          }
      } catch (error) {
          AxiosToastError(error)
      } finally {
          setLoading(false)
      }
  }

  useEffect(() => {
      fetchFilms()
  }, [])

  const handleDeleteFilm = async () => {
      try {
          const response = await Axios({
              ...SummaryApi.deleteFilm,
              url: SummaryApi.deleteFilm.url + deleteFilm._id,
              method: SummaryApi.deleteFilm.method,
          })

          const { data: responseData } = response

          if (responseData.success) {
              toast.success(responseData.message)
              fetchFilms()
              setOpenConfirmBoxDelete(false)
          }
      } catch (error) {
          AxiosToastError(error)
      }
  }










    return (
      <section>
        <div className='p-2 bg-[#6cae09] shadow-md flex items-center justify-between'>
            <h2 className='font-semibold'>Manage Films</h2>
            <button onClick={()=>setOpenUploadFilm(true)} className='text-sm border cursor-pointer border-black hover:bg-[#0a730a]/50 bg-[#0a730a] text-white px-3 py-1 rounded-sm'>Add Film</button>
        </div>







        {
                !filmData[0] && !loading && <NoData />
            }

            <div className='p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    filmData.map((film) => {
                        return (
                            <div className='group border border-[#0a730a] rounded-lg overflow-hidden 
                                shadow-mg hover:shadow-lg transition duration-300 flex flex-col
                                items-center p-2' key={film._id}>
                                <img 
                                    alt={film.title}
                                    src={film.headerImage}
                                    className='w-full h-32 object-contain mb-2'
                                />
                                <p className="text-center font-semibold text-gray-700">{film.title}</p>
                                <p className="text-sm text-gray-600 italic mb-2">Directed by {film.director}</p>
                                <div className='flex gap-2 w-full'>
                                    <button onClick={() => {
                                        setOpenEdit(true)
                                        setEditData(film)
                                    }} className='flex-1 bg-blue-200 hover:bg-blue-300 text-blue-600 
                                        font-semibold py-1 rounded text-sm transition duration-200 cursor-pointer'>
                                        Edit
                                    </button>

                                    <button 
                                        onClick={() => {
                                            setOpenConfirmBoxDelete(true)
                                            setDeleteFilm(film)
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

            {loading && <Loading />}

            {
                openUploadFilm && (
                    <UploadFilmModel fetchData={fetchFilms} close={() => setOpenUploadFilm(false)} />
                )
            }

            {
                openEdit && (
                    <EditFilm data={editData} close={() => setOpenEdit(false)} fetchData={fetchFilms} />
                )
            }

            {
                openConfirmBoxDelete && (
                    <CofirmBox 
                        close={() => setOpenConfirmBoxDelete(false)} 
                        cancel={() => setOpenConfirmBoxDelete(false)} 
                        confirm={handleDeleteFilm} 
                    />
                )
            }










      </section>
    )
  }
  
export default FilmAdmin