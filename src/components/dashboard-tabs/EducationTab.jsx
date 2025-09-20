import { useMemo } from "react";
import { Typography, Grid, Paper, Box } from "@mui/material";
import { PieChart, BarChart } from "@mui/x-charts";

export default function EducationTab({ citizens }) {
  // Распределение по уровням образования
  const eduCounts = useMemo(() => {
    const map = {};
    for (const c of citizens) {
      const key = c.educationLevel || "Не указано";
      map[key] = (map[key] || 0) + 1;
    }
    return Object.entries(map).map(([level, count], i) => ({ level, count }));
  }, [citizens]);

  // ТОП вузов
  const byUniversities = useMemo(() => {
    const map = {};
    for (const c of citizens) {
      (c.education || []).forEach((e) => {
        if (e.institution) {
          map[e.institution] = (map[e.institution] || 0) + 1;
        }
      });
    }
    return Object.entries(map)
      .map(([institution, count]) => ({ institution, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [citizens]);

  // ТОП специальностей
  const bySpecialities = useMemo(() => {
    const map = {};
    for (const c of citizens) {
      (c.education || []).forEach((e) => {
        if (e.specialty) {
          map[e.specialty] = (map[e.specialty] || 0) + 1;
        }
      });
    }
    return Object.entries(map)
      .map(([s, count]) => ({ speciality: s, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [citizens]);

  const percentHigher = useMemo(() => {
    const total = citizens.length || 1;
    const higher = citizens.filter((c) =>
      (c.education || []).some((e) => e.level === "Высшее")
    ).length;
    return Math.round((higher / total) * 100);
  }, [citizens]);

  return (
    <Box>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="subtitle2">% с высшим</Typography>
            <Typography variant="h4" color="primary">{percentHigher}%</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="subtitle2">Различных уровней</Typography>
            <Typography variant="h4">{eduCounts.length}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="subtitle2">Граждан со спец.образованием</Typography>
            <Typography variant="h4">
              {citizens.filter((c) =>
                (c.education || []).some((e) =>
                  ["Среднее профессиональное", "Высшее"].includes(e.level)
                )
              ).length}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, width: 450, height: 360 }}>
            <Typography variant="h6">Уровни образования</Typography>
            <PieChart
              series={[
                {
                  innerRadius: 60,
                  outerRadius: 120,
                  data: eduCounts.map((d, i) => ({ id: i, value: d.count, label: d.level })),
                },
              ]}
              height={300}
              width={300}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: 360 }}>
            <Typography variant="h6">ТОП вузов</Typography>
            <BarChart
              dataset={byUniversities}
              xAxis={[{ dataKey: "institution", scaleType: "band" }]}
              series={[{ dataKey: "count", color: "#66bb6a" }]}
              height={280}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: 360 }}>
            <Typography variant="h6">ТОП специальностей</Typography>
            <BarChart
              dataset={bySpecialities}
              xAxis={[{ dataKey: "speciality", scaleType: "band" }]}
              series={[{ dataKey: "count", color: "#ef5350" }]}
              height={280}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
