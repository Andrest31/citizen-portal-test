// src/components/citizen-tabs/TaxesTab.jsx
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

export default function TaxesTab({ citizen }) {
  if (!citizen?.taxes) return <Typography>Нет данных</Typography>;
  const t = citizen.taxes;
  return (
    <Box>
      <Typography variant="h6" gutterBottom>Налоги и страховки</Typography>
      <Typography>ИНН: {t.taxId}</Typography>
      <Typography>Регион: {t.taxRegion}</Typography>
      <Typography>Налог на имущество: {t.propertyTaxPaid ? "Оплачен" : "Не оплачен"}</Typography>
      <Typography>Транспортный налог: {t.transportTaxPaid ? "Оплачен" : "Не оплачен"}</Typography>
      <List>
        {t.insurancePolicies?.map((p, idx) => (
          <ListItem key={idx}>
            <ListItemText
              primary={`${p.type} — №${p.number}`}
              secondary={`Действует до ${p.validUntil}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
