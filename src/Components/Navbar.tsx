import { Box, Typography, Button } from "@mui/material";
import { UserButton } from '@clerk/clerk-react';
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline, IoDocumentOutline } from "react-icons/io5";

const Navbar = () => {
  const navigate = useNavigate();

  function handleMyDocumentsClick() {
    navigate('/my-documents');
  }

  function handleUploadDocumentClick() {
    navigate('/upload-document');
  }

  return (
    <Box
      sx={{
        m: 2,
        p: 2,
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' }, // Stack items vertically on small screens
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2,
        backgroundColor: '#2b2a2a', 
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flex: 1, 
        }}
      >
        <UserButton />
        <Typography variant="h6" component="h1" sx={{ color: 'white' }}>
          DocWeb
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap', // Allow buttons to wrap on smaller screens
          justifyContent: { xs: 'center', sm: 'flex-end' }, // Center buttons on small screens
          width: '100%',
          mt: { xs: 2, sm: 0 }, // Margin-top on small screens
        }}
      >
        <Button
          variant="contained"
         
          sx={{
            bgcolor: '#2a2a2a',
            '&:hover': {
              bgcolor: '#333',
            },
            px: 3,
            py: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            textTransform: 'none', // Prevent uppercase transformation
            color:'white'
            
          }}
          onClick={handleMyDocumentsClick}
        >
          <IoDocumentOutline size={24} />
          <Typography variant="body2">My Documents</Typography>
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{
            bgcolor: '#2b2a2a',
            '&:hover': {
              bgcolor: '#333',
            },
            px: 3,
            py: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            textTransform: 'none',// Prevent uppercase transformation
            color:'white' 
          }}
          onClick={handleUploadDocumentClick}
        >
          <IoCloudUploadOutline size={24} />
          <Typography variant="body2">Upload Documents</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default Navbar;
