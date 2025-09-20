// src/components/citizen-tabs/EducationTab.jsx
import { Box, Typography, TextField, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

export default function EducationTab({ citizen, editing, setCitizen }) {
  // Убедимся, что education - это массив
  const educationList = Array.isArray(citizen.education) ? citizen.education : [];

  const handleChange = (idx, key, value) => {
    const education = [...educationList];
    // Убеждаемся, что элемент существует
    if (!education[idx]) education[idx] = {};
    education[idx] = { ...education[idx], [key]: value };
    setCitizen({ ...citizen, education });
  };

  const addEdu = () => {
    const education = [
      ...educationList,
      { institution: "", specialty: "", graduationYear: "", diplomaSeries: "", diplomaNumber: "" },
    ];
    setCitizen({ ...citizen, education });
  };

  const removeEdu = (idx) => {
    const education = [...educationList];
    education.splice(idx, 1);
    setCitizen({ ...citizen, education });
  };

  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      <Typography variant="h6">Образование</Typography>
      {editing && (
        <Button startIcon={<AddIcon />} onClick={addEdu}>
          Добавить
        </Button>
      )}
      {educationList.map((e, idx) => (
        <Box
          key={idx}
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 120px 120px 120px auto",
            gap: 1,
            alignItems: "center",
          }}
        >
          <TextField
            label="Учреждение"
            value={e.institution || ''}
            onChange={(ev) =>
              handleChange(idx, "institution", ev.target.value)
            }
            disabled={!editing}
          />
          <TextField
            label="Специальность"
            value={e.specialty || ''}
            onChange={(ev) =>
              handleChange(idx, "specialty", ev.target.value)
            }
            disabled={!editing}
          />
          <TextField
            label="Год выпуска"
            type="number"
            value={e.graduationYear || ''}
            onChange={(ev) =>
              handleChange(idx, "graduationYear", ev.target.value)
            }
            disabled={!editing}
          />
          <TextField
            label="Серия диплома"
            value={e.diplomaSeries || ''}
            onChange={(ev) =>
              handleChange(idx, "diplomaSeries", ev.target.value)
            }
            disabled={!editing}
          />
          <TextField
            label="Номер диплома"
            value={e.diplomaNumber || ''}
            onChange={(ev) =>
              handleChange(idx, "diplomaNumber", ev.target.value)
            }
            disabled={!editing}
          />
          {editing && (
            <IconButton
              onClick={() => removeEdu(idx)}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      ))}
    </Box>
  );
}