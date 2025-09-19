// src/components/citizen-tabs/RealEstateTab.jsx
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

export default function RealEstateTab({ citizen }) {
  if (!citizen?.realEstate) return <Typography>Нет данных</Typography>;
  return (
    <Box>
      <Typography variant="h6" gutterBottom>Недвижимость</Typography>
      <List>
        {citizen.realEstate.map((item, idx) => (
          <ListItem key={idx}>
            <ListItemText
              primary={`${item.type} — ${item.address}`}
              secondary={`Площадь: ${item.area} м² • Владение: ${item.ownershipType}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
