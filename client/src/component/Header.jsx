import { useNavigate } from 'react-router-dom'

const Header = () => {

  const navigate = useNavigate

  const redirectToLoginPage = () => {
    navigate("/login")
  }

  return (
    <div>
        <header className="h-15 shadow-md sticky top-0">
            <div className="container mx-auto flex items-center h-full px-4 justify-between">
              {/* Logo */}

              {/* Search */}
              <div>
                Search
              </div>

              {/* Login */}
              <div className="hidden lg:flex items-center">
                <button onClick={redirectToLoginPage} className='text-lg px-2 cursor-pointer'>Login</button>
              </div>
            </div>
        </header>
    </div>
  )
}

export default Header
