
import React, { useState } from 'react';
import { Button, Typography, Container, CircularProgress, Checkbox, FormControlLabel, TextField, IconButton } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { db, storage } from '../firebase/Firebase'; 
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { useUserStore } from '../Storage/useStore';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import CloseIcon from '@mui/icons-material/Close';
const UploadDocuments: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [downloadURL, setDownloadURL] = useState<string | null>(null);
  const [description,setDescription]=useState<string | null>(null);
  const [selected, setSelected] = useState<'public'| 'private'>('public');
  const author = useUserStore((state) => state.author);

  const onDrop = (acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 
      'application/pdf': [], 
      'image/jpeg': [],      
      'image/png': [],       
      'image/gif': [],       
    } 
  });

  const handleChange = (event) => {
    setSelected(event.target.value);
  };


  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    const storageRef = ref(storage, `documents/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error('Upload failed:', error);
        setUploading(false);
      },
      async () => {
        const url = await getDownloadURL(storageRef);
        setDownloadURL(url);
        setUploading(false);

        try {
          await addDoc(collection(db, 'documents'), {
            name: file.name,
            url: url,
            author: author,
            type: file.type,
            createdAt: serverTimestamp(),
            Visibility: selected,
            description: description
          });
          console.log('Document metadata saved successfully');
          setDescription('');
          setFile(null); 
        } catch (e) {
          console.error('Error adding document metadata: ', e);
        }
      }
    );
  };
 function handleDelete(){
  setFile(null)
 }
  return (
    <Container 
      maxWidth="md" 
      sx={{ 
        mt: 4, 
        backgroundColor: '#1b1a1a', 
        padding: '40px',    
        borderRadius: '8px', 
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.9)',
        color: '#fff'
      }}
    >
     
      <div 
        {...getRootProps()} 
        className="border-2 border-dashed border-gray-300 p-5 rounded-lg text-center min-h-[150px] h-[30vh] max-h-[400px] flex flex-col justify-center items-center cursor-pointer hover:border-gray-500 transition-all"
        style={{ backgroundColor: '#2c2c2c', color: '#ccc' }}
      >
        <input {...getInputProps()} />
        <Typography variant="h5" component="p">
          Drag & drop your file here, or click to select one
        </Typography>
        {file && (
          <div>
            <Typography 
            variant="body2" 
            component="p" 
            sx={{ mt: 2, color: '#fff' }}
          >
            Selected file: {file.name}
          </Typography>
           <IconButton 
           aria-label="delete" 
           onClick={handleDelete} 
           sx={{ color: '#fff', marginLeft: '10px' }}
         >
           <CloseIcon />
         </IconButton>
          </div>
          
        )}
      </div>
      <div className="mt-8">
        <TextField
          label="Add a Description(optional)"
          variant="outlined"
          fullWidth
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
          sx={{ 
            margin: '40px 0', 
            backgroundColor: '#2c2c2c', 
            borderRadius: '4px', 
            input: { color: '#fff' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#555',
              },
              '&:hover fieldset': {
                borderColor: '#aaa',
              },
            },
            label: { color: '#aaa' }
          }}
        />
        <Typography variant="h6" component="h6" gutterBottom>
          Visibility
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={selected === 'public'}
              onChange={handleChange}
              value="public"
              sx={{ color: '#fff' }}
            />
          }
          label="Public"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={selected === 'private'}
              onChange={handleChange}
              value="private"
              sx={{ color: '#fff' }}
            />
          }
          label="Private"
        />
      </div>
      {uploading && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <CircularProgress variant="determinate" value={uploadProgress} sx={{ color: '#fff' }} />
          <Typography variant="body1" sx={{ color: '#fff' }}>Uploading: {Math.round(uploadProgress)}%</Typography>
        </div>
      )}
      {!uploading && file && (
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleUpload} 
          sx={{ mt: 2, backgroundColor: '#50c647', '&:hover': { backgroundColor: '#577d77' } }}
        >
          Upload
        </Button>
      )}
      {downloadURL && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Typography variant="body1" sx={{ color: '#fff' }}>
            File uploaded successfully!
          </Typography>
          <a href={downloadURL} target="_blank" rel="noopener noreferrer" style={{ color: '#80cbc4' }}>
            View Document
          </a>
        </div>
      )}
    </Container>
  );
};

export default UploadDocuments;

