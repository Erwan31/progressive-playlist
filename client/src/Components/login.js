import React from 'react';
import { Button } from 'reactstrap';
import { authEndpoint, clientId, redirectUri, scopes } from "../config";

const Login = () => {

    return ( 
        <>
        <main className="content">
            <p>
                Explaination of the app and so on
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
                Login to Spotify
            </Button>
        </main>
        </>
     );
}
 
export default Login;