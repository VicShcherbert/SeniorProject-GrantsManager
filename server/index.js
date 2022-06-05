/*
* Index.js is the standalone backend file for this application. It provides express server setup, sql database connection,
* and all sql queries carried out by the application.
*
* NOTE: After making changes to this file, it is required to restart the backend in order to see changes made.
*       This is done by typing 'node index.js' into the terminal window while in the 'server' directory.
*/

//Set up express server
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

//Connect to SQL db
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
    'INSERT INTO Proposals (unique_id, proposal_number, pre_proposal, pre_proposal_number, title, agency, funding_type, cfda_number, investigator, email, department_number, department_name, unit, category, amount_requested, date_submitted, pre_award_poc, internal_approval, certification_assurance, financial_interest, notes, pre_award_status, date_of_notice, amount_funded, project_start, project_end, grant_type, contract_number, indirect_cost, sponsor_id, index_number, entered_sharepoint, post_award_poc, irb_approval, iacuc_approval, ibc_approval, student_rcr, rcr_notes, subawards, subawardees, subaward_contract_number, subaward_notes, files_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
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
      req.body.email,
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
    'cfda_number = ?, investigator = ?, email = ?, department_number = ?, department_name = ?, unit = ?, category = ?, amount_requested = ?, date_submitted = ?, ' +
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
      req.body.email,
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

app.delete('/delete_proposal', (req,res) => {
  db.query('DELETE FROM Proposals WHERE unique_id = ' + req.body.unique_id, (err, result) =>{
    if(err) console.log(err);
    else res.send(result);
  });
});

app.get('/get_departments', (req, res) => {
  db.query('SELECT * FROM Departments ORDER BY id asc;', (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.get('/get_pre_award_POCs', (req, res) => {
  db.query('SELECT * FROM Pre_Award_Poc ORDER BY name asc;', (err, result) => {
    if(err) console.log(err);
    else res.send(result);
  });
});

app.get('/get_post_award_POCs', (req, res) => {
  db.query('SELECT * FROM Post_Award_Poc ORDER BY name asc;', (err, result) => {
    if(err) console.log(err);
    else res.send(result);
  });
});

app.put('/update_pre_award_poc', (req, res) => {
  db.query(
    'UPDATE Pre_Award_Poc SET name = ? WHERE id = ?',
    [
      req.body.name,
      req.body.id,
    ],
    (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    }
  );
});

app.put('/update_post_award_poc', (req, res) => {
  db.query(
    'UPDATE Post_Award_Poc SET name = ? WHERE id = ?',
    [
      req.body.name,
      req.body.id,
    ],
    (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    }
  );
});

app.put('/update_unit', (req, res) => {
  db.query(
    'UPDATE Units SET name = ? WHERE id = ?',
    [
      req.body.name,
      req.body.id,
    ],
    (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    }
  );
});

app.delete('/delete_pre_award_poc', (req,res) => {
  db.query('DELETE FROM Pre_Award_Poc WHERE id = ' + req.body.id, (err, result) =>{
    if(err) console.log(err);
    else res.send(result);
  });
});

app.delete('/delete_post_award_poc', (req,res) => {
  db.query('DELETE FROM Post_Award_Poc WHERE id = ' + req.body.id, (err, result) =>{
    if(err) console.log(err);
    else res.send(result);
  });
});

app.delete('/delete_unit', (req,res) => {
  db.query('DELETE FROM Units WHERE id = ' + req.body.id, (err, result) =>{
    if(err) console.log(err);
    else res.send(result);
  });
});

app.put('/update_department', (req, res) => {
  db.query(
    'UPDATE Departments SET name = ?, id = ? WHERE unique_id = ?',
    [
      req.body.name,
      req.body.id,
      req.body.unique_id
    ],
    (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    }
  );
});

app.delete('/delete_department', (req,res) => {
  db.query('DELETE FROM Departments WHERE unique_id = ' + req.body.unique_id, (err, result) =>{
    if(err) console.log(err);
    else res.send(result);
  });
});

app.put('/update_user', (req, res) => {
  db.query(
    'UPDATE Users SET name = ?, email = ?, id = ? WHERE unique_id = ?',
    [
      req.body.name,
      req.body.email,
      req.body.id,
      req.body.unique_id
    ],
    (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    }
  );
});

app.delete('/delete_user', (req,res) => {
  db.query('DELETE FROM Users WHERE unique_id = ' + req.body.unique_id, (err, result) =>{
    if(err) console.log(err);
    else res.send(result);
  });
});

app.get('/get_units', (req, res) => {
  db.query('SELECT * FROM Units ORDER BY id asc;', (err, result) => {
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

app.post('/add_unit', (req, res) => {
  const name = req.body.name;
  db.query(
    'INSERT INTO Units (name) VALUES (?);',
    [name],
    (err, result) => {
      if (err) console.log(err);
    }
  );
});

// Reporting Queries
// currently static with the dates, change in future!!
// per Kristyl's request, we have to be dynamic because "Unit" is likely to change at anytime in future. 
app.post('/get_report', (req, res) => {
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  db.query(
    `SELECT unit, grant_type, proposal_number, title, agency, funding_type, investigator, department_name, amount_requested, date_submitted, pre_award_status, date_of_notice, amount_funded
    FROM Proposals
    WHERE date_of_notice>= ? AND date_of_notice<= ? AND unit != '' AND grant_type != ''
    ORDER BY unit, grant_type, proposal_number ASC, date_of_notice ASC;
    `,[startDate, endDate], (err, result) => {
      if (err) console.log(err);
      else {
        res.send(result);
      }
    });
});

// Get number of awards given by unit
app.post('/get_units', (req, res) => {
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  db.query(
    `SELECT unit, COUNT(*) AS numawards
    FROM Proposals
    WHERE date_of_notice>= ? AND date_of_notice<= ? AND unit != '' AND grant_type != ''
    GROUP BY unit
    ORDER BY unit`,
    [startDate, endDate], (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    });
});

app.post('/get_unit_totals', (req, res) => {
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  db.query(
    `SELECT unit, SUM(amount_requested) AS req, SUM(amount_funded) AS funded
    FROM Proposals
    WHERE date_of_notice>= ? AND date_of_notice<= ? AND unit != '' AND grant_type != ''
    GROUP BY unit
    ORDER BY unit`, [startDate, endDate], (err, result) => {
      if(err) console.log(err);
      else res.send(result);
    });
});

app.post('/get_gt_totals', (req, res) => {
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  db.query(
    `SELECT unit, grant_type, SUM(amount_requested) AS req, SUM(amount_funded) AS funded
    FROM Proposals
    WHERE date_of_notice>= ? AND date_of_notice<= ? AND unit != '' AND grant_type != ''
    GROUP BY unit, grant_type
    ORDER BY unit, grant_type`, [startDate, endDate], (err, result) => {
      if(err) console.log(err);
      else res.send(result);
    });
});