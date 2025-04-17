import { useState } from 'react'
import { BrowserRouter as Router,  Routes , Route} from 'react-router-dom'
import './App.css'
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx"
import { useSelector} from "react-redux";
import Navbar from "./layout/Navbar.jsx";
import NotFound from "./components/NotFound.jsx";
import LogOut from "./components/LogOut.jsx";
import Footer from "./layout/Footer.jsx";
import NewPost from "./pages/NewPost.jsx";

function App() {
  const user = useSelector(state => state.user.user)
  // console.log(user)
  return (
    <>
      <Router>
        {user ? <Navbar /> : null}
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/Signup" element={<Signup/>} />
            <Route path="/Home" element={<Home/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/logout" element={<LogOut/>} />
            <Route path="/newPost" element={<NewPost/>} />
            <Route path="*" element={<NotFound/>} />
        </Routes>
            <Footer />
      </Router>
    </>
  )
}

export default App
