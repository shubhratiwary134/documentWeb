
import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, limit, startAfter, endBefore, orderBy, limitToLast } from 'firebase/firestore';
import { db } from '../firebase/Firebase';
import { Typography, CircularProgress, Container, Button, Box, Grid, Paper } from '@mui/material';
import SearchBar from './SearchBar';

const PAGE_SIZE = 4; 

const DocumentList: React.FC = () => {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [lastVisible, setLastVisible] = useState<any>(null); // State to track the last fetched document
  const [firstVisible, setFirstVisible] = useState<any>(null); // State to track the first document of the current page
  const [isLastPage, setIsLastPage] = useState<boolean>(false); // State to check if it's the last page
  const [isFirstPage, setIsFirstPage] = useState<boolean>(true); // State to check if it's the first page

  const fetchDocuments = async (direction: 'next' | 'previous' | 'initial') => {
    setLoading(true);
    try {
      let documentQuery;
      
      if (direction === 'next' && lastVisible) {
        documentQuery = query(
          collection(db, 'documents'),
          where('Visibility', '==', 'public'),
          orderBy('createdAt', 'desc'),
          startAfter(lastVisible),
          limit(PAGE_SIZE)
        );
      } else if (direction === 'previous' && firstVisible) {
        documentQuery = query(
          collection(db, 'documents'),
          where('Visibility', '==', 'public'),
          orderBy('createdAt', 'desc'),
          endBefore(firstVisible),
          limitToLast(PAGE_SIZE)
        );
      } else {
        // Initial query
        documentQuery = query(
          collection(db, 'documents'),
          where('Visibility', '==', 'public'),
          orderBy('createdAt', 'desc'),
          limit(PAGE_SIZE)
        );
      }
  
      const querySnapshot = await getDocs(documentQuery);
      const docsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
      setDocuments(docsData);
      setFirstVisible(querySnapshot.docs[0] || null); // Set to the first document of the current page
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1] || null); // Set to the last document of the current page
  
      setIsFirstPage(direction === 'initial' || (direction === 'previous' && querySnapshot.docs.length < PAGE_SIZE));
      setIsLastPage(docsData.length < PAGE_SIZE);
      
      if (direction === 'next' || direction === 'previous') {
        setIsFirstPage(querySnapshot.docs.length > 0 && docsData.length < PAGE_SIZE && direction === 'previous');
      }
  
      setLoading(false);
    } catch (error) {
      console.error('Error fetching documents: ', error);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchDocuments('initial'); // Initial fetch
  }, []);
  

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNextPage = () => {
    fetchDocuments('next');
  };

  const handlePreviousPage = () => {
    fetchDocuments('previous');
  };

  if (loading && documents.length === 0) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>Loading documents...</Typography>
      </Container>
    );
  }

  if (filteredDocuments.length === 0 && !loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        <Typography variant="h6" sx={{ color: 'text.secondary', mt: 2 }}>No documents found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, backgroundColor: '#2b2a2a', padding: { xs: '20px', sm: '30px', md: '40px' }, borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {filteredDocuments.map((doc) => (
          <Grid item xs={12} sm={6}  key={doc.id}>
            <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#2b2a2a', borderRadius: '8px', color: 'text.primary' }}>
              <Typography variant="h6">{doc.name}</Typography>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                Uploaded by: {doc.author} on {new Date(doc.createdAt.seconds * 1000).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" sx={{ marginTop: 1 }}>{doc.description}</Typography>
              <Box sx={{ marginTop: 2 }}>
                {doc.type.startsWith('image/') && (
                  <img src={doc.url} alt={doc.name} style={{ width: '100%', maxHeight: '300px', objectFit: 'contain', borderRadius: '4px' }} />
                )}
                {doc.type === 'application/pdf' && (
                  <iframe
                    src={doc.url}
                    title={doc.name}
                    style={{ width: '100%', height: '300px', borderRadius: '4px' }}
                  ></iframe>
                )}
                <a href={doc.url} target="_blank" rel="noopener noreferrer" style={{ display: 'block', marginTop: '10px', color: '#07f412', textDecoration: 'none' }}>
                  View Document
                </a>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePreviousPage}
          disabled={isFirstPage || loading}
          sx={{ minWidth: '100px', mb: { xs: 2, sm: 0 } }}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNextPage}
          disabled={isLastPage || loading}
          sx={{ minWidth: '100px' }}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
};

export default DocumentList;


