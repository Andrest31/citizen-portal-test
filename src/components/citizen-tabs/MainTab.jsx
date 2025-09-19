import { Box, TextField } from "@mui/material";

export default function MainTab({ citizen, editing, setCitizen }) {
  // Защита от null или undefined для citizen
  if (!citizen) {
    return <div>Гражданин не найден</div>; // Можно добавить обработку ошибки или загрузки
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCitizen({ ...citizen, [name]: value });
  };

  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      <TextField
        label="ФИО"
        name="fullName"
        value={citizen.fullName || ''} // Защита от null
        onChange={handleChange}
        disabled={!editing}
      />
      <TextField
        type="date"
        label="Дата рождения"
        name="birthDate"
        value={citizen.birthDate || ''} // Защита от null
        onChange={handleChange}
        disabled={!editing}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Email"
        name="email"
        value={citizen.email || ''} // Защита от null
        onChange={handleChange}
        disabled={!editing}
      />
      <TextField
        label="Телефон"
        name="phone"
        value={citizen.phone || ''} // Защита от null
        onChange={handleChange}
        disabled={!editing}
      />
      <TextField
        label="Адрес регистрации"
        name="regAddress"
        value={citizen.regAddress || ''} // Защита от null
        onChange={handleChange}
        disabled={!editing}
        multiline
      />
    </Box>
  );
}
