import { Box, Card, CardContent, Typography } from "@mui/material";
import type { Plan } from "@/types";

interface PricingCardProps {
  plan: Plan;
}

export const PricingCard = ({ plan }: PricingCardProps) => {
  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h6">{plan.name}</Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
          {plan.description}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
          ${plan.amount}
          <Box
            component="span"
            sx={{ color: "text.secondary", fontSize: "1rem", fontWeight: 400 }}
          >
            /mo
          </Box>
        </Typography>
        {plan.features.map((feature) => (
          <Typography key={feature} variant="body2" sx={{ mb: 0.5 }}>
            ✓ {feature}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
};
