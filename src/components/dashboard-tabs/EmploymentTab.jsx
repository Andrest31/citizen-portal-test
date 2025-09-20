// src/components/dashboard-tabs/EmploymentTab.jsx
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { Doughnut, Bubble } from "react-chartjs-2";
import "./_chartSetup";

export default function EmploymentTab({ citizens }) {
  
const employmentCounts = citizens.reduce((acc, c) => {
  let category;
  if (c.employment === "Работает") {
    if (c.profession?.toLowerCase().includes("программист") || c.profession?.toLowerCase().includes("разработчик")) {
      category = "IT-специалисты";
    } else if (c.profession?.toLowerCase().includes("врач")) {
      category = "Медики";
    } else if (c.profession?.toLowerCase().includes("учитель")) {
      category = "Учителя";
    } else {
      category = "Прочие работающие";
    }
  } else if (c.employment === "Безработный") {
    category = "Безработные";
  } else if (c.employment === "Студент") {
    category = "Студенты";
  } else if (c.employment === "Пенсионер") {
    category = "Пенсионеры";
  } else {
    category = "Иное";
  }
  acc[category] = (acc[category] || 0) + 1;
  return acc;
}, {});

  const professionCounts = citizens.reduce((acc, c) => {
    const profession = c.profession;
    if (profession) {
      acc[profession] = (acc[profession] || 0) + 1;
    }
    return acc;
  }, {});

  // данные для занятости
  const total = Object.values(employmentCounts).reduce((a, b) => a + b, 0);
  const doughnutData = {
    labels: Object.keys(employmentCounts),
    datasets: [
      {
        data: Object.values(employmentCounts),
        backgroundColor: [
          "#66BB6A", // зелёный
          "#EF5350", // красный
          "#42A5F5", // синий
          "#FFCA28", // жёлтый
          "#AB47BC", // фиолетовый
          "#26C6DA", // голубой
        ],
        borderWidth: 2,
      },
    ],
  };

  const doughnutOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const val = ctx.parsed;
            const pct = ((val / total) * 100).toFixed(1);
            return `${ctx.label}: ${val} (${pct}%)`;
          },
        },
      },
      legend: {
        position: "bottom",
      },
    },
    cutout: "60%", // пончик, а не просто pie
    responsive: true,
    maintainAspectRatio: false,
  };

  // топ профессий
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
          r: 10 + (count / maxCount) * 30,
        },
      ],
      backgroundColor: `rgba(${120 + i * 8}, ${160 - (i % 3) * 30}, ${
        200 - i * 6
      }, 0.7)`,
    })),
  };

  const bubbleOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Card sx={{ minHeight: 400 }}>
          <CardContent sx={{ height: 350 }}>
            <Typography variant="h6" gutterBottom>
              Статус занятости
            </Typography>
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card sx={{ minHeight: 400 }}>
          <CardContent sx={{ height: 350 }}>
            <Typography variant="h6" gutterBottom>
              Топ профессий (bubble — относительная популярность)
            </Typography>
            <Bubble data={bubbleData} options={bubbleOptions} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
