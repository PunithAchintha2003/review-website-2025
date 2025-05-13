import { useSelector } from "react-redux"
import isPremium from "../utils/isPremium"

const PremiumPermission = ({children}) => {

        const user = useSelector(state => state.user)

  return (
    <div>
        <>
        {
            isPremium(user.role) ? children : 
            <p className="text-green-700 rounded-md bg-green-200 p-3 justify-center flex">
              Do not have permission !</p>
        }
    </>
    </div>
  )
}

export default PremiumPermission