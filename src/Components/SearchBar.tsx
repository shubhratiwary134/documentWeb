import React from 'react';
import { TextField } from '@mui/material';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <TextField
      label="Search Documents"
      variant="outlined"
      fullWidth
      value={searchTerm}
      onChange={onSearchChange}
      sx={{ mb: 4 }}
    />
  );
};

export default SearchBar;
