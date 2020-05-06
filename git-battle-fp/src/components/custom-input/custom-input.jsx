import React from 'react';
import './custom-input.scss';
export default function CustomInput(props) {


const changeValue = (value) => {
  props.getValue(value);
}

  return( 
    <div className="input-field">
      <input type= { props.type } id="custom-input" onChange = {(event) => changeValue(event.target.value)} required />
      <label htmlFor="custom-input"> {props.label}</label>
    </div>
  )
}