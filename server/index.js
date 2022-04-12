//Set up express server

const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'admin',
    host: 'test-app-db-instance.cbjxu2novkb7.us-west-2.rds.amazonaws.com',
    password: 'AQP1786s4!',
    database: 'sys'
})

app.get('/proposals', (req, res) => {
    db.query("SELECT * FROM Proposals", (err, result) => {
        if(err){
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.listen(3001, ()=> {
    console.log("yo What up on port 3001");
})