import { Grid, Card, CardContent, Typography } from "@mui/material";
import { Pie, Radar } from "react-chartjs-2";
import "./_chartSetup";

export default function DemographyTab({ citizens }) {
  const genderCounts = citizens.reduce((acc, c) => {
    const gender = c.personalInfo?.gender;
    if (gender) {
      acc[gender] = (acc[gender] || 0) + 1;
    }
    return acc;
  }, {});

  const maritalCounts = citizens.reduce((acc, c) => {
    const status = c.maritalStatus;
    if (status) {
      acc[status] = (acc[status] || 0) + 1;
    }
    return acc;
  }, {});

  const genderPie = {
    labels: Object.keys(genderCounts),
    datasets: [
      {
        data: Object.values(genderCounts),
        backgroundColor: ["#42A5F5", "#F48FB1"],
      },
    ],
  };

  const maritalRadar = {
    labels: Object.keys(maritalCounts),
    datasets: [
      {
        label: "Семейное положение",
        data: Object.values(maritalCounts),
        backgroundColor: "rgba(29,155,240,0.25)",
        borderColor: "#1d9bf0",
      },
    ],
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Card sx={{ minHeight: 400 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Пол
            </Typography>
            <Pie data={genderPie} />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card sx={{ minHeight: 400 }}>
          <CardContent sx={{ height: 350 }}>
            <Typography variant="h6" gutterBottom>
              Семейное положение
            </Typography>
            <Radar data={maritalRadar} options={radarOptions} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
