// src/components/StatusSelector.js
import React, { useState } from 'react';
import { Button, MenuItem, Select, Typography } from '@mui/material';

const StatusSelector = ({ statuses = [], onSubmit, title = 'Update Status' }) => {
  const [selectedStatus, setSelectedStatus] = useState('');

  const handleSubmit = () => {
    if (selectedStatus && onSubmit) {
      onSubmit(selectedStatus);
    }
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <Select
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
        displayEmpty
        sx={{ marginRight: 2, minWidth: 200 }}
      >
        <MenuItem value="" disabled>Select a status</MenuItem>
        {statuses.map((status) => (
          <MenuItem key={status} value={status}>
            {status}
          </MenuItem>
        ))}
      </Select>
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={!selectedStatus}
      >
        Submit
      </Button>
    </div>
  );
};

export default StatusSelector;
