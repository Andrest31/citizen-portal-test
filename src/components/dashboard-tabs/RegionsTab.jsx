import { Grid, Card, CardContent, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";
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

export default function RegionsTab({ citizens }) {
  const regionCounts = citizens.reduce((acc, c) => {
    acc[c.region] = (acc[c.region] || 0) + 1;
    return acc;
  }, {});

  const topRegions = Object.entries(regionCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15);

  const data = {
    labels: topRegions.map(([r]) => r),
    datasets: [
      {
        label: "Количество",
        data: topRegions.map(([, v]) => v),
        backgroundColor: "#66BB6A",
      },
    ],
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card sx={{ minHeight: 500 }}>
          <CardContent>
            <Typography>ТОП-15 регионов</Typography>
            <Bar data={data} options={{ indexAxis: "y" }} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
