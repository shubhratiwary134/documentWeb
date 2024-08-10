

import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase/Firebase';
import { Typography, List, ListItem, ListItemText, CircularProgress, Container } from '@mui/material';
import { useUserStore } from '../Storage/useStore';
import DeleteButton from '../Components/DeleteButton';
import ChangeVisibilityButton from '../Components/ChangeVisibility';

const MyDocuments: React.FC = () => {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const author = useUserStore((state) => state.author);

  useEffect(() => {
    const fetchDocuments = async () => {
      if (author) {
        setLoading(true);
        try {
          const q = query(collection(db, 'documents'), where('author', '==', author),orderBy('createdAt','desc'));
          const querySnapshot = await getDocs(q);
          const docsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setDocuments(docsData);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching documents: ', error);
          setLoading(false);
        }
      }
    };

    fetchDocuments();
  }, [author]); //  `author` as a dependency

  function handleDelete(id:string){
    setDocuments(documents.filter(doc=>doc.id!==id))
  }
 
  const handleChangeVisibility = (id: string, newVisibility: string) => {
    setDocuments(
      documents.map(doc => (doc.id === id ? { ...doc, visibility: newVisibility } : doc))
    );
  }
  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>Loading documents...</Typography>
      </Container>
    );
  }

  if (documents.length === 0) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h6">No documents found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
     
      <List>
        {documents.map((doc) => (
          <ListItem key={doc.id} sx={{ mb: 2 }}>
            <div className='w-full'>
              <div className='w-full flex justify-between'>
              <div>
              <ListItemText
                primary={doc.name}
                secondary={`Uploaded by: ${doc.author} on ${new Date(doc.createdAt.seconds * 1000).toLocaleDateString()}`}
              />
              <ListItemText
              primary={doc.description}

              />
                <DeleteButton
               documentId={doc.id}
                fileUrl={doc.url}
                 onDelete={()=>handleDelete(doc.id)}
                 />
                 <div className='flex gap-10 items-center'>
                 <div>
                  {doc.Visibility}
                 </div>
              <ChangeVisibilityButton
                  documentId={doc.id}
                  currentVisibility={doc.visibility}
                  onChangeVisibility={(newVisibility) => handleChangeVisibility(doc.id, newVisibility)}
                />
                 </div>
              </div>
              <div>
              {doc.type.startsWith('image/') && (
                <img src={doc.url} alt={doc.name} style={{ maxWidth: '500px', maxHeight: '500px', marginTop: '10px' }} />
              )}
              {doc.type === 'application/pdf' && (
                <iframe
                  src={doc.url}
                  title={doc.name}
                  style={{ width: '500px', height: '500px', marginTop: '10px' }}
                ></iframe>
              )}
              <a href={doc.url} target="_blank" rel="noopener noreferrer" style={{ display: 'block', marginTop: '10px' }}>
                View Document
              </a>
              </div>
            
              </div>
             
           
            
              
            </div>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default MyDocuments;
