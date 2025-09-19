// src/components/citizen-tabs/CarsTab.jsx
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

export default function CarsTab({ citizen }) {
  if (!citizen?.cars) return <Typography>Нет данных</Typography>;
  return (
    <Box>
      <Typography variant="h6" gutterBottom>Автомобили</Typography>
      <List>
        {citizen.cars.map((car, idx) => (
          <ListItem key={idx}>
            <ListItemText
              primary={`${car.brand} ${car.model} (${car.year})`}
              secondary={`Госномер: ${car.plateNumber} • VIN: ${car.vin}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
