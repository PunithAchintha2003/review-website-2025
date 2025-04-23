import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import Search from './Search'

const Header = () => {

  const user = useSelector((state)=> state?.user)

  console.log('user from store', user)

  return (
    <div>
        <header className="h-15 shadow-md sticky top-0">
            <div className="container mx-auto flex items-center h-full px-2 justify-between">

              {/* Left side: Logo + Buttons */}

              <div className='flex items-center space-x-6"'>
                {/* Logo */}
                <div className='h-full flex items-center'>
                  <div className="h-full flex items-center"> 
                      <img
                          src={logo}
                          width={40}
                          height={20}
                          alt="logo"
                          className='hidden lg:block'
                      />
                      <img
                          src={logo}
                          width={40}
                          height={20}
                          alt="logo"
                          className='lg:hidden'
                      />
                  </div>
                </div>

                {/* Buttons */}
                <div className='flex space-x-4 ml-10 lg:block'>
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

              {/* Search */}
              <div>
                <Search/>
              </div>

              {/* Login */}
                <div className="hidden lg:flex items-center">
                  <Link to={"/login"}>Login</Link>
                </div>

            </div>
        </header>
    </div>
  )
}

export default Header