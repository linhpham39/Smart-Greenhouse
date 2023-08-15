const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const pool = require('./db');

app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
    pool.query('SELECT * FROM "parameters" order by time desc', (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result.rows[0]);
    }
    );
})

app.get('/history', (req, res) => {
    pool.query('SELECT * FROM "history" order by time desc', (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result.rows);
    }
    );
})

app.get('/devices', (req, res) => {
    pool.query('SELECT * FROM "devices" order by time desc', (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result.rows[0]);
    }
    );
})

app.post('/', (req, res) => {
    pool.query('INSERT INTO parameters (temperature, pH, ec, humidity, time) values($1, $2, $3, $4, $5)', [req.body.temperature, req.body.humidity, req.body.ph, req.body.ec, req.body.time], (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result.rows);
    }
    );
})

app.post('/devices', (req, res) => {
    pool.query('INSERT INTO devices (light, fan, water_pump, time) values($1, $2, $3, $4)', [req.body.light, req.body.fan, req.body.water_pump, req.body.time], (err, result) => {
        if (err) {
            throw err;
        }
        console.log(req.body);
        res.send(result.rows);
    }
    );
})



app.listen(3000, () => console.log(`Listening on http://localhost:${port}`));