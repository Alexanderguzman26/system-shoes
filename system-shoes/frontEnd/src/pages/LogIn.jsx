import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/authContext/AuthContext';

export default function LogIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const validateInput = (input, field) => {
    const regex = /^[a-zA-Z0-9]{6,}$/;
    if (!regex.test(input)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: 'Debe tener al menos 6 caracteres alfanuméricos',
      }));
      return false;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInput(username, 'username') || !validateInput(password, 'password')) {
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Inicio de sesión exitoso:', data);
        // da acceso a las urls /register y /home
        login(); 
        navigate('/home');
      } else {
        console.error('Error en el inicio de sesión:', data.message);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Usuario"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={!!errors.username}
          helperText={errors.username}
          onBlur={() => validateInput(username, 'username')}
          required
        />
        <TextField
          label="Contraseña"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
          onBlur={() => validateInput(password, 'password')}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
      <Box sx={{ marginTop: 24 }}>
        ¿No tienes cuenta?{' '}
        <span
          onClick={() => navigate('/register')}
          style={{ color: 'blue', cursor: 'pointer', textDecoration: 'None' }}
        >
          Regístrate
        </span>
      </Box>
    </Box>
  );
};
