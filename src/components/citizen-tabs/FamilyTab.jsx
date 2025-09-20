// src/components/citizen-tabs/FamilyTab.js
import { Box, Typography, IconButton, TextField, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export default function FamilyTab({ citizen, editing, setCitizen }) {
  const family = citizen.family || [];

  const handleChangeMember = (idx, key, value) => {
    const updatedFamily = [...family];
    updatedFamily[idx] = { ...updatedFamily[idx], [key]: value };
    setCitizen({ ...citizen, family: updatedFamily });
  };

  const addMember = () => {
    const updatedFamily = [...family, { fullName: "", relation: "", birthDate: "", snils: "" }];
    setCitizen({ ...citizen, family: updatedFamily });
  };

  const removeMember = (idx) => {
    const updatedFamily = [...family];
    updatedFamily.splice(idx, 1);
    setCitizen({ ...citizen, family: updatedFamily });
  };

  return (
    <Box sx={{ display: 'grid', gap: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Члены семьи</Typography>
        {editing && <Button startIcon={<AddIcon />} onClick={addMember}>Добавить</Button>}
      </Box>
      {family.map((m, idx) => (
        <Box key={idx} sx={{ display: 'grid', gridTemplateColumns: '1fr 160px 160px 48px', gap: 1, alignItems: 'center', border: '1px solid #ddd', borderRadius: 1, p: 2 }}>
          <TextField label="ФИО" value={m.fullName} onChange={(e) => handleChangeMember(idx, 'fullName', e.target.value)} disabled={!editing} />
          <TextField label="Степень родства" value={m.relation} onChange={(e) => handleChangeMember(idx, 'relation', e.target.value)} disabled={!editing} />
          <TextField label="Дата рождения" type="date" value={m.birthDate} onChange={(e) => handleChangeMember(idx, 'birthDate', e.target.value)} disabled={!editing} InputLabelProps={{ shrink: true }} />
          <TextField label="СНИЛС" value={m.snils} onChange={(e) => handleChangeMember(idx, 'snils', e.target.value)} disabled={!editing} />
          {editing && (
            <IconButton onClick={() => removeMember(idx)} color="error">
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      ))}
      {!family.length && <Typography color="text.secondary">Список пуст</Typography>}
    </Box>
  );
}