import { Grid, Card, CardContent, Typography } from "@mui/material";
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Legend
);

export default function BenefitsTab({ citizens }) {
  const benefits = citizens.reduce(
    (acc, c) => {
      c.benefits?.forEach((b) => {
        acc[b] = (acc[b] || 0) + 1;
      });
      return acc;
    },
    {}
  );

  const data = {
    labels: Object.keys(benefits),
    datasets: [
      {
        data: Object.values(benefits),
        backgroundColor: ["#AB47BC", "#29B6F6", "#FFA726"],
      },
    ],
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Card sx={{ minHeight: 400 }}>
          <CardContent>
            <Typography>Социальные льготы</Typography>
            <PolarArea data={data} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
