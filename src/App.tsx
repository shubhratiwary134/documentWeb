
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import Navbar from "./Components/Navbar";
import { Container, TextField, Typography } from '@mui/material';

const App = () => {
 
  return (
    <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      
      <SignedIn >
        <div >
        <Navbar></Navbar>
        </div>
     
        <div className="flex justify-between mt-5 mx-10">
        
        <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        DocWeb
      </Typography>

     

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for documents..."
        
      />
    </Container>
       
        </div>
    
      </SignedIn>
    </header>
  );
};

export default App;
