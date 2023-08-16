const express = require('express');
const app = express();
const port = 3000;
// const cors = require('cors');
const con = require('./db');

app.use(express.json());
// app.use(cors());

con.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
})
app.get('/', (req, res) => {
    con.query('SELECT * FROM parameters order by time desc', (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result[0]);
    }
    );
})

app.get('/history', (req, res) => {
    con.query('SELECT * FROM history order by time desc', (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result.rows);
    }
    );
})

app.get('/devices', (req, res) => {
    con.query('SELECT * FROM devices order by time desc', (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result[0]);
    }
    );
})

app.post('/', (req, res) => {
    con.query('INSERT INTO parameters (temperature, pH, ec, humidity, time) values($1, $2, $3, $4, $5)', [req.body.temperature, req.body.humidity, req.body.ph, req.body.ec, req.body.time], (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result.rows);
    }
    );
})

app.post('/devices', (req, res) => {
    con.query('INSERT INTO devices (light, ec_pump, ph_pump, oxi_pump, time) values(?, ?, ?, ?, ?)', [req.body.light, req.body.ec_pump, req.body.ph_pump, req.body.oxi_pump,req.body.time], (err, result) => {
        if (err) {
            throw err;
        }
        console.log(req.body);
        res.send(result);
        console.log(result);
    }
    );
}) 



app.listen(3000, () => console.log(`Listening on http://localhost:${port}`));