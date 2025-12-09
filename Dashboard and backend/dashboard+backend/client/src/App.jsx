import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import Header from './component/Header'
import Footer from './component/Footer'
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import fetchUserDetails from './utils/fetchUserDetails';
import { setUserDetails } from './store/userSlice';
import { useDispatch } from 'react-redux';
import Axios from './utils/Axios';
import SummaryApi from './common/SummaryApi';
import { setAllCategory } from './store/productSlice';

function App() {

  const dispatch = useDispatch()
  const location = useLocation()

  const fetchUser = async()=>{
    const userData = await fetchUserDetails()
    dispatch(setUserDetails(userData.data))
  }

    const fetchCategory = async()=>{
      try {
          const response = await Axios({
              ...SummaryApi.getCategory
          })
          const { data : responseData } = response

          if(responseData.success){
            dispatch(setAllCategory(responseData.data))
          }
      } catch (error) {
          
      }finally{
        
      }
    }

  useEffect(()=>{
    fetchUser()
    fetchCategory()
  },[])

  const hideLayout = location.pathname === '/login' || 
  location.pathname === '/register' ||
  location.pathname === '/forgot-password' || location.pathname === '/verification-otp' ||
  location.pathname === '/reset-password'

  return (
    <>
      <div className=''>
        {!hideLayout && <Header/>}
          <main className='lg:min-h-[83vh] min-h-[77vh]'>
            <Outlet/>
          </main>
        {!hideLayout && <Footer />}
        <Toaster/>
      </div>
    </>
  )
}

export default App
