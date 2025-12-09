import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast";
import Axios from '../utils/Axios';
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useLocation, useNavigate } from "react-router";
import logo from '../assets/logo.png'

const OtpVerification = () => {

  const [data, setData] = useState(["","","","","",""])
  const navigate = useNavigate()
  const inputRef = useRef([])
  const location = useLocation()

  console.log("location",location)

  useEffect(()=>{
    if(!location?.state?.email){
      navigate("/forgot-password")
    }
  },[])

  const valideValue = data.every(el => el)

  const handleSubmit = async(e)=>{
    e.preventDefault()

    try {
      const response = await Axios({
        ...SummaryApi.forgot_password_otp_verification,
        data : {
          otp : data.join(""),
          email : location?.state?.email
        }
      })

      if(response.data.error){
        toast.error(response.data.message)
      }

      if(response.data.success){
        toast.success(response.data.message)
        setData(["","","","","",""])
        navigate("/reset-password",{
          state : {
            data : response.data,
            email : location?.state?.email
          }
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
        <p className="font-semibold text-lg">Enter OTP</p>

        <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>

          <div className="grid gap-1">
            <label htmlFor="otp">Enter Your OTP :</label>
            <div className="flex items-center gap-2 justify-between mt-3">
              {
                data.map((element,index)=>{
                    return(
                        <input
                          key={"otp"+index}
                          type="text"
                          id='otp'
                          ref={(ref)=>{
                            inputRef.current[index] = ref
                            return ref
                          }}
                          value={data[index]}
                          onChange={(e)=>{
                              const value = e.target.value
                              console.log("value",value)

                              const newData = [...data]
                              newData[index] = value
                              setData(newData)

                              if(value && index < 5){
                                inputRef.current[index+1].focus()
                              }
                          }}
                          maxLength={1}
                          className="bg-green-700 w-full max-w-16 p-2 border rounded text-center font-semibold"
                        />
                    )
                })
              }
            </div>

          </div>

          <button disabled={!valideValue} className={`${valideValue ? "bg-green-500 hover:bg-green-700 border border-white" :
          "border-white border"} text-white py-2 rounded font-semibold 
          my-3 tracking-wide cursor-pointer`}>Verify OTP</button>
        </form>

        <p>
          Already have account ? <Link to={"/login"}
          className="font-semibold text-white hover:text-green-100">Login</Link>
        </p>
      </div>
    </section>
  )
}

export default OtpVerification