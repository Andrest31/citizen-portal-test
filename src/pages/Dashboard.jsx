import { useState, Suspense, lazy } from "react";
import { Box, Typography, Grid, Card, CardContent, Tabs, Tab } from "@mui/material";
import { motion } from "framer-motion";

// ленивые графики
const DemographyTab = lazy(() => import("../components/dashboard-tabs/DemographyTab"));
const EducationTab = lazy(() => import("../components/dashboard-tabs/EducationTab"));
const RegionsTab = lazy(() => import("../components/dashboard-tabs/RegionsTab"));
const TrendsTab = lazy(() => import("../components/dashboard-tabs/TrendsTab"));
const BenefitsTab = lazy(() => import("../components/dashboard-tabs/BenefitsTab"));

export default function Dashboard({ citizens }) {
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* KPI */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card component={motion.div} whileHover={{ y: -6 }}>
            <CardContent>
              <Typography variant="subtitle2">Всего граждан</Typography>
              <Typography variant="h4">{citizens.length.toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 2 }}>
        <Tab label="Демография" />
        <Tab label="Образование" />
        <Tab label="Регионы" />
        <Tab label="Тренды" />
        <Tab label="Льготы" />
      </Tabs>

      <Suspense fallback={<div>Загрузка графиков...</div>}>
        {tab === 0 && <DemographyTab citizens={citizens} />}
        {tab === 1 && <EducationTab citizens={citizens} />}
        {tab === 2 && <RegionsTab citizens={citizens} />}
        {tab === 3 && <TrendsTab citizens={citizens} />}
        {tab === 4 && <BenefitsTab citizens={citizens} />}
      </Suspense>
    </Box>
  );
}
