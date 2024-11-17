const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Importar rutas
const routes = require('./routes/routes');

app.use(express.json());
// Usar las rutas
app.use('/', routes);

// Ruta para el frontend de React (React en modo producción)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
