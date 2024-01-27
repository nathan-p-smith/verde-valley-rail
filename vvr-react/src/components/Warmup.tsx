import { Box, LinearProgress, List, ListItem, Typography } from "@mui/material";

const Warmup = () => {
  return (
    <Box className="container">
      <Box mb={3}>
        <LinearProgress color="inherit" />
      </Box>
      <Typography variant="h1" className="page-header">
        Welcome
      </Typography>
      <Typography>
        Verde Valley Rail is a ticketing system for a fictional rail system
        running between several Arizona towns. You're seeing this because
        Azure's free-tier database becomes unavailable after a period of
        inactivity. It should load in just a moment. Here are some project
        details while you're waiting.
      </Typography>

      <List>
        <ListItem>Front End - React</ListItem>
        <ListItem>Backend - .NET Core Web API</ListItem>
        <ListItem>Database - Microsoft SQL Server</ListItem>
      </List>
    </Box>
  );
};

export default Warmup;
