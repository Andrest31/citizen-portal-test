import { Box, TextField, Typography } from "@mui/material";

export default function WorkTab({ citizen, editing, setCitizen }) {
  const handleChange = (key, value) => {
    setCitizen({
      ...citizen,
      work: { ...citizen.work, [key]: value },
    });
  };

  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      <Typography variant="h6">Работа</Typography>
      <TextField
        label="Компания"
        value={citizen.work?.currentJob || ""}
        onChange={(e) => handleChange("currentJob", e.target.value)}
        disabled={!editing}
      />
      <TextField
        label="Должность"
        value={citizen.work?.position || ""}
        onChange={(e) => handleChange("position", e.target.value)}
        disabled={!editing}
      />
      <TextField
        type="date"
        label="Дата начала"
        value={citizen.work?.startDate || ""}
        onChange={(e) => handleChange("startDate", e.target.value)}
        disabled={!editing}
        InputLabelProps={{ shrink: true }}
      />
    </Box>
  );
}
