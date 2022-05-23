import React, { useState, useEffect } from 'react';
import Axios from 'axios'; //when adding something to the database
import {
  Button,
  Form,
  Header,
  Input,
  Dropdown,
  Divider,
  Segment,
  TextArea,
} from 'semantic-ui-react';
import '../../style.css';

export const AddProposal = () => {
  const [unique_id, setUniqueId] = useState(0);
  const [prop_num, setPropNum] = useState('');
  const [pre_prop, setPreProp] = useState(0);
  const [pre_prop_num, setPrePropNum] = useState(0);
  const [title, setTitle] = useState('');
  const [agency, setAgency] = useState('');
  const [fund_type, setFundingType] = useState('');
  const [cfda, setCFDANumber] = useState(0);
  const [investigator, setInvestigator] = useState('');
  const [extension, setExtension] = useState(0);
  const [email, setEmail] = useState('');
  const [department_number, setDeptNum] = useState(0);
  const [department_name, setDeptName] = useState('');
  const [departmentList, setDepartmentList] = useState([]);
  const [unit, setUnit] = useState('');
  const [category, setCategory] = useState('');
  const [amount_requested, setAmountRequested] = useState(0);
  const [date_submitted, setDateSubmitted] = useState('');
  const [preAwardPOCList, setPreAwardPOCList] = useState([]);
  const [pre_award_poc, setPreAwardPOC] = useState('');
  const [internal_approval, setInternalApproval] = useState('');
  const [certification_assurance, setCertificationAssurance] = useState('');
  const [financial_interest, setFinancialInterest] = useState('');
  const [notes, setNotes] = useState('');
  const [pre_award_status, setPreAwardStatus] = useState('');
  const [date_of_notice, setDateOfNotice] = useState('');
  const [amount_funded, setAmountFunded] = useState(0);
  const [project_start, setProjectStart] = useState('');
  const [project_end, setProjectEnd] = useState('');
  const [grant_type, setGrantType] = useState('');
  const [contract_number, setContractNumber] = useState(0);
  const [indirect_cost, setIndirectCost] = useState(0);
  const [sponsor_id, setSponsorId] = useState('');
  const [index_number, setIndexNumber] = useState(0);
  const [entered_sharepoint, setSharepoint] = useState('');
  const [postAwardPOCList, setPostAwardPOCList] = useState([]);
  const [post_award_poc, setPostAwardPOC] = useState('');
  const [irb, setIRB] = useState('');
  const [iacuc, setIACUC] = useState('');
  const [ibc, setIBC] = useState('');
  const [rcr, setRCR] = useState('');
  const [student_rcr_notes, setRCRNotes] = useState('');
  const [subawards, setSubawards] = useState('');
  const [subawardees, setSubawardees] = useState('');
  const [subaward_contract_number, setSubawardContractNumber] = useState('');
  const [subaward_notes, setSubawardNotes] = useState('');
  const [files_id, setFilesId] = useState(0);

  const departmentNames = departmentList.map((element) => ({
    key: element.id,
    value: element.name,
    text: element.name,
  }));

  //Here
  const preAwardPOCs = preAwardPOCList.map((element) => ({
    key: element.id,
    value: element.name,
    text: element.name,
  }));

  //Here
  const postAwardPOCs = postAwardPOCList.map((element) => ({
    key: element.id,
    value: element.name,
    text: element.name,
  }));

  const dealWithNameNum = (value) => {
    setDeptName(value);
    for (var i = 0; i < departmentNames.length; i++) {
      if (departmentNames[i].value === value)
        setDeptNum(departmentNames[i].key);
    }
  };

  const dealWithNameNumPreAwardPOC = (value) => {
    setPreAwardPOC(value);
    for (var i = 0; i < preAwardPOCs.length; i++) {
      if (preAwardPOCs[i].value === value)
        setPreAwardPOC(preAwardPOCs[i].key);
    }
  };

  const dealWithNameNumPostAwardPOC = (value) => {
    setPostAwardPOC(value);
    for (var i = 0; i < postAwardPOCs.length; i++) {
      if (postAwardPOCs[i].value === value)
        setPostAwardPOC(postAwardPOCs[i].key);
    }
  };

  useEffect(() => {
    Axios.get('http://localhost:3001/get_departments').then((response) => {
      setDepartmentList(response.data); //becasue response contains 'data'
    });
    Axios.get('http://localhost:3001/unique_id').then((response) => {
      setUniqueId(response.data[0].unique_id + 1); //set the unique id as one more than the last proposal in database
    });
  }, []);

  useEffect(() => {
    Axios.get('http://localhost:3001/get_pre_award_POCs').then((response) => {
      setPreAwardPOCList(response.data); //because response contains 'data'
    });
  }, []);

  useEffect(() => {
    Axios.get('http://localhost:3001/get_post_award_POCs').then((response) => {
      setPostAwardPOCList(response.data); //because response contains 'data'
    });
  }, []);

  const addProposal = () => {
    Axios.post('http://localhost:3001/add_proposal', {
      unique_id: unique_id,
      prop_num: prop_num, 
      pre_prop: pre_prop,
      pre_prop_num: pre_prop_num,
      title: title,
      agency: agency,
      fund_type: fund_type,
      cfda: cfda,
      investigator: investigator,
      extension: extension,
      email: email,
      department_number: department_number,
      department_name: department_name,
      unit: unit,
      category: category,
      amount_requested: amount_requested,
      date_submitted: date_submitted,
      pre_award_poc: pre_award_poc,
      internal_approval: internal_approval,
      certification_assurance: certification_assurance,
      financial_interest: financial_interest,
      notes: notes,
      pre_award_status: pre_award_status,
      date_of_notice: date_of_notice,
      amount_funded: amount_funded,
      project_start: project_start,
      project_end: project_end,
      grant_type: grant_type,
      contract_number: contract_number,
      indirect_cost: indirect_cost,
      sponsor_id: sponsor_id,
      index_number: index_number,
      entered_sharepoint: entered_sharepoint,
      post_award_poc: post_award_poc,
      irb: irb,
      iacuc: iacuc,
      ibc: ibc,
      rcr: rcr,
      student_rcr_notes: student_rcr_notes,
      subawards: subawards,
      subawardees: subawardees,
      subaward_contract_number: subaward_contract_number,
      subaward_notes: subaward_notes,
      files_id: files_id
    }).then(clearFields());
  };

  const clearFields = () => {
    setPropNum('');
    setPreProp(0);
    setPrePropNum(0);
    setTitle('');
    setAgency('');
    setFundingType('');
    setCFDANumber(0);
    setInvestigator('');
    setExtension(0);
    setEmail('');
    setDeptNum(0);
    setDeptName('');
    setDepartmentList([]);
    setUnit('');
    setCategory('');
    setAmountRequested(0);
    setDateSubmitted('');
    setPreAwardPOC('');
    setPreAwardPOCList([]);
    setInternalApproval('');
    setCertificationAssurance('');
    setFinancialInterest('');
    setNotes('');
    setPreAwardStatus('');
    setDateOfNotice('');
    setAmountFunded(0);
    setProjectStart('');
    setProjectEnd('');
    setGrantType('');
    setContractNumber(0);
    setIndirectCost(0);
    setSponsorId('');
    setIndexNumber(0);
    setSharepoint('');
    setPostAwardPOC('');
    setPostAwardPOCList([]);
    setIRB('');
    setIACUC('');
    setIBC('');
    setRCR('');
    setRCRNotes('');
    setSubawards('');
    setSubawardees('');
    setSubawardContractNumber('');
    setSubawardNotes('');
  };

  // const onFileChange = (event) => {
  //   setFile({ file: event.target.files[0] });
  // };

  // const onFileUpload = () => {
  //   const formData = new FormData();

  //   // Update the formData object
  //   formData.append('myFile', file, file.name);

  //   // Details of the uploaded file
  //   console.log(file);
  // };


  const awardAndContractSections = () => {
    if((pre_award_status.includes('Funded') || pre_award_status.includes('Additional')) && !pre_award_status.includes('Not')){
      return (
        <div>
          
          <Segment basic>
            <Divider horizontal>Award</Divider>
          </Segment>

          <Form.Field>
            <Header>Amount Funded</Header>
            <Input
              placeholder='Amount Funded'
              value={amount_funded}
              name='amount_funded'
              onChange={(_, { value }) => setAmountFunded(value)}
              type='number'
            />
          </Form.Field>

          <Form.Field>
            <Header>Project Start</Header>
            <Input
              placeholder='Project Start'
              value={project_start}
              name='project_start'
              type='date'
              onChange={(_, { value }) => setProjectStart(value)}
            />
          </Form.Field>

          <Form.Field>
            <Header>Project End</Header>
            <Input
              placeholder='Project End'
              value={project_end}
              name='project_end'
              type='date'
              onChange={(_, { value }) => setProjectEnd(value)}
            />
          </Form.Field>

          <Form.Field>
            <Header>Grant Type</Header>
            <Dropdown
              placeholder='Select Grant Type'
              value={grant_type}
              name='grant_type'
              onChange={(_, { value }) => setGrantType(value)}
              fluid
              selection
              options={[
                { 
                  key: 'none', 
                  value: '', 
                  text: 'None' },
                {
                  key: 'contract',
                  value: 'C - Contract',
                  text: 'C - Contract',
                },
                {
                  key: 'cooperative_agreement',
                  value: 'CA - Cooperative Agreement',
                  text: 'CA - Cooperative Agreement',
                },
                { 
                  key: 'grant', 
                  value: 'G - Grant', 
                  text: 'G - Grant' 
                },
                {
                  key: 'interagency_agreement',
                  value: 'IA - Interagency Agreement',
                  text: 'IA - Interagency Agreement',
                },
                {
                  key: 'memorandum_of_agreement',
                  value: 'MA - Memorandum of Agreement',
                  text: 'MA - Memorandum of Agreement',
                },
                {
                  key: 'purchase_order',
                  value: 'PO - Purchase Order',
                  text: 'PO - Purchase Order',
                },
                {
                  key: 'subcontract',
                  value: 'S - Subcontract',
                  text: 'S - Subcontract',
                }
              ]}
            />
          </Form.Field>

          <Form.Field>
            <Header>Contract Number</Header>
            <Input
              placeholder='Contract Number'
              value={contract_number}
              name='contract_number'
              onChange={(_, { value }) => setContractNumber(value)}
              type='text'
            />
          </Form.Field>

          <Form.Field>
            <Header>Indirect Cost</Header>
            <Input
              placeholder='Indirect Cost'
              value={indirect_cost}
              name='indirect_cost'
              onChange={(_, { value }) => setIndirectCost(value)}
              type='number'
            />
          </Form.Field>

          <Form.Field>
            <Header>Sponsor ID</Header>
            <Input
              placeholder='Sponsor ID'
              value={sponsor_id}
              name='sponsor_id'
              onChange={(_, { value }) => setSponsorId(value)}
              type='text'
            />
          </Form.Field>

          <Form.Field>
            <Header>Index Number</Header>
            <Input
              placeholder='Index Number'
              value={index_number}
              name='index_number'
              onChange={(_, { value }) => setIndexNumber(value)}
              type='number'
            />
          </Form.Field>

          <Form.Field>
            <Header>Entered in Contracts Sharepoint</Header>
            <Dropdown
              placeholder='Entered in Sharepoint'
              value={entered_sharepoint}
              name='entered_sharepoint'
              onChange={(_, { value }) => setSharepoint(value)}
              fluid
              selection
              options={[
                { 
                  key: 'none', 
                  value: '', 
                  text: 'None' },
                {
                  key: 'not yet',
                  value: 'Not Yet',
                  text: 'Not Yet',
                },
                {
                  key: 'uploaded',
                  value: 'Uploaded',
                  text: 'Uploaded',
                },
                {
                  key: 'n/a',
                  value: 'N/A',
                  text: 'N/A',
                },
              ]}
            />
          </Form.Field>
          
          <Form.Field>
          <Header>Post Award POC</Header>
          <Dropdown
            placeholder='Select Post Award POC'
            value={post_award_poc}
            name='post_award_poc'
            onChange={(_, { value }) => dealWithNameNumPostAwardPOC(value)}
            fluid
            selection
            options={postAwardPOCs}
          />
        </Form.Field>

          <Segment basic>
            <Divider horizontal>Compliance and Contracting</Divider>
          </Segment>
          
          <Form.Field>
            <Header>IRB Approval</Header>
            <Dropdown
              placeholder='IRB Approval'
              value={irb}
              name='irb'
              onChange={(_, { value }) => setIRB(value)}
              fluid
              selection
              options={[
                { 
                  key: 'none', 
                  value: '', 
                  text: 'None' 
                },
                {
                  key: 'need',
                  value: 'Need',
                  text: 'Need',
                },
                {
                  key: 'in_process',
                  value: 'In Process',
                  text: 'In Process',
                },
                {
                  key: 'complete',
                  value: 'Complete',
                  text: 'Complete',
                },
                {
                  key: 'n/a',
                  value: 'N/A',
                  text: 'N/A',
                },
              ]}
            />
          </Form.Field>
          
          <Form.Field>
            <Header>IACUC Approval</Header>
            <Dropdown
              placeholder='IACUC Approval'
              value={iacuc}
              name='iacuc'
              onChange={(_, { value }) => setIACUC(value)}
              fluid
              selection
              options={[
                { 
                  key: 'none', 
                  value: '', 
                  text: 'None' 
                },
                {
                  key: 'need',
                  value: 'Need',
                  text: 'Need',
                },
                {
                  key: 'in_process',
                  value: 'In Process',
                  text: 'In Process',
                },
                {
                  key: 'complete',
                  value: 'Complete',
                  text: 'Complete',
                },
                {
                  key: 'n/a',
                  value: 'N/A',
                  text: 'N/A',
                },
              ]}
            />
          </Form.Field>

          <Form.Field>
            <Header>IBC Approval</Header>
            <Dropdown
              placeholder='IBC Approval'
              value={ibc}
              name='ibc'
              onChange={(_, { value }) => setIBC(value)}
              fluid
              selection
              options={[
                { 
                  key: 'none', 
                  value: '', 
                  text: 'None' 
                },
                {
                  key: 'need',
                  value: 'Need',
                  text: 'Need',
                },
                {
                  key: 'in_process',
                  value: 'In Process',
                  text: 'In Process',
                },
                {
                  key: 'complete',
                  value: 'Complete',
                  text: 'Complete',
                },
                {
                  key: 'n/a',
                  value: 'N/A',
                  text: 'N/A',
                },
              ]}
            />
          </Form.Field>
          
          <Form.Field>
            <Header>Student RCR</Header>
            <Dropdown
              placeholder='Select RCR type'
              value={rcr}
              name='rcr'
              onChange={(_, { value }) => setRCR(value)}
              fluid
              selection
              options={[
                { 
                  key: 'none', 
                  value: '', 
                  text: 'None' },
                {
                  key: 'need',
                  value: 'Need',
                  text: 'Need',
                },
                {
                  key: 'complete',
                  value: 'Complete',
                  text: 'Complete',
                },
                {
                  key: 'n/a',
                  value: 'N/A',
                  text: 'N/A',
                },
              ]}
            />
          </Form.Field>

          <Form.Field>
            <Header>Student RCR Notes</Header>
            <TextArea
              placeholder='RCR Notes'
              value={student_rcr_notes}
              name='student_rcr_notes'
              onChange={(_, { value }) => setRCRNotes(value)}
              type='text'
            />
          </Form.Field>

          <Form.Field>
            <Header>Subawards</Header>
            <Dropdown
              placeholder='Subawards'
              value={subawards}
              name='subawards'
              onChange={(_, { value }) => setSubawards(value)}
              fluid
              selection
              options={[
                { 
                  key: 'none', 
                  value: '', 
                  text: 'None' },
                {
                  key: 'pending',
                  value: 'Pending',
                  text: 'Pending',
                },
                {
                  key: 'complete',
                  value: 'Complete',
                  text: 'Complete',
                },
                {
                  key: 'n/a',
                  value: 'N/A',
                  text: 'N/A',
                },
              ]}
            />
          </Form.Field>

          <Form.Field>
            <Header>Subawardees</Header>
            <TextArea
              placeholder='Subawardees'
              value={subawardees}
              name='subawardees'
              onChange={(_, { value }) => setSubawardees(value)}
              type='text'
            />
          </Form.Field>

          <Form.Field>
            <Header>Subawards Contract Number</Header>
            <Input
              placeholder='Contract Number'
              value={subaward_contract_number}
              name='subaward_contract_number'
              onChange={(_, { value }) => setSubawardContractNumber(value)}
              type='text'
            />
          </Form.Field>

          <Form.Field>
            <Header>Subaward Notes</Header>
            <TextArea
              placeholder='Notes'
              value={subaward_notes}
              name='subaward_notes'
              onChange={(_, { value }) => setSubawardNotes(value)}
              type='text'
            />
          </Form.Field>
        </div>
      )
    }
  };

  return (
    <Segment basic>
      <Header
        textAlign='center'
        size='huge'
        style={{ marginTop: '5px', marginBottom: '15px' }}
      >
        Add a New Proposal
      </Header>
      <Segment basic style={{ justifyContent: 'space-evenly', maxWidth: '700px', margin: "0 auto" }}>
        <Form>
          <Segment basic>
            <Divider horizontal>Main Information</Divider>
          </Segment>

          <Form.Field>
            <Header>Proposal Number</Header>
            <Input
              placeholder='Proposal Number'
              value={prop_num}
              name='prop_num'
              onChange={(_, { value }) => setPropNum(value)}
              type='text'
            />
          </Form.Field>

          <Form.Field>
            <Header>Pre-Proposal</Header>
            <Dropdown
              placeholder='Pre-Proposal'
              value={pre_prop}
              name='pre_prop'
              onChange={(_, { value }) => setPreProp(value)}
              fluid
              selection
              options={[
                { key: 'no', value: 0, text: 'No' },
                { key: 'yes', value: 1, text: 'Yes' },
              ]}
            />
          </Form.Field>

          <Form.Field>
            <Header>Title</Header>
            <Input
              placeholder='Title'
              value={title}
              name='title'
              onChange={(_, { value }) => setTitle(value)}
              type='text'
            />
          </Form.Field>
  
          <Form.Field>
            <Header>Agency</Header>
            <Input
              placeholder='Agency'
              value={agency}
              name='agency'
              onChange={(_, { value }) => setAgency(value)}
              type='text'
            />
          </Form.Field>
          
          <Form.Field>
            <Header>Funding Type</Header>
            <Dropdown
              placeholder='Select funding type'
              value={fund_type}
              name='funding_type'
              onChange={(_, { value }) => setFundingType(value)}
              fluid
              selection
              options={[
                { key: 'federal', value: 'federal', text: 'Federal' },
                { key: 'state', value: 'state', text: 'State' },
                { key: 'local', value: 'local', text: 'Local' },
                { key: 'private', value: 'private', text: 'Private' },
              ]}
            />
          </Form.Field>

          <Form.Field>
            <Header>CFDA Number</Header>
            <Input
              placeholder='CFDA Number'
              value={cfda}
              name='cfda_number'
              onChange={(_, { value }) => setCFDANumber(value)}
              type='number'
            />
          </Form.Field>

          <Form.Field>
            <Header>Investigator</Header>
            <Input
              placeholder='Investigator'
              value={investigator}
              name='investigator'
              onChange={(_, { value }) => setInvestigator(value)}
              type='text'
            />
          </Form.Field>

          {/* <Form.Field>
            <Header>Extension</Header>
            <Input
              placeholder='Extension'
              value={extension}
              name='extension'
              onChange={(_, { value }) => setExtension(value)}
              type='number'
            />
          </Form.Field> */}

          {/* <Form.Field>
            <Header>Email</Header>
            <Input
              placeholder='Email'
              value={email}
              name='email'
              onChange={(_, { value }) => setEmail(value)}
              type='text'
            />
          </Form.Field> */}

          <Form.Field>
            <Header>Department</Header>
            <Dropdown
              placeholder='Select department name'
              value={department_name}
              name='department_name'
              onChange={(_, { value }) => dealWithNameNum(value)}
              fluid
              selection
              options={departmentNames}
            />
          </Form.Field>

          <Form.Field>
            <Header>Unit</Header>
            <Dropdown
              placeholder='Select unit'
              value={unit}
              name='unit'
              onChange={(_, { value }) => setUnit(value)}
              fluid
              selection
              options={[
                { 
                  key: 'none', 
                  value: '', 
                  text: 'None' 
                },
                { 
                  key: 'cahss', 
                  value: 'CAHSS', 
                  text: 'CAHSS' 
                },
                { 
                  key: 'chsph', 
                  value: 'CHSPH', 
                  text: 'CHSPH' 
                },
                { 
                  key: 'cpp', 
                  value: 'CPP', 
                  text: 'CPP' 
                },
                { 
                  key: 'cstem', 
                  value: 'CSTEM', 
                  text: 'CSTEM' 
                },
                {
                  key: 'academic_affairs',
                  value: 'Academic Affairs',
                  text: 'Academic Affairs',
                },
                {
                  key: 'business_finance',
                  value: 'Business and Finance',
                  text: 'Business and Finance',
                },              
                {
                  key: 'diversity_equity_inclusion',
                  value: 'Diversity, Equity and Inclusion',
                  text: 'Diversity, Equity and Inclusion',
                },
                {
                  key: 'presidents_office',
                  value: "President's Office",
                  text: "President's Office",
                },
                {
                  key: 'student_affairs',
                  value: 'Student Affairs',
                  text: 'Student Affairs',
                },
                {
                  key: 'university_advancement',
                  value: 'University Advancement',
                  text: 'University Advancement',
                },
              ]}
            />
          </Form.Field>

          <Form.Field>
            <Header>Category</Header>
            <Dropdown
              placeholder='Select Category'
              value={category}
              name='category'
              onChange={(_, { value }) => setCategory(value)}
              fluid
              selection
              options={[
                { key: 'none', value: '', text: 'None' },
                {
                  key: 'basic_research',
                  value: 'Basic Research',
                  text: 'Basic Research',
                },
                {
                  key: 'applied_research',
                  value: 'Applied Research',
                  text: 'Applied Research',
                },
                {
                  key: 'experimental_research',
                  value: 'Experimental Research',
                  text: 'Experimental Research',
                },
                {
                  key: 'not_research',
                  value: 'Not Research',
                  text: 'Not Research',
                },
              ]}
            />
          </Form.Field>

          <Form.Field>
            <Header>Amount Requested</Header>
            <Input
              placeholder='Amount Requested'
              value={amount_requested}
              name='amount_requested'
              onChange={(_, { value }) => setAmountRequested(value)}
              type='number'
            />
          </Form.Field>

          <Form.Field>
            <Header>Date Submitted</Header>
            <Input
              placeholder='Date Submitted'
              value={date_submitted}
              name='date_submitted'
              type='date'
              onChange={(_, { value }) => setDateSubmitted(value)}
            />
          </Form.Field>

          <Form.Field>
          <Header>Pre Award POC</Header>
          <Dropdown
            placeholder='Select Pre Award POC'
            value={pre_award_poc}
            name='pre_award_poc'
            onChange={(_, { value }) => dealWithNameNumPreAwardPOC(value)}
            fluid
            selection
            options={preAwardPOCs}
          />
        </Form.Field>

          <Form.Field>
            <Header>Internal Approval</Header>
            <Dropdown
              placeholder='Select internal approval type'
              value={internal_approval}
              name='internal_approval'
              onChange={(_, { value }) => setInternalApproval(value)}
              fluid
              selection
              options={[
                { 
                  key: 'none', 
                  value: '', 
                  text: 'None' },
                {
                  key: 'need',
                  value: 'Need',
                  text: 'Need',
                },
                {
                  key: 'requested',
                  value: 'Requested',
                  text: 'Requested',
                },
                {
                  key: 'complete',
                  value: 'Complete',
                  text: 'Complete',
                },
                {
                  key: 'n/a',
                  value: 'N/A',
                  text: 'N/A',
                },
              ]}
            />
          </Form.Field>
          <Form.Field>Internal Approval Forms Upload Here</Form.Field>

          <Form.Field>
            <Header>Certfication and Assurance</Header>
            <Dropdown
              placeholder='Select certification and assurance type'
              value={certification_assurance}
              name='certification_assurance'
              onChange={(_, { value }) => setCertificationAssurance(value)}
              fluid
              selection
              options={[
                { 
                  key: 'none', 
                  value: '', 
                  text: 'None' },
                {
                  key: 'need',
                  value: 'Need',
                  text: 'Need',
                },
                {
                  key: 'requested',
                  value: 'Requested',
                  text: 'Requested',
                },
                {
                  key: 'complete',
                  value: 'Complete',
                  text: 'Complete',
                },
                {
                  key: 'n/a',
                  value: 'N/A',
                  text: 'N/A',
                },
              ]}
            />
          </Form.Field>
          <Form.Field>Certification and Assurance Forms Upload Here</Form.Field>

          <Form.Field>
            <Header>Conflict of Interest</Header>
            <Dropdown
              placeholder='Select financial interest type'
              value={financial_interest}
              name='financial_interest'
              onChange={(_, { value }) => setFinancialInterest(value)}
              fluid
              selection
              options={[
                { 
                  key: 'none', 
                  value: '', 
                  text: 'None' },
                {
                  key: 'need',
                  value: 'Need',
                  text: 'Need',
                },
                {
                  key: 'requested',
                  value: 'Requested',
                  text: 'Requested',
                },
                {
                  key: 'complete',
                  value: 'Complete',
                  text: 'Complete',
                },
                {
                  key: 'n/a',
                  value: 'N/A',
                  text: 'N/A',
                },
              ]}
            />
          </Form.Field>
          <Form.Field>Conflict of Interest Forms Upload Here</Form.Field>

          <Form.Field>
            <Header>Notes</Header>
            <TextArea
              placeholder='Notes'
              value={notes}
              name='notes'
              onChange={(_, { value }) => setNotes(value)}
              type='text-area'
            />
          </Form.Field>

          <Form.Field>
            <Header>Pre Award Status</Header> 
            <Dropdown
              placeholder='Pre Award Status'
              value={pre_award_status}
              name='pre_award_status'
              onChange={(_, { value }) => setPreAwardStatus(value)}
              fluid
              selection
              options={[
                { 
                  key: 'none', 
                  value: '', 
                  text: 'None' },
                {
                  key: 'pending',
                  value: 'Pending',
                  text: 'Pending',
                },
                {
                  key: 'funded',
                  value: 'Funded',
                  text: 'Funded',
                },
                { 
                  key: 'not_funded', 
                  value: 'Not Funded', 
                  text: 'Not Funded' },
                { 
                  key: 'additional', 
                  value: 'Additional', 
                  text: 'Additional' },
                
                {
                  key: 'invited',
                  value: 'Invited',
                  text: 'Invited',
                },
                {
                  key: 'not_invited',
                  value: 'Not Invited',
                  text: 'Not Invited',
                },
              ]}
            />
          </Form.Field>

          <Form.Field>
            <Header>Date of Notice</Header>
            <Input
              placeholder='Date of Notice'
              value={date_of_notice}
              name='date_of_notice'
              type='date'
              onChange={(_, { value }) => setDateOfNotice(value)}
            />
          </Form.Field>
          {awardAndContractSections()}

          <Segment
            basic
            style={{
              display: 'flex',
              justifyContent: 'right',
              paddingRight: '0px',
            }}
          >
            <Button
              type='submit'
              color='green'
              onClick={() => {
                addProposal();
              }}
            >
              Submit
            </Button>
            <Button
              type='reset'
              onClick={() => {
                clearFields();
              }}
            >
              Clear
            </Button>
          </Segment>
        </Form>
      </Segment>
    </Segment>
  );
};