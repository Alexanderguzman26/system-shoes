import React, { useState } from 'react';
import { TextField, Button, MenuItem, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    documentType: 'CC',
    documentNumber: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const validateInput = (field, value) => {
    let error = '';

    switch (field) {
      case 'fullName':
        if (value.length < 3) error = 'Nombre debe tener al menos 3 caracteres';
        break;
      case 'documentNumber':
        if (!/^\d+$/.test(value)) error = 'Número de documento debe ser numérico';
        break;
      case 'email':
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) error = 'Correo no válido';
        break;
      case 'phone':
        if (!/^\d{10}$/.test(value)) error = 'Teléfono debe tener 10 dígitos';
        break;
      case 'username':
        if (value.length < 3) error = 'Usuario debe tener al menos 3 caracteres';
        break;
      case 'password':
        if (value.length < 6) error = 'Contraseña debe tener al menos 6 caracteres';
        break;
      case 'confirmPassword':
        if (value !== formData.password) error = 'Las contraseñas no coinciden';
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
    return !error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (errors[name]) {
      validateInput(name, value);
    }
  };

  const handleBlur = ({ name, value }) => {
    validateInput(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = Object.keys(formData).every((field) => validateInput(field, formData[field]));

    if (!isValid) return;
    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Registro exitoso:', data);
        navigate('/');
      } else {
        console.error('Error en el registro:', data.message);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Formulario de Registro
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre Completo"
          name="fullName"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.fullName}
          helperText={errors.fullName}
          required
        />
        <TextField
          label="Tipo de Documento"
          name="documentType"
          select
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.documentType}
          onChange={handleChange}
          required
        >
          <MenuItem value="CC">Cédula de Ciudadanía</MenuItem>
          <MenuItem value="TI">Tarjeta de Identidad</MenuItem>
          <MenuItem value="CE">Cédula de Extranjería</MenuItem>
          <MenuItem value="PAS">Pasaporte</MenuItem>
        </TextField>
        <TextField
          label="Número de Documento"
          name="documentNumber"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.documentNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.documentNumber}
          helperText={errors.documentNumber}
          required
        />
        <TextField
          label="Correo Electrónico"
          name="email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.email}
          helperText={errors.email}
          required
        />
        <TextField
          label="Teléfono Celular"
          name="phone"
          type="tel"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.phone}
          helperText={errors.phone}
          required
        />
        <TextField
          label="Usuario"
          name="username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.username}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.username}
          helperText={errors.username}
          required
        />
        <TextField
          label="Contraseña"
          name="password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.password}
          helperText={errors.password}
          required
        />
        <TextField
          label="Confirmar Contraseña"
          name="confirmPassword"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Registrarse
        </Button>
      </form>
    </Box>
  );
};

export default Register;
