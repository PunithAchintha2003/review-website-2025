import { useSelector } from "react-redux"
import isAdmin from "../utils/isAdmin"

const AdminPermission = ({children}) => {

    const user = useSelector(state => state.user)

  return (
    <>
        {
            isAdmin(user.role) ? children : 
            <p className="text-green-700 rounded-md bg-green-200 p-3 justify-center flex">
              Do not have permission !</p>
        }
    </>
  )
}

export default AdminPermission