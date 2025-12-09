import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import ForgotPassword from "../pages/ForgotPassword"
import OtpVerification from "../pages/OtpVerification"
import ResetPassword from "../pages/ResetPassword"
import SearchPage from "../pages/SearchPage"
import UserMenuMobile from "../pages/UserMenuMobile"
import Dashboard from "../layouts/Dashboard"
import Profile from "../pages/Profile"
import MyReviews from "../pages/MyReviews"
import MyComments from "../pages/MyComments"
import FilmAdmin from "../pages/filmManagement"
import SongAdmin from "../pages/songManagement"
import TeledramaAdmin from "../pages/teledramaManagement"
import BookAdmin from "../pages/bookManagement"
import AdminPermission from "../layouts/AdminPermission"
import CategoryPage from "../pages/CategoryPage"
import Success from "../pages/Success"
import Cancel from "../pages/Cancel"
import Premium from "../pages/Premium"
import AllUsers from "../pages/AllUsers"

const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path : "login",
                element : <Login/>
            },
            {
                path : "register",
                element : <Register/>
            },
            {
                path : "forgot-password",
                element : <ForgotPassword/>
            },
            {
                path : "verification-otp",
                element : <OtpVerification/>
            },
            {
                path : "reset-password",
                element : <ResetPassword/>
            },
            {
                path : "search",
                element : <SearchPage/>
            },
            {
                path : "user",
                element : <UserMenuMobile/>
            },
            {
                path : "success",
                element : <Success/>
            },
            {
                path : "cancel",
                element : <Cancel/>
            },
            {
                path : "dashboard",
                element : <Dashboard/>,
                children : [
                    {
                        path : "profile",
                        element : <Profile/>
                    },
                    {
                        path : "premium",
                        element : <Premium/>
                    },
                    {
                        path : "all-users",
                        element : <AllUsers/>
                    },
                    {
                        path : "myreviews",
                        element : <MyReviews/>
                    },
                    {
                        path : "mycomments",
                        element : <MyComments/>
                    },
                    {
                        path : "film-management",
                        element : <AdminPermission><FilmAdmin/></AdminPermission>
                    },
                    {
                        path : "song-management",
                        element : <AdminPermission><SongAdmin/></AdminPermission>
                    },
                    {
                        path : "teledrama-management",
                        element : <AdminPermission><TeledramaAdmin/></AdminPermission>
                    },
                    {
                        path : "book-management",
                        element : <AdminPermission><BookAdmin/></AdminPermission>
                    },
                    {
                        path : 'category',
                        element : <AdminPermission><CategoryPage/></AdminPermission>
                    },
                ]
            },
        ]
    }
])

export default router