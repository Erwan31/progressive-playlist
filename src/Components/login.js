import React from 'react';
import { Button } from 'reactstrap';
import { authEndpoint, clientId, redirectUri, scopes } from "../config";
import spotify from '../spotify.svg'
import playlits1 from '../playlits1.PNG'
import playlits2 from '../playlits2.PNG'
import ModalExample from './modal'

const Login = () => {

    return ( 
        <>
        <main className="content">
          <div className="titleInit">
            Shuffle and Reorder your Spotify playlists with 
            harmony and a better storytelling!<ModalExample/>
            <br/>
          </div>
          <section className="connection">
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
          </section>
        </main>
        </>
     );
}
 
export default Login;