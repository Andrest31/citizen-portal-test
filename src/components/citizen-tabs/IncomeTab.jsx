// src/components/citizen-tabs/IncomeTab.js
import { Box, TextField, Typography } from "@mui/material";

export default function IncomeTab({ citizen, editing, setCitizen }) {
  if (!citizen?.income) {
    return <div>Информация о доходах не найдена</div>;
  }

  const income = citizen.income;

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numValue = Number(value) || 0;
    const updatedIncome = { ...citizen.income, [name]: numValue };
    // Пересчитываем тотал при изменении
    updatedIncome.total = updatedIncome.mainJob + updatedIncome.additionalJobs + updatedIncome.benefits + updatedIncome.other;
    setCitizen({
      ...citizen,
      income: updatedIncome
    });
  };

  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      <Typography variant="h6">Доходы</Typography>
      
      <TextField
        label="Основная работа (руб.)"
        name="mainJob"
        type="number"
        value={income.mainJob || 0}
        onChange={handleChange}
        disabled={!editing}
        fullWidth
      />
      <TextField
        label="Дополнительные работы (руб.)"
        name="additionalJobs"
        type="number"
        value={income.additionalJobs || 0}
        onChange={handleChange}
        disabled={!editing}
        fullWidth
      />
      <TextField
        label="Социальные льготы (руб.)"
        name="benefits"
        type="number"
        value={income.benefits || 0}
        onChange={handleChange}
        disabled={!editing}
        fullWidth
      />
      <TextField
        label="Прочие доходы (руб.)"
        name="other"
        type="number"
        value={income.other || 0}
        onChange={handleChange}
        disabled={!editing}
        fullWidth
      />
      <TextField
        label="Итого (руб.)"
        name="total"
        type="number"
        value={income.total || 0}
        disabled // Итог всегда считается автоматически
        fullWidth
        variant="filled"
        sx={{ backgroundColor: '#f5f5f5' }}
      />
    </Box>
  );
}