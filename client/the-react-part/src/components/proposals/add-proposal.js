import React, { useState, useEffect } from 'react';
import Axios from 'axios'; //when adding something to the database
import {
  Modal,
  Button,
  Form,
  Header,
  Input,
  Dropdown,
  Divider,
  Label,
  Segment,
} from 'semantic-ui-react';
import '../../style.css';

export const AddProposal = () => {
  const [prop_num, setPropNum] = useState('');
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
  const [amount_requested, setAmountRequested] = useState(0);
  const [pre_award_status, setPreAwardStatus] = useState('');
  const [date_submitted, setDateSubmitted] = useState('');
  const [date_of_notice, setDateOfNotice] = useState('');
  const [project_start, setProjectStart] = useState('');
  const [project_end, setProjectEnd] = useState('');
  const [human_compliance, setHumanCompliance] = useState('');
  const [animal_compliance, setAnimalCompliance] = useState('');
  const [recombinant_dna, setRecombinantDNA] = useState('');
  const [subcontractors, setSubcontractors] = useState('');
  const [index_number, setIndexNumber] = useState(0);
  const [amount_funded, setAmountFunded] = useState(0);
  const [grant_type, setGrantType] = useState('');
  const [category, setCategory] = useState('');
  //Working on this
  const [preAwardPOCList, setPreAwardPOCList] = useState([]);
  const [pre_award_poc, setPreAwardPOC] = useState('');
  //Working on this
  const [postAwardPOCList, setPostAwardPOCList] = useState([]);
  const [post_award_poc, setPostAwardPOC] = useState('');
  const [contract_number, setContractNumber] = useState(0);
  const [indirect_cost, setIndirectCost] = useState(0);
  const [internal_approval, setInternalApproval] = useState('');
  const [certification_assurance, setCertificationAssurance] = useState('');
  const [financial_interest, setFinancialInterest] = useState('');
  const [rcr, setRCR] = useState('');
  const [archive_location, setArchiveLocation] = useState('');
  const [notes, setNotes] = useState('');

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
      setDepartmentList(response.data); //because response contains 'data'
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
    Axios.post('http://localhost:3001/addProposal', {
      prop_num: prop_num,
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
      amount_requested: amount_requested,
      pre_award_status: pre_award_status,
      date_submitted: date_submitted,
      date_of_notice: date_of_notice,
      project_start: project_start,
      project_end: project_end,
      human_compliance: human_compliance,
      animal_compliance: animal_compliance,
      recombinant_dna: recombinant_dna,
      subcontractors: subcontractors,
      index_number: index_number,
      amount_funded: amount_funded,
      grant_type: grant_type,
      category: category,
      pre_award_poc: pre_award_poc,
      post_award_poc: post_award_poc,
      contract_number: contract_number,
      indirect_cost: indirect_cost,
      internal_approval: internal_approval,
      certification_assurance: certification_assurance,
      financial_interest: financial_interest,
      rcr: rcr,
      archive_location: archive_location,
      notes: notes,
    }).then(
      clearFields()
    );
  };

  const clearFields = () => {
    setPropNum('');
    setPrePropNum(0);
    setTitle('');
    setAgency('');
    setFundingType('');
    setCFDANumber(0);
    setInvestigator('');
    setExtension(0);
    setEmail('');
    setDeptNum('');
    setDeptName('');
    setDepartmentList([]);
    setUnit('');
    setAmountRequested(0);
    setPreAwardStatus('');
    setDateSubmitted('');
    setDateOfNotice('');
    setProjectStart('');
    setProjectEnd('');
    setHumanCompliance('');
    setAnimalCompliance('');
    setRecombinantDNA('');
    setSubcontractors('');
    setIndexNumber(0);
    setAmountFunded(0);
    setGrantType('');
    setCategory('');
    //Working on this:
    setPreAwardPOCList([]);
    setPreAwardPOC('');
    //Working on this:
    setPostAwardPOCList([]);
    setPostAwardPOC('');
    setContractNumber(0);
    setIndirectCost(0);
    setInternalApproval('');
    setCertificationAssurance('');
    setFinancialInterest('');
    setRCR('');
    setArchiveLocation('');
    setNotes('');
  };

  return (
    <Segment basic style={{ marginRight: '100px', marginLeft: '100px' }}>
      <Header textAlign='center' size='huge'>
        Add a New Proposal
      </Header>
      <Form>
        <Segment basic>
          <Divider horizontal>Main Information</Divider>
        </Segment>
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
          <Header>Proposal Number</Header>
          <Input
            placeholder='Proposal Number'
            value={prop_num}
            name='prop_num'
            onChange={(_, { value }) => setPropNum(value)}
            type='number'
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
              { key: 'none', value: '', text: 'None' },
              { key: 'federal', value: 'federal', text: 'Federal' },
              { key: 'state', value: 'state', text: 'State' },
              { key: 'tribal', value: 'tribal', text: 'Tribal' },
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
        <Form.Field>
          <Header>Extension</Header>
          <Input
            placeholder='Extension'
            value={extension}
            name='extension'
            onChange={(_, { value }) => setExtension(value)}
            type='number'
          />
        </Form.Field>
        <Form.Field>
          <Header>Email</Header>
          <Input
            placeholder='Email'
            value={email}
            name='email'
            onChange={(_, { value }) => setEmail(value)}
            type='text'
          />
        </Form.Field>
        <Form.Field>
          <Header>Department Name</Header>
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
              { key: 'none', value: '', text: 'None' },
              {
                key: 'academic_affairs',
                value: 'Academic Affairs',
                text: 'Academic Affairs',
              },
              {
                key: 'business_finance',
                value: 'Business Finance',
                text: 'Business Finance',
              },
              { key: 'cahss', value: 'CAHSS', text: 'CAHSS' },
              { key: 'cpp', value: 'CPP', text: 'CPP' },
              { key: 'chsph', value: 'CHSPH', text: 'CHSPH' },
              { key: 'cstem', value: 'CSTEM', text: 'CSTEM' },
              {
                key: 'diversity_inclusion',
                value: 'Diversity and Inclusion',
                text: 'Diversity and Inclusion',
              },
              {
                key: 'equal_opportunity',
                value: 'Equal Opportunity Affirm Action',
                text: 'Equal Opportunity Affirm Action',
              },
              {
                key: 'student_affairs',
                value: 'Student Affairs',
                text: 'Student Affairs',
              },
              {
                key: 'university_libraries',
                value: 'University Libraries',
                text: 'University Libraries',
              },
              {
                key: 'university_college',
                value: 'University College',
                text: 'University College',
              },
              {
                key: 'presidents_office',
                value: "President's Office",
                text: "President's Office",
              },
              {
                key: 'outreach_engagement',
                value: 'Outreach and Engagement',
                text: 'Outreach and Engagement',
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
          <Header>Pre Award Status</Header>
          <Dropdown
            placeholder='Pre Award Status'
            value={pre_award_status}
            name='pre_award_status'
            onChange={(_, { value }) => setPreAwardStatus(value)}
            fluid
            selection
            options={[
              { key: 'none', value: '', text: 'None' },
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
              { key: 'not_funded', value: 'Not Funded', text: 'Not Funded' },
              { key: 'additional', value: 'Additional', text: 'Additional' },
              { key: 'awarded', value: 'Awarded', text: 'Awarded' },
              { key: 'cash_value', value: 'Cash Value', text: 'Cash Value' },
              {
                key: 'pre_proposal',
                value: 'Pre Proposal',
                text: 'Pre Proposal',
              },
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
              {
                key: 'no_cash_value',
                value: 'No Cash Value',
                text: 'No Cash Value',
              },
              {
                key: 'reduced',
                value: 'Reduced',
                text: 'Reduced',
              },
              {
                key: 'to_be_determined',
                value: 'To Be Determined',
                text: 'To Be Determined',
              },
              {
                key: 'see_notes',
                value: 'See Notes',
                text: 'See Notes',
              },
              {
                key: 'not_accepted',
                value: 'Not Accepted',
                text: 'Not Accepted',
              },
            ]}
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
          <Header>Date of Notice</Header>
          <Input
            placeholder='Date of Notice'
            value={date_of_notice}
            name='date_of_notice'
            type='date'
            onChange={(_, { value }) => setDateOfNotice(value)}
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
          <Header>Human Compliance</Header>
          <Dropdown
            placeholder='Select human compliance'
            value={human_compliance}
            name='human_compliance'
            onChange={(_, { value }) => setHumanCompliance(value)}
            fluid
            selection
            options={[
              { key: 'none', value: '', text: 'None' },
              { key: 'yes', value: 'Y', text: 'Y' },
              { key: 'no', value: 'N', text: 'N' },
            ]}
          />
        </Form.Field>
        <Form.Field>
          <Header>Animal Compliance</Header>
          <Dropdown
            placeholder='Select animal compliance'
            value={animal_compliance}
            name='animal_compliance'
            onChange={(_, { value }) => setAnimalCompliance(value)}
            fluid
            selection
            options={[
              { key: 'none', value: '', text: 'None' },
              { key: 'yes', value: 'Y', text: 'Y' },
              { key: 'no', value: 'N', text: 'N' },
            ]}
          />
        </Form.Field>
        <Form.Field>
          <Header>Recombinant DNA</Header>
          <Dropdown
            placeholder='Select recombinant DNA'
            value={recombinant_dna}
            name='recombinant_dna'
            onChange={(_, { value }) => setRecombinantDNA(value)}
            fluid
            selection
            options={[
              { key: 'none', value: '', text: 'None' },
              { key: 'yes', value: 'Y', text: 'Y' },
              { key: 'no', value: 'N', text: 'N' },
            ]}
          />
        </Form.Field>
        <Form.Field>
          <Header>Subcontractors</Header>
          <Dropdown
            placeholder='Subcontractors'
            value={subcontractors}
            name='subcontractors'
            onChange={(_, { value }) => setSubcontractors(value)}
            fluid
            selection
            options={[
              { key: 'none', value: '', text: 'None' },
              { key: 'yes', value: 'Y', text: 'Y' },
              { key: 'no', value: 'N', text: 'N' },
            ]}
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
          <Header>Grant Type</Header>
          <Dropdown
            placeholder='Select Grant Type'
            value={grant_type}
            name='grant_type'
            onChange={(_, { value }) => setGrantType(value)}
            fluid
            selection
            options={[
              { key: 'none', value: '', text: 'None' },
              {
                key: 'contract',
                value: 'C - Contract',
                text: 'C - Contract',
              },
              { key: 'grant', value: 'G - Grant', text: 'G - Grant' },
              {
                key: 'subcontract',
                value: 'S - Subcontract',
                text: 'S - Subcontract',
              },
              {
                key: 'interagency_agreement',
                value: 'IA - Interagency Agreement',
                text: 'IA - Interagency Agreement',
              },
              {
                key: 'cooperative_agreement',
                value: 'CA - Cooperative Agreement',
                text: 'CA - Cooperative Agreement',
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
                value: 'B -Basic Research',
                text: 'B -Basic Research',
              },
              {
                key: 'non_research_other',
                value: 'N -Non-research/other',
                text: 'N -Non-research/other',
              },
              {
                key: 'experimental',
                value: 'E -Experimental',
                text: 'E -Experimental',
              },
              {
                key: 'applied_research',
                value: 'A -Applied Research',
                text: 'A -Applied Research',
              },
            ]}
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
        <Segment basic>
          <Divider horizontal>Compliance Requirements</Divider>
        </Segment>
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
              { key: 'none', value: '', text: 'None' },
              {
                key: 'in_process',
                value: 'In Process',
                text: 'In Process',
              },
              {
                key: 'need',
                value: 'Need',
                text: 'Need',
              },
              {
                key: 'na',
                value: 'NA',
                text: 'NA',
              },
              {
                key: 'complete',
                value: 'Complete',
                text: 'Complete',
              },
              {
                key: 'see_pre_award_contact',
                value: 'See Pre Award Contact',
                text: 'See Pre Award Contact',
              },
              {
                key: 'not_funded',
                value: 'Not Funded',
                text: 'Not Funded',
              },
              {
                key: 'see_notes',
                value: 'See Notes',
                text: 'See Notes',
              },
            ]}
          />
        </Form.Field>
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
              { key: 'none', value: '', text: 'None' },
              {
                key: 'in_process',
                value: 'In Process',
                text: 'In Process',
              },
              {
                key: 'need',
                value: 'Need',
                text: 'Need',
              },
              {
                key: 'na',
                value: 'NA',
                text: 'NA',
              },
              {
                key: 'complete',
                value: 'Complete',
                text: 'Complete',
              },
              {
                key: 'see_pre_award_contact',
                value: 'See Pre Award Contact',
                text: 'See Pre Award Contact',
              },
              {
                key: 'not_funded',
                value: 'Not Funded',
                text: 'Not Funded',
              },
              {
                key: 'see_notes',
                value: 'See Notes',
                text: 'See Notes',
              },
            ]}
          />
        </Form.Field>
        <Form.Field>
          <Header>Financial Interest</Header>
          <Dropdown
            placeholder='Select financial interest type'
            value={financial_interest}
            name='financial_interest'
            onChange={(_, { value }) => setFinancialInterest(value)}
            fluid
            selection
            options={[
              { key: 'none', value: '', text: 'None' },
              {
                key: 'in_process',
                value: 'In Process',
                text: 'In Process',
              },
              {
                key: 'need',
                value: 'Need',
                text: 'Need',
              },
              {
                key: 'na',
                value: 'NA',
                text: 'NA',
              },
              {
                key: 'complete',
                value: 'Complete',
                text: 'Complete',
              },
              {
                key: 'see_pre_award_contact',
                value: 'See Pre Award Contact',
                text: 'See Pre Award Contact',
              },
              {
                key: 'not_funded',
                value: 'Not Funded',
                text: 'Not Funded',
              },
              {
                key: 'see_notes',
                value: 'See Notes',
                text: 'See Notes',
              },
            ]}
          />
        </Form.Field>
        <Form.Field>
          <Header>RCR</Header>
          <Dropdown
            placeholder='Select RCR type'
            value={rcr}
            name='rcr'
            onChange={(_, { value }) => setRCR(value)}
            fluid
            selection
            options={[
              { key: 'none', value: '', text: 'None' },
              {
                key: 'in_process',
                value: 'In Process',
                text: 'In Process',
              },
              {
                key: 'need',
                value: 'Need',
                text: 'Need',
              },
              {
                key: 'na',
                value: 'NA',
                text: 'NA',
              },
              {
                key: 'complete',
                value: 'Complete',
                text: 'Complete',
              },
              {
                key: 'see_pre_award_contact',
                value: 'See Pre Award Contact',
                text: 'See Pre Award Contact',
              },
              {
                key: 'not_funded',
                value: 'Not Funded',
                text: 'Not Funded',
              },
              {
                key: 'see_notes',
                value: 'See Notes',
                text: 'See Notes',
              },
            ]}
          />
        </Form.Field>
        <Segment basic>
          <Divider horizontal>Other</Divider>
        </Segment>
        <Form.Field>
          <Header>Archive Location</Header>
          <Input
            placeholder='Archive Location'
            value={archive_location}
            name='archive_location'
            onChange={(_, { value }) => setArchiveLocation(value)}
            type='text'
          />
        </Form.Field>
        <Form.Field>
          <Header>Notes</Header>
          <Input
            placeholder='Notes'
            value={notes}
            name='notes'
            onChange={(_, { value }) => setNotes(value)}
            type='text'
          />
        </Form.Field>
        <Segment basic style={{display: 'flex', justifyContent: 'right', paddingRight: '0px'}}>
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
  );
};