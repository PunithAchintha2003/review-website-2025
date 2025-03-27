import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './component/Header'
import Footer from './component/Footer'
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <>
      <Header/>
        <main className='min-h-[83vh]'>
          <Outlet/>
        </main>
      <Footer/>
      <Toaster/>
    </>
  )
}

export default App
