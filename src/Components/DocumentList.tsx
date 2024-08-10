
import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/Firebase';
import { Typography, List, ListItem, ListItemText, CircularProgress, Container } from '@mui/material';
import SearchBar from './SearchBar';

const DocumentList: React.FC = () => {
  const [documents, setDocuments] = useState<any[]>([]);// state for storing the documents 
  const [loading, setLoading] = useState<boolean>(true);// Loading state
  const [searchTerm, setSearchTerm] = useState<string>(''); // State for search term

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const q = query(collection(db, 'documents'), where('Visibility', '==', 'public'));
        const querySnapshot = await getDocs(q);
        const docsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDocuments(docsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching documents: ', error);
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>Loading documents...</Typography>
      </Container>
    );
  }

  if (filteredDocuments.length === 0) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h6">No documents found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <List>
        {filteredDocuments.map((doc) => (
          <ListItem key={doc.id} sx={{ mb: 2 }}>
            <div>
              <ListItemText
                primary={doc.name}
                secondary={`Uploaded by: ${doc.author} on ${new Date(doc.createdAt.seconds * 1000).toLocaleDateString()}`}
              />
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
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default DocumentList;
