import React from 'react';
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

class Main extends React.Component {
    render() {
      return (
        <div className="main">
          <Router>
            <Sidenav></Sidenav>
            <div id="page-container">
              <Switch>
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
}

export default Main