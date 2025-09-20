import { useMemo } from "react";
import { Typography, Grid, Paper, Box } from "@mui/material";
import { BarChart, PieChart } from "@mui/x-charts";

/* helper */
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
  const ages = useMemo(
    () =>
      citizens
        .map((c) => c.personalInfo?.age ?? calcAgeFromBirth(c.personalInfo?.birthDate))
        .filter((a) => typeof a === "number"),
    [citizens]
  );

  const avgAge = ages.length ? Math.round(ages.reduce((a, b) => a + b, 0) / ages.length) : 0;

  const genderCounts = useMemo(() => {
    let male = 0, female = 0;
    for (const c of citizens) {
      if (c.personalInfo?.gender === "М") male++;
      else if (c.personalInfo?.gender === "Ж") female++;
    }
    return [
      { id: 0, value: male, label: "Мужчины", color: "#4f83cc" },
      { id: 1, value: female, label: "Женщины", color: "#e57373" },
    ];
  }, [citizens]);

  const ageBuckets = useMemo(() => {
    const map = {};
    for (const a of ages) {
      const bucket = Math.floor(a / 10) * 10;
      map[bucket] = (map[bucket] || 0) + 1;
    }
    return Object.entries(map)
      .sort((a, b) => Number(a[0]) - Number(b[0]))
      .map(([bucket, count]) => ({ ageGroup: `${bucket}-${+bucket + 9}`, count }));
  }, [ages]);

  const ageGenderStack = useMemo(() => {
    const map = {};
    for (const c of citizens) {
      const age = c.personalInfo?.age ?? calcAgeFromBirth(c.personalInfo?.birthDate);
      if (typeof age !== "number") continue;
      const bucket = Math.floor(age / 10) * 10;
      if (!map[bucket]) map[bucket] = { bucket: `${bucket}-${bucket + 9}`, male: 0, female: 0, other: 0 };
      const g = c.personalInfo?.gender;
      if (g === "М") map[bucket].male++;
      else if (g === "Ж") map[bucket].female++;
      else map[bucket].other++;
    }
    return Object.values(map).sort((a, b) => {
      const av = Number(a.bucket.split("-")[0]);
      const bv = Number(b.bucket.split("-")[0]);
      return av - bv;
    });
  }, [citizens]);

  return (
    <Box>
      {/* KPI */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="subtitle2">Средний возраст</Typography>
            <Typography variant="h4">{avgAge}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="subtitle2">Всего граждан</Typography>
            <Typography variant="h4">{citizens.length.toLocaleString()}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="subtitle2">Соотношение (М/Ж)</Typography>
            <Typography variant="h5">
              {genderCounts[1].value}/{genderCounts[0].value}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height:360 }}>
            <Typography variant="h6">Возрастные группы</Typography>
            <BarChart
              dataset={ageBuckets}
              xAxis={[{ dataKey: "ageGroup", scaleType: "band" }]}
              series={[{ dataKey: "count", color: "#4f83cc" }]}
              height={280}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height:360 }}>
            <Typography variant="h6">Пол</Typography>
            <PieChart
              series={[
                {
                  innerRadius: 36,
                  data: genderCounts,
                },
              ]}
              height={280}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height:360 }}>
            <Typography variant="h6">Возраст × Пол</Typography>
            <BarChart
              dataset={ageGenderStack}
              xAxis={[{ dataKey: "bucket", scaleType: "band" }]}
              series={[
                { dataKey: "male", label: "Мужчины", color: "#4f83cc" },
                { dataKey: "female", label: "Женщины", color: "#e57373" },
              ]}
              height={280}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
