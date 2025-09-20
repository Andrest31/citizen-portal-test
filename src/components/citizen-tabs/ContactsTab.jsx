// src/components/citizen-tabs/ContactsTab.js
import { Box, TextField, Typography, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ContactsTab({ citizen, editing, setCitizen }) {
  if (!citizen?.contacts) {
    return <div>Контактная информация не найдена</div>;
  }

  const contacts = citizen.contacts;
  const socialNetworks = citizen.contacts.socialNetworks || [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCitizen({
      ...citizen,
      contacts: { ...citizen.contacts, [name]: value }
    });
  };

  const handleSocialNetworkChange = (index, field, value) => {
    const updatedNetworks = [...socialNetworks];
    updatedNetworks[index] = { ...updatedNetworks[index], [field]: value };
    setCitizen({
      ...citizen,
      contacts: { ...citizen.contacts, socialNetworks: updatedNetworks }
    });
  };

  const addSocialNetwork = () => {
    const updatedNetworks = [...socialNetworks, { type: '', link: '' }];
    setCitizen({
      ...citizen,
      contacts: { ...citizen.contacts, socialNetworks: updatedNetworks }
    });
  };

  const removeSocialNetwork = (index) => {
    const updatedNetworks = [...socialNetworks];
    updatedNetworks.splice(index, 1);
    setCitizen({
      ...citizen,
      contacts: { ...citizen.contacts, socialNetworks: updatedNetworks }
    });
  };

  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      <Typography variant="h6">Контактная информация</Typography>
      
      <TextField
        label="Email"
        name="email"
        value={contacts.email || ''}
        onChange={handleChange}
        disabled={!editing}
        fullWidth
      />
      <TextField
        label="Телефон"
        name="phone"
        value={contacts.phone || ''}
        onChange={handleChange}
        disabled={!editing}
        fullWidth
      />
      
      <Typography variant="h6" sx={{ mt: 2 }}>Адреса</Typography>
      <TextField
        label="Фактический адрес"
        name="factAddress"
        value={contacts.factAddress || ''}
        onChange={handleChange}
        disabled={!editing}
        multiline
        fullWidth
      />

      <Typography variant="h6" sx={{ mt: 2 }}>Социальные сети</Typography>
      {editing && (
        <IconButton onClick={addSocialNetwork} color="primary">
          <AddIcon />
        </IconButton>
      )}
      {socialNetworks.map((network, idx) => (
        <Box key={idx} sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: 1, alignItems: 'center' }}>
          <TextField
            label="Платформа"
            value={network.type || ''}
            onChange={(e) => handleSocialNetworkChange(idx, 'type', e.target.value)}
            disabled={!editing}
            fullWidth
          />
          <TextField
            label="Ссылка"
            value={network.link || ''}
            onChange={(e) => handleSocialNetworkChange(idx, 'link', e.target.value)}
            disabled={!editing}
            fullWidth
          />
          {editing && (
            <IconButton onClick={() => removeSocialNetwork(idx)} color="error">
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      ))}
    </Box>
  );
}