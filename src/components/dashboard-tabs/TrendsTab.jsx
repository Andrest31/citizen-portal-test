import { Grid, Card, CardContent, Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import "./_chartSetup";

function seriesWithTrend(points = 24, base = 1000, variability = 300, trend = 0.01, skew = 0.5) {
  // создает серию с трендом и шумом — менее равномерную
  const out = [];
  let val = base;
  for (let i = 0; i < points; i++) {
    // тренд
    val = val * (1 + trend * (Math.sin(i / 3) * 0.5 + 1) * 0.5);
    // шум: смесь нормального и экспоненциального
    const noise = (Math.random() - 0.4) * variability * (1 + Math.sin(i / 5));
    const burst = Math.random() < 0.07 ? Math.random() * variability * 3 : 0;
    out.push(Math.max(0, Math.round(val + noise + burst)));
  }
  return out;
}

export default function TrendsTab() {
  const labels = Array.from({ length: 24 }, (_, i) => {
    const month = new Date();
    month.setMonth(month.getMonth() - (23 - i));
    return month.toLocaleString("ru", { month: "short", year: "2-digit" });
  });

  const births = seriesWithTrend(24, 5000, 1200, 0.004);
  const deaths = seriesWithTrend(24, 3000, 800, -0.001);
  const migration = seriesWithTrend(24, 1200, 600, 0.002);

  const data = {
    labels,
    datasets: [
      {
        label: "Рождаемость",
        data: births,
        borderColor: "#FF7043",
        backgroundColor: "rgba(255,112,67,0.08)",
        tension: 0.35,
      },
      {
        label: "Смертность",
        data: deaths,
        borderColor: "#42A5F5",
        backgroundColor: "rgba(66,165,245,0.08)",
        tension: 0.35,
      },
      {
        label: "Миграция (чистая)",
        data: migration,
        borderColor: "#66BB6A",
        backgroundColor: "rgba(102,187,106,0.08)",
        tension: 0.35,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { position: "top" } },
    scales: {
      y: { ticks: { callback: (v) => Number(v).toLocaleString() } },
    },
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card sx={{ minHeight: 700 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Тренды населения (последние 24 периода)
            </Typography>
            <Line data={data} options={options} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
