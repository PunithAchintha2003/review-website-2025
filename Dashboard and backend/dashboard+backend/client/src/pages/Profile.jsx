import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Axios from '../utils/Axios';
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { setUserDetails } from "../store/userSlice";
import fetchUserDetails from "../utils/fetchUserDetails";

const Profile = () => {

    const user = useSelector(state => state.user)

    const [userData,setUserData] = useState({
        name : user.name,
        email : user.email,
    })
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(()=>{
        setUserData({
            name : user.name,
            email : user.email,
        })
    },[user])

    const handleOnChange = (e)=>{
        const { name, value } = e.target

        setUserData((preve)=>{
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
                ...SummaryApi.updateUserDetails,
                data : userData
            })

            const { data : responseData } = response

            if(responseData.success){
                toast.success(responseData.message)
                const userData = await fetchUserDetails()
                dispatch(setUserDetails(userData.data))
            }

        } catch (error) {
            AxiosToastError(error)
        } finally{
            setLoading(false)
        }
    }

  return (

    <div>
        <div className="p-2 bg-green-200 shadow-md flex items-center justify-between">
            <h2 className="font-semibold py-1">Profile</h2>
        </div>
    <form className="grid gap-3 mx-auto p-4" onSubmit={handleSubmit}>
        <div className="grid">
            <label>Name</label>
            <input
                type="text"
                placeholder="Enter your name"
                className="p-1 border bg-green-200 outline-none mt-1 rounded-sm"
                value={userData.name}
                name='name'
                onChange={handleOnChange}
                required
            />
        </div>

        <div className="grid">
            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="p-1 border bg-green-200 outline-none mt-1 rounded-sm"
                value={userData.email}
                name='email'
                onChange={handleOnChange}
                required
            />
        </div>

        <button className="border bg-green-300 px-4 py-2 mt-5 font-semibold
        hover:bg-green-400 rounded-sm">
            {
                loading ? "Loading..." : "Submit"
            }
        </button>
    </form>
    </div>
  )
}

export default Profile