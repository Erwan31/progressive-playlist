import React from 'react';
import backImage from '../back_button.svg';

const BackButton = ({history}) => {

    if(history.location.pathname !== "/" && history.location.pathname !== "/redirect" ){
      return (
       <img src={backImage} onClick={() => history.goBack()}></img>
     );
    }
    else return null;
    
}
 
export default BackButton;