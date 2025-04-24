import { Outlet } from "react-router"
import UserMenu from "../component/UserMenu"

const Dashboard = () => {
  return (
        <section className="bg-green-600">
            <div className="container mx-auto p-3 grid lg:grid-cols-[250px_1fr]">
                    {/* left for menu*/}
                    <div className="py-4 sticky top-15 overflow-y-auto hidden lg:block">
                        <UserMenu/>
                    </div>

                    {/* right for content*/}
                    <div className="bg-green-500 p-4">
                        <Outlet/>
                    </div>
            </div>
        </section>
  )
}

export default Dashboard