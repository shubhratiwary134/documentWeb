import { Box,Button } from "@mui/material"
import { UserButton } from '@clerk/clerk-react';

const Navbar = () => {
  return (
    <div className="m-5 flex justify-between">
      <div>
        <UserButton/>
      </div>
         <div >
       <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4,gap:10 }}>
        <Button variant="contained" color="primary" >
          My Documents
        </Button>
        <Button variant="contained" color="secondary" >
          Upload  Documents
        </Button>
      </Box>
    </div>
    </div>
 
  )
}

export default Navbar