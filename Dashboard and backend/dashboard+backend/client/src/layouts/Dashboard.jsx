import { Outlet } from "react-router"
import UserMenu from "../component/UserMenu"
import { useSelector } from "react-redux"

const Dashboard = () => {
    const user = useSelector(state => state.user)

    console.log("user dashboard",user)
  return (
        <section>
            <div className="container mx-auto p-3  grid lg:grid-cols-[250px_1fr]">
                    {/* left for menu*/}
                    <div className="py-4 sticky top-15 max-h-[calc(100vh-60px)] overflow-y-auto hidden lg:block border-r border-slate-400">
                        <UserMenu/>
                    </div>

                    {/* right for content*/}
                    <div className="min-h-[82vh] rounded-md p-4">
                        <Outlet/>
                    </div>
            </div>
        </section>
  )
}

export default Dashboard