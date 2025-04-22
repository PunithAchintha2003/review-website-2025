import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Header = () => {

  const user = useSelector((state)=> state?.user)

  console.log('user from store', user)

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
                <Link to={"/login"}>Login</Link>
              </div>
            </div>
        </header>
    </div>
  )
}

export default Header
