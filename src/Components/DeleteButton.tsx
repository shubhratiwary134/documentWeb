import React from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteDoc, doc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage } from '../firebase/Firebase';

interface DeleteButtonProps {
  documentId: string;
  fileUrl: string;
  onDelete: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ documentId, fileUrl, onDelete }) => {
  const handleDelete = async () => {
    try {
      // Deleting  the document from Firestore
      await deleteDoc(doc(db, 'documents', documentId));

      // Deleting the file from Firebase Storage
      const storageRef = ref(storage, fileUrl);
      await deleteObject(storageRef);

      // Callback to update state in parent component(used so that we dont need to pass the whole array)
      onDelete();
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  return (
    <IconButton onClick={handleDelete} color="secondary">
      <DeleteIcon />
    </IconButton>
  );
};

export default DeleteButton;
