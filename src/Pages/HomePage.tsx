
import { Container,TextField } from "@mui/material"
import Navbar from "../Components/Navbar"
const HomePage = () => {
  return (
    <div>
      <div>
      <Navbar></Navbar>
      </div>
         <div className="flex justify-between mt-5 mx-10">
        
        <Container maxWidth="md" sx={{ mt: 4 }}>
  
     

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for documents..."
        
      />
    </Container>
       
        </div> 
    </div>
  )
}

export default HomePage