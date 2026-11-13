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
import { getPasswordStrength } from "@/utils/validators";
import { signupSchema } from "@/Schemas/Signup.schema";

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

  const validateField = (
    field: "fullName" | "email" | "password" | "agreeToTerms",
    value: unknown
  ) => {
    const result = signupSchema.shape[field].safeParse(value);
    return result.success ? "" : result.error.issues[0]?.message || "";
  };

  const handleNameChange = (value: string) => {
    setFullName(value);
    if (nameError) setNameError(validateField("fullName", value));
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (emailError) setEmailError(validateField("email", value));
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (passwordError) setPasswordError(validateField("password", value));
  };

  const handleTermsChange = (checked: boolean) => {
    setAgreeToTerms(checked);
    if (termsError) setTermsError(validateField("agreeToTerms", checked));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationResult = signupSchema.safeParse({
      fullName,
      email,
      password,
      agreeToTerms,
    });

    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      setNameError(fieldErrors.fullName?.[0] || "");
      setEmailError(fieldErrors.email?.[0] || "");
      setPasswordError(fieldErrors.password?.[0] || "");
      setTermsError(fieldErrors.agreeToTerms?.[0] || "");
      return;
    }

    setNameError("");
    setEmailError("");
    setPasswordError("");
    setTermsError("");
    setLoading(true);

    const parts = validationResult.data.fullName.trim().split(/\s+/);
    const firstName = parts[0] ?? "";
    const lastName = parts.slice(1).join(" ");

    try {
      const result = await dispatch(
        signupThunk({
          firstName,
          lastName,
          email: validationResult.data.email,
          password: validationResult.data.password,
        })
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
          onChange={(e) => handleNameChange(e.target.value)}
          onBlur={() => setNameError(validateField("fullName", fullName))}
          error={Boolean(nameError)}
          helperText={nameError}
        />

        <FormInput
          label="Work Email"
          required
          type="email"
          placeholder="alex@company.com"
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
          onBlur={() => setEmailError(validateField("email", email))}
          error={Boolean(emailError)}
          helperText={emailError}
        />

        <FormInput
          label="Password"
          required
          enablePasswordToggle
          placeholder="••••••••"
          value={password}
          onChange={(e) => handlePasswordChange(e.target.value)}
          onBlur={() => setPasswordError(validateField("password", password))}
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
                onChange={(e) => handleTermsChange(e.target.checked)}
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
