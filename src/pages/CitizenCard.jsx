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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useCitizen } from "../hooks/useCitizen";
import { motion } from "framer-motion";
import MainTab from "../components/citizen-tabs/MainTab";
import FamilyTab from "../components/citizen-tabs/FamilyTab";
import EducationTab from "../components/citizen-tabs/EducationTab";
import WorkTab from "../components/citizen-tabs/WorkTab";
import BenefitsTab from "../components/citizen-tabs/BenefitsTab";
import CasesTab from "../components/citizen-tabs/CasesTab";
import RealEstateTab from "../components/citizen-tabs/RealEstateTab";
import CarsTab from "../components/citizen-tabs/CarsTab";
import CreditsTab from "../components/citizen-tabs/CreditsTab";
import MedicalTab from "../components/citizen-tabs/MedicalTab";
import TaxesTab from "../components/citizen-tabs/TaxesTab";
import LegalCasesTab from "../components/citizen-tabs/LegalCasesTab";
import MilitaryTab from "../components/citizen-tabs/MilitaryTab";
import ExtraTab from "../components/citizen-tabs/ExtraTab";

function CitizenCard({ citizens }) {
  const { id } = useParams();
  const [active, setActive] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const { data: citizenData, setData, save, loading } = useCitizen(id, citizens);

  // локальный стейт для редактируемой копии
  const [draft, setDraft] = useState(null);

  useEffect(() => {
    setDraft(citizenData); // при загрузке данных обновляем черновик
  }, [citizenData]);

  if (loading) return <div>Загрузка...</div>;
  if (!citizenData) return <div>Гражданин не найден</div>;

  const genderLabel = citizenData.gender === "М" ? "Муж." : "Жен.";

  const tabs = [
  { label: "Основные", comp: <MainTab citizen={draft} editing={isEditing} setCitizen={setDraft} /> },
  { label: "Семья", comp: <FamilyTab citizen={draft} editing={isEditing} setCitizen={setDraft} /> },
  { label: "Образование", comp: <EducationTab citizen={draft} editing={isEditing} setCitizen={setDraft} /> },
  { label: "Работа", comp: <WorkTab citizen={draft} editing={isEditing} setCitizen={setDraft} /> },
  { label: "Льготы", comp: <BenefitsTab citizen={draft} editing={isEditing} setCitizen={setDraft} /> },
  { label: "Недвижимость", comp: <RealEstateTab citizen={draft} editing={isEditing} setCitizen={setDraft} /> },
  { label: "Автомобили", comp: <CarsTab citizen={draft} editing={isEditing} setCitizen={setDraft} /> },
  { label: "Кредиты", comp: <CreditsTab citizen={draft} editing={isEditing} setCitizen={setDraft} /> },
  { label: "Медицина", comp: <MedicalTab citizen={draft} editing={isEditing} setCitizen={setDraft} /> },
  { label: "Налоги и страховки", comp: <TaxesTab citizen={draft} editing={isEditing} setCitizen={setDraft} /> },
  { label: "Судимости", comp: <LegalCasesTab citizen={draft} editing={isEditing} setCitizen={setDraft} /> },
  { label: "Воинский учёт", comp: <MilitaryTab citizen={draft} editing={isEditing} setCitizen={setDraft} /> },
  { label: "Дополнительно", comp: <ExtraTab citizen={draft} editing={isEditing} setCitizen={setDraft} /> },
  { label: "Обращения", comp: <CasesTab citizen={draft} editing={isEditing} setCitizen={setDraft} /> },
];

  return (
    <Box sx={{ p: 2, maxWidth: 1000, mx: "auto" }}>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 3 }}>
        <Avatar src={draft?.photo} sx={{ width: 88, height: 88 }} />
        <Box>
          <Typography variant="h5">{draft?.fullName}</Typography>
          <Typography color="text.secondary">
            {draft?.region} • {genderLabel}
          </Typography>
        </Box>
        <Box sx={{ ml: "auto", display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => {
              if (isEditing) {
                // отмена: вернемся к оригинальным данным
                setDraft(citizenData);
                setIsEditing(false);
              } else {
                // начало редактирования: копируем оригинал
                setDraft({ ...citizenData });
                setIsEditing(true);
              }
            }}
          >
            {isEditing ? "Отменить" : "Редактировать"}
          </Button>
          {isEditing ? (
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={() => {
                save(draft);
                setData(draft); // обновляем оригинал
                setIsEditing(false);
              }}
            >
              Сохранить
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
    </Box>
  );
}

export default CitizenCard;
