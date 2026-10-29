import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import TerminalIcon from "@mui/icons-material/Terminal";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import LinkIcon from "@mui/icons-material/Link";
import { Link as RouterLink } from "react-router-dom";

interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

const footerColumns: FooterColumn[] = [
  {
    title: "PRODUCT",
    links: [
      { label: "Link Shortener", href: "#" },
      { label: "Custom Slugs", href: "#" },
      { label: "Click Analytics", href: "#" },
      { label: "QR Codes", href: "#" },
    ],
  },
  {
    title: "RESOURCES",
    links: [
      { label: "Pricing", href: "#pricing" },
      { label: "Documentation", href: "#" },
      { label: "Developer API", href: "#" },
      { label: "System Status", href: "#" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { label: "About", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
];

const Footer = () => {
  return (
    <Box component="footer" sx={{ fontFamily: "Inter, sans-serif", mt: 8 }}>
      {/* Main Footer Section */}
      <Box
        sx={{
          borderTop: "1px solid #E2E8F0",
          backgroundColor: "#FFFFFF",
          pt: { xs: 6, md: 8 },
          pb: { xs: 4, md: 5 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 4, md: 6 }} sx={{ mb: 6 }}>
            {/* Brand Column */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ mb: 2 }}
              >
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "8px",
                    backgroundColor: "#4F46E5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFFFFF",
                  }}
                >
                  <LinkIcon
                    sx={{ fontSize: 20, transform: "rotate(-45deg)" }}
                  />
                </Box>
                <Typography
                  sx={{
                    fontFamily: "Plus Jakarta Sans, sans-serif",
                    fontWeight: 800,
                    fontSize: "1.35rem",
                    color: "#0F172A",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Snip
                </Typography>
              </Stack>

              <Typography
                sx={{
                  fontSize: "0.875rem",
                  color: "#64748B",
                  lineHeight: 1.6,
                  maxWidth: "360px",
                  mb: 2.5,
                }}
              >
                High-performance link infrastructure for modern growth teams.
                Shorten, route, brand, and analyze URLs at global velocity.
              </Typography>

              {/* System Status Pill */}
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  backgroundColor: "#F8FAFC",
                  border: "1px solid #E2E8F0",
                  borderRadius: "9999px",
                  px: 1.75,
                  py: 0.6,
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: "#3B82F6",
                  }}
                />
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    color: "#475569",
                  }}
                >
                  All systems operational (99.9% uptime)
                </Typography>
              </Box>
            </Grid>

            {/* Navigation Columns */}
            {footerColumns.map((column) => (
              <Grid size={{ xs: 6, sm: 4, md: 2.33 }} key={column.title}>
                <Typography
                  sx={{
                    fontFamily: "Plus Jakarta Sans, sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "#0F172A",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    mb: 2,
                  }}
                >
                  {column.title}
                </Typography>
                <Stack spacing={1.25}>
                  {column.links.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      underline="none"
                      sx={{
                        fontSize: "0.875rem",
                        color: "#64748B",
                        transition: "color 0.15s ease",
                        "&:hover": {
                          color: "#4F46E5",
                        },
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </Stack>
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ borderColor: "#E2E8F0", mb: 3 }} />

          {/* Bottom Bar: Copyright & Social Icons */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Typography sx={{ fontSize: "0.813rem", color: "#64748B" }}>
              © {new Date().getFullYear()} Snip Technologies, Inc. All rights
              reserved.
            </Typography>

            <Stack direction="row" spacing={1}>
              {[
                {
                  icon: <PublicIcon sx={{ fontSize: 18 }} />,
                  label: "Website",
                },
                {
                  icon: <TerminalIcon sx={{ fontSize: 18 }} />,
                  label: "API & CLI",
                },
                {
                  icon: <ForumOutlinedIcon sx={{ fontSize: 18 }} />,
                  label: "Community",
                },
                {
                  icon: <CampaignOutlinedIcon sx={{ fontSize: 18 }} />,
                  label: "Updates",
                },
              ].map((social) => (
                <IconButton
                  key={social.label}
                  aria-label={social.label}
                  size="small"
                  sx={{
                    color: "#64748B",
                    "&:hover": {
                      color: "#0F172A",
                      backgroundColor: "#F1F5F9",
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
