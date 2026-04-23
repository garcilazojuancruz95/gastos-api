const express = require('express');
const router = express.Router();
const db = require('../db/database');

function validarMovimiento(body) {
    const { nombre, monto, tipo } = body;
    const montoNumero = Number(monto);

    if (tipo !== 'ingreso' && tipo !== 'gasto') {
        return { error: 'El tipo debe ser ingreso o gasto' };
    }

    if (!nombre || typeof nombre !== 'string' || !nombre.trim()) {
        return { error: 'El nombre es obligatorio' };
    }

    if (monto === undefined || monto === null || Number.isNaN(montoNumero)) {
        return { error: 'El monto debe ser un numero' };
    }

    if (montoNumero <= 0) {
        return { error: 'El monto debe ser mayor a 0' };
    }

    return {
        data: {
            nombre: nombre.trim(),
            monto: montoNumero,
            tipo
        }
    };
}

// GET
router.get('/', (req, res) => {
    db.all('SELECT * FROM movimientos', [], (err, rows) => {
        if (err) return res.status(500).json(err);
        res.json(rows);
    });
});


// FILTRAR
router.get('/tipo/:tipo', (req, res) => {
    db.all(
        'SELECT * FROM movimientos WHERE tipo = ?',
        [req.params.tipo],
        (err, rows) => {
            if (err) return res.status(500).json(err);
            res.json(rows);
        }
    );
});

// BALANCE
router.get('/balance/total', (req, res) => {
    db.all(
        `SELECT tipo, SUM(monto) as total
        FROM movimientos
        GROUP BY tipo`,
        [],
        (err, rows) => {
            if (err) return res.status(500).json(err);

            let ingresos = 0;
            let gastos = 0;

            rows.forEach(r => {
                if (r.tipo === 'ingreso') ingresos = r.total;
                if (r.tipo === 'gasto') gastos = r.total;
            });

            res.json({
                ingresos,
                gastos,
                balance: ingresos - gastos
            });
        }
    );
});

// GET por ID
router.get('/:id', (req, res) => {
    db.get(
        'SELECT * FROM movimientos WHERE id = ?',
        [req.params.id],
        (err, row) => {
            if (err) return res.status(500).json(err);
            if (!row) return res.status(404).json({ error: 'Movimiento no encontrado' });


            res.json(row);
        }
    );
});

// POST
router.post('/', (req, res) => {
    const validacion = validarMovimiento(req.body);
    if (validacion.error) return res.status(400).json({ error: validacion.error });

    const { nombre, monto, tipo } = validacion.data;

    db.run(
        'INSERT INTO movimientos (nombre, monto, tipo) VALUES (?, ?, ?)',
        [nombre, monto, tipo],
        function (err) {
            if (err) return res.status(500).json(err);
            res.json({ id: this.lastID });
        }
    );
});

// DELETE 
router.delete('/:id', (req, res) => {
    db.run(
        'DELETE FROM movimientos WHERE id = ?',
        [req.params.id],
        function (err) {
            if (err) return res.status(500).json(err);
            if (this.changes === 0) {
                return res.status(404).json({ error: 'Movimiento no encontrado' });
            }
            res.json({ delete: this.changes });
        }
    );
});

// UPDATE
router.put('/:id', (req, res) => {
    const validacion = validarMovimiento(req.body);
    if (validacion.error) return res.status(400).json({ error: validacion.error });

    const { nombre, monto, tipo } = validacion.data;

    db.run(
        `UPDATE movimientos
        SET nombre = ?, monto = ?, tipo = ?
        WHERE id = ?`,
        [nombre, monto, tipo, req.params.id],
        function (err) {
            if (err) return res.status(500).json(err);
            if (this.changes === 0) {
                return res.status(404).json({ error: 'Movimiento no encontrado' });
            }
            res.json({ updated: this.changes });
        }
    );
});




module.exports = router;
