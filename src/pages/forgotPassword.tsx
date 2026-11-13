import React, { useState, FormEvent } from "react";
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  Paper,
  InputAdornment,
} from "@mui/material";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

const validateEmail = (value: string) => {
  if (!value.trim()) return "Please enter your work email.";
  if (!EMAIL_REGEX.test(value.trim()))
    return "Please enter a valid email address.";
  return "";
};

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);

  const isFormFilled = email.trim() !== "";

  const handleEmailBlur = () => setEmailError(validateEmail(email));

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
      // Navigate to OTP verification screen or confirmation state if applicable
      navigate("/verify-otp");
    } catch (error) {
      toast.error("Failed to send reset code. Please try again.");
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
            🔐 ACCOUNT RECOVERY
          </Typography>
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: 700, mb: 1 }}
          >
            Reset your password
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Enter your verified work email address and we'll send a 6-digit
            verification code to reset your access.
          </Typography>
        </Box>

        {/* Form Inputs */}
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Work Email{" "}
              <Box component="span" sx={{ color: "error.main" }}>
                *
              </Box>
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
              helperText={
                emailError || "Ensure you have immediate access to this inbox."
              }
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
            {loading ? "Sending..." : "Send Verification Code →"}
          </Button>
        </Box>

        {/* Back to Sign In Link */}
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Remember your password?{" "}
            <Link href="/login" underline="hover" sx={{ fontWeight: 600 }}>
              Sign In
            </Link>
          </Typography>
        </Box>

        {/* Security & Trust Strip */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pt: 2,
            borderTop: "1px solid",
            borderColor: "divider",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <VerifiedUserOutlinedIcon fontSize="small" color="action" />
            <Typography variant="caption" color="text.secondary">
              256-bit TLS Edge Security
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <VpnKeyOutlinedIcon fontSize="small" color="action" />
            <Typography variant="caption" color="text.secondary">
              SOC2 Type II Certified
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
