const express = require('express');
const app = express();

const movimientosRoutes = require('./routes/movimientos');

app.use(express.json());

// Usar rutas
app.use('/movimientos', movimientosRoutes);

app.listen(3000, () => {
    console.log('Servidor en http://localhost:3000');
});