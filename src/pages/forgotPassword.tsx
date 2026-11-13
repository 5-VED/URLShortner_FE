import { useState, FormEvent } from "react";
import { Box, Link, Typography } from "@mui/material";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthLayout, TrustBadge } from "@/components/auth/AuthLayout";
import { FormInput } from "@/components/common/FormInput";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { validateEmail } from "@/utils/validators";

const TRUST_BADGES: TrustBadge[] = [
  {
    icon: <VerifiedUserOutlinedIcon fontSize="small" color="action" />,
    label: "256-bit TLS Edge Security",
  },
  {
    icon: <VpnKeyOutlinedIcon fontSize="small" color="action" />,
    label: "SOC2 Type II Certified",
  },
];

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);

  const isFormFilled = email.trim() !== "";

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (emailError) setEmailError(validateEmail(value));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailMsg = validateEmail(email);
    setEmailError(emailMsg);
    if (emailMsg) return;

    setLoading(true);
    try {
      // Simulate API call for sending reset code/link
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Verification code sent to your email!");
      navigate("/verify-otp", { state: { email: email.trim() } });
    } catch {
      toast.error("Failed to send reset code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      badgeText="🔐 ACCOUNT RECOVERY"
      title="Reset your password"
      subtitle="Enter your verified work email address and we'll send a 6-digit verification code to reset your access."
      trustBadges={TRUST_BADGES}
      footer={
        <Typography variant="body2" color="text.secondary">
          Remember your password?{" "}
          <Link
            component={RouterLink}
            to="/login"
            underline="hover"
            sx={{ fontWeight: 600 }}
          >
            Sign In
          </Link>
        </Typography>
      }
    >
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <FormInput
          label="Work Email"
          required
          type="email"
          placeholder="alex@acmedesign.studio"
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
          onBlur={() => setEmailError(validateEmail(email))}
          error={Boolean(emailError)}
          helperText={
            emailError || "Ensure you have immediate access to this inbox."
          }
          startIcon={<MailOutlinedIcon fontSize="small" color="action" />}
          sx={{ mb: 0.5 }}
        />

        <PrimaryButton
          type="submit"
          loading={loading}
          loadingText="Sending..."
          disabled={!isFormFilled}
          sx={{ mb: 3 }}
        >
          Send Verification Code →
        </PrimaryButton>
      </Box>
    </AuthLayout>
  );
};

export default ForgotPassword;
