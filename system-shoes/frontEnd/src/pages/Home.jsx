import React from 'react';
import { AppBar, Toolbar, Typography, Grid, Card, CardMedia, CardContent, Button, Box } from '@mui/material';

const shoesData = [
  {
    id: 1,
    name: "Zapatilla Deportiva",
    price: "$50.00",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Zapato Casual",
    price: "$70.00",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Zapato de Vestir",
    price: "$90.00",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "Bota para Montaña",
    price: "$120.00",
    image: "https://via.placeholder.com/150",
  },
];

const Home = () => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Tienda de Zapatos
          </Typography>
          <Button color="inherit">Mi Cuenta</Button>
          <Button color="inherit">Carrito</Button>
          <Button color="inherit">Cerrar Sesión</Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ padding: 3, textAlign: 'center' }}>
        <Typography variant="h4">Bienvenido a la Tienda de Zapatos</Typography>
        <Typography variant="body1" sx={{ marginTop: 1 }}>
          Explora nuestra colección de zapatos y encuentra el par perfecto para ti.
        </Typography>
      </Box>
      <Grid container spacing={3} sx={{ padding: 3 }}>
        {shoesData.map((shoe) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={shoe.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={shoe.image}
                alt={shoe.name}
              />
              <CardContent>
                <Typography variant="h6">{shoe.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {shoe.price}
                </Typography>
              </CardContent>
              <Button variant="contained" color="primary" fullWidth>
                Agregar al Carrito
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
