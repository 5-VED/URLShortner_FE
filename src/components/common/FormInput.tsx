import { ReactNode, useState } from "react";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

type FormInputProps = Omit<TextFieldProps, "label"> & {
  label: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  rightLabelSlot?: ReactNode;
  enablePasswordToggle?: boolean;
};

export const FormInput = ({
  label,
  required,
  startIcon,
  endIcon,
  rightLabelSlot,
  enablePasswordToggle = false,
  type,
  slotProps,
  sx,
  ...textFieldProps
}: FormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const resolvedType = enablePasswordToggle
    ? showPassword
      ? "text"
      : "password"
    : type;

  const resolvedEndAdornment = enablePasswordToggle ? (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={() => setShowPassword((prev) => !prev)}
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
  ) : endIcon ? (
    <InputAdornment position="end">{endIcon}</InputAdornment>
  ) : undefined;

  return (
    <Box sx={{ mb: 2.5 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {label}
          {required && (
            <Box component="span" sx={{ color: "error.main", ml: 0.5 }}>
              *
            </Box>
          )}
        </Typography>
        {rightLabelSlot}
      </Box>

      <TextField
        fullWidth
        size="small"
        required={required}
        type={resolvedType}
        sx={sx}
        slotProps={{
          ...slotProps,
          input: {
            ...(startIcon && {
              startAdornment: (
                <InputAdornment position="start">{startIcon}</InputAdornment>
              ),
            }),
            ...(resolvedEndAdornment && {
              endAdornment: resolvedEndAdornment,
            }),
            ...(typeof slotProps?.input === "object" ? slotProps.input : {}),
          },
        }}
        {...textFieldProps}
      />
    </Box>
  );
};
