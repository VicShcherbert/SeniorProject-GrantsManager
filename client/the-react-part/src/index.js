import React from 'react';
import ReactDOM from 'react-dom/client';
import { Link } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './style.css';
import { ViewProposals } from './components/proposals/view-proposals';
import { AddProposal } from './components/proposals/add-proposal';
import { Menu, MenuItem, Segment } from 'semantic-ui-react';
import { Title } from './components/title/title';
import { Dashboard } from './components/dashboard/dashboard';
import { Report } from './components/report/report';
import { Search } from './components/search/search-proposals';
import { Login } from './components/login/login';
import { Admin } from './components/admin/admin';
import { Footer } from './components/footer';


const App = () => {
  const logout = () => {
    sessionStorage.removeItem('greeting');
    sessionStorage.removeItem('failed_login');
    window.location.reload(false);
  };

  const userAccessMenuItem = () => {
    if (sessionStorage.getItem('id') === '1') {
      return (
        <MenuItem id='nav-link'><Link to="/admin">Admin</Link></MenuItem>
      )
    }
  };

  if (!sessionStorage.getItem('greeting')) {
    return <Login />;
  }

  return (
    <BrowserRouter>
      <Title />
      <Menu compact style={{ display: 'flex', justifyContent: 'center' }}>
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
          <Link to='/reporting'>Reporting</Link>
        </MenuItem>
        <MenuItem id='nav-link'>
          <Link to='/search-proposals'>Search</Link>
        </MenuItem>
        {userAccessMenuItem()}
        <MenuItem onClick={logout} id='nav-link'>
          Logout
        </MenuItem>
      </Menu>
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
