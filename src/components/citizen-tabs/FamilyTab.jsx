import { Box, Typography, IconButton, TextField, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export default function FamilyTab({ citizen, editing, setCitizen }) {
  const handleChangeMember = (idx, key, value) => {
    const family = [...(citizen.family || [])];
    family[idx] = { ...family[idx], [key]: value };
    setCitizen({ ...citizen, family });
  };

  const addMember = () => {
    const family = [...(citizen.family || []), { fullName: "", relation: "", birthDate: "", snils: "" }];
    setCitizen({ ...citizen, family });
  };

  const removeMember = (idx) => {
    const family = [...(citizen.family || [])];
    family.splice(idx, 1);
    setCitizen({ ...citizen, family });
  };

  return (
    <Box sx={{ display: 'grid', gap: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Члены семьи</Typography>
        {editing && <Button startIcon={<AddIcon/>} onClick={addMember}>Добавить</Button>}
      </Box>

      {(citizen.family || []).map((m, idx) => (
        <Box key={idx} sx={{ display: 'grid', gridTemplateColumns: '1fr 160px 160px 48px', gap: 1, alignItems: 'center' }}>
          <TextField label="ФИО" value={m.fullName} onChange={(e) => handleChangeMember(idx, 'fullName', e.target.value)} disabled={!editing}/>
          <TextField label="Степень родства" value={m.relation} onChange={(e) => handleChangeMember(idx, 'relation', e.target.value)} disabled={!editing}/>
          <TextField label="Дата рождения" type="date" value={m.birthDate} onChange={(e) => handleChangeMember(idx, 'birthDate', e.target.value)} disabled={!editing} InputLabelProps={{ shrink: true }}/>
          <IconButton onClick={() => removeMember(idx)} disabled={!editing}><DeleteIcon/></IconButton>
        </Box>
      ))}
      {!citizen.family?.length && <Typography color="text.secondary">Список пуст</Typography>}
    </Box>
  );
}
