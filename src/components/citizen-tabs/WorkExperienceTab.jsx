// src/components/citizen-tabs/WorkExperienceTab.js
import { Box, TextField, Typography } from "@mui/material";

export default function WorkExperienceTab({ citizen, editing, setCitizen }) {
  if (!citizen?.workExperience) {
    return <div>Информация о трудовом стаже не найдена</div>;
  }

  const workExp = citizen.workExperience;

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numValue = Number(value) || 0;
    setCitizen({
      ...citizen,
      workExperience: { ...citizen.workExperience, [name]: numValue }
    });
  };

  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      <Typography variant="h6">Трудовой стаж</Typography>
      
      <TextField
        label="Общий трудовой стаж (лет)"
        name="totalYears"
        type="number"
        value={workExp.totalYears || 0}
        onChange={handleChange}
        disabled={!editing}
        fullWidth
      />
      <TextField
        label="Льготный стаж (лет)"
        name="privilegedYears"
        type="number"
        value={workExp.privilegedYears || 0}
        onChange={handleChange}
        disabled={!editing}
        fullWidth
      />
      <TextField
        label="Северный стаж (лет)"
        name="northernYears"
        type="number"
        value={workExp.northernYears || 0}
        onChange={handleChange}
        disabled={!editing}
        fullWidth
      />
    </Box>
  );
}