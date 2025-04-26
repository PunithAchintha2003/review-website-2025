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
import UploadProduct from "../pages/UploadProduct"
import ProductAdmin from "../pages/ProductAdmin"
import AdminPermission from "../layouts/AdminPermission"
import CategoryPage from "../pages/CategoryPage"

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
                path : "dashboard",
                element : <Dashboard/>,
                children : [
                    {
                        path : "profile",
                        element : <Profile/>
                    },
                    {
                        path : "myreviews",
                        element : <MyReviews/>
                    },
                    {
                        path : "upload-product",
                        element : <AdminPermission><UploadProduct/></AdminPermission>
                    },
                    {
                        path : "product",
                        element : <AdminPermission><ProductAdmin/></AdminPermission>
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