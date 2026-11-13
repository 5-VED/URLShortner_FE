import { useEffect, useState, type FormEvent } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Link,
  Typography,
} from "@mui/material";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import CreditCardOffOutlinedIcon from "@mui/icons-material/CreditCardOffOutlined";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/store/hooks";
import { cleanError, signupThunk } from "@/store/slices/authSlice";
import { AuthLayout, TrustBadge } from "@/components/auth/AuthLayout";
import { GoogleAuthButton } from "@/components/auth/GoogleAuthButton";
import { PasswordStrengthMeter } from "@/components/auth/PasswordStrengthMeter";
import { FormInput } from "@/components/common/FormInput";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { getPasswordStrength, validateEmail } from "@/utils/validators";

const TRUST_BADGES: TrustBadge[] = [
  {
    icon: <CreditCardOffOutlinedIcon fontSize="small" color="action" />,
    label: "No credit card required",
  },
  {
    icon: <AllInclusiveIcon fontSize="small" color="action" />,
    label: "1,000 free links/mo",
  },
  {
    icon: <VerifiedUserOutlinedIcon fontSize="small" color="action" />,
    label: "SOC2 Type II Certified",
  },
];

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [termsError, setTermsError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(cleanError());
  }, [dispatch]);

  const { isStrong } = getPasswordStrength(password);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isValid = true;

    setNameError("");
    setEmailError("");
    setPasswordError("");
    setTermsError("");

    if (!fullName.trim()) {
      setNameError("Please enter your full name.");
      isValid = false;
    }

    const emailMsg = validateEmail(email);
    if (emailMsg) {
      setEmailError(emailMsg);
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError("Please enter your password.");
      isValid = false;
    } else if (!isStrong) {
      setPasswordError("Please meet all password requirements.");
      isValid = false;
    }

    if (!agreeToTerms) {
      setTermsError(
        "You must agree to the Terms of Service and Privacy Policy."
      );
      isValid = false;
    }

    if (!isValid) return;

    setLoading(true);
    const parts = fullName.trim().split(/\s+/);
    const firstName = parts[0] ?? "";
    const lastName = parts.slice(1).join(" ");

    try {
      const result = await dispatch(
        signupThunk({ firstName, lastName, email: email.trim(), password })
      ).unwrap();

      if (result.success) {
        toast.success("Account created successfully! Please sign in.");
        navigate("/login");
      }
    } catch (err) {
      toast.error(
        typeof err === "string"
          ? err
          : err instanceof Error
            ? err.message
            : "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      badgeText="⚡ GET STARTED IN SECONDS"
      title="Create your free account"
      subtitle="Join 45,000+ teams shortening links, analyzing clicks, and routing custom domains in real-time."
      trustBadges={TRUST_BADGES}
      footer={
        <Typography variant="body2" color="text.secondary">
          Already have a Snip account?{" "}
          <Link
            component={RouterLink}
            to="/login"
            underline="hover"
            sx={{ fontWeight: 600 }}
          >
            Sign in instead
          </Link>
        </Typography>
      }
    >
      <GoogleAuthButton
        buttonText="Sign up with Google"
        dividerText="OR SIGN UP WITH EMAIL"
      />

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <FormInput
          label="Full Name"
          required
          placeholder="Alex Rivera"
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
            if (nameError && e.target.value.trim()) setNameError("");
          }}
          error={Boolean(nameError)}
          helperText={nameError}
        />

        <FormInput
          label="Work Email"
          required
          type="email"
          placeholder="alex@company.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (emailError) setEmailError(validateEmail(e.target.value));
          }}
          error={Boolean(emailError)}
          helperText={emailError}
        />

        <FormInput
          label="Password"
          required
          enablePasswordToggle
          placeholder="••••••••"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (passwordError) setPasswordError("");
          }}
          error={Boolean(passwordError)}
          helperText={passwordError}
          rightLabelSlot={
            <Typography
              variant="caption"
              color={
                password.length > 0
                  ? isStrong
                    ? "success.main"
                    : "text.secondary"
                  : "text.disabled"
              }
              sx={{ fontWeight: 600 }}
            >
              {password.length === 0 ? "" : isStrong ? "Good" : "Weak"}
            </Typography>
          }
        />

        <PasswordStrengthMeter password={password} />

        <Box sx={{ mb: 3 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={agreeToTerms}
                onChange={(e) => {
                  setAgreeToTerms(e.target.checked);
                  if (termsError && e.target.checked) setTermsError("");
                }}
                size="small"
              />
            }
            label={
              <Typography variant="body2" color="text.secondary">
                I agree to Snip's{" "}
                <Link href="#" underline="hover">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" underline="hover">
                  Privacy Policy
                </Link>
                .
              </Typography>
            }
          />
          {termsError && (
            <Typography
              variant="caption"
              color="error"
              sx={{ display: "block", mt: 0.5, ml: 1.5 }}
            >
              {termsError}
            </Typography>
          )}
        </Box>

        <PrimaryButton
          type="submit"
          loading={loading}
          loadingText="Creating account..."
          sx={{ mb: 3 }}
        >
          Create Free Account →
        </PrimaryButton>
      </Box>
    </AuthLayout>
  );
};

export default SignUpPage;
