import { useSelector } from "react-redux"
import { Link } from "react-router"
import Divider from "./Divider"

const UserMenu = () => {

    const user = useSelector((state)=>state.user)

  return (
    <div>
        <div className="font-semibold">My Account</div>
        <div className="text-sm my-2">{user.name || user.email}</div>

        <Divider/>

        <div className="text-sm grid gap-2">
            <Link to={""} className="px-5 bg-green-600 p-1 rounded-full hover:bg-green-500">My Reviews</Link>
            <button className="bg-green-700 p-1 rounded-full hover:bg-green-500 ">Logout</button>
        </div>
    </div>
  )
}

export default UserMenu