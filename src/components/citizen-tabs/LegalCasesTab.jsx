// src/components/citizen-tabs/LegalCasesTab.jsx
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

export default function LegalCasesTab({ citizen }) {
  if (!citizen?.legalCases) return <Typography>Нет данных</Typography>;
  return (
    <Box>
      <Typography variant="h6" gutterBottom>Судимости / Дела</Typography>
      <List>
        {citizen.legalCases.map((c, idx) => (
          <ListItem key={idx}>
            <ListItemText
              primary={`${c.type} — ${c.courtName}`}
              secondary={`Результат: ${c.result} (${c.dateStart} → ${c.dateEnd})`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
