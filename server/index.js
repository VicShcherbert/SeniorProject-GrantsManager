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

app.post('/addProposal', (req, res) => {
    const prop_num = req.body.prop_num
    const pre_prop_num = req.body.pre_prop_num
    const title = req.body.title
    const agency = req.body.agency
    const fund_type = req.body.fund_type
    const cfda = req.body.cfda
    const investigator = req.body.investigator
    const extension = req.body.extension
    const email = req.body.email
    const department_number = req.body.department_number
    const department_name = req.body.department_name
    const unit = req.body.unit
    const amount_requested = req.body.amount_requested
    const pre_award_status = req.body.pre_award_status
    const date_submitted = req.body.date_submitted
    const date_of_notice = req.body.date_of_notice
    const project_start = req.body.project_start
    const project_end = req.body.project_end
    const human_compliance = req.body.human_compliance
    const animal_compliace = req.body.animal_compliace
    const recombinant_dna = req.body.recombinant_dna
    const subcontractors = req.body.subcontractors
    const index_number = req.body.index_number
    const amount_funded = req.body.amount_funded
    const grant_type = req.body.grant_type
    const category = req.body.category
    const sponsor_id = req.body.sponsor_id
    const pre_award_poc = req.body.pre_award_poc
    const post_award_poc = req.body.post_award_poc
    const contract_number = req.body.contract_number
    const indirect_cost = req.body.indirect_cost
    const internal_approval = req.body.internal_approval
    const certification_assurance = req.body.certification_assurance
    const financial_interest = req.body.financial_interest
    const rcr = req.body.rcr
    const archive_location = req.body.archive_location
    const notes = req.body.notes
})

app.post('/add_department', (req, res) => {
    const name = req.body.name;
    const id = req.body.id;
    db.query('INSERT INTO Departments (id, name) VALUES (?, ?);', [id, name], (err, result) => {
        if(err) console.log(err);
    });
});

app.get('/get_departments', (req, res) => {
    db.query("SELECT * FROM Departments;", (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    });
});

app.listen(3001, ()=> {
    console.log("yo What up on port 3001");
})