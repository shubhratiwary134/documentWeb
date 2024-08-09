
import { Container,TextField } from "@mui/material"
import Navbar from "../Components/Navbar"
import DocumentList from "../Components/DocumentList"
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
        <DocumentList></DocumentList>
    </div>
  )
}

export default HomePage