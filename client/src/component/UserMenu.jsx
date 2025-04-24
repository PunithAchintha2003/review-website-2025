import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router"
import Divider from "./Divider"
import Axios from '../utils/Axios'
import SummaryApi from "../common/SummaryApi"
import { logout } from "../store/userSlice"
import toast from 'react-hot-toast'
import AxiosToastError from "../utils/AxiosToastError";

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

  return (
    <div className="">
        <div className="font-semibold">My Account</div>
        <div className="text-sm my-2">{user.name || user.email}</div>

        <Divider/>

        <div className="text-sm grid gap-2">
            <Link to={""} className=" p-2 rounded-md hover:bg-green-500">My Reviews</Link>
            <button onClick={handleLogout} className="p-2 text-left rounded-md hover:bg-green-500 ">Logout</button>
        </div>
    </div>
  )
}

export default UserMenu