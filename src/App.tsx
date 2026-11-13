import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/signUpPage";
import LoginPage from "./pages/loginPage";
import Dashboard from "./pages/DashboardPage";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ForgotPassword from "./pages/forgotPassword";
import VerifyOtp from "./pages/VerifyOtp";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
      </Routes>
    </>
  );
}

export default App;
