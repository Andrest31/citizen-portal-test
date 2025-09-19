import { Grid, Card, CardContent, Typography } from "@mui/material";
import { Pie, Bubble } from "react-chartjs-2";
import "./_chartSetup";

export default function EmploymentTab({ citizens }) {
  const employmentCounts = citizens.reduce((acc, c) => {
    acc[c.employment] = (acc[c.employment] || 0) + 1;
    return acc;
  }, {});

  const professionCounts = citizens.reduce((acc, c) => {
    if (c.profession) {
      acc[c.profession] = (acc[c.profession] || 0) + 1;
    }
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(employmentCounts),
    datasets: [
      {
        data: Object.values(employmentCounts),
        backgroundColor: ["#66BB6A", "#EF5350", "#FFCA28", "#42A5F5", "#AB47BC"],
      },
    ],
  };

  const professionsTop = Object.entries(professionCounts)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 10);

const maxCount = professionsTop[0]?.[1] || 1;

const bubbleData = {
  datasets: professionsTop.map(([label, count], i) => ({
    label,
    data: [
      {
        x: Math.random() * 100,
        y: Math.random() * 100,
        r: 10 + (count / maxCount) * 30, // 👈 нормализация радиуса
      },
    ],
    backgroundColor: `rgba(${120 + i * 8}, ${160 - (i % 3) * 30}, ${200 - i * 6}, 0.7)`,
  })),
};


  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Card sx={{ minHeight: 600 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Статус занятости
            </Typography>
            <Pie data={pieData} />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card sx={{ minHeight: 600 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Топ профессий (bubble — относительная популярность)
            </Typography>
            <Bubble data={bubbleData} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
