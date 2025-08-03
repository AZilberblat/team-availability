import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import UserList from '../components/UserList';
import StatusSelector from '../components/StatusSelector';
import { getUsers, updateUserStatus } from '../services/UserService';
import { getUsername } from '../utils/auth';

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const username = getUsername();

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      await updateUserStatus(username, newStatus);
      loadUsers();
    } catch (err) {
      console.error('Status update error:', err.message);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Hello! {username}
      </Typography>

      <StatusSelector
        statuses={[
          'Working',
          'Working Remotely',
          'On Vacation',
          'Business Trip',
        ]}
        onSubmit={handleStatusUpdate}
      />

      {error && <Typography color="error">{error}</Typography>}
      <UserList users={users} />
    </Container>
  );
};

export default HomePage;
