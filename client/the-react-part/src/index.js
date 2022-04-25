import React from 'react';
import ReactDOM from 'react-dom/client';
import { Link } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './style.css';
import { Departments } from './routes/departments';
import { Proposals } from './routes/view-proposals';
import { AddProposal } from './components/dashboard/add-proposal';
import { Menu, MenuItem } from 'semantic-ui-react';
import { Title } from './components/title/title';
import { Dashboard } from './components/dashboard/dashboard';
import { Report } from './components/dashboard/report';

//Yo what up
const App = () => {
  return (
    <BrowserRouter>
      <Title />
      <Menu>
        <MenuItem id='nav-link'>
          <Link to='/'>Dashboard</Link>
        </MenuItem>
        <MenuItem id='nav-link'>
          <Link to='/proposals'>Proposals</Link>
        </MenuItem>
        <MenuItem id='nav-link'>
          <Link to='/add-proposal'>Add Proposal</Link>
        </MenuItem>
        <MenuItem id='nav-link'>
          <Link to='/departments'>Departments</Link>
        </MenuItem>
        <MenuItem id='nav-link'>
          <Link to='/reporting'>Reporting</Link>
        </MenuItem>
      </Menu>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/proposals' element={<Proposals />} />
        <Route path='/add-proposal' element={<AddProposal />}></Route>
        <Route path='/departments' element={<Departments />} />
        <Route path='/reporting' element={<Report />} />
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);
