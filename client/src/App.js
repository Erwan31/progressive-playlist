import React, { Component } from "react";
import * as $ from "jquery";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import hash from "./hash";
import Player from "./Components/Player";
import "./App.css";
import { Navbar,  NavbarBrand, Button, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle} from 'reactstrap';
import logo from "./logo.svg";
import TrackList from './Components/tracklist';

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      item: {
        album: {
          images: [{ url: "" }]
        },
        name: "",
        artists: [{ name: "" }],
        duration_ms: 0
      },
      is_playing: "Paused",
      progress_ms: 0,
      no_data: false,
      playlists: {
        ids : []
      },
      playlists: [{ 
          collaborative: false,
          description: "",
          external_urls: {
            spotify: ""
          },
          href: "",
          images: [{
            url: ""
          }],
          name: "",
          tracks: {
            href:"",
            total: null,
          },
          uri: ""
        }]
    };

    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
    this.getUserPlaylists = this.getUserPlaylists.bind(this);
    this.tick = this.tick.bind(this);
  }



  componentDidMount() {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
      this.getCurrentlyPlaying(_token);
      this.getUserPlaylists(_token);
    }

    // set interval for polling every 5 seconds
   // this.interval = setInterval(() => this.tick(), 60000);
  }

  componentWillUnmount() {
    // clear the interval to save resources
    clearInterval(this.interval);
  }

  tick() {
    if(this.state.token) {
      this.getCurrentlyPlaying(this.state.token);
    }
  }


  getCurrentlyPlaying(token) {
    // Make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/me/player",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        // Checks if the data is not empty
        if(!data) {
          this.setState({
            no_data: true,
          });
          return;
        }

        this.setState({
          item: data.item,
          is_playing: data.is_playing,
          progress_ms: data.progress_ms,
          no_data: false /* We need to "reset" the boolean, in case the
                            user does not give F5 and has opened his Spotify. */
        });
      }
    });
  }

  getUserPlaylists(token) {
    // Make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/users/me/playlists",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        // Checks if the data is not empty
        if(!data) {
          this.setState({
            no_data: true,
          });
          return;
        }

        let limit = data.limit;
        let items = data.items;
        this.setState({ limit, playlists: items });
        
        console.log('fct print', this.state.playlists);

      }
    });
  }

  render() {
    if(this.state.playlists[0].images[0].url) console.log(' render print', this.state.playlists[0].images[0].url);

    return (
      <div className="App">
        <Navbar className="navbarRS">
          <NavbarBrand 
            href="/"
            className="navbarBrandRS"
          >
            <img src={logo} className="App-logo" alt="logo" ></img>
            Progressive Playlist
          </NavbarBrand>
        </Navbar>
        <header className="App-header">
          {!this.state.token && (
            <>
              <h1></h1>
              <p>
                Explaination of the app and so on
              </p>
              <Button
                color="success"
                size="lg"
                //className="btn btn--loginApp-link"
                href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                  "%20"
                )}&response_type=token&show_dialog=true`}
              >
                Login to Spotify
              </Button>
            </>
          )}
          {this.state.token && !this.state.no_data && (
            <>
              <img src={this.state.playlists[0].images[0].url}></img>
              <Player
                item={this.state.item}
                is_playing={this.state.is_playing}
                progress_ms={this.state.progress_ms}
              />
              <TrackList/>
            </>
          )}
          {this.state.no_data && (
            <p>
              You need to be playing a song on Spotify, for something to appear here.
            </p>
          )}
        </header>
      </div>
    );
  }
}

export default App;
