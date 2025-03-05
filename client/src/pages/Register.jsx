import { useState } from "react"
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

const Register = () => {

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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

  const handleSubmit = (e)=>{
    e.preventDefault()
  }

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-green-300 my-4 w-full max-w-lg mx-auto rounded p-7">
        <p>Welcome to Green Grass</p>

        <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="name">Name :</label>
            <input
              type="text"
              id='name'
              autoFocus
              className="bg-green-100 p-2 border rounded"
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
              className="bg-green-100 p-2 border rounded"
              name='email'
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="password">Password :</label>
            <div className="bg-green-100 p-2 border rounded flex items-center focus-within:border">
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
            <div className="bg-green-100 p-2 border rounded flex items-center focus-within:border">
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

          <button className={`${valideValue ? "bg-green-600" : "bg-gray-500"} text-white py-2 rounded 
          font-semibold my-3 tracking-wide cursor-pointer`}>Register</button>
        </form>
      </div>
    </section>
  )
}

export default Register