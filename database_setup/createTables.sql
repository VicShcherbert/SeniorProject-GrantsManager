CREATE TABLE Proposals (
	unique_id int,
	proposal_number varchar(50),
    pre_proposal boolean,
	pre_proposal_number int, 
	title varchar(100), 
	agency varchar(100), 
	funding_type varchar(50), 
	cfda_number double, 
	investigator varchar(100), 
	extension bigint, 
	email varchar(100), 
	department_number int, 
	department_name varchar(100), 
	unit varchar(100), 
    category tinytext,
	amount_requested double,
    date_submitted date, 
    pre_award_poc tinytext,
    internal_approval tinytext,
    certification_assurance tinytext,
    financial_interest tinytext,
    notes longtext, 
	pre_award_status tinytext, 
	date_of_notice date, 
    amount_funded double, 
	project_start date, 
	project_end date, 
    grant_type tinytext,
    contract_number tinytext,
    indirect_cost double,
    sponsor_id varchar(100),
    index_number bigint,
    entered_sharepoint tinytext,
    post_award_poc tinytext,
    irb_approval tinytext,
    iacuc_approval tinytext,
    ibc_approval tinytext,
    student_rcr tinytext,
    rcr_notes longtext,
    subawards tinytext,
    subawardees mediumtext,
    subaward_contract_number mediumtext,
    subaward_notes longtext,
	files_id int
);

CREATE TABLE Departments (
  id varchar(15) DEFAULT NULL,
  name varchar(50) DEFAULT NULL,
  unique_id int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (unique_id),
  UNIQUE KEY id_UNIQUE (id)
);

CREATE TABLE Post_Award_Poc (
  id tinyint NOT NULL AUTO_INCREMENT,
  name char(40) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY id_UNIQUE (id)
);

CREATE TABLE Pre_Award_Poc (
  id tinyint NOT NULL AUTO_INCREMENT,
  name char(40) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY id_UNIQUE (id)
);

CREATE TABLE Units (
  id int unsigned NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY id_UNIQUE (id),
  UNIQUE KEY name_UNIQUE (name)
);

CREATE TABLE Users (
  email varchar(100) DEFAULT NULL,
  name varchar(100) DEFAULT NULL,
  id tinyint DEFAULT NULL,
  unique_id int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (unique_id),
  UNIQUE KEY unique_id_UNIQUE (unique_id)
);