// src/components/citizen-tabs/VehiclesTab.js
import { Box, TextField, Typography, IconButton, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export default function VehiclesTab({ citizen, editing, setCitizen }) {
  const vehicles = citizen.vehicles || [];

  const handleChange = (index, field, value) => {
    const updatedVehicles = [...vehicles];
    updatedVehicles[index] = { ...updatedVehicles[index], [field]: value };
    setCitizen({ ...citizen, vehicles: updatedVehicles });
  };

  const addVehicle = () => {
    const updatedVehicles = [...vehicles, { type: '', brand: '', model: '', regNumber: '', year: new Date().getFullYear(), vin: '', enginePower: 0 }];
    setCitizen({ ...citizen, vehicles: updatedVehicles });
  };

  const removeVehicle = (index) => {
    const updatedVehicles = [...vehicles];
    updatedVehicles.splice(index, 1);
    setCitizen({ ...citizen, vehicles: updatedVehicles });
  };

  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      <Typography variant="h6">Транспорт</Typography>
      
      {editing && (
        <IconButton onClick={addVehicle} color="primary">
          <AddIcon />
        </IconButton>
      )}

      {vehicles.map((vehicle, idx) => (
        <Box key={idx} sx={{ border: '1px solid #ddd', borderRadius: 1, p: 2, mb: 1 }}>
          <Typography variant="subtitle1" gutterBottom>Транспортное средство #{idx + 1}</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mb: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Тип ТС</InputLabel>
              <Select
                value={vehicle.type || ''}
                onChange={(e) => handleChange(idx, 'type', e.target.value)}
                disabled={!editing}
              >
                {["Легковой автомобиль", "Мотоцикл", "Грузовой автомобиль", "Водный транспорт", "Прицеп"].map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Марка"
              value={vehicle.brand || ''}
              onChange={(e) => handleChange(idx, 'brand', e.target.value)}
              disabled={!editing}
            />
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mb: 1 }}>
            <TextField
              label="Модель"
              value={vehicle.model || ''}
              onChange={(e) => handleChange(idx, 'model', e.target.value)}
              disabled={!editing}
            />
            <TextField
              label="Год выпуска"
              type="number"
              value={vehicle.year || new Date().getFullYear()}
              onChange={(e) => handleChange(idx, 'year', Number(e.target.value) || new Date().getFullYear())}
              disabled={!editing}
            />
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mb: 1 }}>
            <TextField
              label="Гос. номер"
              value={vehicle.regNumber || ''}
              onChange={(e) => handleChange(idx, 'regNumber', e.target.value)}
              disabled={!editing}
            />
            <TextField
              label="VIN"
              value={vehicle.vin || ''}
              onChange={(e) => handleChange(idx, 'vin', e.target.value)}
              disabled={!editing}
            />
          </Box>
          <TextField
            label="Мощность двигателя (л.с.)"
            type="number"
            value={vehicle.enginePower || 0}
            onChange={(e) => handleChange(idx, 'enginePower', Number(e.target.value) || 0)}
            disabled={!editing}
            fullWidth
          />
          {editing && (
            <IconButton onClick={() => removeVehicle(idx)} color="error" sx={{ mt: 1 }}>
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      ))}
    </Box>
  );
}