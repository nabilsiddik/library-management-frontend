import { Outlet } from "react-router"
import Footer from "./layouts/Footer"
import Navbar from "./layouts/Navbar"
import { ToastContainer } from "react-toastify"

function App() {

  return (
    <>
      <ToastContainer closeOnClick
        autoClose={2000} draggable={true} />
      <Navbar />
      <div className="container mx-auto py-10 px-5">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default App
