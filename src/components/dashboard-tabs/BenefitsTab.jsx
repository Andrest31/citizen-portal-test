import { Grid, Card, CardContent, Typography } from "@mui/material";
import { PolarArea } from "react-chartjs-2";
import "./_chartSetup";

export default function BenefitsTab({ citizens }) {
  const benefits = citizens.reduce((acc, c) => {
    (c.benefits || []).forEach((b) => {
      acc[b] = (acc[b] || 0) + 1;
    });
    return acc;
  }, {});

  const labels = Object.keys(benefits);
  const data = {
    labels,
    datasets: [
      {
        data: Object.values(benefits),
        backgroundColor: labels.map((_, i) => `rgba(${180 - i * 8}, ${120 + i * 6}, ${150 + i * 4}, 0.85)`),
      },
    ],
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card sx={{ minHeight: 600 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Социальные льготы
            </Typography>
            <PolarArea data={data} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
