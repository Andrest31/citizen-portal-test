import { useMemo } from "react";
import { Typography, Grid, Paper } from "@mui/material";
import { LineChart, PieChart } from "@mui/x-charts";

export default function RegionsTab({ citizens }) {
  const dataset = useMemo(() => {
    const map = {};
    for (const c of citizens) {
      const r = c.region || "Не указано";
      if (!map[r]) map[r]={ count:0, sum:0 };
      map[r].count++;
      map[r].sum += c.income?.total || 0;
    }
    return Object.entries(map).map(([region,{count,sum}])=>({ region, count, avgIncome: Math.round(sum/(count||1)) })).sort((a,b)=>b.count-a.count).slice(0,12);
  }, [citizens]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p:2, height: 360 }}>
            <Typography variant="h6">Численность по регионам</Typography>
            <LineChart
              dataset={dataset}
              xAxis={[{ dataKey:"region", scaleType:"point" }]}
              series={[{ dataKey:"count", label:"Население", color:"#42a5f5" }]}
              height={280}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p:2, height: 360 }}>
            <Typography variant="h6">Доход по регионам</Typography>
            <LineChart
              dataset={dataset}
              xAxis={[{ dataKey:"region", scaleType:"point" }]}
              series={[{ dataKey:"avgIncome", label:"Доход", color:"#66bb6a" }]}
              height={280}
            />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p:2, height: 360 }}>
            <Typography variant="h6">Доля населения по макро-регионам</Typography>
            <PieChart
              series={[{ innerRadius:60, outerRadius:120, data: dataset.map((d,i)=>({ id:i, value:d.count, label:d.region })) }]}
              height={280}
            />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
