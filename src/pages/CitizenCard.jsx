import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  TextField,
  Card,
  CardContent,
  Button,
  Avatar,
  Checkbox,
  FormControlLabel,
  MenuItem,
} from "@mui/material";

function CitizenCard({ citizens }) {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [citizenData, setCitizenData] = useState(null);

  useEffect(() => {
    const citizen = citizens.find((c) => c.id === parseInt(id));
    if (citizen) {
      setCitizenData({ ...citizen });
    }
  }, [id, citizens]);

  if (!citizenData) return <div>Гражданин не найден</div>;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCitizenData((prev) => ({ ...prev, [name]: value }));
  };

  const saveChanges = () => {
    localStorage.setItem(`citizen_${id}`, JSON.stringify(citizenData));
    setIsEditing(false);
    alert("Изменения сохранены!");
  };

  const tabs = [
    { label: "Основные сведения" },
    { label: "Семья" },
    { label: "Образование" },
    { label: "Работа" },
    { label: "Льготы" },
    { label: "Обращения" },
  ];

  return (
    <Box sx={{ p: 2 }}>
      {/* Заголовок */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <Avatar
          src={citizenData.photo || ""}
          alt={citizenData.fullName}
          sx={{ width: 80, height: 80 }}
        />
        <Box>
          <Typography variant="h5">{citizenData.fullName}</Typography>
          <Typography variant="body2" color="text.secondary">
            {citizenData.region} • {citizenData.gender}
          </Typography>
        </Box>
        <Button
          sx={{ ml: "auto" }}
          variant="contained"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Отменить" : "Редактировать"}
        </Button>
      </Box>

      {/* Вкладки */}
      <Tabs
        value={activeTab}
        onChange={(e, newValue) => setActiveTab(newValue)}
        sx={{ mb: 2 }}
      >
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.label} />
        ))}
      </Tabs>

      {/* Содержимое вкладок */}
      <Card>
        <CardContent>
          {activeTab === 0 && (
            <Box sx={{ display: "grid", gap: 2 }}>
              <TextField
                label="ФИО"
                name="fullName"
                value={citizenData.fullName}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              <TextField
                type="date"
                label="Дата рождения"
                name="birthDate"
                value={citizenData.birthDate}
                onChange={handleInputChange}
                disabled={!isEditing}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                select
                label="Пол"
                name="gender"
                value={citizenData.gender}
                onChange={handleInputChange}
                disabled={!isEditing}
              >
                <MenuItem value="М">М</MenuItem>
                <MenuItem value="Ж">Ж</MenuItem>
              </TextField>
              <TextField
                label="СНИЛС"
                name="snils"
                value={citizenData.snils}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              <TextField
                label="ИНН"
                name="inn"
                value={citizenData.inn}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              <TextField
                label="Email"
                name="email"
                value={citizenData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              <TextField
                label="Телефон"
                name="phone"
                value={citizenData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              <TextField
                multiline
                label="Адрес регистрации"
                name="regAddress"
                value={citizenData.regAddress}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              <TextField
                multiline
                label="Адрес проживания"
                name="factAddress"
                value={citizenData.factAddress}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </Box>
          )}

          {activeTab === 4 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Социальные льготы
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={citizenData.benefits.includes("инвалид")}
                    disabled={!isEditing}
                  />
                }
                label="Инвалид"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={citizenData.benefits.includes("многодетный")}
                    disabled={!isEditing}
                  />
                }
                label="Многодетный"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={citizenData.benefits.includes("ветеран")}
                    disabled={!isEditing}
                  />
                }
                label="Ветеран"
              />
            </Box>
          )}

          {activeTab === 5 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Обращения
              </Typography>
              <ul>
                <li>Тема - Экология, дата - 2025-01-01</li>
                <li>Тема - Льготы, дата - 2025-02-01</li>
                <li>Тема - Жилье, дата - 2025-03-01</li>
              </ul>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Кнопка сохранения */}
      {isEditing && (
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={saveChanges}
        >
          Сохранить
        </Button>
      )}
    </Box>
  );
}

export default CitizenCard;
