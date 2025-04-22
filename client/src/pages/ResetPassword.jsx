import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router"
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import Axios from '../utils/Axios';
import SummaryApi from "../common/SummaryApi";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

const ResetPassword = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const [data,setData] = useState({
        email : "",
        newPassword : "",
        confirmPassword : ""
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const valideValue = Object.values(data).every(el => el)

    useEffect(()=>{
        if(!(location?.state?.data?.success)){
            navigate("/")
        }

        if(location?.state?.email){
            setData((preve)=>{
                return{
                    ...preve,
                    email : location?.state?.email
                }
            })
        }
    },[])

    const handleChange = (e) => {
        const { name, value } = e.target
    
        setData((preve) => {
          return {
            ...preve,
            [name]: value
          }
        })
      }

    console.log("data reset password",data)

    const handleSubmit = async(e)=>{
        e.preventDefault()
    
        try {
          const response = await Axios({
            ...SummaryApi.reset_password,
            data : data
          })
    
          if(response.data.error){
            toast.error(response.data.message)
          }
    
          if(response.data.success){
            toast.success(response.data.message)
            navigate("/login")
            setData({
                email : "",
                newPassword : "",
                confirmPassword : ""
            })
          }
    
        } catch (error) {
          AxiosToastError(error)
        }
      }

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-green-300 my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className="font-semibold text-lg">Enter Your Password</p>

        <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>

          <div className="grid gap-1">
            <label htmlFor="newPassword">New Password :</label>
                <div className="bg-green-100 p-2 border rounded flex items-center focus-within:border">
                    <input
                        type={showPassword ? "text" : "password"}
                        id='password'
                        className="w-full outline-none"
                        name='newPassword'
                        value={data.newPassword}
                        onChange={handleChange}
                        placeholder="Enter your new password"
                    />
                    <div onClick={() => setShowPassword(preve => !preve)} className="cursor-pointer">
                        {
                        showPassword ? (
                            <FaRegEyeSlash />
                        ) : (
                            <FaRegEye />
                        )
                        }
                    </div>
                </div>
          </div>

          <div className="grid gap-1">
            <label htmlFor="confirmPassword">Confirm Password :</label>
                <div className="bg-green-100 p-2 border rounded flex items-center focus-within:border">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        id='password'
                        className="w-full outline-none"
                        name='confirmPassword'
                        value={data.confirmPassword}
                        onChange={handleChange}
                        placeholder="Enter your confirm password"
                    />
                    <div onClick={() => setShowConfirmPassword(preve => !preve)} className="cursor-pointer">
                        {
                        showConfirmPassword ? (
                            <FaRegEyeSlash />
                        ) : (
                            <FaRegEye />
                        )
                        }
                    </div>
                </div>
          </div>

          <button disabled={!valideValue} className={`${valideValue ? "bg-green-700 hover:bg-green-600" :
          "bg-gray-500"} text-white py-2 rounded font-semibold 
          my-3 tracking-wide cursor-pointer`}>Change Password</button>
        </form>

        <p>
          Already have account ? <Link to={"/login"}
          className="font-semibold text-blue-600 hover:text-blue-800">Login</Link>
        </p>
      </div>
    </section>
  )
}

export default ResetPassword