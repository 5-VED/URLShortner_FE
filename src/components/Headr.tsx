import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Divider,
  Container,
} from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import ContentCutIcon from "@mui/icons-material/ContentCut"; // or your Snip Brand Logo

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Dashboard", href: "#dashboard" },
  { label: "Analytics", href: "#analytics" },
  { label: "FAQ", href: "#faq" },
];

export const Header = () => {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid #E2E8F0",
        color: "#0F172A",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ height: 70, gap: 3 }}>
          {/* Brand Logo & Name */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ContentCutIcon sx={{ color: "#4F46E5", fontSize: 24 }} />s
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: "#0F172A",
                fontFamily: "Plus Jakarta Sans, sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              Snip
            </Typography>
          </Box>

          {/* Navigation Links */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
            {navLinks.map((link) => (
              <Button
                key={link.label}
                href={link.href}
                sx={{
                  color: "#64748B",
                  fontWeight: 500,
                  textTransform: "none",
                  fontSize: "0.925rem",
                  "&:hover": {
                    color: "#0F172A",
                    backgroundColor: "transparent",
                  },
                }}
              >
                {link.label}
              </Button>
            ))}
          </Box>

          {/* Right Action Items */}
          <Box
            sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 1.5 }}
          >
            {/* Theme Toggle */}
            <IconButton size="small" sx={{ color: "#64748B" }}>
              <DarkModeOutlinedIcon fontSize="small" />
            </IconButton>

            {/* Divider */}
            <Divider
              orientation="vertical"
              flexItem
              sx={{ height: 24, my: "auto" }}
            />

            {/* Sign In */}
            <Button
              sx={{
                color: "#0F172A",
                fontWeight: 600,
                textTransform: "none",
                fontSize: "0.9rem",
              }}
            >
              Sign In
            </Button>

            {/* Sign Up Button */}
            <Button
              variant="contained"
              disableElevation
              sx={{
                backgroundColor: "#4F46E5",
                color: "#FFFFFF",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: "9999px",
                px: 2.5,
                py: 0.75,
                fontSize: "0.875rem",
                "&:hover": { backgroundColor: "#4338CA" },
              }}
            >
              Sign Up
            </Button>

            {/* User Avatar */}
            {/* <Avatar
              alt="User Profile"
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              sx={{ width: 34, height: 34, ml: 0.5 }}
            /> */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
