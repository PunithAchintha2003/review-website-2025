import { useNavigate } from "react-router";
import UserMenu from "../component/UserMenu"
import { IoClose } from "react-icons/io5";

const UserMenuMobile = () => {

  const navigate = useNavigate()

  const redirectToHomePage = ()=>{
    navigate("/")
  }

  return (
    <section className="bg-green-600 py-2">
      <button 
        onClick={redirectToHomePage}
        className="block w-fit ml-auto mr-2 cursor-pointer">
        <IoClose size={25}/>
      </button>
      <div className="p-3 pb-8 mx-auto container">
        <UserMenu/>
      </div>
    </section>
  )
}

export default UserMenuMobile