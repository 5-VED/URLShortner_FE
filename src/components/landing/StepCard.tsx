import { Card, CardContent, Typography } from "@mui/material";
import type { Step } from "@/types";

interface StepCardProps {
  step: Step;
}

export const StepCard = ({ step }: StepCardProps) => {
  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardContent>
        <Typography sx={{ color: "primary.main", fontWeight: 700 }}>
          Step {step.step}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {step.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {step.description}
        </Typography>
      </CardContent>
    </Card>
  );
};
