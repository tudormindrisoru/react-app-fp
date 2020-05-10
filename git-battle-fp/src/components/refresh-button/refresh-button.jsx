import React from 'react';
import './refresh-button.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faRedoAlt
} from '@fortawesome/fontawesome-free-solid';
export default function RefreshButton (props) {


  return (
    <button id="refresh-button" onClick= {() => props.onClick()}>
      <FontAwesomeIcon icon= {faRedoAlt} size="3x" color="#2d3946" id="refresh-icon"/>
      <span>REFRESH</span>
    </button>
  );
}