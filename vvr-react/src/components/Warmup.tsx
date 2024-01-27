import {
  Box,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

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
      <List sx={{ listStyleType: "disc" }}>
        <ListItem>
          <ListItemIcon>
            <CheckIcon />
          </ListItemIcon>
          <ListItemText>Front End - React</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckIcon />
          </ListItemIcon>
          <ListItemText>Backend - .NET Core Web API</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckIcon />
          </ListItemIcon>
          <ListItemText>Database - Microsoft SQL Server</ListItemText>
        </ListItem>
      </List>
    </Box>
  );
};

export default Warmup;
