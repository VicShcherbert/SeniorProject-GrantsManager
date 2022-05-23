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
  db.query('SELECT * FROM Proposals ORDER BY unique_id DESC;', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get('/unique_id', (req, res) => {
  db.query('SELECT MAX(unique_id) AS unique_id FROM Proposals;', (err, result) => {
    if (err) console.log(err);
    else res.send(result);
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


app.post('/add_proposal', (req, res) => {
  db.query(
    'INSERT INTO Proposals (unique_id, proposal_number, pre_proposal, pre_proposal_number, title, agency, funding_type, cfda_number, investigator, department_number, department_name, unit, category, amount_requested, date_submitted, pre_award_poc, internal_approval, certification_assurance, financial_interest, notes, pre_award_status, date_of_notice, amount_funded, project_start, project_end, grant_type, contract_number, indirect_cost, sponsor_id, index_number, entered_sharepoint, post_award_poc, irb_approval, iacuc_approval, ibc_approval, student_rcr, rcr_notes, subawards, subawardees, subaward_contract_number, subaward_notes, files_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
    [
      req.body.unique_id,
      req.body.prop_num,
      req.body.pre_prop,
      req.body.pre_prop_num,
      req.body.title,
      req.body.agency,
      req.body.fund_type,
      req.body.cfda,
      req.body.investigator,
      req.body.department_number,
      req.body.department_name,
      req.body.unit,
      req.body.category,
      req.body.amount_requested,
      req.body.date_submitted,
      req.body.pre_award_poc,
      req.body.internal_approval,
      req.body.certification_assurance,
      req.body.financial_interest,
      req.body.notes,
      req.body.pre_award_status,
      req.body.date_of_notice,
      req.body.amount_funded,
      req.body.project_start,
      req.body.project_end,
      req.body.grant_type,
      req.body.contract_number,
      req.body.indirect_cost,
      req.body.sponsor_id,
      req.body.index_number,
      req.body.entered_sharepoint,
      req.body.post_award_poc,
      req.body.irb,
      req.body.iacuc,
      req.body.ibc,
      req.body.rcr,
      req.body.student_rcr_notes,
      req.body.subawards,
      req.body.subawardees,
      req.body.subaward_contract_number,
      req.body.subaward_notes,
      req.files_id
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
    [req.body.id, req.body.name],
    (err, result) => {
      if (err) console.log(err);
    }
  );
});

app.put('/update', (req, res) => {
  db.query(
    'UPDATE Proposals SET proposal_number = ?, pre_proposal = ?, pre_proposal_number = ?, title = ?, agency = ?, funding_type = ?, ' +
    'cfda_number = ?, investigator = ?, department_number = ?, department_name = ?, unit = ?, category = ?, amount_requested = ?, date_submitted = ?, ' +
    'pre_award_poc = ?, internal_approval = ?, certification_assurance = ?, financial_interest = ?, notes = ?, pre_award_status = ?, date_of_notice = ?, ' +
    'amount_funded = ?, project_start = ?, project_end = ?, grant_type = ?, contract_number = ?, indirect_cost = ?, sponsor_id = ?, index_number = ?, ' +
    'entered_sharepoint = ?, post_award_poc = ?, irb_approval = ?, iacuc_approval = ?, ibc_approval = ?, student_rcr = ?, rcr_notes = ?, subawards = ?, ' +
    'subawardees = ?, subaward_contract_number = ?, subaward_notes = ?, files_id = ? WHERE unique_id = ?',
    [
      req.body.prop_num,
      req.body.pre_prop,
      req.body.pre_prop_num,
      req.body.title,
      req.body.agency,
      req.body.fund_type,
      req.body.cfda,
      req.body.investigator,
      req.body.department_number,
      req.body.department_name,
      req.body.unit,
      req.body.category,
      req.body.amount_requested,
      req.body.date_submitted,
      req.body.pre_award_poc,
      req.body.internal_approval,
      req.body.certification_assurance,
      req.body.financial_interest,
      req.body.notes,
      req.body.pre_award_status,
      req.body.date_of_notice,
      req.body.amount_funded,
      req.body.project_start,
      req.body.project_end,
      req.body.grant_type,
      req.body.contract_number,
      req.body.indirect_cost,
      req.body.sponsor_id,
      req.body.index_number,
      req.body.entered_sharepoint,
      req.body.post_award_poc,
      req.body.irb,
      req.body.iacuc,
      req.body.ibc,
      req.body.rcr,
      req.body.student_rcr_notes,
      req.body.subawards,
      req.body.subawardees,
      req.body.subaward_contract_number,
      req.body.subaward_notes,
      req.files_id,
      req.body.unique_id,
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

app.listen(3001, () => {
  console.log('yo What up on port 3001');
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
      `SELECT sum(amount_funded) AS total 
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

app.get('/get_past_amount_funded', (req, res) => {
  if (currentMonth > 7) {
    db.query(
      `SELECT sum(amount_funded) AS total 
              FROM Proposals 
              WHERE date_submitted<"${currentYear}-07-01" 
                AND date_submitted>"${currentYear - 1}-06-30" 
                AND (pre_award_status="Funded" 
                OR pre_award_status="Additional");`,
      (err, result) => {
        if (err) console.log(err);
        else res.send(result);
      }
    );
  } else {
    db.query(
      `SELECT sum(amount_funded) AS total 
              FROM Proposals 
              WHERE date_submitted<"${currentYear - 1}-07-01" 
                AND date_submitted>"${currentYear - 2}-06-30" 
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
              WHERE date_submitted>="${currentYear - 3}-07-01" 
                AND date_submitted<="${currentYear}-06-30"
                AND grant_type<>""
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
              WHERE date_submitted>="${currentYear}-07-01"
                AND grant_type<>""
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

// Reporting Queries
// currently static with the dates, change in future!!
app.get('/get_cpp', (req, res) => {
  db.query(
    `SELECT grant_type, proposal_number, title, agency, funding_type, investigator, department_name, amount_requested, date_submitted, pre_award_status, date_of_notice, amount_funded
    FROM Proposals
    WHERE date_of_notice>="2020-07-01" AND date_of_notice<= "2021-06-30" AND unit = "cpp"
    ORDER BY grant_type, proposal_number ASC, date_of_notice ASC;
    `, (err, result) => {
      if (err) console.log(err);
      else {
        res.send(result);
      }
    });
});
// Looking to use separate queries for each unit, we'll see
