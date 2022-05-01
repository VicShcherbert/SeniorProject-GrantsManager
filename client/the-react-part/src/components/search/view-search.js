import { Search } from './search-proposals';
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableHeaderCell,
    TableRow,
    Pagination,
    Segment,
    Header,
    Button,
    Modal,
  } from 'semantic-ui-react';
  import { UpdateModal } from '../modal/update-modal';



  export const ViewSearch = () => {
    const [list, setList] = useState([]);
    const [proposalsPerPage, setProposalsPerPage] = useState(30);
    const [currentPage, setCurrentPage] = useState(1);
  
    setList(Search());
  
    const changePage = (e, pageInfo) => {
      setCurrentPage(pageInfo.activePage);
    };
  
    return (
      <Segment basic style={{ maxWidth: '70%', margin: 'auto' }}>
        <Header as='h1' textAlign='center'>
          Proposals
        </Header>
        <Pagination
          activePage={currentPage}
          totalPages={Math.ceil(list.length / proposalsPerPage)}
          onPageChange={changePage}
        />
        <Table celled>
          <TableHeader>
            <TableHeaderCell>Proposal Number</TableHeaderCell>
            <TableHeaderCell>Title</TableHeaderCell>
            <TableHeaderCell>Agency</TableHeaderCell>
            <TableHeaderCell>Funding Number</TableHeaderCell>
            {/* <TableHeaderCell>CFDA Number</TableHeaderCell> */}
            <TableHeaderCell>Investigator</TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableHeader>
          <TableBody>
            {list
              .slice(
                currentPage * proposalsPerPage - 1,
                currentPage * proposalsPerPage + (proposalsPerPage + 1)
              )
              .map((proposal, key) => {
                return (
                  <TableRow>
                    <TableCell>{proposal.proposal_number}</TableCell>
                    <TableCell>{proposal.title}</TableCell>
                    <TableCell>{proposal.agency}</TableCell>
                    <TableCell>{proposal.funding_type}</TableCell>
                    {/* <TableCell>{proposal.cfda_number}</TableCell> */}
                    <TableCell>{proposal.investigator}</TableCell>
                    <TableCell>
                      <UpdateModal proposal={proposal}/>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <Pagination
          defaultActivePage={1}
          totalPages={Math.ceil(list.length / proposalsPerPage)}
        />
      </Segment>
    );
  };