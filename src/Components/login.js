import React from 'react';
import { Button } from 'reactstrap';
import { authEndpoint, clientId, redirectUri, scopes } from "../config";
import spotify from '../images/spotify.svg'
import ModalDisplay from './modal'
import instruction1 from '../images/instruction1.png'
import instruction2 from '../images/instruction2.png'

// Has to be part of the props to make it a reusable element
const items = [
  {
    children: <img src={instruction1} alt="instruction1" style={{width: '100%'}}></img>,
    altText: '',
    caption: '',
    key: '1'
  },
  
  {
    children: <img src={instruction2} alt="instruction2" style={{width: '100%'}}></img>,
    altText: '',
    caption: '',
    key: '2'
  },
];

const Login = () => {

    return ( 
        <>
        <main className="content">
          <div className="titleInit">
            Shuffle and Reorder your Spotify playlists with 
            harmony and a better storytelling! 
            <><ModalDisplay items={items} title={"What's PlayLits?"}/></>
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