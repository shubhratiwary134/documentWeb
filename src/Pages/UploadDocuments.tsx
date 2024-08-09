

import React, { useState } from 'react';
import { Button, Typography, Container,  CircularProgress } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { db, storage } from '../firebase/Firebase'; 
import { ref, getDownloadURL,uploadBytesResumable } from 'firebase/storage';
import { useUserStore } from '../Storage/useStore';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import SetUser from '../Storage/useStore';
const UploadDocuments: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [downloadURL, setDownloadURL] = useState<string | null>(null);
  const author = useUserStore((state)=>state.author)

  const onDrop = (acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {  'application/pdf': [], // PDF files
        'image/jpeg': [],      // JPEG images
        'image/png': [],       // PNG images
        'image/gif': [],       // GIF images
         } 
  });

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    const storageRef = ref(storage, `documents/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Progress can be used to show a progress bar
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
            });
            console.log('Document metadata saved successfully');
          } catch (e) {
            console.error('Error adding document metadata: ', e);
          }
      }
    );
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
        <SetUser/>
      <Typography variant="h4" component="h1" gutterBottom>
        Upload  Document
      </Typography>
      <div {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '20px', borderRadius: '4px', textAlign: 'center' }}>
        <input {...getInputProps()} />
        <Typography variant="body1" component="p">
          Drag & drop your file here, or click to select one
        </Typography>
        {file && <Typography variant="body2" component="p">Selected file: {file.name}</Typography>}
      </div>
      {uploading && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <CircularProgress variant="determinate" value={uploadProgress} />
          <Typography variant="body1">Uploading: {Math.round(uploadProgress)}%</Typography>
        </div>
      )}
      {!uploading && file && (
        <Button variant="contained" color="primary" onClick={handleUpload} sx={{ mt: 2 }}>
          Upload
        </Button>
      )}
      {downloadURL && (
        <div style={{ marginTop: '20px' }}>
          <Typography variant="body1">File uploaded successfully!</Typography>
          <a href={downloadURL} target="_blank" rel="noopener noreferrer">View Document</a>
        </div>
      )}
    </Container>
  );
};

export default UploadDocuments; 

