// src/components/citizen-tabs/WorkTab.js
import { Box, TextField, Typography, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export default function WorkTab({ citizen, editing, setCitizen }) {
  const work = citizen.work || {};
  const workHistory = citizen.workHistory || [];

  const handleChangeWork = (key, value) => {
    setCitizen({
      ...citizen,
      work: { ...citizen.work, [key]: value },
    });
  };

  const handleChangeHistory = (index, field, value) => {
    const updatedHistory = [...workHistory];
    updatedHistory[index] = { ...updatedHistory[index], [field]: value };
    setCitizen({ ...citizen, workHistory: updatedHistory });
  };

  const addWorkRecord = () => {
    const updatedHistory = [...workHistory, { company: '', position: '', startDate: '', endDate: '' }];
    setCitizen({ ...citizen, workHistory: updatedHistory });
  };

  const removeWorkRecord = (index) => {
    const updatedHistory = [...workHistory];
    updatedHistory.splice(index, 1);
    setCitizen({ ...citizen, workHistory: updatedHistory });
  };

  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      <Typography variant="h6">Текущая работа</Typography>
      <TextField
        label="Компания"
        value={work.currentJob || ""}
        onChange={(e) => handleChangeWork("currentJob", e.target.value)}
        disabled={!editing}
        fullWidth
      />
      <TextField
        label="Должность"
        value={work.position || ""}
        onChange={(e) => handleChangeWork("position", e.target.value)}
        disabled={!editing}
        fullWidth
      />
      <TextField
        type="date"
        label="Дата начала"
        value={work.startDate || ""}
        onChange={(e) => handleChangeWork("startDate", e.target.value)}
        disabled={!editing}
        InputLabelProps={{ shrink: true }}
        fullWidth
      />

      <Typography variant="h6" sx={{ mt: 2 }}>Трудовая история</Typography>
      {editing && (
        <IconButton onClick={addWorkRecord} color="primary">
          <AddIcon />
        </IconButton>
      )}

      {workHistory.map((record, idx) => (
        <Box key={idx} sx={{ border: '1px solid #ddd', borderRadius: 1, p: 2, mb: 1 }}>
          <Typography variant="subtitle1" gutterBottom>Место работы #{idx + 1}</Typography>
          <TextField
            label="Компания"
            value={record.company || ''}
            onChange={(e) => handleChangeHistory(idx, 'company', e.target.value)}
            disabled={!editing}
            fullWidth
            sx={{ mb: 1 }}
          />
          <TextField
            label="Должность"
            value={record.position || ''}
            onChange={(e) => handleChangeHistory(idx, 'position', e.target.value)}
            disabled={!editing}
            fullWidth
            sx={{ mb: 1 }}
          />
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mb: 1 }}>
            <TextField
              label="Дата начала"
              type="date"
              value={record.startDate || ''}
              onChange={(e) => handleChangeHistory(idx, 'startDate', e.target.value)}
              disabled={!editing}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Дата окончания"
              type="date"
              value={record.endDate || ''}
              onChange={(e) => handleChangeHistory(idx, 'endDate', e.target.value)}
              disabled={!editing}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          {editing && (
            <IconButton onClick={() => removeWorkRecord(idx)} color="error">
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      ))}
    </Box>
  );
}