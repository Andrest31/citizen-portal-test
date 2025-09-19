import { Grid, Card, CardContent, Typography } from "@mui/material";
import { Pie, Radar } from "react-chartjs-2";
import "./_chartSetup";

export default function DemographyTab({ citizens }) {
  const genderCounts = citizens.reduce((acc, c) => {
    acc[c.gender] = (acc[c.gender] || 0) + 1;
    return acc;
  }, {});

  const maritalCounts = citizens.reduce((acc, c) => {
    acc[c.maritalStatus] = (acc[c.maritalStatus] || 0) + 1;
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

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Card sx={{ minHeight: 600 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Пол
            </Typography>
            <Pie data={genderPie} />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card sx={{ minHeight: 600 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Семейное положение
            </Typography>
            <Radar data={maritalRadar} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
