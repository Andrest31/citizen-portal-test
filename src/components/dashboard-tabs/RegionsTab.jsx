import { Grid, Card, CardContent, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";
import "./_chartSetup";

export default function RegionsTab({ citizens }) {
  const regionCounts = citizens.reduce((acc, c) => {
    acc[c.region] = (acc[c.region] || 0) + 1;
    return acc;
  }, {});

  const topRegions = Object.entries(regionCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12);

  const data = {
    labels: topRegions.map(([r]) => r),
    datasets: [
      {
        label: "Численность",
        data: topRegions.map(([, v]) => v),
        backgroundColor: topRegions.map(([, v], i) => `rgba(${80 + i * 10}, ${140 + (i % 3) * 20}, ${180 - i * 6}, 0.9)`),
      },
    ],
  };

  const options = {
    indexAxis: "y",
    plugins: { legend: { display: false } },
    scales: { x: { ticks: { callback: (v) => Number(v).toLocaleString() } } },
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card sx={{ minHeight: 700 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              ТОП регионов (по населению)
            </Typography>
            <Bar data={data} options={options} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
