import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router"
import Divider from "./Divider"
import Axios from '../utils/Axios'
import SummaryApi from "../common/SummaryApi"
import { logout } from "../store/userSlice"
import toast from 'react-hot-toast'
import AxiosToastError from "../utils/AxiosToastError";
import { HiCog } from "react-icons/hi";
import isAdmin from "../utils/isAdmin"
import { MdWorkspacePremium } from "react-icons/md";
import PropTypes from 'prop-types';

const UserMenu = ({close}) => {

    const user = useSelector((state)=>state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async()=>{
      try {
        const response = await Axios({
          ...SummaryApi.logout
        })

        if(response.data.success){
          if(close){
            close()
          }
          dispatch(logout())
          localStorage.clear()
          toast.success(response.data.message)
          navigate("/")
        }
      } catch (error) {
        AxiosToastError(error)
      }
    }
    
    const handleClose = ()=>{
      if(close){
        close()
      }
    }

  return (
    <div className="">
        <div className="font-semibold">My Account</div>
        <div className="text-sm my-2 flex items-center gap-2">
          <span className="max-w-52 text-ellipsis line-clamp-1">
            {user.name || user.email} 
            <span className="ml-2 text-medium text-green-600">{user.role === "ADMIN" ? "( Admin )" : ""}</span>
            <span className="ml-2 text-medium text-green-600">{user.role === "PREMIUM" ? "( PREMIUM )" : ""}</span>
          </span>
          <Link onClick={handleClose} to={"/dashboard/profile"}>
            <HiCog size={17} 
            className="hover:bg-green-500 rounded"/>
          </Link>

          <Link onClick={handleClose} to={"/dashboard/premium"}>
            <MdWorkspacePremium size={17} 
            className="hover:bg-green-500 hover:animate-bounce rounded"/>
          </Link>
        </div>

        <Divider/>

        <div className="text-sm grid gap-2">

            {/* {
              isAdmin(user.role) && (
                <Link onClick={handleClose} to={"/dashboard/category"} className="p-2 
                rounded-md hover:bg-green-500 mr-2">Category</Link>
              )
            } */}

            {/* {
              isAdmin(user.role) && (
                <Link onClick={handleClose} to={"/dashboard/upload-product"} className="p-2 
                rounded-md hover:bg-green-500 mr-2">Upload Product</Link>
              )
            } */}

            {
              isAdmin(user.role) && (
                <Link onClick={handleClose} to={"/dashboard/film-management"} className="p-2 
                rounded-md hover:bg-green-500 mr-2">Films</Link>
              )
            }
            {
              isAdmin(user.role) && (
                <Link onClick={handleClose} to={"/dashboard/song-management"} className="p-2 
                rounded-md hover:bg-green-500 mr-2">Songs</Link>
              )
            }
            {
              isAdmin(user.role) && (
                <Link onClick={handleClose} to={"/dashboard/teledrama-management"} className="p-2 
                rounded-md hover:bg-green-500 mr-2">Teledramas</Link>
              )
            }
            {
              isAdmin(user.role) && (
                <Link onClick={handleClose} to={"/dashboard/book-management"} className="p-2 
                rounded-md hover:bg-green-500 mr-2">Books</Link>
              )
            }

            <Link onClick={handleClose} to={"/dashboard/myreviews"} className="p-2 
            rounded-md hover:bg-green-500 mr-2">My Reviews</Link>

            <Link onClick={handleClose} to={"/dashboard/mycomments"} className="p-2 
            rounded-md hover:bg-green-500 mr-2">My Comments</Link>

            <Link onClick={handleClose} to={"/dashboard/all-users"} className="p-2 
            rounded-md hover:bg-green-500 mr-2">All Users</Link>

            <button onClick={handleLogout} className="p-2 text-left 
            rounded-md hover:bg-green-500 mr-2">Logout</button>
        </div>
    </div>
  )
}

UserMenu.propTypes = {
  close: PropTypes.func,
};


export default UserMenu