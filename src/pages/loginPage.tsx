import { FormEvent, useState } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Link,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import BoltIcon from "@mui/icons-material/Bolt";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/store/hooks";
import { loginThunk } from "@/store/slices/authSlice";
import { AuthLayout, TrustBadge } from "@/components/auth/AuthLayout";
import { GoogleAuthButton } from "@/components/auth/GoogleAuthButton";
import { FormInput } from "@/components/common/FormInput";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { loginSchema } from "@/Schemas/Login.schema";

const TRUST_BADGES: TrustBadge[] = [
  {
    icon: <VerifiedUserOutlinedIcon fontSize="small" color="action" />,
    label: "SOC2 Type II",
  },
  {
    icon: <BoltIcon fontSize="small" color="action" />,
    label: "99.99% Edge SLA",
  },
  {
    icon: <VpnKeyOutlinedIcon fontSize="small" color="action" />,
    label: "SAML / SSO",
  },
];

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberDevice, setRememberDevice] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const isFormFilled = email.trim() !== "" && password.trim() !== "";

  const validateEmailField = (value: string) => {
    const result = loginSchema.shape.email.safeParse(value);
    return result.success ? "" : result.error.issues[0]?.message || "";
  };

  const validatePasswordField = (value: string) => {
    const result = loginSchema.shape.password.safeParse(value);
    return result.success ? "" : result.error.issues[0]?.message || "";
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (emailError) setEmailError(validateEmailField(value));
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (passwordError) setPasswordError(validatePasswordField(value));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationResult = loginSchema.safeParse({
      email,
      password,
      rememberDevice,
    });

    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      setEmailError(fieldErrors.email?.[0] || "");
      setPasswordError(fieldErrors.password?.[0] || "");
      return;
    }

    setEmailError("");
    setPasswordError("");
    setLoading(true);

    try {
      const result = await dispatch(
        loginThunk({
          email: validationResult.data.email,
          password: validationResult.data.password,
        })
      ).unwrap();

      if (result.success) {
        toast.success("Logged in successfully");
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error(
        typeof err === "string"
          ? err
          : err instanceof Error
            ? err.message
            : "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      badgeText="⚡ WELCOME BACK"
      title="Sign in to your account"
      subtitle="Access your real-time link analytics, vanity domains, and active campaigns."
      trustBadges={TRUST_BADGES}
      footer={
        <Typography variant="body2" color="text.secondary">
          Don't have an account?{" "}
          <Link
            component={RouterLink}
            to="/signup"
            underline="hover"
            sx={{ fontWeight: 600 }}
          >
            Sign up for free
          </Link>
        </Typography>
      }
    >
      <GoogleAuthButton
        buttonText="Continue with Google"
        dividerText="OR CONTINUE WITH EMAIL"
      />

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <FormInput
          label="Work email"
          required
          type="email"
          placeholder="alex@acmedesign.studio"
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
          onBlur={() => setEmailError(validateEmailField(email))}
          error={Boolean(emailError)}
          helperText={emailError}
          startIcon={<MailOutlinedIcon fontSize="small" color="action" />}
        />

        <FormInput
          label="Password"
          required
          enablePasswordToggle
          placeholder="••••••••••••"
          value={password}
          onChange={(e) => handlePasswordChange(e.target.value)}
          onBlur={() => setPasswordError(validatePasswordField(password))}
          error={Boolean(passwordError)}
          helperText={passwordError}
          startIcon={<LockOutlinedIcon fontSize="small" color="action" />}
          rightLabelSlot={
            <Link
              component={RouterLink}
              to="/forgot-password"
              variant="body2"
              underline="hover"
              sx={{ fontWeight: 500 }}
            >
              Forgot password?
            </Link>
          }
        />

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

        <PrimaryButton
          type="submit"
          loading={loading}
          loadingText="Signing in..."
          disabled={!isFormFilled}
          sx={{ mb: 3 }}
        >
          Sign in →
        </PrimaryButton>
      </Box>
    </AuthLayout>
  );
};

export default LoginPage;
