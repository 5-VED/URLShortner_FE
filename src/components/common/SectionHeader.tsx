import { Typography } from "@mui/material";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  id?: string;
}

export const SectionHeader = ({ title, subtitle, id }: SectionHeaderProps) => {
  return (
    <>
      <Typography
        id={id}
        variant="h4"
        sx={{
          fontWeight: 700,
          textAlign: "center",
          mb: subtitle ? 1.5 : 4,
          color: "#0F172A",
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            color: "text.secondary",
            maxWidth: "600px",
            mx: "auto",
            mb: 4,
          }}
        >
          {subtitle}
        </Typography>
      )}
    </>
  );
};
