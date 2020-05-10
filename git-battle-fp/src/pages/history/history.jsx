import React, { useEffect } from 'react';
import './history.scss';
import { useSelector } from 'react-redux'; 
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HistoryTable from '../../components/history-table/history-table';

function HistoryPage () {
  const user = useSelector(state => state.user);
  const history = useHistory();

  useEffect(() => {
    if(!user.isLogged) {
      history.replace('/');
    }
  });

  const renderHistory = () => {
    if(!user.isLogged) {
      return(
          <FontAwesomeIcon spin icon="spinner" size="8x" color="#2d3946" id="loading-spinner"/>
      )
    } else {
      return(
        <HistoryTable tableData = {user.userData.history} myName = {user.gitData.username} />
      )
    }
  }
      return (
        <div className="history-container">
          {renderHistory()}
        </div>
      );
}

export default HistoryPage