import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Link,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { FormEvent, useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import BoltIcon from "@mui/icons-material/Bolt";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useNavigate } from "react-router-dom";
import { loginThunk } from "@/store/slices/authSlice";
import toast from "react-hot-toast";

// Full multicolored Google Icon SVG component
const FullGoogleIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      fill="#EA4335"
    />
  </svg>
);

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

const validateEmail = (value: string) => {
  if (!value.trim()) return "Please enter your work email.";
  if (!EMAIL_REGEX.test(value.trim()))
    return "Please enter a valid email address.";
  return "";
};

const validatePassword = (value: string) => {
  if (!value.trim()) return "Please enter your password.";
  return "";
};

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);

  // Field-specific error states
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  // Button stays disabled until every field has a value
  const isFormFilled = email.trim() !== "" && password.trim() !== "";

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Validate when the user leaves a field
  const handleEmailBlur = () => setEmailError(validateEmail(email));
  const handlePasswordBlur = () => setPasswordError(validatePassword(password));

  // Once an error is showing, re-check on every keystroke so it clears as soon as it's fixed
  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (emailError) setEmailError(validateEmail(value));
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (passwordError) setPasswordError(validatePassword(value));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailMsg = validateEmail(email);
    const passwordMsg = validatePassword(password);
    setEmailError(emailMsg);
    setPasswordError(passwordMsg);
    const isValid = !emailMsg && !passwordMsg;

    if (!isValid) return;

    setLoading(true);
    try {
      const result = await dispatch(loginThunk({ email, password }));

      if (result.payload.success) {
        toast.success("Logged in successfully");
        navigate("/dashboard");
      }

    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        py: 4,
      }}
    >
      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          p: { xs: 3, sm: 5 },
          width: "100%",
          borderRadius: 3,
          borderColor: "divider",
          backgroundColor: "background.paper",
        }}
      >
        {/* Header Section */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 700,
              color: "primary.main",
              letterSpacing: 1,
              display: "block",
              mb: 1,
            }}
          >
            ⚡ WELCOME BACK
          </Typography>
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: 700, mb: 1 }}
          >
            Sign in to your account
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Access your real-time link analytics, vanity domains, and active
            campaigns.
          </Typography>
        </Box>

        {/* Continue with Google Button */}
        <Button
          fullWidth
          variant="outlined"
          startIcon={<FullGoogleIcon />}
          sx={{
            py: 1.5,
            mb: 3,
            textTransform: "none",
            fontWeight: 600,
            color: "text.primary",
            borderColor: "divider",
            "&:hover": { backgroundColor: "action.hover" },
          }}
        >
          Continue with Google
        </Button>

        {/* Divider */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            my: 3,
            color: "text.disabled",
            "&::before, &::after": {
              content: '""',
              flex: 1,
              borderBottom: "1px solid",
              borderColor: "divider",
            },
            "&::before": { mr: 2 },
            "&::after": { ml: 2 },
          }}
        >
          <Typography
            variant="caption"
            sx={{ fontWeight: 600, letterSpacing: 0.5 }}
          >
            OR CONTINUE WITH EMAIL
          </Typography>
        </Box>

        {/* Form Inputs */}
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Box sx={{ mb: 2.5 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Work email
            </Typography>
            <TextField
              fullWidth
              type="email"
              placeholder="alex@acmedesign.studio"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              onBlur={handleEmailBlur}
              size="small"
              error={Boolean(emailError)}
              helperText={emailError}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutlinedIcon fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                },
              }}
              required
            />
          </Box>

          <Box sx={{ mb: 1.5 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Password
              </Typography>
              <Link
                href="#"
                variant="body2"
                underline="hover"
                sx={{ fontWeight: 500 }}
              >
                Forgot password?
              </Link>
            </Box>
            <TextField
              fullWidth
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              onBlur={handlePasswordBlur}
              size="small"
              error={Boolean(passwordError)}
              helperText={passwordError}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                        size="small"
                      >
                        {showPassword ? (
                          <VisibilityOff fontSize="small" />
                        ) : (
                          <Visibility fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              required
            />
          </Box>

          {/* Remember Device Checkbox */}
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberDevice}
                onChange={(e) => setRememberDevice(e.target.checked)}
                size="small"
              />
            }
            label={
              <Typography variant="body2" color="text.secondary">
                Remember this device for 30 days
              </Typography>
            }
            sx={{ mb: 3 }}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading || !isFormFilled}
            sx={{
              py: 1.5,
              mb: 3,
              backgroundColor: "#7c3aed",
              color: "#fff",
              textTransform: "none",
              fontWeight: 600,
              boxShadow: "none",
              "&:hover": { backgroundColor: "#6d28d9", boxShadow: "none" },
              "&.Mui-disabled": { backgroundColor: "#c4b5fd", color: "#fff" },
            }}
          >
            Sign in →
          </Button>
        </Box>

        {/* Feature Badges Footer */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            pt: 2,
            borderTop: "1px solid",
            borderColor: "divider",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <VerifiedUserOutlinedIcon fontSize="small" color="action" />
            <Typography variant="caption" color="text.secondary">
              SOC2 Type II
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <BoltIcon fontSize="small" color="action" />
            <Typography variant="caption" color="text.secondary">
              99.99% Edge SLA
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <VpnKeyOutlinedIcon fontSize="small" color="action" />
            <Typography variant="caption" color="text.secondary">
              SAML / SSO
            </Typography>
          </Box>
        </Box>

        {/* Sign Up Link */}
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{" "}
            <Link href="/signup" underline="hover" sx={{ fontWeight: 600 }}>
              Sign up for free
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
