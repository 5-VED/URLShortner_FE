import { Box, LinearProgress, Typography } from "@mui/material";
import { getPasswordStrength } from "@/utils/validators";

interface PasswordStrengthMeterProps {
  password: string;
}

export const PasswordStrengthMeter = ({
  password,
}: PasswordStrengthMeterProps) => {
  const { hasMinLength, hasUppercase, hasNumberOrSymbol } =
    getPasswordStrength(password);

  const criteria = [
    { label: "8+ chars", met: hasMinLength },
    { label: "Uppercase", met: hasUppercase },
    { label: "Number/Symbol", met: hasNumberOrSymbol },
  ];

  return (
    <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
      {criteria.map((item) => (
        <Box key={item.label} sx={{ flex: 1 }}>
          <LinearProgress
            variant="determinate"
            value={item.met ? 100 : 0}
            sx={{
              height: 4,
              borderRadius: 2,
              backgroundColor: "action.hover",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "success.main",
              },
            }}
          />
          <Typography
            variant="caption"
            color={item.met ? "text.primary" : "text.secondary"}
            sx={{ display: "block", mt: 0.5, fontSize: "0.7rem" }}
          >
            {item.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
