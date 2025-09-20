import { useMemo } from "react";
import { Typography, Grid, Paper } from "@mui/material";
import { PieChart, BarChart } from "@mui/x-charts";

export default function PropertyTab({ citizens }) {
  const stats = useMemo(() => {
    let withHouse=0, withoutHouse=0, withCar=0, withoutCar=0;
    const byRegion = {};
    for (const c of citizens) {
      const hasHouse = Array.isArray(c.housing) && c.housing.length>0;
      const hasCar = Array.isArray(c.vehicles) && c.vehicles.length>0;
      if (hasHouse) withHouse++; else withoutHouse++;
      if (hasCar) withCar++; else withoutCar++;
      const r = c.region || "Не указано";
      if (!byRegion[r]) byRegion[r]={house:0,car:0};
      if (hasHouse) byRegion[r].house++;
      if (hasCar) byRegion[r].car++;
    }
    return {
      donutHouse: [{ id:0, value:withHouse, label:"Есть жильё", color:"#66bb6a" }, { id:1, value:withoutHouse, label:"Нет жилья", color:"#ef5350" }],
      donutCar: [{ id:0, value:withCar, label:"Есть транспорт", color:"#42a5f5" }, { id:1, value:withoutCar, label:"Нет транспорта", color:"#ffb74d" }],
      byRegion: Object.entries(byRegion).map(([region,vals])=>({ region, withHouse: vals.house, withCar: vals.car })).sort((a,b)=>b.withHouse-a.withHouse).slice(0,20)
    };
  }, [citizens]);

  const pctHouse = Math.round((stats.donutHouse[0].value/(citizens.length||1))*100);
  const pctCar = Math.round((stats.donutCar[0].value/(citizens.length||1))*100);

  return (
    <>
      <Grid container spacing={2} sx={{ mb:2 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p:2, textAlign:"center" }}>
            <Typography variant="subtitle2">% с жильём</Typography>
            <Typography variant="h4">{pctHouse}%</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p:2, textAlign:"center" }}>
            <Typography variant="subtitle2">% с авто</Typography>
            <Typography variant="h4">{pctCar}%</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p:2, height:360 }}>
            <Typography variant="h6">Жильё (donut)</Typography>
            <PieChart series={[{ innerRadius:60, outerRadius:120, data: stats.donutHouse }]} height={280} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p:2, height:360 }}>
            <Typography variant="h6">Транспорт (donut)</Typography>
            <PieChart series={[{ innerRadius:60, outerRadius:120, data: stats.donutCar }]} height={280} />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p:2, width: 910 }}>
            <Typography variant="h6">Наличие жилья и транспорта по регионам (TOP 20)</Typography>
            <BarChart
              dataset={stats.byRegion}
              xAxis={[{ dataKey: "region", scaleType: "band" }]}
              series={[
                { dataKey: "withHouse", label: "Жильё", color: "#66bb6a" },
                { dataKey: "withCar", label: "Транспорт", color: "#42a5f5" },
              ]}
              height={360}
            />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
