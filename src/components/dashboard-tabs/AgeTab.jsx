import { Grid, Card, CardContent, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";
import "./_chartSetup";

export default function AgeTab({ citizens }) {
  // бины по возрастам: 0-4,5-9,...,85+
  const bins = Array.from({ length: 19 }, (_, i) => {
    if (i === 18) return "90+";
    const from = i * 5;
    const to = from + 4;
    return `${from}-${to}`;
  });

  const counts = new Array(bins.length).fill(0);
  citizens.forEach((c) => {
    const age = c.age;
    const idx = age >= 90 ? 18 : Math.floor(age / 5);
    counts[idx] += 1;
  });

  const data = {
    labels: bins,
    datasets: [
      {
        label: "Численность",
        data: counts,
        // динамические цвета
        backgroundColor: counts.map(
          (v, i) =>
            `rgba(${50 + i * 8}, ${120 + (i % 3) * 30}, ${180 - i * 4}, 0.85)`
        ),
      },
    ],
  };

  const options = {
    plugins: { legend: { display: false } },
    scales: {
      x: { stacked: false },
      y: { ticks: { callback: (v) => Number(v).toLocaleString() } },
    },
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card sx={{ minHeight: 320, minWidth: 800 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Возрастная структура
            </Typography>
            <Bar data={data} options={options} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
