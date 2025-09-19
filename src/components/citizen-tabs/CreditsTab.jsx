// src/components/citizen-tabs/CreditsTab.jsx
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

export default function CreditsTab({ citizen }) {
  if (!citizen?.credits) return <Typography>Нет данных</Typography>;
  return (
    <Box>
      <Typography variant="h6" gutterBottom>Кредиты</Typography>
      <List>
        {citizen.credits.map((c, idx) => (
          <ListItem key={idx}>
            <ListItemText
              primary={`${c.bankName} — ${c.creditType}`}
              secondary={`Сумма: ${c.creditAmount} ₽ • Остаток: ${c.creditBalance} ₽`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
