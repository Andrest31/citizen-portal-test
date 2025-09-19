import { Box, Typography, FormControlLabel, Checkbox } from "@mui/material";

export default function BenefitsTab({ citizen, editing, setCitizen }) {
  const toggle = (benefit) => {
    const benefits = new Set(citizen.benefits || []);
    if (benefits.has(benefit)) {
      benefits.delete(benefit);
    } else {
      benefits.add(benefit);
    }
    setCitizen({ ...citizen, benefits: [...benefits] });
  };

  return (
    <Box sx={{ display: "grid", gap: 1 }}>
      <Typography variant="h6">Социальные льготы</Typography>
      {["инвалид", "многодетный", "ветеран"].map((b) => (
        <FormControlLabel
          key={b}
          control={
            <Checkbox
              checked={(citizen.benefits || []).includes(b)}
              onChange={() => toggle(b)}
              disabled={!editing}
            />
          }
          label={b}
        />
      ))}
    </Box>
  );
}
