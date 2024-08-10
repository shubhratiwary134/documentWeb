import React from 'react';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/Firebase';

interface ChangeVisibilityButtonProps {
  documentId: string;
  currentVisibility: string;
  onChangeVisibility: (newVisibility: string) => void;
}

const ChangeVisibilityButton: React.FC<ChangeVisibilityButtonProps> = ({
  documentId,
  currentVisibility,
  onChangeVisibility,
}) => {
  const handleChangeVisibility = async () => {
    const newVisibility = currentVisibility === 'public' ? 'private' : 'public';

    try {
      await updateDoc(doc(db, 'documents', documentId), {
        Visibility: newVisibility,
      });

      // Callback to update state in parent component
      onChangeVisibility(newVisibility);
    } catch (error) {
      console.error('Error changing visibility: ', error);
    }
  };

  return (
    <IconButton onClick={handleChangeVisibility} color="primary">
      {currentVisibility === 'public' ? <VisibilityIcon /> : <VisibilityOffIcon />}
    </IconButton>
  );
};

export default ChangeVisibilityButton;
