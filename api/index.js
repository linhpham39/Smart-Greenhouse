const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const con = require('./db');
const fs = require('fs');

app.use(express.json());
app.use(cors());

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

app.get('/notifications', (req, res) => {
    con.query('SELECT * FROM notifications order by time desc', (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
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
app.get('/allDevices', (req, res) => {
    con.query('SELECT * FROM devices order by time desc', (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    }
    );
})

app.post('/devices', (req, res) => {
    //time in format: 2024-08-12 23:40:20
    var time = new Date().toISOString().slice(0, 19).replace('T', ' ');
    con.query('INSERT INTO devices (Light, EcPump, PhPump, OxygenPump, time) values(?, ?, ?, ?, ?)', [req.body.Light, req.body.EcPump, req.body.PhPump, req.body.OxygenPump,time], (err, result) => {
        if (err) {
            throw err;
        }
        console.log(req.body);
        res.send(result);
        console.log(result);
    }
    );
}) 

app.patch('/updateThresholds', (req, res) => {
    console.log(req.body);
    fs.writeFile('thresholds.json', JSON.stringify(req.body), (err) => {
        if (err) {
            console.log(err);
            throw err;
        }
        console.log('The file has been saved!');
    });
})
async function getThresholds() {
    return new Promise((resolve, reject) => {
        fs.readFile('thresholds.json', (err, data) => {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            resolve(JSON.parse(data));
        });
    });
}

app.post('/notifications', async (req, res) => {
    var message = req.body.message;
    var thresholds = await getThresholds();
    con.query('INSERT INTO notifications (message, time) values(?, ?)', [req.body.message, req.body.time], (err, result) => {
        if (err) {
            throw err;
        } 
        res.send(result.rows);
    }
    );
})


app.get('/getThresholds', async (req, res) => {
   try {
        var thresholds = await getThresholds();
        console.log(thresholds);
        res.send(thresholds);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})





app.listen(3000, () => console.log(`Listening on http://localhost:${port}`));