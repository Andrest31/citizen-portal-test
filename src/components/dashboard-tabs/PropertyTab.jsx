import { useMemo } from "react";
import { Typography, Grid, Paper } from "@mui/material";
import { PieChart } from "@mui/x-charts";

export default function PropertyTab({ citizens }) {
  const housingTransport = useMemo(() => {
    let withHousing = 0, noHousing = 0, withVehicle = 0, noVehicle = 0;
    for (const c of citizens) {
      if (Array.isArray(c.housing) && c.housing.length > 0) withHousing++;
      else noHousing++;
      if (Array.isArray(c.vehicles) && c.vehicles.length > 0) withVehicle++;
      else noVehicle++;
    }
    return {
      housing: [
        { id: 0, value: withHousing, label: "Есть жильё", color: "#66bb6a" },
        { id: 1, value: noHousing, label: "Нет жилья", color: "#ef5350" },
      ],
      vehicle: [
        { id: 0, value: withVehicle, label: "Есть транспорт", color: "#42a5f5" },
        { id: 1, value: noVehicle, label: "Нет транспорта", color: "#ffa726" },
      ],
    };
  }, [citizens]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Жильё</Typography>
          <PieChart series={[{ data: housingTransport.housing }]} height={300} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Транспорт</Typography>
          <PieChart series={[{ data: housingTransport.vehicle }]} height={300} />
        </Paper>
      </Grid>
    </Grid>
  );
}
