// src/components/citizen-tabs/PensionTab.js
import { Box, TextField, Typography, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

export default function PensionTab({ citizen, editing, setCitizen }) {
  if (!citizen?.pensionInfo) {
    return <div>Пенсионная информация не найдена</div>;
  }

  const pension = citizen.pensionInfo;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCitizen({
      ...citizen,
      pensionInfo: { ...citizen.pensionInfo, [name]: value }
    });
  };

  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      <Typography variant="h6">Пенсионные данные</Typography>
      
      <TextField
        label="СНИЛС"
        name="snils"
        value={pension.snils || ''}
        onChange={handleChange}
        disabled={!editing}
        fullWidth
      />
      
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
        <FormControl fullWidth>
          <InputLabel>Тип пенсии</InputLabel>
          <Select
            name="pensionType"
            value={pension.pensionType || ''}
            onChange={handleChange}
            disabled={!editing}
          >
            <MenuItem value="Страховая">Страховая</MenuItem>
            <MenuItem value="Накопительная">Накопительная</MenuItem>
            <MenuItem value="Государственная">Государственная</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Размер пенсии (руб.)"
          name="pensionAmount"
          type="number"
          value={pension.pensionAmount || ''}
          onChange={handleChange}
          disabled={!editing}
        />
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
        <TextField
          label="Страховой стаж"
          name="insurancePeriod"
          value={pension.insurancePeriod || ''}
          onChange={handleChange}
          disabled={!editing}
        />
        <TextField
          label="Индивидуальный коэффициент"
          name="individualCoefficient"
          value={pension.individualCoefficient || ''}
          onChange={handleChange}
          disabled={!editing}
        />
      </Box>
    </Box>
  );
}