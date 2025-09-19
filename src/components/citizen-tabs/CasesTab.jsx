import { Box, Typography } from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";

export default function CasesTab() {
  const cases = [
    { topic: "Экология", date: "2025-01-01" },
    { topic: "Льготы", date: "2025-02-01" },
    { topic: "Жилье", date: "2025-03-01" },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Обращения
      </Typography>
      <Timeline position="alternate">
        {cases.map((c, idx) => (
          <TimelineItem key={idx}>
            <TimelineSeparator>
              <TimelineDot color="primary" />
              {idx < cases.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Typography>{c.topic}</Typography>
              <Typography variant="caption">{c.date}</Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
}
