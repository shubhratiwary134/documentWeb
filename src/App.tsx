
import { Button, Typography, Box } from '@mui/material';

const App = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h2" gutterBottom>
        Welcome to the Document Management App
      </Typography>
      <Button variant="contained" color="primary">
        Get Started
      </Button>
    </Box>
  );
};

export default App;
