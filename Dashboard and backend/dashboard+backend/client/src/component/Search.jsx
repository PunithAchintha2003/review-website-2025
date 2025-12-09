import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router";
import { TypeAnimation } from 'react-type-animation';

const Search = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isSearchPage,setIsSearchPage] = useState(false)

    useEffect(()=>{
        const isSearch = location.pathname === "/search"
        setIsSearchPage(isSearch)
    },[location])

    const redirectToSearchPage = ()=>{
        navigate("/search")
    }

  return (
    <div className="border min-w-[120px] lg:max-w-[300px] h-8
    rounded-full overflow-hidden flex items-center pl-4 w-full group
    focus-within:bg-green-600">
        <button className="flex justify-center items-center h-full">
            <IoSearch size={20}/>
        </button>

        <div className="w-full">
            {
                !isSearchPage ? (
                    // not in the search page
                    <div onClick={redirectToSearchPage} className="pl-4 text-green-200">
                        <TypeAnimation
                            sequence={[
                                // Same substring at the start will only be typed out once, initially
                                'Search "Movies"',
                                1000, // wait 1s before replacing "Mice" with "Hamsters"
                                'Search "Songs"',
                                1000,
                                'Search "Teledramas"',
                                1000,
                                'Search "Books"',
                                1000
                            ]}
                                wrapper="span"
                                speed={50}
                                repeat={Infinity}
                        />
                    </div>
                ) : (
                    // when i was search page
                    <div className="ml-3">
                        <input
                            type="text"
                            placeholder="Search hear..."
                            autoFocus
                            className="outline-none text-white"
                        />
                    </div>
                )
            }
        </div>

        
    </div>
  )
}

export default Search