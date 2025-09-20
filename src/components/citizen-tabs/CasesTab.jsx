import { Box, Typography } from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";

export default function CasesTab({ citizen }) {
  const cases = citizen?.cases || [];

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