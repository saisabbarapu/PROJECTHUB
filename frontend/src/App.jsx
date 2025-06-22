import About from "./pages/About";
import MainHome from "../components/MainHome";
import Navbar from "./pages/Navbar";
import './App.css'
import LoginPage from "./pages/loginpage";
import Signup from "./pages/sign";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from "./pages/Footer";
import HomePage from './pages/HomePage';
import TopLikedPage from "./pages/TopLikedPage";
import ContactUs from "./pages/ContactUs";

const App=()=>{
  return(
    <>
    
    <div>
      <Navbar/>
      <Router>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path="/mainhome" element={<MainHome />} />
        <Route path="/loginpage" element={<LoginPage/>}/>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/aboutpage" element={<About/>}/>
        <Route path="/top-liked" element={<TopLikedPage />} />
        <Route path="/contactus" element={<ContactUs />} />
      </Routes>
    </Router>
    <Footer/>
    </div>
    </>
  )
}
export default App;