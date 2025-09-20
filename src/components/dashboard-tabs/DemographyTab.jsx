import { useMemo } from "react";
import { Typography, Grid, Paper } from "@mui/material";
import { BarChart, PieChart, LineChart } from "@mui/x-charts";

function calcAgeFromBirth(birthDate) {
  if (!birthDate) return null;
  const by = new Date(birthDate);
  if (isNaN(by)) return null;
  const now = new Date();
  let age = now.getFullYear() - by.getFullYear();
  const m = now.getMonth() - by.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < by.getDate())) age--;
  return age;
}

export default function DemographyTab({ citizens }) {
  const ageDistribution = useMemo(() => {
    const map = {};
    for (const c of citizens) {
      const age = c.personalInfo?.age ?? calcAgeFromBirth(c.personalInfo?.birthDate);
      if (typeof age !== "number") continue;
      const bucket = Math.floor(age / 10) * 10;
      map[bucket] = (map[bucket] || 0) + 1;
    }
    return Object.entries(map).map(([bucket, count]) => ({
      ageGroup: `${bucket}-${+bucket + 9}`,
      count,
    }));
  }, [citizens]);

  const genderSplit = useMemo(() => {
    let male = 0, female = 0;
    for (const c of citizens) {
      if (c.personalInfo?.gender === "М") male++;
      else if (c.personalInfo?.gender === "Ж") female++;
    }
    return [
      { name: "Мужчины", value: male },
      { name: "Женщины", value: female },
    ];
  }, [citizens]);

  const avgAgeTrend = useMemo(() => {
    const byYear = {};
    for (const c of citizens) {
      const year = new Date(c.personalInfo?.birthDate).getFullYear();
      if (!year) continue;
      const age = c.personalInfo?.age ?? calcAgeFromBirth(c.personalInfo?.birthDate);
      if (!byYear[year]) byYear[year] = { total: 0, count: 0 };
      byYear[year].total += age || 0;
      byYear[year].count += 1;
    }
    return Object.entries(byYear)
      .sort(([a], [b]) => a - b)
      .map(([year, { total, count }]) => ({
        year,
        avgAge: (total / count).toFixed(1),
      }));
  }, [citizens]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Возрастные группы</Typography>
          <BarChart
            dataset={ageDistribution}
            xAxis={[{ dataKey: "ageGroup", label: "Группа" }]}
            series={[{ dataKey: "count", label: "Кол-во", color: "#42a5f5" }]}
            height={300}
          />
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Пол</Typography>
          <PieChart
            series={[
              {
                data: genderSplit.map((d, i) => ({
                  id: i,
                  value: d.value,
                  label: d.name,
                  color: i === 0 ? "#ef5350" : "#66bb6a",
                })),
              },
            ]}
            height={300}
          />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Средний возраст по годам рождения</Typography>
          <LineChart
            dataset={avgAgeTrend}
            xAxis={[{ dataKey: "year", label: "Год рождения" }]}
            series={[{ dataKey: "avgAge", label: "Средний возраст", color: "#ab47bc" }]}
            height={300}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
