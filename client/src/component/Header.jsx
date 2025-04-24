import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import Search from './Search'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { FaRegCircleUser } from "react-icons/fa6"; // Menu = hamburger, X = close

const Header = () => {
  const user = useSelector((state)=> state?.user)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const redirectToLoginPage = ()=>{
    navigate("/login")
  }

  const redirectToRegisterPage = ()=>{
    navigate("/register")
  }

  console.log('user from store', user)

  return (
    <div className='relative'>
        <header className="h-15 shadow-md sticky top-0 z-50">
            <div className="container mx-auto flex items-center h-full px-2 justify-between">

              {/* Left side: Logo + Buttons */}

              <div className="flex items-center space-x-6">
                {/* Logo + Mobile Icon grouped */}
                <div className="flex items-center space-x-2">
                  <Link to="/" className="flex items-center">
                    <img
                      src={logo}
                      width={40} // lg screen
                      height={20}
                      alt="logo"
                      className="hidden lg:block"
                    />
                    <img
                      src={logo}
                      alt="logo"
                      className="lg:hidden w-21 h-auto"
                    />
                  </Link>

                  {/* Mobile Menu Icon */}
                  <div className="lg:hidden ml-3 mt-2">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                      {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                  </div>
                </div>

                {/* Desktop Nav Buttons */}
                <div className='hidden lg:flex space-x-4 ml-4'>
                  {['Films', 'Songs', 'Teledramas', 'Books', 'Other'].map((label) => (
                    <button
                      key={label}
                      className="hover:underline hover:decoration-white transition duration-200 cursor-pointer"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>


              {/* Search - fills remaining space */}
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md xl:max-w-lg px-2">
                <Search />
              </div>
              
                {/* Login */}
                <button onClick={redirectToLoginPage} className='lg:hidden hover:animate-pulse cursor-pointer'>
                  <FaRegCircleUser size={30}/>
                </button>

                <div className='lg:flex items-center hidden space-x-5'>
                  <div className='border p-2 hover:bg-green-600 h-8 rounded-full w-full px-4'>
                    <button onClick={redirectToLoginPage}
                      className="text-sm h-full lg:text-base flex items-center justify-center">
                      Login</button>
                  </div>

                {/* Signup */}
                <div className='border p-2 hover:bg-green-600 h-8 rounded-full w-full  px-4'>
                    <button onClick={redirectToRegisterPage} 
                      className="text-sm h-full lg:text-base flex items-center justify-center">
                      Signup</button>
                  </div>
              </div>

            </div>
        </header>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 bg-green-600 ml-10 shadow-md z-40">
            <div className="flex flex-col items-start space-y-2 p-4">

              {['Films', 'Songs', 'Teledramas', 'Books', 'Other'].map((label) => (
                <button
                  key={label}
                  className="w-full text-left hover:underline"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

    </div>
  )
}

export default Header