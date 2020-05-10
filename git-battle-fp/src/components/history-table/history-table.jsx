import React from 'react';
import './history-table.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  } from '@fortawesome/fontawesome-free-solid';


class HistoryTable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tableData: null,
      myName: null,
      interval: null,
      keyList: null
    }
    this.mapTableData = this.mapTableData.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.interval !== prevProps.interval)
    this.setState({
      tableData: this.state.tableData,
      myName: this.state.myName,
      interval: this.props.interval,
      keyList: this.state.keyList
    });
  }

  componentDidMount = () => {

    if(this.props.tableData !== null) {
      let dataArray = [];
      let keyArray = [];
      for (let [key, value] of Object.entries(this.props.tableData)) {
        dataArray.push(value);
        keyArray.push(key);
      }
      this.setState({
        tableData: dataArray,
        myName: this.props.myName,
        interval: this.props.interval,
        keyList: keyArray
      });
    }

  }

  mapTableData = () => {
    if(this.state.tableData !== null) {
      return (
        <tbody key="bodyKey">
          {this.state.tableData.map((item,index) =>  {
            if(this.state.interval !== null) {
              if(this.state.interval[0] <= index && this.state.interval[1] > index) {
                return(
                  <tr key = {this.state.keyList[index]}>
                  <td>
                    <img src={item.opponent.playerData.avatar} alt="" className="player-avatar"/>
                    <span className="player-name">{item.opponent.playerData.username}</span>
                  </td>
                  <td>{item.opponent.score}</td>
                  <td>{item.myScore}</td>
                  <td>
                    {item.myScore === item.opponent.score ? "" : 
                    (item.myScore > item.opponent.score ? this.state.myName : 
                    item.opponent.playerData.username)}
                  </td>
                </tr>
                )
              }
            } else return(
              <tr key="spinner-icon">
                <td>
                  <FontAwesomeIcon spin icon="spinner" size="2x" color="#2d3946" id="loading-spinner"/>
                </td>
              </tr>
            )
          })}
        </tbody >
      );
  } else {
    return(<tbody key="bodyKey">
      <tr>
        <td>
          <FontAwesomeIcon spin icon="spinner" size="1x" color="#2d3946" id="loading-spinner"/>
        </td>
      </tr>
    </tbody>);
  }}

  render() {
    return(
      <table id="history-table">
        <thead key="headKey">
          <tr>
            <th>Opponent</th>
            <th>Opponent score</th>
            <th>Your score</th>
            <th>Winner</th>
          </tr>
        </thead>
          {this.mapTableData()}
      </table>
    );

  }
}

export default HistoryTable;