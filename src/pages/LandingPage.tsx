import { useState, type FormEvent } from "react";
import {
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
  Paper,
  Link,
  IconButton,
  Tooltip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BoltIcon from "@mui/icons-material/Bolt";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import type { FaqItem, Plan, Step, IPerfomance } from "@/types";
import Header from "../components/Headr";
import { isValidUrl } from "../utils/validateUrl";

const faq: FaqItem[] = [
  {
    question: "Are short links permanent?",
    answers:
      "Yes. Links stay active as long as your account is in good standing and the destination URL is safe and compliant with our terms.",
  },
  {
    question: "Can I use a custom domain name?",
    answers: "Yes, on the Pro and Enterprise plans.",
  },
  {
    question: "How does click analytics work?",
    answers:
      "Every click is recorded with referrer, device, and location data, and shows up in your dashboard in real time.",
  },
  {
    question: "Are there APIs available?",
    answers: "Yes, API access is included on the Pro and Enterprise plans.",
  },
];

const plans: Plan[] = [
  {
    name: "Free",
    description: "Try it out with the basics",
    amount: 0,
    features: [
      "25 short links per month",
      "Basic click analytics",
      "Random short codes",
      "30-day link history",
    ],
  },
  {
    name: "Standard",
    description: "Essential tools for individuals",
    amount: 39,
    features: [
      "500 short links per month",
      "Custom aliases (yourdomain.com/sale)",
      "QR code generation",
      "Click analytics with referrers and devices",
      "Link expiration dates",
    ],
  },
  {
    name: "Pro",
    description: "Advanced tools for growing teams",
    amount: 79,
    features: [
      "5,000 short links per month",
      "1 custom domain",
      "Password-protected links",
      "Geo and device targeting",
      "UTM parameter builder",
      "Bulk link creation via CSV",
      "API access",
    ],
  },
  {
    name: "Enterprise",
    description: "Scale and control for large organizations",
    amount: 199,
    features: [
      "Unlimited short links",
      "Unlimited custom domains",
      "Team roles and permissions",
      "Webhooks and advanced API limits",
      "SSO and audit logs",
      "99.9% uptime SLA",
      "Dedicated support",
    ],
  },
];

const steps: Step[] = [
  {
    step: 1,
    name: "Paste your long URL",
    description:
      "Drop any long link into the input box. No account is needed to get started.",
  },
  {
    step: 2,
    name: "Customize your link",
    description:
      "Pick a custom alias, add an expiration date, or set a password to control who can open it.",
  },
  {
    step: 3,
    name: "Share it anywhere",
    description:
      "Copy your short link or download the QR code and share it across social media, email, or print.",
  },
  {
    step: 4,
    name: "Track performance",
    description:
      "See clicks, locations, devices, and referrers in real time from your analytics dashboard.",
  },
];

const performance: IPerfomance[] = [
  { value: "10M", description: "Links shortened" },
  { value: "99.99%", description: "Redirect uptime" },
  { value: "<15 ms", description: "Global edge latency" },
  { value: "45,000+", description: "Happy users" },
];

const sectionTitleSx = {
  fontWeight: 700,
  textAlign: "center",
  mb: 4,
  color: "#0F172A",
} as const;

const LandingPage = () => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShorten = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!url.trim()) {
      setError("Please enter a URL.");
    }
    console.log("Shorten:", url);
    let urlValid = isValidUrl(url);

    // if true then call api
    if (!urlValid) {
      setError("Please enter a valid URL (e.g. https://example.com/page).");
    } else {
    }
    // else show error
  };

  return (
    <Box sx={{ fontFamily: "Inter, sans-serif" }}>
      <Header />
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(180deg, #EEF2FF 0%, #FFFFFF 100%)",
          pt: { xs: 8, md: 12 },
          pb: { xs: 10, md: 16 },
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="md">
          {/* Top Badge */}
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              backgroundColor: "#EEF2FF",
              border: "1px solid #C7D2FE",
              borderRadius: "9999px",
              px: 2,
              py: 0.75,
              mb: 3,
            }}
          >
            <BoltIcon sx={{ fontSize: 16, color: "#4F46E5" }} />
            <Typography
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.813rem",
                fontWeight: 600,
                color: "#4F46E5",
                letterSpacing: "-0.01em",
              }}
            >
              EDGE ENGINE V4.2 LIVE • Zero Routing Overhead
            </Typography>
          </Box>

          {/* Headline */}
          <Typography
            variant="h1"
            sx={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
              fontWeight: 800,
              color: "#0F172A",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              mb: 2.5,
            }}
          >
            Smarter links, instantaneous redirects.
          </Typography>

          {/* Subtext */}
          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontSize: { xs: "1rem", md: "1.125rem" },
              color: "#64748B",
              maxWidth: "640px",
              mx: "auto",
              mb: 5,
              lineHeight: 1.6,
            }}
          >
            Shorten long messy URLs, generate custom branded links, and track
            real-time click telemetry across every channel in milliseconds.
          </Typography>

          {/* Shortener Action Form & Result Card Container */}
          <Box sx={{ maxWidth: "720px", mx: "auto" }}>
            <Paper
              component="form"
              onSubmit={handleShorten}
              elevation={3}
              sx={{
                p: 1.5,
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 1.5,
                backgroundColor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: "16px",
                boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.08)",
              }}
            >
              <TextField
                fullWidth
                placeholder="Paste any extensive, UTM-tagged URL..."
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  if (error) setError("");
                }}
                variant="standard"
                error={!!error}
                helperText={error}
                slotProps={{
                  input: {
                    disableUnderline: true,
                    sx: {
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.95rem",
                      px: 2,
                      color: "#0F172A",
                    },
                  },
                  formHelperText: { sx: { px: 2, textAlign: "left" } },
                }}
                sx={{ justifyContent: "center" }}
              />{" "}
              <Button
                type="submit"
                variant="contained"
                disableElevation
                disabled={loading}
                startIcon={<BoltIcon />}
                sx={{
                  backgroundColor: "#4F46E5",
                  color: "#FFFFFF",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 4,
                  py: 1.5,
                  whiteSpace: "nowrap",
                  "&:hover": { backgroundColor: "#4338CA" },
                  "&:focus-visible": {
                    boxShadow: "0 0 0 2px #FFFFFF, 0 0 0 4px #4F46E5",
                  },
                }}
              >
                {loading ? "Shortening..." : "Shorten Link"}
              </Button>
            </Paper>

            {shortUrl && (
              <Paper
                elevation={0}
                sx={{
                  mt: 2,
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "1px solid #C7D2FE",
                  borderRadius: "12px",
                  backgroundColor: "#EEF2FF",
                }}
              >
                <Link
                  href={shortUrl}
                  target="_blank"
                  rel="noopener"
                  underline="hover"
                  sx={{ fontWeight: 600, color: "#4F46E5" }}
                >
                  {shortUrl}
                </Link>
                <Tooltip title="Copy">
                  <IconButton
                    onClick={() => navigator.clipboard.writeText(shortUrl)}
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </Tooltip>
              </Paper>
            )}
          </Box>
        </Container>
      </Box>

      {/* Remaining sections */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Performance */}
        <Grid container spacing={3} sx={{ mb: 10 }}>
          {performance.map((p) => (
            <Grid
              size={{ xs: 6, md: 3 }}
              key={p.value}
              sx={{ textAlign: "center" }}
            >
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, color: "#0F172A" }}
              >
                {p.value}
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                {p.description}
              </Typography>
            </Grid>
          ))}
        </Grid>

        {/* Steps */}
        <Typography variant="h4" sx={sectionTitleSx}>
          How it works
        </Typography>
        <Grid container spacing={3} sx={{ mb: 10 }}>
          {steps.map((s) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={s.step}>
              <Card variant="outlined" sx={{ height: "100%" }}>
                <CardContent>
                  <Typography sx={{ color: "primary.main", fontWeight: 700 }}>
                    Step {s.step}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {s.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {s.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Pricing */}
        <Typography variant="h4" sx={sectionTitleSx}>
          Pricing
        </Typography>
        <Grid container spacing={3} sx={{ mb: 10 }}>
          {plans.map((plan) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={plan.name}>
              <Card variant="outlined" sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h6">{plan.name}</Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", mb: 2 }}
                  >
                    {plan.description}
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                    ${plan.amount}
                    <Typography
                      component="span"
                      sx={{ color: "text.secondary" }}
                    >
                      /mo
                    </Typography>
                  </Typography>
                  {plan.features.map((f) => (
                    <Typography key={f} variant="body2" sx={{ mb: 0.5 }}>
                      ✓ {f}
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* FAQ */}
        <Typography variant="h4" sx={sectionTitleSx}>
          Frequently asked questions
        </Typography>
        {faq.map((item) => (
          <Accordion
            key={item.question}
            elevation={0}
            disableGutters
            sx={{
              backgroundColor: "#F8FAFC",
              border: "1px solid #E2E8F0",
              borderRadius: "12px !important",
              mb: 2,
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                px: 3,
                py: 1,
                "& .MuiAccordionSummary-content": { my: 1.5 },
              }}
            >
              <Typography sx={{ fontWeight: 600, color: "#0F172A" }}>
                {item.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 3, pb: 3, pt: 0 }}>
              <Typography
                sx={{ fontSize: "0.875rem", lineHeight: 1.6, color: "#64748B" }}
              >
                {item.answers}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  );
};

export default LandingPage;
