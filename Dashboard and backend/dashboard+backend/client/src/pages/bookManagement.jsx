import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import AxiosToastError from "../utils/AxiosToastError"
import { useSelector } from "react-redux"
import CofirmBox from "../component/CofirmBox"
import SummaryApi from "../common/SummaryApi"
import Axios from "../utils/Axios"
import Loading from "../component/Loading"
import NoData from "../component/NoData"

import UploadBookModel from "../component/UploadBookModel"
import EditBook from "../component/EditBook"

const BookAdmin = () => {
  const [openUploadBook, setOpenUploadBook] = useState(false)
  const [loading, setLoading] = useState(false)
  const [bookData, setBookData] = useState([])
  const [openEdit, setOpenEdit] = useState(false)
  const [editData, setEditData] = useState({
    title: "",
    author: "",
    image: "",
  })
  const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false)
  const [deleteBook, setDeleteBook] = useState({
    _id: ""
  })

  const fetchBooks = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getBook
      })
      const { data: responseData } = response

      if (responseData.success) {
        setBookData(responseData.data)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  const handleDeleteBook = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteBook,
        url: SummaryApi.deleteBook.url + deleteBook._id,
        method: SummaryApi.deleteBook.method,
      })

      const { data: responseData } = response

      if (responseData.success) {
        toast.success(responseData.message)
        fetchBooks()
        setOpenConfirmBoxDelete(false)
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <section>
      <div className='p-2 bg-[#6cae09] shadow-md flex items-center justify-between'>
        <h2 className='font-semibold'>Manage Books</h2>
        <button 
          onClick={() => setOpenUploadBook(true)} 
          className='text-sm border cursor-pointer border-black hover:bg-[#0a730a]/50 bg-[#0a730a] text-white px-3 py-1 rounded-sm'>
          Add Book
        </button>
      </div>

      {
        !bookData[0] && !loading && <NoData />
      }

      <div className='p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {
          bookData.map((book) => (
            <div className='group border border-[#0a730a] rounded-lg overflow-hidden 
                shadow-md hover:shadow-lg transition duration-300 flex flex-col
                items-center p-2' key={book._id}>
              <img 
                alt={book.title}
                src={book.image}
                className='w-full h-32 object-contain mb-2'
              />
              <p className="text-center font-semibold text-gray-700">{book.title}</p>
              <p className="text-sm text-gray-600 italic mb-2">By {book.author}</p>
              <div className='flex gap-2 w-full'>
                <button 
                  onClick={() => {
                    setOpenEdit(true)
                    setEditData(book)
                  }} 
                  className='flex-1 bg-blue-200 hover:bg-blue-300 text-blue-600 
                  font-semibold py-1 rounded text-sm transition duration-200 cursor-pointer'>
                  Edit
                </button>

                <button 
                  onClick={() => {
                    setOpenConfirmBoxDelete(true)
                    setDeleteBook(book)
                  }} 
                  className='flex-1 bg-red-200 hover:bg-red-300 text-red-600 
                  font-semibold py-1 rounded text-sm transition duration-200 cursor-pointer'>
                  Delete
                </button>
              </div>
            </div>
          ))
        }
      </div>

      {loading && <Loading />}

      {
        openUploadBook && (
          <UploadBookModel fetchData={fetchBooks} close={() => setOpenUploadBook(false)} />
        )
      }

      {
        openEdit && (
          <EditBook data={editData} close={() => setOpenEdit(false)} fetchData={fetchBooks} />
        )
      }

      {
        openConfirmBoxDelete && (
          <CofirmBox 
            close={() => setOpenConfirmBoxDelete(false)} 
            cancel={() => setOpenConfirmBoxDelete(false)} 
            confirm={handleDeleteBook} 
          />
        )
      }
    </section>
  )
}

export default BookAdmin
