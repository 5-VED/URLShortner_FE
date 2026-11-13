import { useState, useEffect, FormEvent } from "react";
import { Box, Link, Typography } from "@mui/material";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthLayout, TrustBadge } from "@/components/auth/AuthLayout";
import { OtpInput } from "@/components/auth/OtpInput";
import { PrimaryButton } from "@/components/common/PrimaryButton";

const OTP_LENGTH = 6;
const RESEND_TIMEOUT = 30; // seconds

const TRUST_BADGES: TrustBadge[] = [
  {
    icon: <VerifiedUserOutlinedIcon fontSize="small" color="action" />,
    label: "SOC2 Type II Certified",
  },
  {
    icon: <LockResetOutlinedIcon fontSize="small" color="action" />,
    label: "End-to-End Encrypted Session",
  },
];

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userEmail =
    (location.state as { email?: string } | null)?.email ||
    "alex@acmedesign.studio";

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(RESEND_TIMEOUT);

  const canResend = timer === 0;
  const isCountingDown = timer > 0;
  const isFormFilled = otp.every((digit) => digit !== "");

  useEffect(() => {
    if (!isCountingDown) return;

    const interval = setInterval(() => {
      setTimer((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [isCountingDown]);

  const handleResend = () => {
    if (!canResend) return;
    setOtp(Array(OTP_LENGTH).fill(""));
    setTimer(RESEND_TIMEOUT);
    toast.success("A new verification code has been sent.");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fullCode = otp.join("");

    if (fullCode.length !== OTP_LENGTH) {
      toast.error("Please enter the complete 6-digit code.");
      return;
    }

    setLoading(true);
    try {
      // Simulate API verification call
      await new Promise((resolve) => setTimeout(resolve, 1200));
      toast.success("Code verified successfully!");
      navigate("/reset-password", {
        state: { email: userEmail, code: fullCode },
      });
    } catch {
      toast.error("Invalid verification code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      badgeText="🛡️ TWO-STEP VERIFICATION"
      title="Enter 6-digit code"
      subtitle={
        <>
          We sent an authorization code to{" "}
          <Box component="span" sx={{ fontWeight: 600, color: "text.primary" }}>
            {userEmail}
          </Box>{" "}
          <Link
            component={RouterLink}
            to="/forgot-password"
            underline="hover"
            sx={{ fontWeight: 500, fontSize: "0.85rem", ml: 0.5 }}
          >
            Change email
          </Link>
        </>
      }
      trustBadges={TRUST_BADGES}
      footer={
        <Link
          component={RouterLink}
          to="/login"
          variant="body2"
          underline="hover"
          sx={{
            fontWeight: 600,
            display: "inline-flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          ← Back to Sign In
        </Link>
      }
    >
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <OtpInput value={otp} onChange={setOtp} length={OTP_LENGTH} />

        {/* Timer and Resend Row */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <TimerOutlinedIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {timer > 0 ? (
                <>
                  Code expires in{" "}
                  <Box component="span" sx={{ fontWeight: 600 }}>
                    00:{timer < 10 ? `0${timer}` : timer}
                  </Box>
                </>
              ) : (
                <Box
                  component="span"
                  sx={{ color: "error.main", fontWeight: 600 }}
                >
                  Code expired
                </Box>
              )}
            </Typography>
          </Box>
          <Typography variant="body2">
            Didn't receive code?{" "}
            <Link
              component="button"
              type="button"
              onClick={handleResend}
              disabled={!canResend}
              underline={canResend ? "hover" : "none"}
              sx={{
                fontWeight: 600,
                color: canResend ? "primary.main" : "text.disabled",
                cursor: canResend ? "pointer" : "default",
              }}
            >
              Resend now
            </Link>
          </Typography>
        </Box>

        <PrimaryButton
          type="submit"
          loading={loading}
          loadingText="Verifying..."
          disabled={!isFormFilled}
          sx={{ mb: 3 }}
        >
          Verify & Continue →
        </PrimaryButton>
      </Box>
    </AuthLayout>
  );
};

export default VerifyOtp;
