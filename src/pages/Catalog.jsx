import { useState, useMemo } from "react";
import { Box, TextField, MenuItem, Typography, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

function Catalog({ citizens }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [pageSize, setPageSize] = useState(50);

  const uniqueRegions = useMemo(
    () => [...new Set(citizens.map((c) => c.region || ""))],
    [citizens]
  );

  const uniqueGenders = [
    { value: "М", label: "Муж." },
    { value: "Ж", label: "Жен." },
  ];

  // Фильтрация
  const filteredCitizens = useMemo(() => {
    return citizens.filter((c) => {
      const fullName = c.personalInfo?.fullName || "";
      const nameMatch = fullName.toLowerCase().includes(searchTerm.toLowerCase());

      const citizenRegion = c.region || "";
      const regionMatch = !regionFilter || citizenRegion === regionFilter;

      const citizenGender = c.personalInfo?.gender || "";
      const genderMatch = !genderFilter || citizenGender === genderFilter;

      return nameMatch && regionMatch && genderMatch;
    });
  }, [citizens, searchTerm, regionFilter, genderFilter]);

  // Строки (все значения вычислены заранее)
  const rows = filteredCitizens.map((c) => ({
    id: c.id,
    fullName: c.personalInfo?.fullName || "",
    birthDate: c.personalInfo?.birthDate || "",
    region: c.region || "",
    snils: c.personalInfo?.snils || "",
    gender: c.personalInfo?.gender === "М" ? "Муж." : c.personalInfo?.gender === "Ж" ? "Жен." : "",
  }));

  // Колонки
  const columns = [
    { field: "fullName", headerName: "ФИО", flex: 1, sortable: true },
    { field: "birthDate", headerName: "Дата рождения", width: 150, sortable: true },
    { field: "region", headerName: "Регион", width: 180, sortable: true },
    { field: "snils", headerName: "СНИЛС", width: 180 },
    { field: "gender", headerName: "Пол", width: 120 },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Картотека
      </Typography>
      <Typography variant="body2" gutterBottom>
        Всего записей: {filteredCitizens.length} (демо: {citizens.length})
      </Typography>

      <Paper sx={{ display: "flex", gap: 2, flexWrap: "wrap", p: 2, mb: 2 }}>
        <TextField
          label="Поиск по ФИО"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flex: "1 1 300px" }}
        />
        <TextField
          select
          label="Регион"
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          sx={{ width: 200 }}
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
          sx={{ width: 150 }}
        >
          <MenuItem value="">Все</MenuItem>
          {uniqueGenders.map((g) => (
            <MenuItem key={g.value} value={g.value}>
              {g.label}
            </MenuItem>
          ))}
        </TextField>
      </Paper>

      <div style={{ height: 700, width: 920 }}>
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
          rowBuffer={20}
          density="compact"
        />
      </div>
    </Box>
  );
}

export default Catalog;
