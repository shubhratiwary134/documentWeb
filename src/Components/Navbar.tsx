import { Box,Button } from "@mui/material"

const Navbar = () => {
  return (
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
  )
}

export default Navbar