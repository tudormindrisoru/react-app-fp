
import React from 'react'
import './sidenav.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHistory, 
  faSignInAlt, 
  faChevronRight, 
  faChartBar, 
  faUserNinja, 
  faGem 
} from '@fortawesome/fontawesome-free-solid';
import {
  Link
} from "react-router-dom";

class Sidenav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      extended: false
    }
    this.extend = this.extend.bind(this);
  }


  extend = () => {
    if(this.state.extended) {
      document.querySelector('.sidenav-container').classList.remove('extended-sidenav');
      document.querySelector('#arrow-icon').classList.remove('rotated-icon');
      document.querySelector('.diamonds-container').classList.remove('diamonds-container-extended');
      let labels = document.getElementsByClassName('navigation-labels');
      for(let index = 0; index < labels.length; index++) {
        labels[index].classList.add('label-hidden')
      }
    } else if(!this.state.extended) {
      document.querySelector('.sidenav-container').classList.add('extended-sidenav');
      document.querySelector('#arrow-icon').classList.add('rotated-icon');
      document.querySelector('.diamonds-container').classList.add('diamonds-container-extended');
      let labels = document.getElementsByClassName('navigation-labels');
      for(let index = 0; index < labels.length; index++) {
        labels[index].classList.remove('label-hidden')
      }
    }
    this.setState({
      extended: !this.state.extended
    });
  }

    render() {
      return <div className="sidenav-container">
        <div className="sidenav-navigation">
          <div className="top-navigation">
            <div className="logo-container">
              <h4>Logo</h4>
            </div>
            <div className="navigation-item">
            <FontAwesomeIcon icon={faSignInAlt} size="2x" className="font-icon" color="#fff"/>
              <span className="navigation-labels label-hidden">Login</span>
            </div>
            <div className="diamonds-container">
              <FontAwesomeIcon icon={faGem} size="sm" className="font-icon" color="#fff"/>
              <span id="number-of-diamonds">10</span>
            </div>
           
          </div>
          <div className="bottom-navigation">
          <Link to="/history" style={{ textDecoration: 'none' }}>
            <div className="navigation-item">
              <FontAwesomeIcon icon={faHistory} size="2x" className="font-icon" color="#fff"/>
              <span className="navigation-labels label-hidden">History</span>
            </div>
          </Link>
          <Link to="/battle" style={{ textDecoration: 'none' }}>
            <div className="navigation-item">
            <FontAwesomeIcon icon={faUserNinja} size="2x" className="font-icon" color="#fff"/>
              <span className="navigation-labels label-hidden">Battle</span>
            </div>
          </Link>
          <Link to="/statistics" style={{ textDecoration: 'none' }}>
            <div className="navigation-item">
            <FontAwesomeIcon icon={faChartBar} size="2x" className="font-icon" color="#fff"/>
              <span className="navigation-labels label-hidden">Statistics</span>
            </div>
          </Link>
            <div className="navigation-item" onClick={this.extend}>
              <FontAwesomeIcon icon={faChevronRight} size="2x" className="font-icon" color="#fff" id="arrow-icon"/>
            </div>
        </div>
        </div>
      </div>
    }
}

export default Sidenav