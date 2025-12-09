import { useState } from "react"
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import toast from "react-hot-toast";
import Axios from '../utils/Axios';
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router";
import logo from '../assets/logo.png'

const Register = () => {

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()

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

  const isStrongPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password)
  }  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      toast.error("Enter a valid email address")
      return
    }
  
    // Confirm password check
    if (data.password !== data.confirmPassword) {
      toast.error("Password and Confirm Password must be same")
      return
    }
  
    // Strong password validation
    if (!isStrongPassword(data.password)) {
      toast.error("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character")
      return
    }
  
    try {
      const response = await Axios({
        ...SummaryApi.register,
        data: data,
      })
  
      if (response.data.error) {
        toast.error(response.data.message)
      }
  
      if (response.data.success) {
        toast.success(response.data.message)
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        })
        navigate("/login")
      }
  
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <section className="w-screen text-white flex flex-col bg-[#0a730a] px-2 pb-4">
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
        <p>Welcome to Green Grass</p>

        <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="name">Name :</label>
            <input
              type="text"
              id='name'
              autoFocus
              className="border-white p-2 border rounded"
              name='name'
              value={data.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>

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
          </div>

          <div className="grid gap-1">
            <label htmlFor="confirmPassword">Confirm Password :</label>
            <div className="border-white p-2 border rounded flex items-center focus-within:border">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id='confirmPassword'
                className="w-full outline-none"
                name='confirmPassword'
                value={data.showConfirmPassword}
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

          <button disabled={!valideValue} className={`${valideValue ? "bg-green-500 hover:bg-green-700 border border-white" :
          "border-white border"} text-white py-2 rounded font-semibold 
          my-3 tracking-wide cursor-pointer`}>Register
          </button>
        </form>

        <p>
          Already have account ? <Link to={"/login"}
          className="font-semibold hover:text-green-100">Login</Link>
        </p>
      </div>
    </section>
  )
}

export default Register