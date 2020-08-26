import React from 'react';
import axios from 'axios';

const Login = () => {

    const loginGet = () => {
        axios.get('/login').then(response => {
            this.setState({cars: response.data});
            console.log(response.data)
          })
    }
    return ( 
        <>
            <div className="container">
            <div id="login">
                <h1>This is an example of the Authorization Code flow</h1>
                <button onClick={loginGet} className="btn btn-primary">Log in with Spotify</button>
            </div>
            <div id="loggedin">
                <div id="user-profile">
                </div>
                <div id="oauth">
                </div>
                <button className="btn btn-default" id="obtain-new-token">Obtain new token using the refresh token</button>
            </div>
            </div>
        </>
     );
}
 
export default Login;