import { Grid, Card, CardContent, Typography } from "@mui/material";
import type { DashboardSummary } from "../types";

interface Props {
  data: DashboardSummary;
}

export const SummaryCards = ({ data }: Props) => {
  const cards = [
    { title: "Present", value: data.totalPresent },
    { title: "Absent", value: data.totalAbsent },
    { title: "Payroll", value: `₹ ${data.totalPayroll}` },
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((card) => (
        <Grid size={{ xs: 12, md: 4 }} key={card.title}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6">{card.title}</Typography>
              <Typography variant="h4" fontWeight="bold">
                {card.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
