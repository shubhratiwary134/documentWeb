import { Box,Typography } from "@mui/material"
import { UserButton } from '@clerk/clerk-react';
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline, IoDocumentOutline } from "react-icons/io5";
const Navbar = () => {
  const navigate=useNavigate()
  function handleMyDocumentsClick(){
    navigate('/my-documents')
  }
  function handleUploadDocumentClick(){
    navigate('/upload-document')
  }
  return (
    <div className="m-5 flex justify-between">
    <div className="flex items-start gap-4">
    <div >
        <UserButton/>
      </div>
      <Typography variant="h6" component="h1" gutterBottom>
        DocWeb
      </Typography>
         <div >
    </div>
</div>
       <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4,gap:10 }}>
       

        <button className="bg-[#1b1a1a] text-white px-5 py-2 flex" onClick={handleMyDocumentsClick} >
        <IoDocumentOutline size={24}/>
          My Documents
        </button>
        <button className="bg-[#1b1a1a] text-white px-5 py-2 flex" onClick={handleUploadDocumentClick} >
        <IoCloudUploadOutline size={24} />
          Upload  Documents
        </button>
        
      </Box>
   
    </div>
 
  )
}

export default Navbar