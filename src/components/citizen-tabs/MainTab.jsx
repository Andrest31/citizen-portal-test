import { Box, TextField } from "@mui/material";

export default function MainTab({ citizen, editing, setCitizen }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCitizen({ ...citizen, [name]: value });
  };

  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      <TextField
        label="ФИО"
        name="fullName"
        value={citizen.fullName}
        onChange={handleChange}
        disabled={!editing}
      />
      <TextField
        type="date"
        label="Дата рождения"
        name="birthDate"
        value={citizen.birthDate}
        onChange={handleChange}
        disabled={!editing}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Email"
        name="email"
        value={citizen.email}
        onChange={handleChange}
        disabled={!editing}
      />
      <TextField
        label="Телефон"
        name="phone"
        value={citizen.phone}
        onChange={handleChange}
        disabled={!editing}
      />
      <TextField
        label="Адрес регистрации"
        name="regAddress"
        value={citizen.regAddress}
        onChange={handleChange}
        disabled={!editing}
        multiline
      />
    </Box>
  );
}
