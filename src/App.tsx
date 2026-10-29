import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/signUpPage";
import LoginPage from "./pages/loginPage";
import Dashboard from "./pages/DashboardPage";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
