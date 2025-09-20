import { useMemo } from "react";
import { Typography, Grid, Paper } from "@mui/material";
import { BarChart, PieChart } from "@mui/x-charts";

export default function EducationTab({ citizens }) {
  const education = useMemo(() => {
    const map = {};
    for (const c of citizens) {
      const e = c.educationLevel || "—";
      map[e] = (map[e] || 0) + 1;
    }
    return Object.entries(map).map(([level, count], i) => ({
      id: i, level, count,
    }));
  }, [citizens]);

  const educationEmployment = useMemo(() => {
    const map = {};
    for (const c of citizens) {
      const e = c.educationLevel || "—";
      const emp = c.employment || "Неизвестно";
      const key = `${e}_${emp}`;
      map[key] = (map[key] || 0) + 1;
    }
    return Object.entries(map).map(([key, count], i) => {
      const [level, emp] = key.split("_");
      return { id: i, level, emp, count };
    });
  }, [citizens]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Уровень образования</Typography>
          <PieChart
            series={[{
              data: education.map((d, i) => ({
                id: d.id, value: d.count, label: d.level,
                color: ["#42a5f5", "#66bb6a", "#ffa726", "#ab47bc"][i % 4]
              }))
            }]}
            height={300}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Образование vs занятость</Typography>
          <BarChart
            dataset={educationEmployment}
            xAxis={[{ dataKey: "level" }]}
            series={[{ dataKey: "count", color: "#29b6f6" }]}
            height={300}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
