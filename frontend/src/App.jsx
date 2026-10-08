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
import SpectralDrape from './components/SpectralDrape';

const App = () => {
  return (
    <ToasterProvider>
      <Toaster />
      <Router>
        {/* Global Ambient SpectralDrape 3D Background */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#030712]">
          {/* Radiant 3D Folding Drape Canvas */}
          <div className="absolute inset-0 opacity-100 transition-opacity duration-700">
            <SpectralDrape
              color="#c084fc"
              secondaryColor="#9333ea"
              accentColor="#4c1d95"
              dotCountX={95}
              dotCountY={58}
              waveSpeed={0.75}
              waveAmplitude={44}
              foldIntensity={1.3}
              dotSize={1.6}
              glow={0.9}
              interactive={false}
              perspective={920}
            />
          </div>

          {/* Gentle cinematic grid and subtle edge vignette for legibility */}
          <div className="cinematic-grid absolute inset-0 opacity-10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/30 via-transparent to-[#030712]/30 pointer-events-none" />
          {/* Subtle ambient violet bloom at top-center */}
          <div className="absolute inset-x-0 top-0 h-96 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.18),transparent_75%)] pointer-events-none" />
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
