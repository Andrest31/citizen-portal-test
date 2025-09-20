// src/components/citizen-tabs/HousingTab.js
import { Box, TextField, Typography, IconButton, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export default function HousingTab({ citizen, editing, setCitizen }) {
  const housing = citizen.housing || [];

  const handleChange = (index, field, value) => {
    const updatedHousing = [...housing];
    updatedHousing[index] = { ...updatedHousing[index], [field]: value };
    setCitizen({ ...citizen, housing: updatedHousing });
  };

  const addHousing = () => {
    const updatedHousing = [...housing, { type: '', address: '', area: 0, ownershipType: '', cadastralNumber: '', registrationDate: '' }];
    setCitizen({ ...citizen, housing: updatedHousing });
  };

  const removeHousing = (index) => {
    const updatedHousing = [...housing];
    updatedHousing.splice(index, 1);
    setCitizen({ ...citizen, housing: updatedHousing });
  };

  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      <Typography variant="h6">Недвижимость</Typography>
      
      {editing && (
        <IconButton onClick={addHousing} color="primary">
          <AddIcon />
        </IconButton>
      )}

      {housing.map((property, idx) => (
        <Box key={idx} sx={{ border: '1px solid #ddd', borderRadius: 1, p: 2, mb: 1 }}>
          <Typography variant="subtitle1" gutterBottom>Объект недвижимости #{idx + 1}</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mb: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Тип</InputLabel>
              <Select
                value={property.type || ''}
                onChange={(e) => handleChange(idx, 'type', e.target.value)}
                disabled={!editing}
              >
                {["Квартира", "Дом", "Комната", "Общежитие", "Гараж", "Дача"].map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Площадь (м²)"
              type="number"
              value={property.area || 0}
              onChange={(e) => handleChange(idx, 'area', Number(e.target.value) || 0)}
              disabled={!editing}
            />
          </Box>
          <TextField
            label="Адрес"
            value={property.address || ''}
            onChange={(e) => handleChange(idx, 'address', e.target.value)}
            disabled={!editing}
            fullWidth
            sx={{ mb: 1 }}
          />
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mb: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Форма собственности</InputLabel>
              <Select
                value={property.ownershipType || ''}
                onChange={(e) => handleChange(idx, 'ownershipType', e.target.value)}
                disabled={!editing}
              >
                {["Собственность", "Аренда", "Долевая собственность", "Пожизненное содержание с иждивением"].map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Кадастровый номер"
              value={property.cadastralNumber || ''}
              onChange={(e) => handleChange(idx, 'cadastralNumber', e.target.value)}
              disabled={!editing}
            />
          </Box>
          <TextField
            label="Дата регистрации"
            type="date"
            value={property.registrationDate || ''}
            onChange={(e) => handleChange(idx, 'registrationDate', e.target.value)}
            disabled={!editing}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          {editing && (
            <IconButton onClick={() => removeHousing(idx)} color="error" sx={{ mt: 1 }}>
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      ))}
    </Box>
  );
}