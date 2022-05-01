//Set up express server

const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: 'admin',
  host: 'test-app-db-instance.cbjxu2novkb7.us-west-2.rds.amazonaws.com',
  password: 'AQP1786s4!',
  database: 'sys',
});

app.get('/proposals', (req, res) => {
  db.query('SELECT * FROM Proposals', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post('/search', (req, res) => {
  const proposal_number = req.body.proposal_number;
  const title = req.body.title;
  const department_number = req.body.department_number;
  const department_name = req.body.department_name;
  const investigator = req.body.investigator;

  var sqlQuery = 'SELECT * FROM Proposals WHERE ';

  if(proposal_number !== '')
  {
    sqlQuery += 'proposal_number = ' + proposal_number;
  }
  if(title !== '')
  {
    sqlQuery += ' OR title = ' + title;
  }
  if(department_number !== null && department_number !== 0)
  {
    sqlQuery += ' OR department_number = ' + department_number;
  }
  if(department_name !== '')
  {
    sqlQuery += ' OR department_name = ' + department_name;
  }
  if(investigator !== '')
  {
    sqlQuery += ' OR investigator = ' + investigator;
  }
console.log(req.body);
    db.query(sqlQuery, (err, result) => {
    if (err) console.log("Query failed. Query is: " + sqlQuery);
    
    // else console.log("We made it");
    else res.send(result);
  })
});


app.post('/addProposal', (req, res) => {
  const proposal_number = req.body.prop_num;
  const pre_proposal_number = req.body.pre_prop_num;
  const title = req.body.title;
  const agency = req.body.agency;
  const funding_type = req.body.fund_type;
  const cfda_number = req.body.cfda;
  const investigator = req.body.investigator;
  const extension = req.body.extension;
  const email = req.body.email;
  const department_number = req.body.department_number;
  const department_name = req.body.department_name;
  const unit = req.body.unit;
  const amount_reqested = req.body.amount_requested;
  const pre_award_status = req.body.pre_award_status;
  const date_submitted = req.body.date_submitted;
  const date_of_notice = req.body.date_of_notice;
  const project_start = req.body.project_start;
  const project_end = req.body.project_end;
  const human_compliance = req.body.human_compliance;
  const animal_compliance = req.body.animal_compliace;
  const recombinant_dna = req.body.recombinant_dna;
  const subcontractors = req.body.subcontractors;
  const index_number = req.body.index_number;
  const amount_funded = req.body.amount_funded;
  const grant_type = req.body.grant_type;
  const category = req.body.category;
  const pre_award_poc = req.body.pre_award_poc;
  const post_award_poc = req.body.post_award_poc;
  const contract_number = req.body.contract_number;
  const indirect_cost = req.body.indirect_cost;
  const internal_approval = req.body.internal_approval;
  const certification_assurance = req.body.certification_assurance;
  const financial_interest = req.body.financial_interest;
  const rcr = req.body.rcr;
  const archive_location = req.body.archive_location;
  const notes = req.body.notes;

  db.query(
    'INSERT INTO Proposals (proposal_number, pre_proposal_number, title, agency, funding_type, cfda_number, investigator, extension, email, department_number, department_name, unit, amount_reqested, pre_award_status, date_submitted, date_of_notice, project_start, project_end, human_compliance, animal_compliance, recombinant_dna, subcontractors, index_number, amount_funded, grant_type, category, pre_award_poc, post_award_poc, contract_number, indirect_cost, internal_approval, certification_assurance, financial_interest, archive_location, rcr, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
    [
      proposal_number,
      pre_proposal_number,
      title,
      agency,
      funding_type,
      cfda_number,
      investigator,
      extension,
      email,
      department_number,
      department_name,
      unit,
      amount_reqested,
      pre_award_status,
      date_submitted,
      date_of_notice,
      project_start,
      project_end,
      human_compliance,
      animal_compliance,
      recombinant_dna,
      subcontractors,
      index_number,
      amount_funded,
      grant_type,
      category,
      pre_award_poc,
      post_award_poc,
      contract_number,
      indirect_cost,
      internal_approval,
      certification_assurance,
      financial_interest,
      archive_location,
      rcr,
      notes,
    ],
    (err, result) => {
      console.log('Made it');
      if (err) console.log(err);
    }
  );
});

app.post('/add_department', (req, res) => {
  const name = req.body.name;
  const id = req.body.id;
  db.query(
    'INSERT INTO Departments (id, name) VALUES (?, ?);',
    [id, name],
    (err, result) => {
      if (err) console.log(err);
    }
  );
});

app.get('/get_departments', (req, res) => {
  db.query('SELECT * FROM Departments;', (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.listen(3001, () => {
  console.log('yo What up on port 3001');
});

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

app.get('/get_proposal_quantity', (req, res) => {
  if(currentMonth < 7){
    db.query(`SELECT count(*) AS count FROM Proposals WHERE date_submitted>="${currentYear - 1}-07-01" AND date_submitted<="${currentYear}-06-30";`, (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    });
  }
  else{
    db.query(`SELECT count(*) AS count FROM Proposals WHERE date_submitted>="${currentYear}-07-01";`, (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    });
  }
});

app.get('/get_amount_funded', (req, res) => {
  if(currentMonth < 7){
    db.query(`SELECT sum(amount_funded) AS total 
              FROM Proposals 
              WHERE date_submitted>="${currentYear - 1}-07-01" 
                AND date_submitted<="${currentYear}-06-30" 
                AND (pre_award_status="Funded" 
                OR pre_award_status="Additional");`, (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    });
  }
  else{
    db.query(`SELECT count(amount_funded) AS total 
              FROM Proposals 
              WHERE date_submitted>="${currentYear}-07-01" 
                AND (pre_award_status="Funded" 
                OR pre_award_status="Additional");`, (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    });
  }
});

app.get('/get_amount_funded_by_type', (req, res) => {
  if(currentMonth < 7){
    db.query(`SELECT grant_type, sum(amount_funded) AS sum
              FROM Proposals
              WHERE date_submitted>="2018-07-01" 
                AND date_submitted<="2022-06-30"
              GROUP BY grant_type;`, (err, result) => {
      if (err) console.log(err);
      else { 
        res.send(result);
      };
    });
  }
  else{
    db.query(`SELECT grant_type, sum(amount_funded) AS sum
              FROM Proposals
              WHERE date_submitted>="${currentYear - 1}-07-01" 
                AND date_submitted<="${currentYear}-06-30"
              GROUP BY grant_type;`, (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    });
  }
});


