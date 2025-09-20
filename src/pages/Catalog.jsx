import { useState, useMemo, useEffect } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Typography,
  Paper,
  Slider,
  FormControlLabel,
  Checkbox,
  Autocomplete,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

/** Преобразование даты в возраст */
function calcAgeFromBirth(birthDate) {
  if (!birthDate) return null;
  const by = new Date(birthDate);
  if (isNaN(by)) return null;
  const now = new Date();
  let age = now.getFullYear() - by.getFullYear();
  const m = now.getMonth() - by.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < by.getDate())) age--;
  return age;
}

export default function Catalog({ citizens }) {
  const navigate = useNavigate();

  // --- состояние фильтров ---
  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [ageRange, setAgeRange] = useState([0, 100]);
  const [educationFilter, setEducationFilter] = useState([]);
  const [professionFilter, setProfessionFilter] = useState("");
  const [benefitsFilter, setBenefitsFilter] = useState([]);
  const [hasVehicle, setHasVehicle] = useState(false);
  const [hasHousing, setHasHousing] = useState(false);

  const [pageSize, setPageSize] = useState(50);

  // --- данные после фильтрации ---
  const [filteredCitizens, setFilteredCitizens] = useState(citizens);
  const [loading, setLoading] = useState(false);

  // --- инициализация воркера ---
  const workerRef = useMemo(() => {
    try {
      return new Worker(new URL("../workers/catalogWorker.js", import.meta.url), {
        type: "module",
      });
    } catch (e) {
      console.error("Не удалось создать catalogWorker:", e);
      return null;
    }
  }, []);

  useEffect(() => {
    if (!workerRef) return;
    const onMsg = (e) => {
      setFilteredCitizens(e.data);
      setLoading(false);
    };
    workerRef.addEventListener("message", onMsg);
    return () => workerRef.removeEventListener("message", onMsg);
  }, [workerRef]);

  // --- диапазон возраста ---
  useEffect(() => {
    let min = Infinity,
      max = -Infinity;
    for (const c of citizens) {
      let age = c.personalInfo?.age ?? calcAgeFromBirth(c.personalInfo?.birthDate);
      if (typeof age === "number") {
        if (age < min) min = age;
        if (age > max) max = age;
      }
    }
    if (min === Infinity) min = 0;
    if (max === -Infinity) max = 100;
    setAgeRange([min, max]);
  }, [citizens]);

  // --- отправляем фильтры в воркер ---
  useEffect(() => {
    if (!workerRef) return;
    setLoading(true);
    workerRef.postMessage({
      citizens,
      filters: {
        searchTerm,
        regionFilter,
        genderFilter,
        ageRange,
        educationFilter,
        professionFilter,
        benefitsFilter,
        hasVehicle,
        hasHousing,
      },
    });
  }, [
    citizens,
    searchTerm,
    regionFilter,
    genderFilter,
    ageRange,
    educationFilter,
    professionFilter,
    benefitsFilter,
    hasVehicle,
    hasHousing,
    workerRef,
  ]);

  // --- списки для фильтров ---
  const uniqueRegions = useMemo(() => {
    const s = new Set();
    for (const c of citizens) if (c.region) s.add(c.region);
    return Array.from(s).sort();
  }, [citizens]);

  const uniqueGenders = [
    { value: "М", label: "Муж." },
    { value: "Ж", label: "Жен." },
  ];

  const uniqueEducationLevels = useMemo(() => {
    const s = new Set();
    for (const c of citizens) if (c.educationLevel) s.add(c.educationLevel);
    return Array.from(s).sort();
  }, [citizens]);

  const uniqueBenefits = useMemo(() => {
    const s = new Set();
    for (const c of citizens) (c.benefits || []).forEach((b) => s.add(b));
    return Array.from(s).sort();
  }, [citizens]);

  // --- строки для DataGrid ---
  const rows = useMemo(() => {
    return filteredCitizens.map((c) => {
      const age =
        c.personalInfo?.age ?? calcAgeFromBirth(c.personalInfo?.birthDate) ?? "";
      return {
        id: c.id,
        fullName: c.personalInfo?.fullName || "",
        birthDate: c.personalInfo?.birthDate || "",
        age,
        region: c.region || "",
        snils: c.personalInfo?.snils || "",
        gender:
          c.personalInfo?.gender === "М"
            ? "Муж."
            : c.personalInfo?.gender === "Ж"
            ? "Жен."
            : "",
        educationLevel: c.educationLevel || "",
        employment: c.employment || "",
        profession: c.profession || "",
        income: c.income?.total ?? 0,
        hasVehicle: Array.isArray(c.vehicles) && c.vehicles.length > 0,
        hasHousing: Array.isArray(c.housing) && c.housing.length > 0,
      };
    });
  }, [filteredCitizens]);

  const columns = [
    { field: "fullName", headerName: "ФИО", flex: 1 },
    { field: "birthDate", headerName: "Дата рожд.", width: 110 },
    { field: "age", headerName: "Возраст", width: 50 },
    { field: "region", headerName: "Регион", width: 140 },
    { field: "snils", headerName: "СНИЛС", width: 140 },
    { field: "gender", headerName: "Пол", width: 60 },
    { field: "educationLevel", headerName: "Образование", width: 130 },
    { field: "profession", headerName: "Профессия", width: 120 },
    {
      field: "hasVehicle",
      headerName: "ТС",
      width: 90,
      renderCell: (p) => (p.value ? "Да" : "—"),
    },
    {
      field: "hasHousing",
      headerName: "Жильё",
      width: 90,
      renderCell: (p) => (p.value ? "Да" : "—"),
    },
  ];

  // --- очистка фильтров ---
  const clearFilters = () => {
    setSearchTerm("");
    setRegionFilter("");
    setGenderFilter("");
    setEducationFilter([]);
    setProfessionFilter("");
    setBenefitsFilter([]);
    setHasVehicle(false);
    setHasHousing(false);
  };

  // --- экспорт CSV ---
  const exportCsv = () => {
    if (!rows || rows.length === 0) return;
    const header = [
      "ID",
      "ФИО",
      "Дата рожд.",
      "Возраст",
      "Регион",
      "СНИЛС",
      "Пол",
      "Образование",
      "Профессия",
      "Доход",
    ];
    const lines = [header.join(",")];
    for (const r of rows) {
      const vals = [
        r.id,
        r.fullName,
        r.birthDate,
        r.age,
        r.region,
        r.snils,
        r.gender,
        r.educationLevel,
        r.profession,
        r.income,
      ];
      const escaped = vals.map((v) =>
        `"${String(v ?? "").replace(/"/g, '""')}"`
      );
      lines.push(escaped.join(","));
    }
    const blob = new Blob([lines.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `citizens_export_${rows.length}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ p: 2, width: 1250 }}>
      <Typography variant="h4" gutterBottom>
        Картотека
      </Typography>
      <Typography variant="body2" gutterBottom>
        Найдено: {filteredCitizens.length.toLocaleString()} из{" "}
        {citizens.length.toLocaleString()}
      </Typography>

      <Paper
        sx={{ display: "flex", gap: 2, flexWrap: "wrap", p: 2, mb: 2 }}
      >
        <TextField
          label="Поиск по ФИО"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flex: "1 1 280px", minWidth: 200 }}
        />
        <TextField
          select
          label="Регион"
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          sx={{ width: 220 }}
        >
          <MenuItem value="">Все регионы</MenuItem>
          {uniqueRegions.map((r) => (
            <MenuItem key={r} value={r}>
              {r}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Пол"
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
          sx={{ width: 140 }}
        >
          <MenuItem value="">Все</MenuItem>
          {uniqueGenders.map((g) => (
            <MenuItem key={g.value} value={g.value}>
              {g.label}
            </MenuItem>
          ))}
        </TextField>
        <Autocomplete
          multiple
          options={uniqueEducationLevels}
          value={educationFilter}
          onChange={(e, v) => setEducationFilter(v)}
          sx={{ width: 240 }}
          renderInput={(params) => (
            <TextField {...params} label="Образование" />
          )}
        />
        <TextField
          label="Профессия"
          value={professionFilter}
          onChange={(e) => setProfessionFilter(e.target.value)}
          sx={{ width: 220 }}
        />
        <Autocomplete
          multiple
          options={uniqueBenefits}
          value={benefitsFilter}
          onChange={(e, v) => setBenefitsFilter(v)}
          sx={{ width: 240 }}
          renderInput={(params) => <TextField {...params} label="Льготы" />}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={hasVehicle}
              onChange={(e) => setHasVehicle(e.target.checked)}
            />
          }
          label="Есть транспорт"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={hasHousing}
              onChange={(e) => setHasHousing(e.target.checked)}
            />
          }
          label="Есть жильё"
        />
        {loading && <CircularProgress size={26} />}
        <Grid container spacing={1} sx={{ alignItems: "center", ml: "auto" }}>
          <Grid item>
            <Button variant="outlined" onClick={clearFilters}>
              Сбросить
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={exportCsv}
              disabled={rows.length === 0}
            >
              Экспорт ({rows.length})
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <div style={{ height: 700, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(s) => setPageSize(s)}
          rowsPerPageOptions={[25, 50, 100]}
          pagination
          disableSelectionOnClick
          onRowClick={(params) => navigate(`/catalog/${params.row.id}`)}
          rowBuffer={20}
          density="compact"
          getRowId={(r) => r.id}
        />
      </div>
    </Box>
  );
}
