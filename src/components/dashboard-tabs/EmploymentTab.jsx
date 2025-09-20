import { useMemo } from "react";
import { Typography, Grid, Paper } from "@mui/material";
import { PieChart, BarChart } from "@mui/x-charts";

export default function EmploymentTab({ citizens }) {
  // Группировка по статусам
  const statusCounts = useMemo(() => {
    let categories = {
      Работают: 0,
      Студенты: 0,
      Пенсионеры: 0,
      Безработные: 0,
    };
    for (const c of citizens) {
      if (c.employment === "Пенсионер") {
        categories["Пенсионеры"]++;
      } else if (c.employment === "Студент") {
        categories["Студенты"]++;
      } else if (c.employment === "Безработный") {
        categories["Безработные"]++;
      } else {
        categories["Работают"]++;
      }
    }
    return Object.entries(categories).map(([label, value], i) => ({
      id: i,
      value,
      label,
    }));
  }, [citizens]);

  // ТОП компаний (из work.currentJob)
  const byCompanies = useMemo(() => {
    const map = {};
    for (const c of citizens) {
      const comp = c.work?.currentJob || "Не указана";
      map[comp] = (map[comp] || 0) + 1;
    }
    return Object.entries(map)
      .map(([company, count]) => ({ company, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [citizens]);

  // ТОП специальностей (из work.position)
  const byPositions = useMemo(() => {
    const map = {};
    for (const c of citizens) {
      const pos = c.work?.position || "Не указана";
      map[pos] = (map[pos] || 0) + 1;
    }
    return Object.entries(map)
      .map(([position, count]) => ({ position, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [citizens]);

  return (
    <>
      {/* KPI */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {statusCounts.map((s) => (
          <Grid item xs={12} md={3} key={s.label}>
            <Paper sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="subtitle2">{s.label}</Typography>
              <Typography variant="h5">{s.value}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: 360 }}>
            <Typography variant="h6">Статусы занятости</Typography>
            <PieChart
              series={[
                { innerRadius: 60, outerRadius: 120, data: statusCounts },
              ]}
              height={300}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: 360 }}>
            <Typography variant="h6">ТОП компаний</Typography>
            <BarChart
              dataset={byCompanies}
              xAxis={[{ dataKey: "company", scaleType: "band" }]}
              series={[{ dataKey: "count", color: "#42a5f5" }]}
              height={280}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: 360 }}>
            <Typography variant="h6">ТОП специальностей</Typography>
            <BarChart
              dataset={byPositions}
              xAxis={[{ dataKey: "position", scaleType: "band" }]}
              series={[{ dataKey: "count", color: "#ab47bc" }]}
              height={280}
            />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
