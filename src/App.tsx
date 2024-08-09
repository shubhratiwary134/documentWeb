
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import Navbar from "./Components/Navbar";
import { Box, Button, Container, TextField, Typography } from '@mui/material';

const App = () => {
 
  return (
    <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      
      <SignedIn >
        <div className="flex justify-between mt-5 mx-10">
        <Navbar></Navbar>
        <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        DocWeb
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Button variant="contained" color="primary" >
          My Documents
        </Button>
        <Button variant="contained" color="secondary" >
          Upload  Documents
        </Button>
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for documents..."
        
      />
    </Container>
        <UserButton />
        </div>
    
      </SignedIn>
    </header>
  );
};

export default App;
