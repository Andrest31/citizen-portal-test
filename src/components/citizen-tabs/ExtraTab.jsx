// src/components/citizen-tabs/ExtraTab.jsx
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

export default function ExtraTab({ citizen }) {
  if (!citizen?.extra) return <Typography>Нет данных</Typography>;
  const e = citizen.extra;
  return (
    <Box>
      <Typography variant="h6" gutterBottom>Дополнительно</Typography>
      <Typography>Хобби: {e.hobbies?.join(", ")}</Typography>
      <Typography>Язык: {e.preferredLanguage}</Typography>
      <Typography>ЭЦП: {e.digitalSignatureId}</Typography>
      <Typography>Миграционный статус: {e.migrationStatus}</Typography>
      <List>
        {e.socialNetworks?.map((s, idx) => (
          <ListItem key={idx}>
            <ListItemText primary={s} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
