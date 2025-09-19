import { useState } from "react";
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

function CitizenCard({ citizens }) {
  const { id } = useParams();
  const [active, setActive] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const { data: citizenData, setData, save, loading } = useCitizen(
    id,
    citizens
  );

  if (loading) return <div>Загрузка...</div>;
  if (!citizenData) return <div>Гражданин не найден</div>;

  const tabs = [
    { label: "Основные", comp: <MainTab citizen={citizenData} editing={isEditing} setCitizen={setData} /> },
    { label: "Семья", comp: <FamilyTab citizen={citizenData} editing={isEditing} setCitizen={setData} /> },
    { label: "Образование", comp: <EducationTab citizen={citizenData} editing={isEditing} setCitizen={setData} /> },
    { label: "Работа", comp: <WorkTab citizen={citizenData} editing={isEditing} setCitizen={setData} /> },
    { label: "Льготы", comp: <BenefitsTab citizen={citizenData} editing={isEditing} setCitizen={setData} /> },
    { label: "Обращения", comp: <CasesTab citizen={citizenData} editing={isEditing} setCitizen={setData} /> },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 3 }}>
        <Avatar src={citizenData.photo} sx={{ width: 88, height: 88 }} />
        <Box>
          <Typography variant="h5">{citizenData.fullName}</Typography>
          <Typography color="text.secondary">
            {citizenData.region} • {citizenData.gender}
          </Typography>
        </Box>
        <Box sx={{ ml: "auto", display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => setIsEditing((s) => !s)}
          >
            {isEditing ? "Отменить" : "Редактировать"}
          </Button>
          {isEditing ? (
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={() => {
                save(citizenData);
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
