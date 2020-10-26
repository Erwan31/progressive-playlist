import React from 'react';
import backImage from '../images/back_button.svg';

const BackButton = ({history}) => {

    if(history.location.pathname !== "/" && history.location.pathname !== "/redirect" ){
      return (
       <img src={backImage} onClick={() => history.goBack()} alt=""></img>
     );
    }
    else return <div style={{width: "120px", height: "42px", cursor: "none"}}></div>;
    
}
 
export default BackButton;