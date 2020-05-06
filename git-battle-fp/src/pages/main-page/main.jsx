import React from 'react';
// { useState } 

// import { useSelector } from 'react-redux'; 
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './main.scss';

import Sidenav from '../../components/sidenav/sidenav';
import BattlePage from '../battle/battle';
import HistoryPage from '../history/history';
import StatisticsPage from '../statistics/statistics';

// import AuthPage from '../auth/auth';



export default function Main() {

  // const user = useSelector(state => state.user);

  return(
    <div className="main">
      <Router>
        <Sidenav/>
        <div id="page-container">
          <Switch>
            {/* <Route path="/auth">
              <AuthPage />
            </Route> */}
            <Route path="/history">
              <HistoryPage />
            </Route>
            <Route path="/battle">
              <BattlePage />
            </Route>
            <Route path="/statistics">
              <StatisticsPage />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}
