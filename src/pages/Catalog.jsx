// src/pages/Catalog.js
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
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

/** Хелпер: дебаунс значения */
function useDebounced(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

/** Преобразование даты в возраст, если age не задан */
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

  // UI state фильтров
  const [searchTerm, setSearchTerm] = useState("");
  const searchDebounced = useDebounced(searchTerm, 300);

  const [regionFilter, setRegionFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [ageRange, setAgeRange] = useState([0, 100]); // min/max
  const [educationFilter, setEducationFilter] = useState([]); // массив
  const [professionFilter, setProfessionFilter] = useState("");
  const professionDebounced = useDebounced(professionFilter, 300);
  const [benefitsFilter, setBenefitsFilter] = useState([]); // массив
  const [hasVehicle, setHasVehicle] = useState(false);
  const [hasHousing, setHasHousing] = useState(false);

  const [pageSize, setPageSize] = useState(50);

  // Вычисляем уникальные значения для селектов (memoized)
  const uniqueRegions = useMemo(() => {
    const s = new Set();
    for (const c of citizens) if (c.region) s.add(c.region);
    return Array.from(s).sort();
  }, [citizens]);

  const uniqueGenders = useMemo(() => {
    // фиксированный список удобнее
    return [
      { value: "М", label: "Муж." },
      { value: "Ж", label: "Жен." },
    ];
  }, []);

  const uniqueEducationLevels = useMemo(() => {
    const s = new Set();
    for (const c of citizens) if (c.educationLevel) s.add(c.educationLevel);
    return Array.from(s).sort();
  }, [citizens]);

  const uniqueBenefits = useMemo(() => {
    const s = new Set();
    for (const c of citizens) {
      (c.benefits || []).forEach((b) => s.add(b));
    }
    return Array.from(s).sort();
  }, [citizens]);

  // вычисляем диапазон возраста в данных, чтобы выставить пределы слайдера
  const [dataAgeMinMax] = useMemo(() => {
    let min = Infinity,
      max = -Infinity;
    for (const c of citizens) {
      let age = c.personalInfo?.age;
      if (!age) age = calcAgeFromBirth(c.personalInfo?.birthDate);
      if (typeof age === "number") {
        if (age < min) min = age;
        if (age > max) max = age;
      }
    }
    if (min === Infinity) min = 0;
    if (max === -Infinity) max = 100;
    return [[Math.max(0, Math.floor(min)), Math.max(0, Math.ceil(max))]];
  }, [citizens]);

  // Инициализируем ageRange при первой загрузке
  useEffect(() => {
    const [minMax] = dataAgeMinMax;
    if (minMax) setAgeRange([minMax[0], minMax[1]]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataAgeMinMax[0], dataAgeMinMax.length]);

  // Основная фильтрация (оптимизировано useMemo)
  const filteredCitizens = useMemo(() => {
    const sTerm = (searchDebounced || "").trim().toLowerCase();
    const pTerm = (professionDebounced || "").trim().toLowerCase();
    const rFilter = regionFilter;
    const gFilter = genderFilter;
    const [ageMin, ageMax] = ageRange;
    const eduSet = new Set(educationFilter || []);
    const benefitsSet = new Set(benefitsFilter || []);
    const needVehicle = hasVehicle;
    const needHousing = hasHousing;

    // Если нет граждан — быстро вернуть пустой массив
    if (!citizens || citizens.length === 0) return [];

    return citizens.filter((c) => {
      // ФИО поиск
      const fullName = (c.personalInfo?.fullName || "").toLowerCase();
      if (sTerm && !fullName.includes(sTerm)) return false;

      // Регион
      if (rFilter && c.region !== rFilter) return false;

      // Пол
      if (gFilter && (c.personalInfo?.gender || "") !== gFilter) return false;

      // Возраст
      let age = c.personalInfo?.age;
      if (!age) age = calcAgeFromBirth(c.personalInfo?.birthDate);
      if (typeof age === "number") {
        if (age < ageMin || age > ageMax) return false;
      } else {
        // если нет возраста — исключаем
        return false;
      }

      // Образование
      if (eduSet.size > 0) {
        if (!c.educationLevel || !eduSet.has(c.educationLevel)) return false;
      }

      // Профессия (по подстроке)
      if (pTerm) {
        const prof = (c.profession || "").toLowerCase();
        if (!prof.includes(pTerm)) return false;
      }

      // Льготы
      if (benefitsSet.size > 0) {
        const hasAny = (c.benefits || []).some((b) => benefitsSet.has(b));
        if (!hasAny) return false;
      }

      // Наличие транспорта
      if (needVehicle) {
        if (!Array.isArray(c.vehicles) || c.vehicles.length === 0) return false;
      }

      // Наличие жилья
      if (needHousing) {
        if (!Array.isArray(c.housing) || c.housing.length === 0) return false;
      }

      return true;
    });
  }, [
    citizens,
    searchDebounced,
    regionFilter,
    genderFilter,
    ageRange,
    educationFilter,
    professionDebounced,
    benefitsFilter,
    hasVehicle,
    hasHousing,
  ]);

  // Строки для DataGrid — мапим минимально необходимое (с индексом id)
  const rows = useMemo(() => {
    return filteredCitizens.map((c) => {
      const age =
        c.personalInfo?.age ??
        calcAgeFromBirth(c.personalInfo?.birthDate) ??
        "";
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
    { field: "fullName", headerName: "ФИО", flex: 1, sortable: true },
    {
      field: "birthDate",
      headerName: "Дата рожд.",
      width: 110,
      sortable: true,
    },
    { field: "age", headerName: "Возраст", width: 50, sortable: true },
    { field: "region", headerName: "Регион", width: 140, sortable: true },
    { field: "snils", headerName: "СНИЛС", width: 140 },
    { field: "gender", headerName: "Пол", width: 60 },
    { field: "educationLevel", headerName: "Образование", width: 130 },
    { field: "profession", headerName: "Профессия", width: 140 },
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

  // Очистка фильтров
  const clearFilters = () => {
    setSearchTerm("");
    setRegionFilter("");
    setGenderFilter("");
    const [minMax] = dataAgeMinMax;
    setAgeRange([minMax[0], minMax[1]]);
    setEducationFilter([]);
    setProfessionFilter("");
    setBenefitsFilter([]);
    setHasVehicle(false);
    setHasHousing(false);
  };

  // Экспорт в CSV (экспортируем текущие видимые строки)
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
      const escaped = vals.map(
        (v) => `"${String(v ?? "").replace(/"/g, '""')}"`
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
    <Box sx={{ p: 2, width:1250 }}>
      <Typography variant="h4" gutterBottom>
        Картотека
      </Typography>
      <Typography variant="body2" gutterBottom>
        Всего записей: {filteredCitizens.length.toLocaleString()} (всего в базе:{" "}
        {citizens.length.toLocaleString()})
      </Typography>

      <Paper sx={{ display: "flex", gap: 2, flexWrap: "wrap", p: 2, mb: 2 }}>
        <TextField
          label="Поиск по ФИО"
          variant="outlined"
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
            <TextField {...params} label="Уровень образования" />
          )}
        />

        <TextField
          label="Профессия (по подстроке)"
          variant="outlined"
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

        <Grid
          container
          spacing={1}
          sx={{ alignItems: "center", ml: "auto", width: "auto" }}
        >
          <Grid item>
            <Button variant="outlined" onClick={clearFilters}>
              Сбросить фильтры
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={exportCsv}
              disabled={rows.length === 0}
            >
              Экспорт CSV ({rows.length})
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <div style={{ height: 700, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newSize) => setPageSize(newSize)}
          rowsPerPageOptions={[25, 50, 100]}
          pagination
          paginationMode="client"
          disableSelectionOnClick
          onRowClick={(params) => {
            if (params.row?.id) navigate(`/catalog/${params.row.id}`);
          }}
          rowBuffer={50}
          density="compact"
          getRowId={(r) => r.id}
          sortingOrder={["desc", "asc"]}
          sx={{
            "& .MuiDataGrid-row": {
              cursor: "pointer",
            },
          }}
        />
      </div>
    </Box>
  );
}
