import { Box, Typography, TextField, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

export default function EducationTab({ citizen, editing, setCitizen }) {
  const handleChange = (idx, key, value) => {
    const education = [...(citizen.education || [])];
    education[idx] = { ...education[idx], [key]: value };
    setCitizen({ ...citizen, education });
  };

  const addEdu = () => {
    const education = [
      ...(citizen.education || []),
      { institution: "", specialty: "", graduationYear: "", diplomaNum: "" },
    ];
    setCitizen({ ...citizen, education });
  };

  const removeEdu = (idx) => {
    const education = [...(citizen.education || [])];
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
      {(citizen.education || []).map((e, idx) => (
        <Box
          key={idx}
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 120px 120px auto",
            gap: 1,
            alignItems: "center",
          }}
        >
          <TextField
            label="Учреждение"
            value={e.institution}
            onChange={(ev) =>
              handleChange(idx, "institution", ev.target.value)
            }
            disabled={!editing}
          />
          <TextField
            label="Специальность"
            value={e.specialty}
            onChange={(ev) =>
              handleChange(idx, "specialty", ev.target.value)
            }
            disabled={!editing}
          />
          <TextField
            label="Год выпуска"
            value={e.graduationYear}
            onChange={(ev) =>
              handleChange(idx, "graduationYear", ev.target.value)
            }
            disabled={!editing}
          />
          <TextField
            label="Диплом №"
            value={e.diplomaNum}
            onChange={(ev) =>
              handleChange(idx, "diplomaNum", ev.target.value)
            }
            disabled={!editing}
          />
          <IconButton
            onClick={() => removeEdu(idx)}
            disabled={!editing}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
    </Box>
  );
}
