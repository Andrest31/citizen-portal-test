// src/components/citizen-tabs/MedicalTab.jsx
import { Box, Typography } from "@mui/material";

export default function MedicalTab({ citizen }) {
  if (!citizen?.medical) return <Typography>Нет данных</Typography>;
  const m = citizen.medical;
  return (
    <Box>
      <Typography variant="h6" gutterBottom>Медицинские данные</Typography>
      <Typography>Группа крови: {m.bloodType}</Typography>
      <Typography>Хронические болезни: {m.chronicDiseases?.join(", ") || "нет"}</Typography>
      <Typography>Аллергии: {m.allergies?.join(", ") || "нет"}</Typography>
      <Typography>Полис: {m.insuranceNumber}</Typography>
      <Typography>Прикреплен: {m.hospitalAttached}</Typography>
    </Box>
  );
}
