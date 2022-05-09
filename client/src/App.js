import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './CSS/App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Number from './pages/Number';
import Location from './pages/Location';
import Department from './pages/Department';
import Administrator from './pages/Administrator';
import CRUDRegions from './pages/CRUDRegions';
import RegionAdd from './pages/Admin/RegionAdd';
import RegionEdit from './pages/Admin/RegionEdit';
import CRUDDepartment from './pages/CRUDDepartment';
import DepartmentAdd from './pages/Admin/DepartmentAdd';
import DepartmentEdit from './pages/Admin/DepartmentEdit';
import CRUDNumbers from './pages/CRUDNumbers';
import CRUDNumbersByDepartment from './pages/CRUDNumbersByDepartment';
import NumberAdd from './pages/Admin/NumberAdd';
import NumberEdit from './pages/Admin/NumberEdit';
import Login from './pages/Login';
import Registration from './pages/Registration';

import { AuthContext } from './helpers/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false
  });

  useEffect(() => {
    axios.get("http://localhost:3001/auth/authentication", {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        }
        else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);


  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Number} />
          <Route path='/naziv' exact component={Location} />
          <Route path='/odjel' exact component={Department} />
          <Route path='/login' exact component={Login} />
          <Route path='/registracija' exact component={Registration} />
          <Route path='/administrator' exact component={Administrator} />
          <Route path='/lokaliteti' exact component={CRUDRegions} />
          <Route path='/lokaliteti/uredi/:id' exact component={RegionEdit} />
          <Route path='/odjeli' exact component={CRUDDepartment} />
          <Route path='/odjeli/dodaj' exact component={DepartmentAdd} />
          <Route path='/odjeli/uredi/:id' exact component={DepartmentEdit} />
          <Route path='/brojevi' exact component={CRUDNumbers} />
          <Route path='/brojevi-odjel' exact component={CRUDNumbersByDepartment} />
          <Route path='/broj/uredi/:id' exact component={NumberEdit} />
          {authState.status && (
            <>
              <Route path='/broj/dodaj' exact component={NumberAdd} />
              <Route path='/lokaliteti/dodaj' exact component={RegionAdd} />
            </>
          )
          }
        </Switch>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;