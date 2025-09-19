import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import {
  Pie,
  Bar,
  Doughnut,
  Line,
  PolarArea,
  Radar,
} from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  Tooltip,
  Legend
);

function useChartData(citizens) {
  const total = citizens.length;
  const avgAge =
    citizens.reduce(
      (acc, c) =>
        acc + (new Date().getFullYear() - new Date(c.birthDate).getFullYear()),
      0
    ) / total;

  const genderCounts = citizens.reduce((acc, c) => {
    acc[c.gender] = (acc[c.gender] || 0) + 1;
    return acc;
  }, {});

  const educationCounts = citizens.reduce((acc, c) => {
    acc[c.educationLevel] = (acc[c.educationLevel] || 0) + 1;
    return acc;
  }, {});

  const maritalCounts = citizens.reduce((acc, c) => {
    acc[c.maritalStatus] = (acc[c.maritalStatus] || 0) + 1;
    return acc;
  }, {});

  const regionCounts = citizens.reduce((acc, c) => {
    acc[c.region] = (acc[c.region] || 0) + 1;
    return acc;
  }, {});

  return { total, avgAge, genderCounts, educationCounts, maritalCounts, regionCounts };
}

export default function Dashboard({ citizens }) {
  const { total, avgAge, genderCounts, educationCounts, maritalCounts, regionCounts } =
    useChartData(citizens);
  const [tab, setTab] = useState(0);

  const genderPie = {
    labels: Object.keys(genderCounts),
    datasets: [{ data: Object.values(genderCounts), backgroundColor: ["#42A5F5", "#F48FB1"] }],
  };

  const educationDoughnut = {
    labels: Object.keys(educationCounts),
    datasets: [{ data: Object.values(educationCounts), backgroundColor: ["#FFB74D", "#4DB6AC", "#9575CD"] }],
  };

  const maritalRadar = {
    labels: Object.keys(maritalCounts),
    datasets: [{ data: Object.values(maritalCounts), backgroundColor: "rgba(29,155,240,0.5)", borderColor: "#1d9bf0" }],
  };

  const regionBar = {
    labels: Object.keys(regionCounts).slice(0, 10),
    datasets: [{ label: "Граждане", data: Object.values(regionCounts).slice(0, 10), backgroundColor: "#66BB6A" }],
  };

  const ageTrend = {
    labels: Array.from({ length: 12 }, (_, i) => `20${10 + i}`),
    datasets: [{ label: "Рождаемость", data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 5000)), borderColor: "#ff7043", backgroundColor: "rgba(255,112,67,0.4)" }],
  };

  const benefitPolar = {
    labels: ["Инвалид", "Многодетный", "Ветеран"],
    datasets: [{ data: [3000, 5000, 2000], backgroundColor: ["#AB47BC", "#29B6F6", "#FFA726"] }],
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* KPI карточки */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card component={motion.div} whileHover={{ y: -6 }}>
            <CardContent>
              <Typography variant="subtitle2">Всего граждан</Typography>
              <Typography variant="h4">{total.toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2">Средний возраст</Typography>
              <Typography variant="h4">{avgAge.toFixed(1)}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Вкладки */}
      <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 2 }}>
        <Tab label="Демография" />
        <Tab label="Образование" />
        <Tab label="Семья" />
        <Tab label="Регионы" />
        <Tab label="Тренды" />
        <Tab label="Льготы" />
      </Tabs>

      {tab === 0 && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card><CardContent><Typography>Пол</Typography><Pie data={genderPie} /></CardContent></Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card><CardContent><Typography>Семейное положение</Typography><Radar data={maritalRadar} /></CardContent></Card>
          </Grid>
        </Grid>
      )}

      {tab === 1 && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card><CardContent><Typography>Уровень образования</Typography><Doughnut data={educationDoughnut} /></CardContent></Card>
          </Grid>
        </Grid>
      )}

      {tab === 2 && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card><CardContent><Typography>Семейное положение (Radar)</Typography><Radar data={maritalRadar} /></CardContent></Card>
          </Grid>
        </Grid>
      )}

      {tab === 3 && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card><CardContent><Typography>ТОП-10 регионов</Typography><Bar data={regionBar} /></CardContent></Card>
          </Grid>
        </Grid>
      )}

      {tab === 4 && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card><CardContent><Typography>Рождаемость по годам</Typography><Line data={ageTrend} /></CardContent></Card>
          </Grid>
        </Grid>
      )}

      {tab === 5 && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card><CardContent><Typography>Социальные льготы</Typography><PolarArea data={benefitPolar} /></CardContent></Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
