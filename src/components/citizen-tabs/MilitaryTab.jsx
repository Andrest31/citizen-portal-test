// src/components/citizen-tabs/MilitaryTab.jsx
import { Box, Typography } from "@mui/material";

export default function MilitaryTab({ citizen }) {
  if (!citizen?.military) return <Typography>Нет данных</Typography>;
  const m = citizen.military;
  return (
    <Box>
      <Typography variant="h6" gutterBottom>Воинский учёт</Typography>
      <Typography>Статус: {m.status}</Typography>
      <Typography>Звание: {m.rank}</Typography>
      <Typography>Часть: {m.unit}</Typography>
      <Typography>Год призыва: {m.conscriptionYear}</Typography>
      <Typography>Специальность: {m.specialty}</Typography>
    </Box>
  );
}
