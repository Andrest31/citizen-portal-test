// src/components/citizen-tabs/MedicalTab.js
import { Box, TextField, Typography, FormControlLabel, Checkbox, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

export default function MedicalTab({ citizen, editing, setCitizen }) {
  if (!citizen?.medicalInfo) {
    return <div>Медицинская информация не найдена</div>;
  }

  const medical = citizen.medicalInfo;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCitizen({
      ...citizen,
      medicalInfo: { ...citizen.medicalInfo, [name]: value }
    });
  };

  const handleAllergiesChange = (e) => {
    const { checked, value } = e.target;
    const allergies = [...(medical.allergies || [])];
    if (checked) {
      allergies.push(value);
    } else {
      const index = allergies.indexOf(value);
      if (index > -1) allergies.splice(index, 1);
    }
    setCitizen({
      ...citizen,
      medicalInfo: { ...citizen.medicalInfo, allergies }
    });
  };

  const handleDiseasesChange = (e) => {
    const { checked, value } = e.target;
    const chronicDiseases = [...(medical.chronicDiseases || [])];
    if (checked) {
      chronicDiseases.push(value);
    } else {
      const index = chronicDiseases.indexOf(value);
      if (index > -1) chronicDiseases.splice(index, 1);
    }
    setCitizen({
      ...citizen,
      medicalInfo: { ...citizen.medicalInfo, chronicDiseases }
    });
  };

  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      <Typography variant="h6">Медицинские данные</Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
        <FormControl fullWidth>
          <InputLabel>Группа крови</InputLabel>
          <Select
            name="bloodType"
            value={medical.bloodType || ''}
            onChange={handleChange}
            disabled={!editing}
          >
            {["I (0)", "II (A)", "III (B)", "IV (AB)"].map((type) => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Резус-фактор</InputLabel>
          <Select
            name="rhFactor"
            value={medical.rhFactor || ''}
            onChange={handleChange}
            disabled={!editing}
          >
            <MenuItem value="Положительный">Положительный</MenuItem>
            <MenuItem value="Отрицательный">Отрицательный</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TextField
        label="Дата последнего осмотра"
        name="lastVisitDate"
        type="date"
        value={medical.lastVisitDate || ''}
        onChange={handleChange}
        disabled={!editing}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Номер полиса ОМС"
        name="insurancePolicy"
        value={medical.insurancePolicy || ''}
        onChange={handleChange}
        disabled={!editing}
        fullWidth
      />

      <Typography variant="h6" sx={{ mt: 2 }}>Аллергии</Typography>
      {["Пыльца", "Цитрусовые", "Морепродукты", "Латекс", "Аспирин", "Пенициллин"].map((allergy) => (
        <FormControlLabel
          key={allergy}
          control={
            <Checkbox
              checked={(medical.allergies || []).includes(allergy)}
              onChange={handleAllergiesChange}
              value={allergy}
              disabled={!editing}
            />
          }
          label={allergy}
        />
      ))}

      <Typography variant="h6" sx={{ mt: 2 }}>Хронические заболевания</Typography>
      {["Гипертония", "Астма", "Диабет", "Эпилепсия", "Остеохондроз", "Ишемическая болезнь сердца"].map((disease) => (
        <FormControlLabel
          key={disease}
          control={
            <Checkbox
              checked={(medical.chronicDiseases || []).includes(disease)}
              onChange={handleDiseasesChange}
              value={disease}
              disabled={!editing}
            />
          }
          label={disease}
        />
      ))}
    </Box>
  );
}