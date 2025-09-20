import { useMemo } from "react";
import { Typography, Grid, Paper } from "@mui/material";
import { BarChart } from "@mui/x-charts";

export default function RegionsTab({ citizens }) {
  const citizensByRegion = useMemo(() => {
    const map = {};
    for (const c of citizens) {
      if (!c.region) continue;
      map[c.region] = (map[c.region] || 0) + 1;
    }
    return Object.entries(map).map(([region, count]) => ({ region, count }));
  }, [citizens]);

  const incomeByRegion = useMemo(() => {
    const map = {};
    for (const c of citizens) {
      if (!c.region) continue;
      const inc = c.income?.total ?? 0;
      map[c.region] = (map[c.region] || 0) + inc;
    }
    return Object.entries(map).map(([region, total]) => ({ region, total }));
  }, [citizens]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Граждане по регионам</Typography>
          <BarChart
            dataset={citizensByRegion}
            xAxis={[{ dataKey: "region" }]}
            series={[{ dataKey: "count", color: "#26a69a" }]}
            height={300}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Доход по регионам</Typography>
          <BarChart
            dataset={incomeByRegion}
            xAxis={[{ dataKey: "region" }]}
            series={[{ dataKey: "total", color: "#9ccc65" }]}
            height={300}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
