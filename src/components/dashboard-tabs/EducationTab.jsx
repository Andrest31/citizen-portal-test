import { Grid, Card, CardContent, Typography } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import "./_chartSetup";

export default function EducationTab({ citizens }) {
  const educationCounts = citizens.reduce((acc, c) => {
    acc[c.educationLevel] = (acc[c.educationLevel] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(educationCounts);
  const data = {
    labels,
    datasets: [
      {
        data: Object.values(educationCounts),
        backgroundColor: labels.map((_, i) => `rgba(${120 + i * 10}, ${160 - i * 12}, ${200 - i * 8}, 0.85)`),
      },
    ],
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card sx={{ minHeight: 600 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Уровень образования
            </Typography>
            <Doughnut data={data} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
