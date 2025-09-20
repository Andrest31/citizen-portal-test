import { useMemo } from "react";
import { Typography, Grid, Paper } from "@mui/material";
import { BarChart } from "@mui/x-charts";

export default function EmploymentTab({ citizens }) {
  const topProfessions = useMemo(() => {
    const map = {};
    for (const c of citizens) {
      const p = c.profession || "—";
      map[p] = (map[p] || 0) + 1;
    }
    return Object.entries(map)
      .map(([prof, count]) => ({ prof, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [citizens]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">ТОП профессий</Typography>
          <BarChart
            dataset={topProfessions}
            xAxis={[{ dataKey: "prof" }]}
            series={[{ dataKey: "count", color: "#ff7043" }]}
            height={400}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
