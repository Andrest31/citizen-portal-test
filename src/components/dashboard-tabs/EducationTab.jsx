import { Grid, Card, CardContent, Typography } from "@mui/material";
import { Doughnut, Bar } from "react-chartjs-2";
import "./_chartSetup";

export default function EducationTab({ citizens }) {
  // уровни
  const levelCounts = citizens.reduce((acc, c) => {
    acc[c.educationLevel] = (acc[c.educationLevel] || 0) + 1;
    return acc;
  }, {});

  // специальности
  const specialtyCounts = citizens.reduce((acc, c) => {
    const s = c.education[0]?.specialty;
    if (s) acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {});
  const topSpecialties = Object.entries(specialtyCounts).sort((a, b) => b[1] - a[1]).slice(0, 8);

  // вузы
  const uniCounts = citizens.reduce((acc, c) => {
    const u = c.education[0]?.institution;
    if (u) acc[u] = (acc[u] || 0) + 1;
    return acc;
  }, {});
  const topUnis = Object.entries(uniCounts).sort((a, b) => b[1] - a[1]).slice(0, 8);

  const doughnutData = {
    labels: Object.keys(levelCounts),
    datasets: [
      {
        data: Object.values(levelCounts),
        backgroundColor: ["#42A5F5", "#66BB6A", "#FFCA28", "#AB47BC"],
      },
    ],
  };

  const specialtyData = {
    labels: topSpecialties.map(([s]) => s),
    datasets: [{ label: "Специальности", data: topSpecialties.map(([, v]) => v), backgroundColor: "#42A5F5" }],
  };

  const uniData = {
    labels: topUnis.map(([u]) => u),
    datasets: [{ label: "ВУЗы", data: topUnis.map(([, v]) => v), backgroundColor: "#66BB6A" }],
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Card sx={{ minHeight: 500 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Уровень образования
            </Typography>
            <Doughnut data={doughnutData} />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card sx={{ minHeight: 500 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Специальности (ТОП-8)
            </Typography>
            <Bar data={specialtyData} options={{ plugins: { legend: { display: false } } }} />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card sx={{ minHeight: 500 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              ВУЗы (ТОП-8)
            </Typography>
            <Bar data={uniData} options={{ plugins: { legend: { display: false } } }} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
