import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type { FaqItem } from "@/types";

interface FaqAccordionProps {
  items: FaqItem[];
}

export const FaqAccordion = ({ items }: FaqAccordionProps) => {
  return (
    <>
      {items.map((item) => (
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
              sx={{
                fontSize: "0.875rem",
                lineHeight: 1.6,
                color: "#64748B",
              }}
            >
              {item.answers}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};
