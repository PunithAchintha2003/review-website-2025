import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import AxiosToastError from "../utils/AxiosToastError"
import { useSelector } from "react-redux"
import CofirmBox from "../component/CofirmBox"
import SummaryApi from "../common/SummaryApi"
import Axios from "../utils/Axios"
import Loading from "../component/Loading"
import NoData from "../component/NoData"

import UploadSongModel from "../component/UploadSongModel"
import EditSong from "../component/EditSong"

const SongAdmin = () => {
  const [openUploadSong, setOpenUploadSong] = useState(false)
  const [loading, setLoading] = useState(false)
  const [songData, setSongData] = useState([])
  const [openEdit, setOpenEdit] = useState(false)
  const [editData, setEditData] = useState({
    title: "",
    artist: "",
    headerImage: "",
  })
  const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false)
  const [deleteSong, setDeleteSong] = useState({
    _id: ""
  })

  const fetchSongs = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getSong
      })
      const { data: responseData } = response

      if (responseData.success) {
        setSongData(responseData.data)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSongs()
  }, [])

  const handleDeleteSong = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteSong,
        url: SummaryApi.deleteSong.url + deleteSong._id,
        method: SummaryApi.deleteSong.method,
      })

      const { data: responseData } = response

      if (responseData.success) {
        toast.success(responseData.message)
        fetchSongs()
        setOpenConfirmBoxDelete(false)
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <section>
      <div className='p-2 bg-[#6cae09] shadow-md flex items-center justify-between'>
        <h2 className='font-semibold'>Manage Songs</h2>
        <button
          onClick={() => setOpenUploadSong(true)}
          className='text-sm border cursor-pointer border-black hover:bg-[#0a730a]/50 bg-[#0a730a] text-white px-3 py-1 rounded-sm'
        >
          Add Song
        </button>
      </div>

      {!songData[0] && !loading && <NoData />}

      <div className='p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {songData.map((song) => {
          return (
            <div
              className='group border border-[#0a730a] rounded-lg overflow-hidden 
              shadow-mg hover:shadow-lg transition duration-300 flex flex-col
              items-center p-2'
              key={song._id}
            >
              <img
                alt={song.title}
                src={song.headerImage}
                className='w-full h-32 object-contain mb-2'
              />
              <p className="text-center font-semibold text-gray-700">{song.title}</p>
              <p className="text-sm text-gray-600 italic mb-2">By {song.artist}</p>
              <div className='flex gap-2 w-full'>
                <button
                  onClick={() => {
                    setOpenEdit(true)
                    setEditData(song)
                  }}
                  className='flex-1 bg-blue-200 hover:bg-blue-300 text-blue-600 
                    font-semibold py-1 rounded text-sm transition duration-200 cursor-pointer'
                >
                  Edit
                </button>

                <button
                  onClick={() => {
                    setOpenConfirmBoxDelete(true)
                    setDeleteSong(song)
                  }}
                  className='flex-1 bg-red-200 hover:bg-red-300 text-red-600 
                    font-semibold py-1 rounded text-sm transition duration-200 cursor-pointer'
                >
                  Delete
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {loading && <Loading />}

      {
        openUploadSong && (
          <UploadSongModel fetchData={fetchSongs} close={() => setOpenUploadSong(false)} />
        )
      }

      {
        openEdit && (
          <EditSong data={editData} close={() => setOpenEdit(false)} fetchData={fetchSongs} />
        )
      }

      {
        openConfirmBoxDelete && (
          <CofirmBox
            close={() => setOpenConfirmBoxDelete(false)}
            cancel={() => setOpenConfirmBoxDelete(false)}
            confirm={handleDeleteSong}
          />
        )
      }
    </section>
  )
}

export default SongAdmin
