import { Pie, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function Dashboard({ citizens }) {
  const total = citizens.length;

  // Средний возраст
  const avgAge =
    citizens.reduce(
      (sum, c) =>
        sum + (new Date().getFullYear() - new Date(c.birthDate).getFullYear()),
      0
    ) / total;

  // Пол
  const genderCounts = citizens.reduce((acc, c) => {
    acc[c.gender] = (acc[c.gender] || 0) + 1;
    return acc;
  }, {});

  // Возрастное распределение (по десяткам)
  const ageDistribution = citizens.reduce((acc, c) => {
    const age =
      new Date().getFullYear() - new Date(c.birthDate).getFullYear();
    const group = `${Math.floor(age / 10) * 10}-${Math.floor(age / 10) * 10 + 9}`;
    acc[group] = (acc[group] || 0) + 1;
    return acc;
  }, {});

  // Образование
  const educationCounts = citizens.reduce((acc, c) => {
    acc[c.educationLevel] = (acc[c.educationLevel] || 0) + 1;
    return acc;
  }, {});

  // Семейное положение
  const maritalCounts = citizens.reduce((acc, c) => {
    acc[c.maritalStatus] = (acc[c.maritalStatus] || 0) + 1;
    return acc;
  }, {});

  // Подготовка данных для графиков
  const genderPie = {
    labels: Object.keys(genderCounts),
    datasets: [
      {
        data: Object.values(genderCounts),
        backgroundColor: ["#42A5F5", "#F48FB1"],
      },
    ],
  };

  const ageBar = {
    labels: Object.keys(ageDistribution),
    datasets: [
      {
        label: "Количество граждан",
        data: Object.values(ageDistribution),
        backgroundColor: "#66BB6A",
      },
    ],
  };

  const educationDoughnut = {
    labels: Object.keys(educationCounts),
    datasets: [
      {
        data: Object.values(educationCounts),
        backgroundColor: ["#FFB74D", "#4DB6AC", "#9575CD"],
      },
    ],
  };

  const maritalPie = {
    labels: Object.keys(maritalCounts),
    datasets: [
      {
        data: Object.values(maritalCounts),
        backgroundColor: ["#29B6F6", "#FF7043", "#9CCC65"],
      },
    ],
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={2}>
        {/* Общие показатели */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Всего граждан</Typography>
              <Typography variant="h4">{total}</Typography>
              <Typography variant="body2" color="text.secondary">
                Симуляция (реально 100k)
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Средний возраст</Typography>
              <Typography variant="h4">{avgAge.toFixed(1)}</Typography>
              <Typography variant="body2" color="text.secondary">
                лет
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Пол */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Пол
              </Typography>
              <Pie data={genderPie} />
            </CardContent>
          </Card>
        </Grid>

        {/* Семейное положение */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Семейное положение
              </Typography>
              <Pie data={maritalPie} />
            </CardContent>
          </Card>
        </Grid>

        {/* Возрастное распределение */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Возрастные группы
              </Typography>
              <Bar data={ageBar} />
            </CardContent>
          </Card>
        </Grid>

        {/* Образование */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Уровень образования
              </Typography>
              <Doughnut data={educationDoughnut} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
