
import { Container,TextField } from "@mui/material"
import Navbar from "../Components/Navbar"
const HomePage = () => {
  return (
    <div>
      <div>
      <Navbar></Navbar>
      </div>
         <div className="flex">
        
        <Container maxWidth="lg" >
  
     

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