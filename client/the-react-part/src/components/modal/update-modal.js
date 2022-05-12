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
} from 'semantic-ui-react';

export const UpdateModal = ({ proposal }) => {
  // console.log('Being reloaded again');
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(proposal.title);
  const [agency, setAgency] = useState(proposal.agency);
  const [fundingType, setFundingType] = useState(proposal.funding_type);
  const [cfdaNumber, setCFDANumber] = useState(proposal.cfda_number);
  const [investigator, setInvestigator] = useState(proposal.investigator);
  const [extension, setExtension] = useState(proposal.extension);
  const [email, setEmail] = useState(proposal.email);
  const [departmentNumber, setDeptNum] = useState(proposal.department_number);
  const [departmentName, setDeptName] = useState(proposal.department_name);
  const [departmentList, setDepartmentList] = useState([]);

  const [unit, setUnit] = useState(proposal.unit);
  const [amountRequested, setAmountRequested] = useState(
    proposal.amount_requested
  );
  const [preAwardStatus, setPreAwardStatus] = useState(
    proposal.pre_award_status
  );

  //Date Work:
  const getCorrectDate = (theDate) => {
    return theDate.toLocaleDateString('en-CA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const dateSubmittedNew = getCorrectDate(new Date(proposal.date_submitted));
  const [dateSubmitted, setDateSubmitted] = useState(dateSubmittedNew);
  // console.log(dateSubmitted);
  const dateOfNoticeNew = getCorrectDate(new Date(proposal.date_of_notice));
  const [dateOfNotice, setDateOfNotice] = useState(dateOfNoticeNew);
  // console.log(dateOfNotice);
  const projectStartNew = getCorrectDate(new Date(proposal.project_start));
  const [projectStart, setProjectStart] = useState(projectStartNew);
  // console.log(projectStart);
  const projectEndNew = getCorrectDate(new Date(proposal.project_end));
  const [projectEnd, setProjectEnd] = useState(projectEndNew);
  // console.log(projectEnd);

  const [humanCompliance, setHumanCompliance] = useState(
    proposal.human_compliance
  );
  const [animalCompliance, setAnimalCompliance] = useState(
    proposal.animal_compliance
  );
  const [recombinantDna, setRecombinantDNA] = useState(
    proposal.recombinant_dna
  );
  const [subcontractors, setSubcontractors] = useState(proposal.subcontractors);
  const [indexNumber, setIndexNumber] = useState(proposal.index_number);
  const [amountFunded, setAmountFunded] = useState(proposal.amount_funded);
  const [grantType, setGrantType] = useState(proposal.grant_type);
  const [category, setCategory] = useState(proposal.category);
  const [preAwardPoc, setPreAwardPOC] = useState(proposal.pre_award_poc);
  const [postAwardPoc, setPostAwardPOC] = useState(proposal.post_award_poc);
  const [contractNumber, setContractNumber] = useState(
    proposal.contract_number
  );
  const [indirectCost, setIndirectCost] = useState(proposal.indirect_cost);
  const [internalApproval, setInternalApproval] = useState(
    proposal.internal_approval
  );
  const [certificationAssurance, setCertificationAssurance] = useState(
    proposal.certification_assurance
  );
  const [financialInterest, setFinancialInterest] = useState(
    proposal.financial_interest
  );
  const [archiveLocation, setArchiveLocation] = useState(
    proposal.archive_location
  );
  const [rcr, setRCR] = useState(proposal.rcr);
  const [notes, setNotes] = useState(proposal.notes);

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
    setAmountRequested(
      proposal.amount_requested
    );
    setPreAwardStatus(proposal.pre_award_status);

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

    setHumanCompliance(proposal.human_compiance);
    setAnimalCompliance(proposal.animal_compliance);
    setRecombinantDNA(proposal.recombinant_dna);
    setSubcontractors(proposal.subcontractors);
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
    setArchiveLocation(proposal.archive_location);
    setRCR(proposal.rcr);
    setNotes(proposal.notes);
    setOpen(false);
  };

  const handleUpdate = (prop_number) => {
    var result = window.confirm('Are you sure you want to update?');
    if (result && departmentList) {
      Axios.put('http://localhost:3001/update', {
        proposal_number: prop_number,
        title: title,
        agency: agency,
        funding_type: fundingType,
        cfda_number: cfdaNumber,
        investigator: investigator,
        extension: extension,
        email: email,
        department_number: departmentNumber,
        department_name: departmentName,
        unit: unit,
        amount_requested: amountRequested, //MISEPEELEEDDD
        pre_award_status: preAwardStatus,
        date_submitted: dateSubmitted,
        date_of_notice: dateOfNotice,
        project_start: projectStart,
        project_end: projectEnd,
        human_compliance: humanCompliance,
        animal_compliance: animalCompliance,
        recombinant_dna: recombinantDna,
        subcontractors: subcontractors,
        index_number: indexNumber,
        amount_funded: amountFunded,
        grant_type: grantType,
        category: category,
        pre_award_poc: preAwardPoc,
        post_award_poc: postAwardPoc,
        contract_number: contractNumber,
        indirect_cost: indirectCost,
        internal_approval: internalApproval,
        certification_assurance: certificationAssurance,
        financial_interest: financialInterest,
        rcr: rcr,
        archive_location: archiveLocation,
        notes: notes,
      }).then((response) => {
        alert('Entry has been updated');
        window.location.reload();
      });
    }
  };

  const deleteProposal = (prop_number) => {
    var result = window.confirm('Are you sure you want to update?');
    if (result) {
      Axios.post('http://localhost:3001/delete_proposal', {
        proposal_number: prop_number,
    }).then((response) => {
      alert('Entry has been deleted');
      window.location.reload();
    });
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
        {proposal.proposal_number ? (
          <Label size='large'>
            Proposal Number: {proposal.proposal_number}
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
              value={fundingType}
              name='funding_type'
              onChange={(_, { value }) => setFundingType(value)}
              fluid
              selection
              options={[
                { value: '', text: 'None' },
                { value: 'federal', text: 'Federal' },
                { value: 'state', text: 'State' },
                { value: 'tribal', text: 'Tribal' },
                { value: 'private', text: 'Private' },
              ]}
            />
          </Form.Field>
          <Form.Field>
            <Header>CFDA Number</Header>
            <Input
              placeholder='CFDA Number'
              value={cfdaNumber}
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
              value={departmentName}
              name='department_name'
              // onChange={(_, { value }) => setDeptName(value)}
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
              value={amountRequested}
              name='amount_requested'
              onChange={(_, { value }) => setAmountRequested(value)}
              type='number'
            />
          </Form.Field>
          <Form.Field>
            <Header>Pre Award Status</Header>
            <Dropdown
              placeholder='Pre Award Status'
              value={preAwardStatus}
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
              value={dateSubmitted}
              name='date_submited'
              type='date'
              onChange={(_, { value }) => setDateSubmitted(value)}
            />
          </Form.Field>
          <Form.Field>
            <Header>Date of Notice</Header>
            <Input
              placeholder='Date of Notice'
              value={dateOfNotice}
              name='date_of_notice'
              type='date'
              onChange={(_, { value }) => setDateOfNotice(value)}
            />
          </Form.Field>
          <Form.Field>
            <Header>Project Start</Header>
            <Input
              placeholder='Project Start'
              value={projectStart}
              name='project_start'
              type='date'
              onChange={(_, { value }) => setProjectStart(value)}
            />
          </Form.Field>
          <Form.Field>
            <Header>Project End</Header>
            <Input
              placeholder='Project End'
              value={projectEnd}
              name='project_end'
              type='date'
              onChange={(_, { value }) => setProjectEnd(value)}
            />
          </Form.Field>
          <Form.Field>
            <Header>Human Compliance</Header>
            <Dropdown
              placeholder='Select human compliance'
              value={humanCompliance}
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
              value={animalCompliance}
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
              value={recombinantDna}
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
              value={indexNumber}
              name='index_number'
              onChange={(_, { value }) => setIndexNumber(value)}
              type='number'
            />
          </Form.Field>
          <Form.Field>
            <Header>Amount Funded</Header>
            <Input
              placeholder='Amount Funded'
              value={amountFunded}
              name='amount_funded'
              onChange={(_, { value }) => setAmountFunded(value)}
              type='number'
            />
          </Form.Field>
          <Form.Field>
            <Header>Grant Type</Header>
            <Dropdown
              placeholder='Select Grant Type'
              value={grantType}
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
              placeholder='Select a person'
              value={preAwardPoc}
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
                },
                {
                  key: 'ruth_galm',
                  value: 'Ruth Galm',
                  text: 'Ruth Galm',
                },
              ]}
            />
          </Form.Field>
          <Form.Field>
            <Header>Post Award POC</Header>
            <Dropdown
              placeholder='Select a person'
              value={postAwardPoc}
              name='post_award_poc'
              onChange={(_, { value }) => setPostAwardPOC(value)}
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
                  key: 'danielle_desormier',
                  value: 'Danielle Desormier',
                  text: 'Danielle Desormier',
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
              ]}
            />
          </Form.Field>
          <Form.Field>
            <Header>Contract Number</Header>
            <Input
              placeholder='Contract Number'
              value={contractNumber}
              name='contract_number'
              onChange={(_, { value }) => setContractNumber(value)}
              type='text'
            />
          </Form.Field>
          <Form.Field>
            <Header>Indirect Cost</Header>
            <Input
              placeholder='Indirect Cost'
              value={indirectCost}
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
              value={internalApproval}
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
              value={certificationAssurance}
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
              value={financialInterest}
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
              value={archiveLocation}
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
        </Form>
      </Modal.Content>
      <Modal.Actions>
      <Button
          color='green'
          onClick={() => handleUpdate(proposal.proposal_number)}
        >
          Update
        </Button>
        <Button color='orange' onClick={() => dealWithCancel()}>
          Cancel
        </Button>
        <Button color='red' onClick={() => deleteProposal()}>
          Delete
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
