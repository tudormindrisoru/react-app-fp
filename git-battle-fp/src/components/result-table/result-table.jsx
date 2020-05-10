import React from 'react';
import './result-table.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTrophy
} from '@fortawesome/fontawesome-free-solid';
export default function ResultTable(props) {
  return(
    <table id="result-table">
        <thead>
          <tr>
            <th>Players</th>
            <th>Score</th>
            <th>Winner</th>
          </tr>
        </thead>
          {
            props.battleInfo !== null ?
             (
              <tbody>
                <tr>
                  <td>
                    <img src= { props.type === "me-vs-player" ? props.user.gitData.avatarLink :
                      props.battleInfo[0].playerData.avatar} alt="" className="player-avatar"/>
                    <span className="player-name">{props.battleInfo[0].playerData.username}</span>
                  </td>
                  <td>{props.battleInfo[0].score}</td>
                  <td>
                    {props.battleInfo[0].score > props.battleInfo[1].score ? 
                    <FontAwesomeIcon icon={faTrophy} size="1x" color="#2d3946" id="loading-spinner"/> : "" }
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src={props.battleInfo[1].playerData.avatar} alt="" className="player-avatar"/>
                    <span className="player-name">{props.battleInfo[1].playerData.username}</span>
                  </td>
                  <td>{props.battleInfo[1].score}</td>
                  <td>
                    {props.battleInfo[1].score > props.battleInfo[0].score ? 
                    <FontAwesomeIcon icon={faTrophy} size="1x" color="#2d3946" id="loading-spinner"/> : "" }
                  </td>
                </tr>
            </tbody>
            ) :
            (
              <tbody>
                <tr>
                  <td>
                    <FontAwesomeIcon spin icon="spinner" size="1x" color="#2d3946" id="loading-spinner"/>
                  </td>
                </tr>
              </tbody>
            )
          }
      </table>
  );

}