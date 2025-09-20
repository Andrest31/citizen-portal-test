// src/components/citizen-tabs/TaxesTab.js
import { Box, TextField, Typography, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TaxesTab({ citizen, editing, setCitizen }) {
  const taxes = citizen.taxes || [];

  const handleChange = (index, field, value) => {
    const updatedTaxes = [...taxes];
    updatedTaxes[index] = { ...updatedTaxes[index], [field]: value };
    setCitizen({ ...citizen, taxes: updatedTaxes });
  };

  const addTax = () => {
    const updatedTaxes = [...taxes, { type: '', amount: 0, year: new Date().getFullYear() }];
    setCitizen({ ...citizen, taxes: updatedTaxes });
  };

  const removeTax = (index) => {
    const updatedTaxes = [...taxes];
    updatedTaxes.splice(index, 1);
    setCitizen({ ...citizen, taxes: updatedTaxes });
  };

  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      <Typography variant="h6">Налоги</Typography>
      
      {editing && (
        <IconButton onClick={addTax} color="primary">
          <AddIcon />
        </IconButton>
      )}

      {taxes.map((tax, idx) => (
        <Box key={idx} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: 1, alignItems: 'center', border: '1px solid #ddd', borderRadius: 1, p: 2, mb: 1 }}>
          <TextField
            label="Тип налога"
            value={tax.type || ''}
            onChange={(e) => handleChange(idx, 'type', e.target.value)}
            disabled={!editing}
          />
          <TextField
            label="Сумма (руб.)"
            type="number"
            value={tax.amount || 0}
            onChange={(e) => handleChange(idx, 'amount', Number(e.target.value) || 0)}
            disabled={!editing}
          />
          <TextField
            label="Год"
            type="number"
            value={tax.year || new Date().getFullYear()}
            onChange={(e) => handleChange(idx, 'year', Number(e.target.value) || new Date().getFullYear())}
            disabled={!editing}
          />
          {editing && (
            <IconButton onClick={() => removeTax(idx)} color="error">
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      ))}
    </Box>
  );
}