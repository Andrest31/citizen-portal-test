// src/components/citizen-tabs/MilitaryTab.js
import { Box, TextField, Typography, MenuItem, Select, InputLabel, FormControl, Checkbox, FormControlLabel } from "@mui/material";

export default function MilitaryTab({ citizen, editing, setCitizen }) {
  const military = citizen.military || {};

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    
    setCitizen({
      ...citizen,
      military: { ...military, [name]: val }
    });
  };

  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      <Typography variant="h6">Воинский учет</Typography>
      
      <FormControlLabel
        control={
          <Checkbox
            name="hasMilitaryId"
            checked={!!military.hasMilitaryId}
            onChange={handleChange}
            disabled={!editing}
          />
        }
        label="Имеет военный билет"
      />

      {military.hasMilitaryId && (
        <>
          <TextField
            label="Номер военного билета"
            name="militaryIdNumber"
            value={military.militaryIdNumber || ''}
            onChange={handleChange}
            disabled={!editing}
            fullWidth
          />
          
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <TextField
              label="Воинское звание"
              name="rank"
              value={military.rank || ''}
              onChange={handleChange}
              disabled={!editing}
            />
            <TextField
              label="Состав"
              name="composition"
              value={military.composition || ''}
              onChange={handleChange}
              disabled={!editing}
            />
          </Box>
          
          <FormControl fullWidth>
            <InputLabel>Годность к военной службе</InputLabel>
            <Select
              name="fitnessCategory"
              value={military.fitnessCategory || ''}
              onChange={handleChange}
              disabled={!editing}
            >
              <MenuItem value="Годен">Годен</MenuItem>
              <MenuItem value="Не годен">Не годен</MenuItem>
              <MenuItem value="Ограниченно годен">Ограниченно годен</MenuItem>
              <MenuItem value="Не установлено">Не установлено</MenuItem>
            </Select>
          </FormControl>
        </>
      )}
    </Box>
  );
}