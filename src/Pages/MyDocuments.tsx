
import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase/Firebase';
import { Typography, List, ListItem, ListItemText, CircularProgress, Container, Box, Button } from '@mui/material';
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
          const q = query(collection(db, 'documents'), where('author', '==', author), orderBy('createdAt', 'desc'));
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
  }, [author]);

  function handleDelete(id: string) {
    setDocuments(documents.filter(doc => doc.id !== id));
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
        <Typography variant="h6" align="center">No documents found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <List>
        {documents.map((doc) => (
          <ListItem key={doc.id} sx={{ mb: 2, p: 2, borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, width: '100%' }}>
              <Box sx={{ flex: 1, pr: { xs: 0, sm: 2 }, mb: { xs: 2, sm: 0 } }}>
                <ListItemText
                  primary={doc.name}
                  secondary={`Uploaded by: ${doc.author} on ${new Date(doc.createdAt.seconds * 1000).toLocaleDateString()}`}
                />
                <ListItemText
                  primary={doc.description}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                  <DeleteButton
                    documentId={doc.id}
                    fileUrl={doc.url}
                    onDelete={() => handleDelete(doc.id)}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {doc.Visibility}
                    </Typography>
                    <ChangeVisibilityButton
                      documentId={doc.id}
                      currentVisibility={doc.visibility}
                      onChangeVisibility={(newVisibility) => handleChangeVisibility(doc.id, newVisibility)}
                    />
                  </Box>
                </Box>
              </Box>
              <Box sx={{ flexShrink: 0, textAlign: 'center' }}>
                {doc.type.startsWith('image/') && (
                  <img src={doc.url} alt={doc.name} style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '4px' }} />
                )}
                {doc.type === 'application/pdf' && (
                  <iframe
                    src={doc.url}
                    title={doc.name}
                    style={{ width: '100%', height: '300px', borderRadius: '4px' }}
                  ></iframe>
                )}
                <a href={doc.url} target="_blank" rel="noopener noreferrer" style={{ display: 'block', marginTop: '10px', color: '#3f51b5' }}>
                  View Document
                </a>
              </Box>
            </Box>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default MyDocuments;
