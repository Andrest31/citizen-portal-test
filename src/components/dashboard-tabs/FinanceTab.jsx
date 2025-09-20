import { useMemo } from "react";
import { Typography, Grid, Paper } from "@mui/material";
import { PieChart, BarChart } from "@mui/x-charts";

export default function FinanceTab({ citizens }) {
  const groups = useMemo(() => {
    let low=0, mid=0, high=0;
    const all = [];
    for (const c of citizens) {
      const inc = c.income?.total ?? 0;
      all.push(inc);
      if (inc < 30000) low++;
      else if (inc < 100000) mid++;
      else high++;
    }
    const median = (() => {
      if (!all.length) return 0;
      const s = [...all].sort((a,b)=>a-b);
      const m = Math.floor(s.length/2);
      return s.length%2 ? s[m] : Math.round((s[m-1]+s[m])/2);
    })();
    return {
      donut: [
        { id:0, value:low, label:"<30k", color:"#ef5350" },
        { id:1, value:mid, label:"30-100k", color:"#42a5f5" },
        { id:2, value:high, label:">100k", color:"#66bb6a" },
      ],
      median,
      avg: Math.round((citizens.reduce((s,c)=>s+(c.income?.total||0),0) / (citizens.length||1))),
    };
  }, [citizens]);

  const avgByAgeBucket = useMemo(() => {
    const map = {};
    for (const c of citizens) {
      const age = c.personalInfo?.age ?? null;
      if (typeof age !== "number") continue;
      const b = Math.floor(age/10)*10;
      if (!map[b]) map[b] = { sum:0, count:0 };
      map[b].sum += c.income?.total || 0;
      map[b].count++;
    }
    return Object.entries(map).map(([bucket,{sum,count}])=>({
      ageGroup:`${bucket}-${+bucket+9}`,
      avgIncome: count?Math.round(sum/count):0
    })).sort((a,b)=>Number(a.ageGroup.split('-')[0])-Number(b.ageGroup.split('-')[0]));
  }, [citizens]);

  return (
    <>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p:2, textAlign:"center" }}>
            <Typography variant="subtitle2">Средний доход</Typography>
            <Typography variant="h5">{groups.avg.toLocaleString()}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p:2, textAlign:"center" }}>
            <Typography variant="subtitle2">Медианный доход</Typography>
            <Typography variant="h5">{groups.median.toLocaleString()}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p:2, textAlign:"center" }}>
            <Typography variant="subtitle2">% с доходом выше 100k</Typography>
            <Typography variant="h5">{Math.round((groups.donut[2].value/(citizens.length||1))*100)}%</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <Paper sx={{ p:2, height: 360 }}>
            <Typography variant="h6">Распределение доходов</Typography>
            <PieChart series={[{ innerRadius:60, outerRadius:120, data: groups.donut }]} height={280} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={7}>
          <Paper sx={{ p:2, height: 360 }}>
            <Typography variant="h6">Доход по возрастным группам</Typography>
            <BarChart
              dataset={avgByAgeBucket}
              xAxis={[{ dataKey: "ageGroup", scaleType: "band" }]}
              series={[{ dataKey: "avgIncome", color: "#ab47bc" }]}
              height={280}
            />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
