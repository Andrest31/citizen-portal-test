import { Grid, Card, CardContent, Typography } from "@mui/material";
import { Line, Bubble } from "react-chartjs-2";
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

export default function TrendsTab() {
  const lineData = {
    labels: Array.from({ length: 12 }, (_, i) => `20${10 + i}`),
    datasets: [
      {
        label: "Рождаемость",
        data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 5000)),
        borderColor: "#ff7043",
        backgroundColor: "rgba(255,112,67,0.4)",
      },
      {
        label: "Смертность",
        data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 4000)),
        borderColor: "#42A5F5",
        backgroundColor: "rgba(66,165,245,0.4)",
      },
    ],
  };

  const bubbleData = {
    datasets: [
      {
        label: "Миграция",
        data: Array.from({ length: 20 }, () => ({
          x: Math.random() * 100,
          y: Math.random() * 100,
          r: Math.random() * 15,
        })),
        backgroundColor: "rgba(76,175,80,0.5)",
      },
    ],
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Card sx={{ minHeight: 400 }}>
          <CardContent>
            <Typography>Рождаемость / Смертность</Typography>
            <Line data={lineData} />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card sx={{ minHeight: 400 }}>
          <CardContent>
            <Typography>Миграция (Bubble)</Typography>
            <Bubble data={bubbleData} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
