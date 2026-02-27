import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from '../authSlice';
import { useState } from 'react';
import '../../../styles/dashboard.css';
import { CircularProgress } from '@mui/material';

export default function LoginPage() {
  const dispatch = useDispatch<any>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setloading] = useState(false);

  const handleSubmit = async () => {
    try {
      setloading(true);
      await dispatch(login({ email, password })).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  return (
    <Box className="login-container">
      <Paper className="login-card" elevation={0}>
        <Typography variant="h4" fontWeight={600} mb={1} sx={{ color: '#000' }}>
          Welcome Back 👋
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Please login to your account
        </Typography>

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            '& .MuiInputLabel-root': {
              color: '#6b7280', // gray label
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#1976d2', // blue when focused
            },
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#f9fafb',
              borderRadius: '10px',
              '& fieldset': {
                borderColor: '#d1d5db',
              },
              '&:hover fieldset': {
                borderColor: '#1976d2',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#1976d2',
              },
              '& input': {
                color: '#111827', // input text color
              },
            },
          }}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            '& .MuiInputLabel-root': {
              color: '#6b7280',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#1976d2',
            },
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#f9fafb',
              borderRadius: '10px',
              '& fieldset': {
                borderColor: '#d1d5db',
              },
              '&:hover fieldset': {
                borderColor: '#1976d2',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#1976d2',
              },
              '& input': {
                color: '#111827',
              },
            },
          }}
        />

        <Button
          fullWidth
          variant="contained"
          className="login-btn"
          onClick={handleSubmit}
          disabled={loading}
          sx={{
            position: 'relative',
            height: 48,
          }}
        >
          {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Login'}
        </Button>
      </Paper>
    </Box>
  );
}
