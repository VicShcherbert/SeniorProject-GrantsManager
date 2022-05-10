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

app.post('/google_login', (req, res) => {
  db.query(`SELECT * FROM Users WHERE email='${req.body.email}'`, (err, result) => {
    console.log(result);
    if(err){
      console.log(err);
    }
    else{
      if(result[0]){
        res.status(200)
        res.json({
          string: `Welcome ${result[0].name}!`,
          id: result[0].id
        });
      }else{
        res.status(204).json({
          error:'User is not approved. Contact admin to correct this.'
        });
      }
    }
  });
});

app.get('/proposals', (req, res) => {
  db.query('SELECT * FROM Proposals ORDER BY proposal_number ASC;', (err, result) => {
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

  //Search only proposal number
  if(proposal_number !== '')
  {
    sqlQuery += 'proposal_number = ' + proposal_number;
  }

  //Search title
  else if(title !== '')
  {
    sqlQuery += 'title LIKE \'%' + title + '%\'';
  }

  //Search department number, department name, and investigator
  else if(department_number !== null && department_number !== 0 && department_name !== '' && investigator !== '')
  {
    sqlQuery += 'department_number LIKE \'%' + department_number + '%\' AND department_name LIKE \'%' + department_name + '%\' AND investigator LIKE \'%' + investigator + '%\'';
  }

  //Search department number and department name
  else if(department_number !== null && department_number !== 0 && department_name !== '')
  {
    sqlQuery += 'department_number LIKE \'%' + department_number + '%\' AND department_name LIKE \'%' + department_name + '%\'';
  }

  //Seach department number and investigator
  else if(department_number !== null && department_number !== 0 && investigator !== '')
  {
    sqlQuery += 'department_number LIKE \'%' + department_number + '%\' AND investigator LIKE \'%' + investigator + '%\'';
  }

  //Search department name and investigator
  else if(department_name !== '' && investigator !== '')
  {
    sqlQuery += 'department_name  LIKE \'%' + department_name + '%\' AND investigator LIKE \'%' + investigator + '%\'';
  }

  //Search department number
  else if(department_number !== null && department_number !== 0)
  {
    sqlQuery += 'department_number LIKE \'%' + department_number + '%\'';
  }

  //Search department name
  else if(department_name !== '')
  {
    sqlQuery += 'department_name LIKE \'%' + department_name + '%\'';
  }
  
  //Search investigator
  else if(investigator !== '')
  {
    sqlQuery += 'investigator LIKE \'%' + investigator + '%\'';
  }

console.log(req.body);
    db.query(sqlQuery, (err, result) => {
    if (err) console.log("Query failed. Query is: " + sqlQuery);
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
  const animal_compliance = req.body.animal_compliance;
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

app.put('/update', (req, res) => {
  const proposal_number = req.body.proposal_number;
  const title = req.body.title;
  const agency = req.body.agency;
  const funding_type = req.body.funding_type;
  const cfda_number = req.body.cfda_number;
  const investigator = req.body.investigator;
  const extension = req.body.extension;
  const email = req.body.email;
  const department_number = req.body.department_number;
  const department_name = req.body.department_name;
  const unit = req.body.unit;
  const amount_reqested = req.body.amount_reqested; //MISSPELLED
  const pre_award_status = req.body.pre_award_status;
  const date_submitted = req.body.date_submitted;
  const date_of_notice = req.body.date_of_notice;
  const project_start = req.body.project_start;
  const project_end = req.body.project_end;
  const human_compliance = req.body.human_compliance;
  const animal_compliance = req.body.animal_compliance;
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
    'UPDATE Proposals SET title = ?, agency = ?,'+
    ' funding_type = ?, cfda_number = ?, investigator = ?, extension = ?, email = ?, department_number = ?, department_name = ?, '+
    ' unit = ?, amount_reqested = ?, pre_award_status = ?, date_submitted = ?, date_of_notice = ?, project_start = ?, project_end = ?, ' +
    ' human_compliance = ?, animal_compliance = ?, recombinant_dna = ?, subcontractors = ?, index_number = ?, amount_funded = ?, grant_type = ?,' +
    ' category = ?, pre_award_poc = ?, post_award_poc = ?, contract_number = ?, indirect_cost = ?,' +
    ' internal_approval = ?, certification_assurance = ?, financial_interest = ?, rcr = ?, archive_location = ?,' +
    ' notes = ? WHERE proposal_number = ?',
    [
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
      amount_reqested, //MISSPELLED
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
      rcr,
      archive_location,
      notes,
      proposal_number,
    ],
    (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    }
  );
});

app.get('/get_departments', (req, res) => {
  db.query('SELECT * FROM Departments;', (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.get('/get_pre_award_POCs', (req, res) => {
  db.query('SELECT * FROM Pre_Award_Poc;', (err, result) => {
    if(err) console.log(err);
    else res.send(result);
  });
});

app.get('/get_post_award_POCs', (req, res) => {
  db.query('SELECT * FROM Post_Award_Poc;', (err, result) => {
    if(err) console.log(err);
    else res.send(result);
  });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

app.get('/get_proposal_quantity', (req, res) => {
  if (currentMonth < 7) {
    db.query(
      `SELECT count(*) AS count FROM Proposals WHERE date_submitted>="${
        currentYear - 1
      }-07-01" AND date_submitted<="${currentYear}-06-30";`,
      (err, result) => {
        if (err) console.log(err);
        else res.send(result);
      }
    );
  } else {
    db.query(
      `SELECT count(*) AS count FROM Proposals WHERE date_submitted>="${currentYear}-07-01";`,
      (err, result) => {
        if (err) console.log(err);
        else res.send(result);
      }
    );
  }
});

app.get('/get_amount_funded', (req, res) => {
  if (currentMonth < 7) {
    db.query(
      `SELECT sum(amount_funded) AS total 
              FROM Proposals 
              WHERE date_submitted>="${currentYear - 1}-07-01" 
                AND date_submitted<="${currentYear}-06-30" 
                AND (pre_award_status="Funded" 
                OR pre_award_status="Additional");`,
      (err, result) => {
        if (err) console.log(err);
        else res.send(result);
      }
    );
  } else {
    db.query(
      `SELECT count(amount_funded) AS total 
              FROM Proposals 
              WHERE date_submitted>="${currentYear}-07-01" 
                AND (pre_award_status="Funded" 
                OR pre_award_status="Additional");`,
      (err, result) => {
        if (err) console.log(err);
        else res.send(result);
      }
    );
  }
});

app.get('/get_amount_funded_by_type', (req, res) => {
  if (currentMonth < 7) {
    db.query(
      `SELECT grant_type, sum(amount_funded) AS sum
              FROM Proposals
              WHERE date_submitted>="2018-07-01" 
                AND date_submitted<="2022-06-30"
              GROUP BY grant_type;`,
      (err, result) => {
        if (err) console.log(err);
        else {
          res.send(result);
        }
      }
    );
  } else {
    db.query(
      `SELECT grant_type, sum(amount_funded) AS sum
              FROM Proposals
              WHERE date_submitted>="${currentYear - 1}-07-01" 
                AND date_submitted<="${currentYear}-06-30"
              GROUP BY grant_type;`,
      (err, result) => {
        if (err) console.log(err);
        else res.send(result);
      }
    );
  }
});

app.post('/add_user', (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const id = req.body.id;
  db.query(
    'INSERT INTO Users (email, name, id) VALUES (?, ?, ?);',
    [email, name, id],
    (err, result) => {
      if (err) console.log(err);
    }
  );
});

app.get('/get_users', (req, res) => {
  db.query('SELECT * FROM Users;', (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.post('/add_pre_award_poc', (req, res) => {
  const name = req.body.name;
  db.query(
    'INSERT INTO Pre_Award_Poc (name) VALUES (?);',
    [name],
    (err, result) => {
      if (err) console.log(err);
    }
  );
});

app.post('/add_post_award_poc', (req, res) => {
  const name = req.body.name;
  db.query(
    'INSERT INTO Post_Award_Poc (name) VALUES (?);',
    [name],
    (err, result) => {
      if (err) console.log(err);
    }
  );
});