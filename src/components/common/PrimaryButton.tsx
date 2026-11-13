import { Button, ButtonProps } from "@mui/material";

interface PrimaryButtonProps extends ButtonProps {
  loading?: boolean;
  loadingText?: string;
}

export const PrimaryButton = ({
  loading = false,
  loadingText = "Please wait...",
  disabled,
  children,
  sx,
  ...rest
}: PrimaryButtonProps) => {
  return (
    <Button
      fullWidth
      variant="contained"
      disabled={loading || disabled}
      sx={[
        {
          py: 1.5,
          backgroundColor: "#7c3aed",
          color: "#fff",
          textTransform: "none",
          fontWeight: 600,
          boxShadow: "none",
          "&:hover": { backgroundColor: "#6d28d9", boxShadow: "none" },
          "&.Mui-disabled": { backgroundColor: "#c4b5fd", color: "#fff" },
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
      {...rest}
    >
      {loading ? loadingText : children}
    </Button>
  );
};
