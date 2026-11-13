import { Box, Container, Grid, Typography } from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import type { FaqItem, Plan, Step, IPerfomance } from "@/types";
import Header from "@/components/Headr";
import Footer from "@/components/Footer";
import { SectionHeader } from "@/components/common/SectionHeader";
import { UrlShortenerForm } from "@/components/landing/UrlShortenerForm";
import { StatCard } from "@/components/landing/StatCard";
import { StepCard } from "@/components/landing/StepCard";
import { PricingCard } from "@/components/landing/PricingCard";
import { FaqAccordion } from "@/components/landing/FaqAccordion";

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

const LandingPage = () => {
  return (
    <>
      <Header />
      <Box sx={{ fontFamily: "Inter, sans-serif" }}>
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

            <UrlShortenerForm />
          </Container>
        </Box>

        {/* Main Content Sections */}
        <Container maxWidth="lg" sx={{ py: 6 }}>
          {/* Performance Stats */}
          <Grid container spacing={3} sx={{ mb: 10 }}>
            {performance.map((stat) => (
              <Grid size={{ xs: 6, md: 3 }} key={stat.value}>
                <StatCard stat={stat} />
              </Grid>
            ))}
          </Grid>

          {/* How It Works */}
          <SectionHeader id="features" title="How it works" />
          <Grid container spacing={3} sx={{ mb: 10 }}>
            {steps.map((step) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={step.step}>
                <StepCard step={step} />
              </Grid>
            ))}
          </Grid>

          {/* Pricing */}
          <SectionHeader id="pricing" title="Pricing" />
          <Grid container spacing={3} sx={{ mb: 10 }}>
            {plans.map((plan) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={plan.name}>
                <PricingCard plan={plan} />
              </Grid>
            ))}
          </Grid>

          {/* FAQ */}
          <SectionHeader id="faq" title="Frequently asked questions" />
          <FaqAccordion items={faq} />
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default LandingPage;
