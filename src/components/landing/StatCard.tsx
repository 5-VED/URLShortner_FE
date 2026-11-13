import { Box, Typography } from "@mui/material";
import type { IPerformance } from "@/types";

interface StatCardProps {
  stat: IPerformance;
}

export const StatCard = ({ stat }: StatCardProps) => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h4" sx={{ fontWeight: 700, color: "#0F172A" }}>
        {stat.value}
      </Typography>
      <Typography sx={{ color: "text.secondary" }}>
        {stat.description ?? stat.desctiption}
      </Typography>
    </Box>
  );
};
