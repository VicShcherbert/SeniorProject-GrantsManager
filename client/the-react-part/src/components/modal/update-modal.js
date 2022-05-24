import Axios from 'axios';
import React, { useState, useEffect } from 'react';
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
  TextArea,
} from 'semantic-ui-react';

export const UpdateModal = ({ proposal }) => {
  const [open, setOpen] = useState(false);
  const [unique_id] = useState(proposal.unique_id);
  const [prop_num, setPropNum] = useState(proposal.proposal_number);
  const [pre_prop, setPreProp] = useState(proposal.pre_proposal);
  const [pre_prop_num, setPrePropNum] = useState(proposal.pre_proposal_number);
  const [title, setTitle] = useState(proposal.title);
  const [agency, setAgency] = useState(proposal.agency);
  const [fund_type, setFundingType] = useState(proposal.funding_type);
  const [cfda, setCFDANumber] = useState(proposal.cfda_number);
  const [investigator, setInvestigator] = useState(proposal.investigator);
  const [extension, setExtension] = useState(proposal.extension);
  const [email, setEmail] = useState(proposal.email);
  const [department_number, setDeptNum] = useState(proposal.department_number);
  const [department_name, setDeptName] = useState(proposal.department_name);
  const [departmentList, setDepartmentList] = useState([]);
  const [unit, setUnit] = useState(proposal.unit);
  const [category, setCategory] = useState(proposal.category);
  const [amount_requested, setAmountRequested] = useState(proposal.amount_requested);
  const [pre_award_poc, setPreAwardPOC] = useState(proposal.pre_award_poc);
  const [internal_approval, setInternalApproval] = useState(proposal.internal_approval);
  const [certification_assurance, setCertificationAssurance] = useState(proposal.certification_assurance);
  const [financial_interest, setFinancialInterest] = useState(proposal.financial_interest);
  const [notes, setNotes] = useState(proposal.notes);
  const [pre_award_status, setPreAwardStatus] = useState(proposal.pre_award_status);
  const [amount_funded, setAmountFunded] = useState(proposal.amount_funded);
  const [grant_type, setGrantType] = useState(proposal.grant_type);
  const [contract_number, setContractNumber] = useState(proposal.contract_number);
  const [indirect_cost, setIndirectCost] = useState(proposal.indirect_cost);
  const [sponsor_id, setSponsorId] = useState(proposal.sponsor_id);
  const [index_number, setIndexNumber] = useState(proposal.index_number);
  const [entered_sharepoint, setSharepoint] = useState(proposal.entered_sharepoint);
  const [post_award_poc, setPostAwardPOC] = useState(proposal.post_award_poc);
  const [irb, setIRB] = useState(proposal.irb_approval);
  const [iacuc, setIACUC] = useState(proposal.iacuc_approval);
  const [ibc, setIBC] = useState(proposal.ibc_approval);
  const [rcr, setRCR] = useState(proposal.student_rcr);
  const [student_rcr_notes, setRCRNotes] = useState(proposal.rcr_notes);
  const [subawards, setSubawards] = useState(proposal.subawards);
  const [subawardees, setSubawardees] = useState(proposal.subawardees);
  const [subaward_contract_number, setSubawardContractNumber] = useState(proposal.subaward_contract_number);
  const [subaward_notes, setSubawardNotes] = useState(proposal.subaward_notes);
  const [files_id] = useState(0);

  //Date Work:
  const getCorrectDate = (theDate) => {
    return theDate.toLocaleDateString('en-CA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const dateSubmittedNew = getCorrectDate(new Date(proposal.date_submitted));
  const [date_submitted, setDateSubmitted] = useState(dateSubmittedNew);
  // console.log(dateSubmitted);
  const dateOfNoticeNew = getCorrectDate(new Date(proposal.date_of_notice));
  const [date_of_notice, setDateOfNotice] = useState(dateOfNoticeNew);
  // console.log(dateOfNotice);
  const projectStartNew = getCorrectDate(new Date(proposal.project_start));
  const [project_start, setProjectStart] = useState(projectStartNew);
  // console.log(projectStart);
  const projectEndNew = getCorrectDate(new Date(proposal.project_end));
  const [project_end, setProjectEnd] = useState(projectEndNew);
  // console.log(projectEnd);

  const departmentNames = departmentList.map((element) => ({
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

  useEffect(() => {
    Axios.get('http://localhost:3001/get_departments').then((response) => {
      setDepartmentList(response.data); //becasue response contains 'data'
    });
  }, []);

  const dealWithCancel = () => {
    setPrePropNum(proposal.pre_proposal_number);
    setTitle(proposal.title);
    setAgency(proposal.agency);
    setFundingType(proposal.funding_type);
    setCFDANumber(proposal.cfda_number);
    setInvestigator(proposal.investigator);
    setExtension(proposal.extension);
    setEmail(proposal.email);
    setDeptNum(proposal.department_number);
    setDeptName(proposal.department_name);
    setUnit(proposal.unit);
    setAmountRequested(proposal.amount_requested);
    setPreAwardStatus(proposal.pre_award_status);
    setIndexNumber(proposal.index_number);
    setAmountFunded(proposal.amount_funded);
    setGrantType(proposal.grant_type);
    setCategory(proposal.category);
    setPreAwardPOC(proposal.pre_award_poc);
    setPostAwardPOC(proposal.post_award_poc);
    setContractNumber(proposal.contract_number);
    setIndirectCost(proposal.indirect_cost);
    setInternalApproval(proposal.internal_approval);
    setCertificationAssurance(proposal.certification_assurance);
    setFinancialInterest(proposal.financial_interest);
    setRCR(proposal.rcr);
    setNotes(proposal.notes);
    setOpen(false);

    const getCorrectDate = (theDate) => {
      return theDate.toLocaleDateString('en-CA', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    };

    const dateSubmittedNew = getCorrectDate(new Date(proposal.date_submitted));
    setDateSubmitted(dateSubmittedNew);
    const dateOfNoticeNew = getCorrectDate(new Date(proposal.date_of_notice));
    setDateOfNotice(dateOfNoticeNew);
    const projectStartNew = getCorrectDate(new Date(proposal.project_start));
    setProjectStart(projectStartNew);
    const projectEndNew = getCorrectDate(new Date(proposal.project_end));
    setProjectEnd(projectEndNew);
  };

  const handleUpdate = (unique_id) => {
    var result = window.confirm('Are you sure you want to update?');
    if (result && departmentList) {
      Axios.put('http://localhost:3001/update', {
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
      }).then((response) => {
        alert('Entry has been updated');
        window.location.reload();
      });
    }
  };

  const deleteProposal = (unique_id) => {
    var result = window.confirm('Are you sure you want to delete?');
    if (result) {
      Axios.delete('http://localhost:3001/delete_proposal', {
        unique_id: unique_id,
      }).then((response) => {
        alert('Entry has been deleted');
        window.location.reload();
      });
    }
  };

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
              placeholder='Select a person'
              value={post_award_poc}
              name='post_award_poc'
              onChange={(_, { value }) => setPostAwardPOC(value)}
              fluid
              selection
              options={[
                { 
                  key: 'none', 
                  value: '', 
                  text: 'None' 
                },
                {
                  key: 'nancy_miller',
                  value: 'Nancy Miller',
                  text: 'Nancy Miller',
                },
                {
                  key: 'michelle_siedenburg',
                  value: 'Michelle Siedenburg',
                  text: 'Michelle Siedenburg',
                },
                {
                  key: 'danielle_desormier',
                  value: 'Danielle Desormier',
                  text: 'Danielle Desormier',
                }
              ]}
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
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color='grey'>View</Button>}
    >
      <Modal.Header>{proposal.title}</Modal.Header>
      <Modal.Content>
        {proposal.unique_id ? (
          <Label size='large'>
            Proposal ID: {proposal.unique_id}
          </Label>
        ) : null}
        {proposal.pre_proposal_number ? (
          <Label size='large'>
            Pre-Proposal Number: {proposal.pre_proposal_number}
          </Label>
        ) : null}
        
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
              placeholder='Select a person'
              value={pre_award_poc}
              name='pre_award_poc'
              onChange={(_, { value }) => setPreAwardPOC(value)}
              fluid
              selection
              options={[
                { key: 'none', value: '', text: 'None' },
                {
                  key: 'charlene_alspach',
                  value: 'Charlene Alspach',
                  text: 'Charlene Alspach',
                },
                {
                  key: 'kristyl_riddle',
                  value: 'Kristyl Riddle',
                  text: 'Kristyl Riddle',
                }
              ]}
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
        </Form>
      </Modal.Content>
      <Modal.Actions>
      <Button
          color='green'
          onClick={() => handleUpdate(proposal.unique_id)}
        >
          Update
        </Button>
        <Button color='orange' onClick={() => dealWithCancel()}>
          Cancel
        </Button>
        <Button color='red' onClick={() => deleteProposal(proposal.unique_id)}>
          Delete
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
