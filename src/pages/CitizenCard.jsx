import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Avatar,
  Typography,
  Button,
  Tabs,
  Tab,
  Card,
  CardContent,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useCitizen } from "../hooks/useCitizen";
import { motion } from "framer-motion";
// Импортируем все новые вкладки
import PersonalInfoTab from "../components/citizen-tabs/PersonalInfoTab";
import ContactsTab from "../components/citizen-tabs/ContactsTab";
import AddressesTab from "../components/citizen-tabs/AddressesTab";
import DocumentsTab from "../components/citizen-tabs/DocumentsTab";
import EducationTab from "../components/citizen-tabs/EducationTab";
import WorkTab from "../components/citizen-tabs/WorkTab";
import FamilyTab from "../components/citizen-tabs/FamilyTab";
import BenefitsTab from "../components/citizen-tabs/BenefitsTab";
import MedicalTab from "../components/citizen-tabs/MedicalTab";
import PensionTab from "../components/citizen-tabs/PensionTab";
import IncomeTab from "../components/citizen-tabs/IncomeTab";
import TaxesTab from "../components/citizen-tabs/TaxesTab";
import HousingTab from "../components/citizen-tabs/HousingTab";
import VehiclesTab from "../components/citizen-tabs/VehiclesTab";
import MilitaryTab from "../components/citizen-tabs/MilitaryTab";
import WorkExperienceTab from "../components/citizen-tabs/WorkExperienceTab";
import CasesTab from "../components/citizen-tabs/CasesTab";

function CitizenCard({ citizens, setCitizens }) {
  const { id } = useParams();
  const [active, setActive] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const {
    data: citizenData,
    setData,
    save,
    loading,
    saving,
  } = useCitizen(id, citizens);

  // локальный стейт для редактируемой копии
  const [draft, setDraft] = useState(null);

  // snackbar для уведомлений
  const [snack, setSnack] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  useEffect(() => {
    setDraft(citizenData); // при загрузке данных обновляем черновик
  }, [citizenData]);

  if (loading && !draft) return <div>Загрузка...</div>;
  if (!citizenData && !draft) return <div>Гражданин не найден</div>;

  const genderLabel = draft?.personalInfo?.gender === "М" ? "Муж." : "Жен.";

  // Вкладки карточки
  const tabs = [
    { label: "Основные", comp: <PersonalInfoTab citizen={draft} editing={isEditing} setCitizen={setDraft} /> },
    { label: "Контакты", comp: <ContactsTab citizen={draft} editing={isEditing} setCitizen={setDraft} /> },
    { label: "Адреса", comp: <AddressesTab citizen={draft} editing={isEditing} setCitizen={setDraft} /> },
    { label: "Документы", comp: <DocumentsTab citizen={draft} editing={isEditing} setCitizen={setDraft} /> },
    { label: "Образование", comp: <EducationTab citizen={draft} editing={isEditing} setCitizen={setDraft} /> },
    { label: "Работа", comp: <WorkTab citizen={draft} editing={isEditing} setCitizen={setDraft} /> },
    { label: "Семья", comp: <FamilyTab citizen={draft} editing={isEditing} setCitizen={setDraft} /> },
    { label: "Медицина", comp: <MedicalTab citizen={draft} editing={isEditing} setCitizen={setDraft} /> },
    { label: "Пенсия", comp: <PensionTab citizen={draft} editing={isEditing} setCitizen={setDraft} /> },
    { label: "Льготы", comp: <BenefitsTab citizen={draft} editing={isEditing} setCitizen={setDraft} /> },
    { label: "Доходы", comp: <IncomeTab citizen={draft} editing={isEditing} setCitizen={setDraft} /> },
    { label: "Налоги", comp: <TaxesTab citizen={draft} editing={isEditing} setCitizen={setDraft} /> },
    { label: "Недвижимость", comp: <HousingTab citizen={draft} editing={isEditing} setCitizen={setDraft} /> },
    { label: "Транспорт", comp: <VehiclesTab citizen={draft} editing={isEditing} setCitizen={setDraft} /> },
    { label: "Воинский учет", comp: <MilitaryTab citizen={draft} editing={isEditing} setCitizen={setDraft} /> },
    { label: "Трудовой стаж", comp: <WorkExperienceTab citizen={draft} editing={isEditing} setCitizen={setDraft} /> },
    { label: "Обращения", comp: <CasesTab citizen={draft} /> },
  ];

  const handleSave = async () => {
    if (!draft) return;
    try {
      await save(draft);

      // обновляем глобальный список citizens
      if (typeof setCitizens === "function") {
        setCitizens((prev) => {
          const idx = prev.findIndex((p) => String(p.id) === String(draft.id));
          if (idx === -1) return [...prev, draft];
          const copy = [...prev];
          copy[idx] = draft; // заменяем полностью на новый объект
          return copy;
        });
      }

      setData(draft); // обновляем данные в хуке
      setIsEditing(false);
      setSnack({ open: true, severity: "success", message: "Сохранено" });
    } catch (e) {
      console.error(e);
      setSnack({ open: true, severity: "error", message: "Ошибка при сохранении" });
    }
  };

  return (
    <Box sx={{ p: 2, maxWidth: "1200px" }}>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 3 }}>
        <Avatar src={draft?.photo} sx={{ width: 88, height: 88 }} />
        <Box>
          <Typography variant="h5">{draft?.personalInfo?.fullName}</Typography>
          <Typography color="text.secondary">
            {draft?.region} • {genderLabel}
          </Typography>
        </Box>
        <Box sx={{ ml: "auto", display: "flex", gap: 1, alignItems: "center" }}>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => {
              if (isEditing) {
                setDraft(citizenData); // отмена → откат к оригиналу
                setIsEditing(false);
              } else {
                setDraft({ ...citizenData }); // редактирование → копия
                setIsEditing(true);
              }
            }}
            disabled={saving}
          >
            {isEditing ? "Отменить" : "Редактировать"}
          </Button>

          {isEditing ? (
            <Button
              variant="contained"
              color="primary"
              startIcon={saving ? <CircularProgress size={18} /> : <SaveIcon />}
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Сохранение..." : "Сохранить"}
            </Button>
          ) : null}
        </Box>
      </Box>

      <Tabs
        value={active}
        onChange={(e, v) => setActive(v)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 2 }}
      >
        {tabs.map((t, i) => (
          <Tab key={i} label={t.label} />
        ))}
      </Tabs>

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28 }}
      >
        <Card>
          <CardContent>{tabs[active].comp}</CardContent>
        </Card>
      </motion.div>

      <Snackbar
        open={snack.open}
        autoHideDuration={3500}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
          severity={snack.severity}
          sx={{ width: "100%" }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default CitizenCard;
