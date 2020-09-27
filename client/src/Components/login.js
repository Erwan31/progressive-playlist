import React from 'react';
import { Button } from 'reactstrap';
import { authEndpoint, clientId, redirectUri, scopes } from "../config";
import spotify from '../spotify.svg'

const Login = () => {

    return ( 
        <>
        <main className="content">
            <h1>What's PlayLits?</h1>
            <p>
              After connecting yourself with Spotify in here
            </p>
            <Button
                style={{
                    fontStyle: "bold",
                    fontSize: "20px",
                    height: "50px",
                    width: "250px",
                    borderRadius: "25px",
                    margin: "15px"
                    }} 
                color="success"
                size="lg"
                //className="btn btn--loginApp-link"
                href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
                )}&response_type=token&show_dialog=true`}
            >
              <img src={spotify} alt="#"/> Login to Spotify
            </Button>
            <div>Explaination</div>
        </main>
        </>
     );
}
 
export default Login;