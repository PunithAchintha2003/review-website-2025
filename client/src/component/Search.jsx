import { IoSearch } from "react-icons/io5";
import { TypeAnimation } from 'react-type-animation';

const Search = () => {
  return (
    <div className="border min-w-[300px] lg:min-w-[420px] h-7
    rounded-full overflow-hidden flex items-center pl-4 w-full bg-green-600">
        <button className="flex justify-center items-center h-full">
            <IoSearch size={20}/>
        </button>
        <div className="pl-4 text-green-200">
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
    </div>
  )
}

export default Search