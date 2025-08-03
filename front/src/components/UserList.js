// components/UserList.js
import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
} from '@mui/material';

const UserList = ({ users }) => {
  const [selectedStatuses, setSelectedStatuses] = useState([]);

  const handleStatusChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedStatuses(typeof value === 'string' ? value.split(',') : value);
  };

  const uniqueStatuses = Array.from(new Set(users.map((u) => u.status).filter(Boolean)));

  const filteredUsers = useMemo(() => {
    if (selectedStatuses.length === 0) return users;
    return users.filter((user) => selectedStatuses.includes(user.status));
  }, [users, selectedStatuses]);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        List Of Employees
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Status</InputLabel>
        <Select
          multiple
          value={selectedStatuses}
          onChange={handleStatusChange}
          renderValue={(selected) => selected.join(', ')}
        >
          {uniqueStatuses.map((status) => (
            <MenuItem key={status} value={status}>
              <Checkbox checked={selectedStatuses.includes(status)} />
              <ListItemText primary={status} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
                <TableRow
                key={user.username}
                sx={{
                    backgroundColor: user.status === 'On Vacation' ? '#f0f0f0' : 'inherit',
                }}
                >
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.status || 'unknown'}</TableCell>
                </TableRow>
            ))}
            </TableBody>

        </Table>
      </TableContainer>
    </div>
  );
};

export default UserList;
