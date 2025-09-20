import { useState } from "react";
import { Box, Typography, Tabs, Tab, Paper } from "@mui/material";
import DemographyTab from "../components/dashboard-tabs/DemographyTab";
import EducationTab from "../components/dashboard-tabs/EducationTab";
import EmploymentTab from "../components/dashboard-tabs/EmploymentTab";
import RegionsTab from "../components/dashboard-tabs/RegionsTab";
import FinanceTab from "../components/dashboard-tabs/FinanceTab";
import PropertyTab from "../components/dashboard-tabs/PropertyTab";
import TrendsTab from "../components/dashboard-tabs/TrendsTab";

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

export default function Dashboard({ citizens }) {
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Дашборд — аналитика граждан
      </Typography>

      <Paper sx={{ mb: 2 }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Демография" />
          <Tab label="Образование" />
          <Tab label="Занятость" />
          <Tab label="Регионы" />
          <Tab label="Финансы" />
          <Tab label="Имущество" />
          <Tab label="Тренды" />
        </Tabs>
      </Paper>

      <TabPanel value={tab} index={0}><DemographyTab citizens={citizens} /></TabPanel>
      <TabPanel value={tab} index={1}><EducationTab citizens={citizens} /></TabPanel>
      <TabPanel value={tab} index={2}><EmploymentTab citizens={citizens} /></TabPanel>
      <TabPanel value={tab} index={3}><RegionsTab citizens={citizens} /></TabPanel>
      <TabPanel value={tab} index={4}><FinanceTab citizens={citizens} /></TabPanel>
      <TabPanel value={tab} index={5}><PropertyTab citizens={citizens} /></TabPanel>
      <TabPanel value={tab} index={6}><TrendsTab citizens={citizens} /></TabPanel>
    </Box>
  );
}