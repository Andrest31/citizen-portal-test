// src/components/citizen-tabs/AddressesTab.js
import { Box, TextField, Typography, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AddressesTab({ citizen, editing, setCitizen }) {
  const addresses = citizen.addresses || [];

  const handleChange = (index, field, value) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index] = { ...updatedAddresses[index], [field]: value };
    setCitizen({ ...citizen, addresses: updatedAddresses });
  };

  const addAddress = () => {
    const updatedAddresses = [...addresses, { type: '', address: '' }];
    setCitizen({ ...citizen, addresses: updatedAddresses });
  };

  const removeAddress = (index) => {
    const updatedAddresses = [...addresses];
    updatedAddresses.splice(index, 1);
    setCitizen({ ...citizen, addresses: updatedAddresses });
  };

  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      <Typography variant="h6">Адреса</Typography>
      
      {editing && (
        <IconButton onClick={addAddress} color="primary">
          <AddIcon />
        </IconButton>
      )}

      {addresses.map((addr, idx) => (
        <Box key={idx} sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: 1, alignItems: 'center', mb: 1 }}>
          <TextField
            label="Тип адреса"
            value={addr.type || ''}
            onChange={(e) => handleChange(idx, 'type', e.target.value)}
            disabled={!editing}
          />
          <TextField
            label="Адрес"
            value={addr.address || ''}
            onChange={(e) => handleChange(idx, 'address', e.target.value)}
            disabled={!editing}
            multiline
          />
          {editing && (
            <IconButton onClick={() => removeAddress(idx)} color="error">
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      ))}
    </Box>
  );
}