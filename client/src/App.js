import React, { Component } from "react";
import * as $ from "jquery";
import hash from "./hash";
import Player from "./Components/Player";
import "./App.css";
import { Navbar,  NavbarBrand, Button, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle} from 'reactstrap';
import logo from "./logo.svg";
import TrackList from './Components/tracklist';
import Playlists from "./Components/playlists";
import Login from './Components/login';
import {

  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user_id: null,
      token: null,
      selectedPlaylist: null,
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
    this.getUserInfo = this.getUserInfo.bind(this);
    this.tick = this.tick.bind(this);
  }



  async componentDidMount() {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token
      });

      
      const idInfo = await this.getUserInfo(_token);
      const playlists = this.getUserPlaylists(idInfo.id);

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

        console.log(data);

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

  async getUserInfo(token) {

    // Make a call using the token
    const userData = await $.ajax({
      url: 'https://api.spotify.com/v1/me',
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        // Checks if the data is not empty
        if(!data) {
          console.log('data', data);
          this.setState({
            no_data: true,
          });
          return;
        }
        else{
          const id = data.id;
          this.setState({user_id: id});
          console.log('id', this.state.user_id);
          return;
        }
      }
    });

    return userData;
  }

  getUserPlaylists(id) {

    let items = null;

    console.log('id before playlist',this.state.user_id);

    // Make a call using the token
    $.ajax({
      url: `https://api.spotify.com/v1/users/${id}/playlists`,
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + this.state.token);
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
        items = data.items;
        this.setState({ limit, playlists: items });
      }
    });

    return items;
  }

  handlePlaylistSelection = (id) => {
    // Update state by passing the id of the selected playlist
    // Possibly just pass the necessary info to the component then
    this.setState({selectedPlaylist: id});
  }


  render() {
    if(this.state.playlists[0].images[0].url) console.log(' render print', this.state.playlists[0].images[0].url);

    return (
      <Router>
        <Navbar className="navbarRS">
          <NavbarBrand 
            href="/"
            className="navbarBrandRS"
          >
            <img src={logo} className="App-logo" alt="logo" ></img>
            Playlits
          </NavbarBrand>
        </Navbar>
        <div className="App">
          <header className="App-header">
            <Switch>
              <Route path="/redirect" 
              render={() => <Playlists playlists={this.state.playlists} 
              onSelectPlaylist={this.handlePlaylistSelection} />} />
              <Route path="/playlist/:id" render={() => <TrackList playlistInfo={this.state} />}/>
              <Route path="/" exact component={Login} />
            </Switch>
          </header>
        </div>
      </Router>
    );
  }
}

export default App;
