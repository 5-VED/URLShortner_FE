import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/signUpPage";
import LoginPage from "./pages/loginPage";
import Dashboard from "./pages/DashboardPage";
import ForgotPassword from "./pages/forgotPassword";
import VerifyOtp from "./pages/VerifyOtp";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        {/* Public Marketing Pages */}
        <Route path="/" element={<LandingPage />} />

        {/* Guest-Only Auth Pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />

        {/* Authenticated App Pages */}

        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
