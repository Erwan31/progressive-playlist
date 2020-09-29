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
          <div>Shuffle and Reorder your Spotify playlists </div>
            <section className="instruction1">
              <img src={playlits1} alt="playlists"></img>
              <div >Pick one of your playlists!</div>
            </section>
            <section className="instruction2">
              <div>
                <ul>Then just play around the knobs: 
                  <li>Danceable (from static to booty shaking)</li>
                  <li>Energy (from calm to intensity)</li>
                  <li>Mood (from sad to happy)</li>
                </ul>
                After that simply export your new playlist to your account in one click and enjoy!
              </div>
              <img src={playlits2} alt="playlists"></img>
            </section>
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
              <ModalExample/>
            </section>
        </main>
        </>
     );
}
 
export default Login;