// src/components/citizen-tabs/PersonalInfoTab.js
import { Box, TextField, Typography, Autocomplete, Chip, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

export default function PersonalInfoTab({ citizen, editing, setCitizen }) {
  if (!citizen?.personalInfo) {
    return <div>Основная информация не найдена</div>;
  }

  const info = citizen.personalInfo;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCitizen({
      ...citizen,
      personalInfo: { ...citizen.personalInfo, [name]: value }
    });
  };

  const handleLanguageChange = (event) => {
    const value = event.target.value;
    setCitizen({
      ...citizen,
      personalInfo: {
        ...citizen.personalInfo,
        languages: typeof value === 'string' ? value.split(',') : value
      }
    });
  };

  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      <Typography variant="h6">Личные данные</Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
        <TextField
          label="Фамилия"
          name="lastName"
          value={info.lastName || ''}
          onChange={handleChange}
          disabled={!editing}
        />
        <TextField
          label="Имя"
          name="firstName"
          value={info.firstName || ''}
          onChange={handleChange}
          disabled={!editing}
        />
        <TextField
          label="Отчество"
          name="patronymic"
          value={info.patronymic || ''}
          onChange={handleChange}
          disabled={!editing}
        />
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
        <TextField
          type="date"
          label="Дата рождения"
          name="birthDate"
          value={info.birthDate || ''}
          onChange={handleChange}
          disabled={!editing}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Место рождения"
          name="birthPlace"
          value={info.birthPlace || ''}
          onChange={handleChange}
          disabled={!editing}
        />
        <TextField
          label="Возраст"
          name="age"
          type="number"
          value={info.age || ''}
          onChange={handleChange}
          disabled={!editing}
        />
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
        <FormControl fullWidth>
          <InputLabel>Пол</InputLabel>
          <Select
            name="gender"
            value={info.gender || ''}
            onChange={handleChange}
            disabled={!editing}
          >
            <MenuItem value="М">Мужской</MenuItem>
            <MenuItem value="Ж">Женский</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Гражданство"
          name="citizenship"
          value={info.citizenship || ''}
          onChange={handleChange}
          disabled={!editing}
        />
        <TextField
          label="Национальность"
          name="nationality"
          value={info.nationality || ''}
          onChange={handleChange}
          disabled={!editing}
        />
      </Box>

      <FormControl fullWidth>
        <InputLabel>Знание языков</InputLabel>
        <Select
          multiple
          value={info.languages || []}
          onChange={handleLanguageChange}
          disabled={!editing}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} size="small" />
              ))}
            </Box>
          )}
        >
          {["Русский", "Английский", "Немецкий", "Французский", "Испанский", "Китайский"].map((lang) => (
            <MenuItem key={lang} value={lang}>
              {lang}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography variant="h6" sx={{ mt: 2 }}>Паспортные данные</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: '120px 1fr 1fr', gap: 2 }}>
        <TextField
          label="Серия"
          name="passportSeries"
          value={info.passportSeries || ''}
          onChange={handleChange}
          disabled={!editing}
        />
        <TextField
          label="Номер"
          name="passportNumber"
          value={info.passportNumber || ''}
          onChange={handleChange}
          disabled={!editing}
        />
        <TextField
          label="Код подразделения"
          name="passportDivisionCode"
          value={info.passportDivisionCode || ''}
          onChange={handleChange}
          disabled={!editing}
        />
      </Box>
      <TextField
        label="Кем выдан"
        name="passportIssuedBy"
        value={info.passportIssuedBy || ''}
        onChange={handleChange}
        disabled={!editing}
        multiline
      />
      <TextField
        type="date"
        label="Дата выдачи"
        name="passportIssueDate"
        value={info.passportIssueDate || ''}
        onChange={handleChange}
        disabled={!editing}
        InputLabelProps={{ shrink: true }}
      />

      <Typography variant="h6" sx={{ mt: 2 }}>Идентификаторы</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 2 }}>
        <TextField
          label="СНИЛС"
          name="snils"
          value={info.snils || ''}
          onChange={handleChange}
          disabled={!editing}
        />
        <TextField
          label="ИНН"
          name="inn"
          value={info.inn || ''}
          onChange={handleChange}
          disabled={!editing}
        />
        <TextField
          label="ОГРН"
          name="ogrn"
          value={info.ogrn || ''}
          onChange={handleChange}
          disabled={!editing}
        />
        <TextField
          label="ОКПО"
          name="okpo"
          value={info.okpo || ''}
          onChange={handleChange}
          disabled={!editing}
        />
      </Box>
    </Box>
  );
}