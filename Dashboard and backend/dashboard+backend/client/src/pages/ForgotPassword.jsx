import { useState } from "react"
import toast from "react-hot-toast";
import Axios from '../utils/Axios';
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router";
import logo from '../assets/logo.png'

const ForgotPassword = () => {

  const [data, setData] = useState({
    email: "",
  })

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

  const handleSubmit = async(e)=>{
    e.preventDefault()

    try {
      const response = await Axios({
        ...SummaryApi.forgot_password,
        data : data
      })

      if(response.data.error){
        toast.error(response.data.message)
      }

      if(response.data.success){
        toast.success(response.data.message)
        navigate("/verification-otp",{
          state : data
        })
        setData({
          email: "",
        })
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
              width={120}
              height={60}
              alt="logo"
              className="hidden lg:block"
          />
          <img
              src={logo}
              alt="logo"
              className="lg:hidden w-21 mt-3 h-auto"
            />
        </div>
      <div className="border border-white my-4 w-full bg-green-600 max-w-lg mx-auto rounded p-7">
        <p className="font-semibold text-lg">Forgot Password</p>

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

          <button disabled={!valideValue} className={`${valideValue ? "bg-green-500 hover:bg-green-700 border border-white" :
          "border-white border"} text-white py-2 rounded font-semibold 
          my-3 tracking-wide cursor-pointer`}>Submit</button>
        </form>

        <p>
          Already have account ? <Link to={"/login"}
          className="font-semibold text-white hover:text-green-100">Login</Link>
        </p>
      </div>
    </section>
  )
}

export default ForgotPassword