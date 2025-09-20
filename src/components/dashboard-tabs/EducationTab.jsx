import { Grid, Card, CardContent, Typography } from "@mui/material";
import { Doughnut, Bar } from "react-chartjs-2";
import "./_chartSetup";

export default function EducationTab({ citizens }) {
  // уровни образования
  const levelCounts = citizens.reduce((acc, c) => {
    const level = c.educationLevel || "Не указано";
    acc[level] = (acc[level] || 0) + 1;
    return acc;
  }, {});

  // специальности (берём первую запись из образования)
  const specialtyCounts = citizens.reduce((acc, c) => {
    const s = c.education?.[0]?.specialty;
    if (s) acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {});
  const topSpecialties = Object.entries(specialtyCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  // вузы (берём первую запись из образования)
  const uniCounts = citizens.reduce((acc, c) => {
    const u = c.education?.[0]?.institution;
    if (u) acc[u] = (acc[u] || 0) + 1;
    return acc;
  }, {});
  const topUnis = Object.entries(uniCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  const doughnutData = {
    labels: Object.keys(levelCounts),
    datasets: [
      {
        data: Object.values(levelCounts),
        backgroundColor: ["#42A5F5", "#66BB6A", "#FFCA28", "#AB47BC", "#BDBDBD"],
      },
    ],
  };

  const specialtyData = {
    labels: topSpecialties.map(([s]) => s),
    datasets: [
      {
        label: "Специальности",
        data: topSpecialties.map(([, v]) => v),
        backgroundColor: "#42A5F5",
      },
    ],
  };

  const uniData = {
    labels: topUnis.map(([u]) => u),
    datasets: [
      {
        label: "ВУЗы",
        data: topUnis.map(([, v]) => v),
        backgroundColor: "#66BB6A",
      },
    ],
  };

  const barOptions = {
    plugins: { legend: { display: false } },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Card sx={{ minHeight: 400 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Уровень образования
            </Typography>
            <Doughnut data={doughnutData} />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card sx={{ minHeight: 400 }}>
          <CardContent sx={{ height: 350 }}>
            <Typography variant="h6" gutterBottom>
              Специальности (ТОП-8)
            </Typography>
            <Bar data={specialtyData} options={barOptions} />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card sx={{ minHeight: 400 }}>
          <CardContent sx={{ height: 350 }}>
            <Typography variant="h6" gutterBottom>
              ВУЗы (ТОП-8)
            </Typography>
            <Bar data={uniData} options={barOptions} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
