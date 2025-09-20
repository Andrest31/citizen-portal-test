// src/components/citizen-tabs/DocumentsTab.js
import { Box, TextField, Typography, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export default function DocumentsTab({ citizen, editing, setCitizen }) {
  const documents = citizen.documents || [];

  const handleChange = (index, field, value) => {
    const updatedDocs = [...documents];
    updatedDocs[index] = { ...updatedDocs[index], [field]: value };
    setCitizen({ ...citizen, documents: updatedDocs });
  };

  const addDocument = () => {
    const updatedDocs = [...documents, { type: '', number: '', series: '', issuedBy: '', issueDate: '', expiryDate: '', divisionCode: '' }];
    setCitizen({ ...citizen, documents: updatedDocs });
  };

  const removeDocument = (index) => {
    const updatedDocs = [...documents];
    updatedDocs.splice(index, 1);
    setCitizen({ ...citizen, documents: updatedDocs });
  };

  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      <Typography variant="h6">Документы</Typography>
      
      {editing && (
        <IconButton onClick={addDocument} color="primary">
          <AddIcon />
        </IconButton>
      )}

      {documents.map((doc, idx) => (
        <Box key={idx} sx={{ border: '1px solid #ddd', borderRadius: 1, p: 2, mb: 1 }}>
          <Typography variant="subtitle1" gutterBottom>Документ #{idx + 1}</Typography>
          <TextField
            label="Тип документа"
            value={doc.type || ''}
            onChange={(e) => handleChange(idx, 'type', e.target.value)}
            disabled={!editing}
            fullWidth
            sx={{ mb: 1 }}
          />
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mb: 1 }}>
            <TextField
              label="Серия"
              value={doc.series || ''}
              onChange={(e) => handleChange(idx, 'series', e.target.value)}
              disabled={!editing}
            />
            <TextField
              label="Номер"
              value={doc.number || ''}
              onChange={(e) => handleChange(idx, 'number', e.target.value)}
              disabled={!editing}
            />
          </Box>
          <TextField
            label="Кем выдан"
            value={doc.issuedBy || ''}
            onChange={(e) => handleChange(idx, 'issuedBy', e.target.value)}
            disabled={!editing}
            fullWidth
            sx={{ mb: 1 }}
          />
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mb: 1 }}>
            <TextField
              label="Дата выдачи"
              type="date"
              value={doc.issueDate || ''}
              onChange={(e) => handleChange(idx, 'issueDate', e.target.value)}
              disabled={!editing}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Дата окончания"
              type="date"
              value={doc.expiryDate || ''}
              onChange={(e) => handleChange(idx, 'expiryDate', e.target.value)}
              disabled={!editing}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          <TextField
            label="Код подразделения"
            value={doc.divisionCode || ''}
            onChange={(e) => handleChange(idx, 'divisionCode', e.target.value)}
            disabled={!editing}
            fullWidth
            sx={{ mb: 1 }}
          />
          {editing && (
            <IconButton onClick={() => removeDocument(idx)} color="error" sx={{ mt: 1 }}>
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      ))}
    </Box>
  );
}