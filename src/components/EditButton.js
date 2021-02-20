import React from 'react';

const EditButton = (props) => { 
    return (
      <button onClick={ () => props.onClick(props.index)}   className={ props.addClass } >
       <i className={props.icon}></i> { props.text }
      </button>
    );
  }
  export default EditButton;



 