import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './style.css';
import { ViewProposals } from './components/proposals/view-proposals';
import { AddProposal } from './components/proposals/add-proposal';
import { Menu, MenuItem } from 'semantic-ui-react';
import { Title } from './components/title/title';
import { Dashboard } from './components/dashboard/dashboard';
import { Report } from './components/report/report';
import { Search } from './components/search/search-proposals';
import { Login } from './components/login/login';
import { Admin } from './components/admin/admin';
import { Footer } from './components/footer';
import { AiOutlineDashboard, AiOutlineUnorderedList, AiOutlineFileAdd, AiOutlineSearch } from 'react-icons/ai';
import { BsGraphUp } from 'react-icons/bs';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { IconContext } from 'react-icons/lib';

const App = () => {
  const logout = () => {
    sessionStorage.removeItem('greeting');
    sessionStorage.removeItem('failed_login');
    window.location.reload(false);
  };

  const userAccessMenuItem = () => {
    if (sessionStorage.getItem('id') === '1') {
      return (
        <MenuItem onClick={event =>  window.location.href='/admin'} id='nav-link'>
          <div id='icon'><MdOutlineAdminPanelSettings id='icon'/></div>
          Admin
        </MenuItem>
      );
    }
  };

  if (!sessionStorage.getItem('greeting')) {
    return <Login />;
  }

  return (
    <BrowserRouter>
      <Title />
      <IconContext.Provider value = {{ color: '#5e90c5', size: '1.5em' }}>
      <Menu compact style={{ display: 'flex', justifyContent: 'center' }}>
        <MenuItem onClick={event =>  window.location.href='/'} id='nav-link'>
          <div id='icon'><AiOutlineDashboard id='icon'/></div>
          Dashboard
        </MenuItem>
        <MenuItem onClick={event =>  window.location.href='/proposals'} id='nav-link'>
          <div id='icon'><AiOutlineUnorderedList id='icon'/></div>
          Proposals
        </MenuItem>
        <MenuItem onClick={event =>  window.location.href='/add-proposal'} id='nav-link'>
          <div id='icon'><AiOutlineFileAdd id='icon'/></div>
          Add Proposal
        </MenuItem>
        <MenuItem onClick={event =>  window.location.href='/reporting'} id='nav-link'>
          <div id='icon'><BsGraphUp id='icon'/></div>
          Reporting
        </MenuItem>
        <MenuItem onClick={event =>  window.location.href='/search-proposals'} id='nav-link'>
          <div id='icon'><AiOutlineSearch id='icon'/></div>
          Search
        </MenuItem>
        {userAccessMenuItem()}
        <MenuItem onClick={logout} id='nav-link'>
          <div id='icon'><RiLogoutBoxRLine id='icon'/></div>
          Logout
        </MenuItem>
      </Menu>
      </IconContext.Provider>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/proposals' element={<ViewProposals />} />
        <Route path='/add-proposal' element={<AddProposal />}></Route>
        <Route path='/reporting' element={<Report />} />
        <Route path='/search-proposals' element={<Search />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
