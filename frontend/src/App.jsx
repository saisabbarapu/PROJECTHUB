import About from './pages/About';
import MainHome from './components/MainHome';
import Navbar from './pages/Navbar';
import LoginPage from './pages/loginpage';
import Signup from './pages/sign';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './pages/Footer';
import HomePage from './pages/HomePage';
import TopLikedPage from './pages/TopLikedPage';
import ContactUs from './pages/ContactUs';
import { ToasterProvider } from './components/ToasterContext';
import Toaster from './components/Toaster';
import UserDashboard from './pages/UserDashboard';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute';
import CrystalizedBall from './components/CrystalizedBall';

const App = () => {
  return (
    <ToasterProvider>
      <Toaster />
      <Router>
        {/* Global Ambient Cinematic CrystalizedBall Background */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#030712]">
          {/* Soft Ambient Radial Glows */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.18),rgba(255,255,255,0))]" />
          <div className="cinematic-grid absolute inset-0 opacity-20" />

          {/* Perfectly Centered Radiant Ambient Crystal Ball */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] sm:w-[800px] sm:h-[800px] lg:w-[960px] lg:h-[960px] opacity-85 transition-all duration-700">
            <CrystalizedBall
              preset="plasma"
              color="#0a82e8"
              size={0.75}
              crackle={0.85}
              fill={0.5}
              interactive={false}
              hoverStrength={0.7}
              strands={6}
              flares={0.65}
              glow={1.1}
              sparks={0.6}
              particleCount={16000}
              motion="rise"
              particleShape="square"
              depth={0.65}
              sway={0.5}
              twinkle={0.35}
              haze={0.7}
              dustSpeed={1}
              speed={1}
              intro
              paused={false}
            />
          </div>

          {/* Soft Global Dark Vignette & Edge Blend */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030712]/30 to-[#030712]/80 pointer-events-none" />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 flex min-h-screen flex-col justify-between">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route
                path="/mainhome"
                element={
                  <ProtectedRoute>
                    <MainHome />
                  </ProtectedRoute>
                }
              />
              <Route path="/loginpage" element={<LoginPage />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/aboutpage"
                element={
                  <ProtectedRoute>
                    <About />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/top-liked"
                element={
                  <ProtectedRoute>
                    <TopLikedPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/contactus"
                element={
                  <ProtectedRoute>
                    <ContactUs />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ToasterProvider>
  );
};

export default App;
