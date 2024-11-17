const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, '../system-shoes-react/public')));
const routes = require('../routes/routes');

app.use(cors());
app.use(express.json());
app.use('/', routes);
app.use(cors({ origin: 'http://localhost:3000' }));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../system-shoes-react/public/index.html'));
});
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
