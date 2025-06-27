import About from "./pages/About";
import MainHome from "./components/MainHome";
import Navbar from "./pages/Navbar";
import './App.css';
import LoginPage from "./pages/loginpage";
import Signup from "./pages/sign";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from "./pages/Footer";
import HomePage from './pages/HomePage';
import TopLikedPage from "./pages/TopLikedPage";
import ContactUs from "./pages/ContactUs";
import { ToasterProvider } from "./components/ToasterContext";
import Toaster from "./components/Toaster";
import UserDashboard from "./pages/UserDashboard";
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <ToasterProvider>
      <Toaster />
      <Router>
        <Navbar />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path="/mainhome" element={
            <ProtectedRoute>
              <MainHome />
            </ProtectedRoute>
          } />
          <Route path="/loginpage" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/aboutpage" element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          } />
          <Route path="/top-liked" element={
            <ProtectedRoute>
              <TopLikedPage />
            </ProtectedRoute>
          } />
          <Route path="/contactus" element={
            <ProtectedRoute>
              <ContactUs />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          } />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
        <Footer />
      </Router>
    </ToasterProvider>
  );
};

export default App;