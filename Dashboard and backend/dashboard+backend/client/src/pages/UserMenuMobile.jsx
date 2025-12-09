import { useNavigate } from "react-router";
import UserMenu from "../component/UserMenu"
import { IoClose } from "react-icons/io5";

const UserMenuMobile = () => {

  const navigate = useNavigate()

  const redirectToHomePage = ()=>{
    navigate("/")
  }

  return (
    <section className="bg-white h-full w-full py-2">
      <button 
        onClick={redirectToHomePage}
        className="block w-fit text-neutral-800 ml-auto mr-2 cursor-pointer">
        <IoClose size={25}/>
      </button>
      <div className="p-3 pb-8 mx-auto container">
        <UserMenu/>
      </div>
    </section>
  )
}

export default UserMenuMobile