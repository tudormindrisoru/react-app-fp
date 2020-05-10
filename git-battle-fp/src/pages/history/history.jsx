import React, { useEffect, useState } from 'react';
import './history.scss';
import { useSelector } from 'react-redux'; 
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HistoryTable from '../../components/history-table/history-table';

function HistoryPage () {
  const user = useSelector(state => state.user);
  const [interval, setinterval] = useState([0,10]);
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
      if(user.userData.history !== null){

        return(
          <HistoryTable tableData = {user.userData.history} myName = {user.gitData.username} interval = {interval}/>
        )
      }
      else {
        return(<p>You don`t have an history!</p>);
      }
    }
  }

  const increseInterval = () => {
    let dataArray = [];
    for (let [, value] of Object.entries(user.userData.history)) {
      dataArray.push(value);
    }
    if(dataArray !== null) {
      if(dataArray.length >= interval[0] + 10) {
        setinterval([interval[0] + 10,interval[1] + 10]);
      }
    
    }
  }

  const decreseInterval = () => {

    let dataArray = [];
    for (let [, value] of Object.entries(user.userData.history)) {
      dataArray.push(value);
    }
    if(dataArray !== null) {
      if(interval[0] - 10 >= 0) {
        setinterval([interval[0] - 10,interval[1] - 10]);
      }
    }

  }
  
  return (
    <div className="history-container">
      {renderHistory()}
      {
        user.isLogged && user.userData.history != null ? (
          <div className="table-controller-data">
          <button id="previous-button" 
          onClick = {() => decreseInterval()}
          >Previous</button>
          <button id="next-button" 
          onClick = {() => increseInterval()}
          >Next</button>
      </div>
        ) : (<div></div>)
      }
    </div>
  );
}

export default HistoryPage