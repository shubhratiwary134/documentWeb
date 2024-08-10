

import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, limit, startAfter, endBefore, orderBy ,limitToLast} from 'firebase/firestore';
import { db } from '../firebase/Firebase';
import { Typography, List, ListItem, ListItemText, CircularProgress, Container, Button, Box } from '@mui/material';
import SearchBar from './SearchBar';

const PAGE_SIZE = 2; // Number of documents to fetch per page

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
          orderBy('createdAt','desc'),
          startAfter(lastVisible),
          limit(PAGE_SIZE)
        );
      } else if (direction === 'previous' && firstVisible) {
        documentQuery = query(
          collection(db, 'documents'),
          where('Visibility', '==', 'public'),
          orderBy('createdAt','desc'),
          endBefore(firstVisible),
          limitToLast(PAGE_SIZE)
        );
      } else {
        // Fall back to initial query if direction is 'initial' or if the boundaries are null
        documentQuery = query(
          collection(db, 'documents'),
          where('Visibility', '==', 'public'),
          orderBy('createdAt','desc'),
          limit(PAGE_SIZE)
        );
      }
  
      const querySnapshot = await getDocs(documentQuery);
      const docsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
      setDocuments(docsData);
      setFirstVisible(querySnapshot.docs[0]);
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      setIsFirstPage(direction === 'initial' || !querySnapshot.docs[0]);  // Handle case where no documents are returned
      setIsLastPage(docsData.length < PAGE_SIZE);
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePreviousPage}
          disabled={isFirstPage || loading}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNextPage}
          disabled={isLastPage || loading}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
};

export default DocumentList;


