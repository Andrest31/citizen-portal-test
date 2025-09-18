import { useState, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  TextField,
  MenuItem,
  Typography,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function Catalog({ citizens }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");

  // Уникальные значения для фильтров
  const uniqueRegions = [...new Set(citizens.map((c) => c.region))];
  const uniqueGenders = ["М", "Ж"];

  // Подготовка данных с фильтрами
  const filteredCitizens = useMemo(() => {
    return citizens.filter((c) => {
      const nameMatch = c.fullName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const regionMatch = !regionFilter || c.region === regionFilter;
      const genderMatch = !genderFilter || c.gender === genderFilter;
      return nameMatch && regionMatch && genderMatch;
    });
  }, [citizens, searchTerm, regionFilter, genderFilter]);

  // Определение колонок для таблицы
  const columns = [
    {
      field: "fullName",
      headerName: "ФИО",
      flex: 1,
      sortable: true,
    },
    {
      field: "birthDate",
      headerName: "Дата рождения",
      width: 150,
      sortable: true,
    },
    {
      field: "region",
      headerName: "Регион",
      width: 180,
      sortable: true,
    },
    {
      field: "snils",
      headerName: "СНИЛС",
      width: 180,
    },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Картотека
      </Typography>
      <Typography variant="body2" gutterBottom>
        Всего записей: {filteredCitizens.length} (демо: 150, реальность: 100k+)
      </Typography>

      {/* Панель фильтров */}
      <Paper
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          p: 2,
          mb: 2,
        }}
      >
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
            <MenuItem key={g} value={g}>
              {g}
            </MenuItem>
          ))}
        </TextField>
      </Paper>

      {/* Таблица */}
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={filteredCitizens.map((c) => ({
            id: c.id,
            fullName: c.fullName,
            birthDate: c.birthDate,
            region: c.region,
            snils: c.snils,
          }))}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          pagination
          disableSelectionOnClick
          onRowClick={(params) => navigate(`/catalog/${params.id}`)}
        />
      </div>
    </Box>
  );
}

export default Catalog;
