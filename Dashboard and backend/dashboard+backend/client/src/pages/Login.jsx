import { useState } from "react"
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import toast from "react-hot-toast";
import Axios from '../utils/Axios';
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router";
import logo from '../assets/logo.png'
import fetchUserDetails from '../utils/fetchUserDetails'
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";

const Login = () => {

  const [data, setData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  const valideValue = Object.values(data).every(el => el)

  const handleSubmit = async(e)=>{
    e.preventDefault()

    try {
      const response = await Axios({
        ...SummaryApi.login,
        data : data
      })

      if(response.data.error){
        toast.error(response.data.message)
      }

      if(response.data.success){
        toast.success(response.data.message)
          localStorage.setItem('accesstoken',response.data.data.accesstoken);
          localStorage.setItem('refreshToken',response.data.data.refreshToken);
          sessionStorage.setItem('accessToken', response.data.data.accesstoken);
          sessionStorage.setItem('refreshToken', response.data.data.refreshToken);

          const userDetails = await fetchUserDetails()
          dispatch(setUserDetails(userDetails.data))

        setData({
          email: "",
          password: "",
        })
        navigate("/dashboard")
      }

    } catch (error) {
      AxiosToastError(error)
    }
  }

  

  return (
    <section className="w-screen h-screen text-white flex flex-col bg-[#0a730a] px-2">
        <div className="lg:mt-16 lg:mb-8 mx-auto w-fit"> 
          <img
              src={logo}
              width={80}
              height={40}
              alt="logo"
              className="hidden lg:block"
          />
          <img
              src={logo}
              alt="logo"
              className="lg:hidden w-21 mt-3 h-auto"
            />
        </div>
      <div className="border border-white bg-green-600 my-4 w-full max-w-lg mx-auto rounded p-7">
        <p>Login to Green Grass</p>

        <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>

          <div className="grid gap-1">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id='email'
              className="border-white p-2 border rounded"
              name='email'
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="password">Password :</label>
            <div className="border-white p-2 border rounded flex items-center focus-within:border">
              <input
                type={showPassword ? "text" : "password"}
                id='password'
                className="w-full outline-none"
                name='password'
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your password"
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
            <Link to={"/forgot-password"} className="block ml-auto hover:text-green-100">
              Forgot Password ?</Link>
          </div>

          <button disabled={!valideValue} className={`${valideValue ? "bg-green-500 hover:bg-green-700 border border-white" :
          "border-white border"} text-white py-2 rounded font-semibold 
          my-3 tracking-wide cursor-pointer`}>Login</button>
        </form>

        <p>
          Don`t have account ? <Link to={"/register"}
          className="font-semibold text-white hover:text-green-100">Register</Link>
        </p>
      </div>
    </section>
  )
}

export default Login