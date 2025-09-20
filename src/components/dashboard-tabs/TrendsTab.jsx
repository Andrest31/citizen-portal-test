import { useMemo } from "react";
import { Typography, Paper, Grid } from "@mui/material";
import { LineChart, BarChart } from "@mui/x-charts";

export default function TrendsTab({ citizens = [] }) {
  // demo dataset: 24 периода (можно заменить на реальные)
  const dataset = useMemo(() => {
    const labels = [
      "окт.24",
      "ноя.24",
      "дек.24",
      "янв.25",
      "фев.25",
      "мар.25",
      "апр.25",
      "май.25",
      "июн.25",
      "июл.25",
      "авг.25",
      "сен.25",
      "окт.25",
      "ноя.25",
      "дек.25",
      "янв.26",
      "фев.26",
      "мар.26",
      "апр.26",
      "май.26",
      "июн.26",
      "июл.26",
      "авг.26",
      "сен.26",
    ];
    let baseBirth = 5200,
      baseDeath = 3200,
      baseMig = 1200;
    return labels.map((lab, i) => {
      // produce gentle waves
      const birth = Math.round(
        baseBirth + Math.sin(i / 2) * 900 + (Math.random() * 200 - 100)
      );
      const death = Math.round(
        baseDeath + Math.cos(i / 3) * 500 + (Math.random() * 120 - 60)
      );
      const mig = Math.round(
        baseMig + Math.sin(i / 4) * 300 + (Math.random() * 120 - 60)
      );
      return {
        period: lab,
        birth,
        death,
        migration: mig,
        populationDelta: birth - death + mig,
      };
    });
  }, [citizens]);

  const totalDelta = dataset.reduce((s, d) => s + d.populationDelta, 0);
  const avgBirth = Math.round(
    dataset.reduce((s, d) => s + d.birth, 0) / (dataset.length || 1)
  );
  const avgDeath = Math.round(
    dataset.reduce((s, d) => s + d.death, 0) / (dataset.length || 1)
  );

  return (
    <>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="subtitle2">
              Суммарный прирост (показ.)
            </Typography>
            <Typography variant="h5">{totalDelta.toLocaleString()}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="subtitle2">Средняя рождаемость</Typography>
            <Typography variant="h5">{avgBirth}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="subtitle2">Средняя смертность</Typography>
            <Typography variant="h5">{avgDeath}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ p: 2, mb: 2, width: 900 }}>
        <Typography variant="h6">
          Тренды населения (рождаемость / смертность / миграция)
        </Typography>
        <LineChart
          dataset={dataset}
          xAxis={[{ dataKey: "period", scaleType: "point" }]}
          series={[
            { dataKey: "birth", label: "Рождаемость", color: "#ff7043" },
            { dataKey: "death", label: "Смертность", color: "#42a5f5" },
            {
              dataKey: "migration",
              label: "Миграция (чистая)",
              color: "#66bb6a",
            },
          ]}
          height={340}
        />
      </Paper>

      <Paper sx={{ p: 2, width: 900 }}>
        <Typography variant="h6">
          Прирост населения по периодам
        </Typography>
        <BarChart
          dataset={dataset}
          xAxis={[{ dataKey: "period", scaleType: "band" }]}
          series={[{ dataKey: "populationDelta", color: "#7e57c2" }]}
          height={280}
        />
      </Paper>
    </>
  );
}
