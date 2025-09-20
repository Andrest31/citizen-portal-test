import { useMemo } from "react";
import { Typography, Grid, Paper } from "@mui/material";
import { PieChart, BarChart } from "@mui/x-charts";

export default function FinanceTab({ citizens }) {
  const financeGroups = useMemo(() => {
    let low = 0, mid = 0, high = 0;
    for (const c of citizens) {
      const inc = c.income?.total ?? 0;
      if (inc < 30000) low++;
      else if (inc < 100000) mid++;
      else high++;
    }
    return [
      { id: 0, value: low, label: "Низкий (<30k)", color: "#ef5350" },
      { id: 1, value: mid, label: "Средний (30k-100k)", color: "#42a5f5" },
      { id: 2, value: high, label: "Высокий (100k+)", color: "#66bb6a" },
    ];
  }, [citizens]);

  const avgIncomeByRegion = useMemo(() => {
    const map = {};
    for (const c of citizens) {
      if (!c.region) continue;
      const inc = c.income?.total ?? 0;
      if (!map[c.region]) map[c.region] = { sum: 0, count: 0 };
      map[c.region].sum += inc;
      map[c.region].count++;
    }
    return Object.entries(map).map(([region, { sum, count }]) => ({
      region,
      avgIncome: Math.round(sum / count),
    }));
  }, [citizens]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Распределение доходов</Typography>
          <PieChart series={[{ data: financeGroups }]} height={300} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Средний доход по регионам</Typography>
          <BarChart
            dataset={avgIncomeByRegion}
            xAxis={[{ dataKey: "region" }]}
            series={[{ dataKey: "avgIncome", color: "#ffa726" }]}
            height={300}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
