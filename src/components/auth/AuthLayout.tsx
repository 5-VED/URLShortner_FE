import { ReactNode } from "react";
import { Box, Container, Paper, Typography } from "@mui/material";

export interface TrustBadge {
  icon: ReactNode;
  label: string;
}

interface AuthLayoutProps {
  badgeText: string;
  title: string;
  subtitle: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  trustBadges?: TrustBadge[];
}

export const AuthLayout = ({
  badgeText,
  title,
  subtitle,
  children,
  footer,
  trustBadges = [],
}: AuthLayoutProps) => {
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
            {badgeText}
          </Typography>
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: 700, mb: 1 }}
          >
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            {subtitle}
          </Typography>
        </Box>

        {/* Main Content */}
        {children}

        {/* Security & Trust Badges */}
        {trustBadges.length > 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              pt: 2,
              borderTop: "1px solid",
              borderColor: "divider",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            {trustBadges.map((badge) => (
              <Box
                key={badge.label}
                sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
              >
                {badge.icon}
                <Typography variant="caption" color="text.secondary">
                  {badge.label}
                </Typography>
              </Box>
            ))}
          </Box>
        )}

        {/* Footer */}
        {footer && <Box sx={{ textAlign: "center", mt: 3 }}>{footer}</Box>}
      </Paper>
    </Container>
  );
};
