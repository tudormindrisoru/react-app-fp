import React from 'react';
import './history-table.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class HistoryTable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tableData: null,
      myName: null
    }
    this.mapTableData = this.mapTableData.bind(this);
  }

  componentDidMount = () => {
    let dataArray = [];
      for (let [key, value] of Object.entries(this.props.tableData)) {
        dataArray.push(value);
      }
      this.setState({
        tableData: dataArray,
        myName: this.props.myName
      });

  }

  mapTableData = () => {
    if(this.state.tableData !== null) {
      console.log(this.state.tableData);
      return (
        <tbody>
          {this.state.tableData.map((item,index) =>  {
            return(
              <tr>
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
          })
          }
        </tbody>
      );
  } else {
    return(<tbody>
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
        <thead>
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