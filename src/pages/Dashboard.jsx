import { useState, Suspense, lazy } from "react";
import { Box, Typography, Grid, Card, CardContent, Tabs, Tab } from "@mui/material";
import { motion } from "framer-motion";
import PeopleIcon from "@mui/icons-material/People";
import StorageIcon from "@mui/icons-material/Storage";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

// ленивые вкладки
const DemographyTab = lazy(() => import("../components/dashboard-tabs/DemographyTab"));
const EducationTab = lazy(() => import("../components/dashboard-tabs/EducationTab"));
const RegionsTab = lazy(() => import("../components/dashboard-tabs/RegionsTab"));
const TrendsTab = lazy(() => import("../components/dashboard-tabs/TrendsTab"));
const BenefitsTab = lazy(() => import("../components/dashboard-tabs/BenefitsTab"));
const AgeTab = lazy(() => import("../components/dashboard-tabs/AgeTab"));
const EmploymentTab = lazy(() => import("../components/dashboard-tabs/EmploymentTab"));

export default function Dashboard({ citizens }) {
  const [tab, setTab] = useState(0);

  const kpi = [
    { title: "Всего граждан", value: citizens.length.toLocaleString(), icon: <PeopleIcon /> },
    { title: "Память (capacity)", value: "105GB", icon: <StorageIcon /> },
    { title: "Рост (мес)", value: "+3.1%", icon: <TrendingUpIcon /> },
    { title: "Ошибки", value: "23", icon: <ErrorOutlineIcon /> },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard — Аналитика граждан
      </Typography>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        {kpi.map((k) => (
          <Grid item xs={12} sm={6} md={3} key={k.title}>
            <Card component={motion.div} whileHover={{ y: -6 }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  {k.title}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h5">{k.value}</Typography>
                  </Box>
                  <Box sx={{ color: "primary.main", fontSize: 28 }}>{k.icon}</Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Tabs value={tab} onChange={(e, v) => setTab(v)} variant="scrollable" scrollButtons="auto" sx={{ mb: 2 }}>
        <Tab label="Демография" />
        <Tab label="Возраст" />
        <Tab label="Образование" />
        <Tab label="Регионы" />
        <Tab label="Занятость" />
        <Tab label="Тренды" />
        <Tab label="Льготы" />
      </Tabs>

      <Suspense fallback={<div>Загрузка графиков...</div>}>
        {tab === 0 && <DemographyTab citizens={citizens} />}
        {tab === 1 && <AgeTab citizens={citizens} />}
        {tab === 2 && <EducationTab citizens={citizens} />}
        {tab === 3 && <RegionsTab citizens={citizens} />}
        {tab === 4 && <EmploymentTab citizens={citizens} />}
        {tab === 5 && <TrendsTab citizens={citizens} />}
        {tab === 6 && <BenefitsTab citizens={citizens} />}
      </Suspense>
    </Box>
  );
}
