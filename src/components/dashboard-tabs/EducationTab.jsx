import { Grid, Card, CardContent, Typography } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
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

ChartJS.register(ArcElement, Tooltip, Legend);

export default function EducationTab({ citizens }) {
  const educationCounts = citizens.reduce((acc, c) => {
    acc[c.educationLevel] = (acc[c.educationLevel] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(educationCounts),
    datasets: [
      {
        data: Object.values(educationCounts),
        backgroundColor: ["#FFB74D", "#4DB6AC", "#9575CD"],
      },
    ],
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card sx={{ minHeight: 400 }}>
          <CardContent>
            <Typography>Уровень образования</Typography>
            <Doughnut data={data} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
