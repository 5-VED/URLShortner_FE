import { useRef, KeyboardEvent, ClipboardEvent } from "react";
import { Box, TextField } from "@mui/material";

interface OtpInputProps {
  value: string[];
  onChange: (newOtp: string[]) => void;
  length?: number;
}

export const OtpInput = ({ value, onChange, length = 6 }: OtpInputProps) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (rawValue: string, index: number) => {
    const digit = rawValue.replace(/[^0-9]/g, "").slice(-1);
    const newOtp = [...value];
    newOtp[index] = digit;
    onChange(newOtp);

    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>, index: number) => {
    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
      return;
    }

    if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
      return;
    }

    if (e.key === "Backspace") {
      const newOtp = [...value];
      if (newOtp[index]) {
        newOtp[index] = "";
        onChange(newOtp);
      } else if (index > 0) {
        newOtp[index - 1] = "";
        onChange(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData
      .getData("text")
      .replace(/[^0-9]/g, "")
      .slice(0, length);

    if (!pasteData) return;

    const newOtp = Array<string>(length).fill("");
    pasteData.split("").forEach((char, idx) => {
      newOtp[idx] = char;
    });
    onChange(newOtp);

    const nextIndex = Math.min(pasteData.length, length - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <Box
      onPaste={handlePaste}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        gap: { xs: 1, sm: 1.5 },
        mb: 3,
      }}
    >
      {Array.from({ length }).map((_, index) => (
        <TextField
          key={index}
          inputRef={(el) => {
            inputRefs.current[index] = el;
          }}
          value={value[index] ?? ""}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          slotProps={{
            htmlInput: {
              maxLength: 1,
              inputMode: "numeric",
              pattern: "[0-9]*",
              autoComplete: index === 0 ? "one-time-code" : "off",
              "aria-label": `Digit ${index + 1} of ${length}`,
              style: {
                textAlign: "center",
                fontSize: "1.25rem",
                fontWeight: 700,
                padding: "12px 0",
              },
            },
          }}
          sx={{
            width: { xs: "42px", sm: "52px" },
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
        />
      ))}
    </Box>
  );
};
