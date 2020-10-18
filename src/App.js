import React, { Component } from "react";
import * as $ from "jquery";
import hash from "./hash";
import axios from 'axios';
import "./App.css";
import { Navbar,  NavbarBrand} from 'reactstrap';
import TrackList from './Components/tracklist';
import Playlists from "./Components/playlists";
import Login from './Components/login';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import{ BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import BackButton from './Components/backButton';

// Images
import logoCustom from "./logoCustom.svg"
import github from "./github.svg"
import link from "./link.svg"

class App extends Component {
  constructor() {
    super();
    this.state = {
      user_id: null,
      token: null,
      selectedPlaylist: {},
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
      playlists: [{
          ids : [], 
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
        }],
        offset: 0,
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
      const playlists = await this.getUserPlaylists(idInfo.id);
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
          return;
        }
      }
    });

    return userData;
  }

  getUserPlaylists(id) {

    let items = null;

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

  async getUserPlaylistsNew(id, offset) {

    let items = null;
    let data = null;

    // Get up to 100 tracks from playlist 
    const token = this.state.token;
    const headerContent = {
        Authorization: "Bearer " + token
    };

    try{
      const response = await axios.get(`https://api.spotify.com/v1/users/${id}/playlists`,
                                        {
                                          headers: headerContent, 
                                          params: {offset: offset }
                                        });
      data = await response.data;

      console.log("more playlists??", data);
    }
    catch(error){
      console.log("more playlists...", error);
      this.setState({
        no_data: true,
      });
    }
  
    let limit = data.limit;
    let playlists = this.state.playlists;
    items = data.items;
    playlists.push(items);
    this.setState({ limit, playlists: items });

    return items;
  }

  handleMorePlaylists = () => {
    // Get more playlist until reaching max of user
    const id = this.state.user_id;
    const offset = this.state.offset;
    this.getUserPlaylistsNew(id, offset + 20);

    this.setState({offset});
  }

  handlePlaylistSelection = (id, name) => {
    // Update state by passing the id of the selected playlist
    // Possibly just pass the necessary info to the component then
    this.setState({selectedPlaylist: {id, name}});
  }


  render() {

    return (
      <>
        <Router>
          <Navbar className="navbarRS">
            <NavbarBrand 
              href="/"
              className="navbarBrandRS"
              style={{
                color: 'white',
                fontSize: '2rem',
              }}
            >
              <img src={logoCustom} className="App-logo" alt="logo" ></img>
              PlayLits
            </NavbarBrand>
              <NavbarBrand className="backButton">
                <Route component={BackButton} />
              </NavbarBrand> 
          </Navbar>
          <div className="App">
            <header className="App-header">
              <Route render={({location}) => (
                  <TransitionGroup>
                    <CSSTransition
                      key={location.pathname}
                      in={this.state.inProp}
                      timeout={1250}
                      classNames="playlistAppear"
                      unmountOnExit
                    >
                      <Switch location={location}>
                        <Route path="/redirect" 
                        render={() => <Playlists 
                                        playlists={this.state.playlists} 
                                        onSelectPlaylist={this.handlePlaylistSelection}
                                        loadMorePlaylists={this.handleMorePlaylists} 
                                />} 
                        />
                        <Route path="/playlist/:id" render={() => <TrackList playlistInfo={this.state} />}/>
                        <Route path="/" exact component={Login} />
                      </Switch>
                    </CSSTransition>
                  </TransitionGroup>
                )}
              />
            </header>
          </div>
        </Router>
        <footer>
          <div className="designedby">
            <hr className="line"></hr> 
            Designed by Erwan Spilmont-2020
            <a href="https://www.erwanspilmont.dev"><img  src={link} alt="link" className="footLink"/></a>
            <a href="https://github.com/Erwan31/progressive-playlist"><img src={github} alt="github" className="footLink"/></a>
          </div>
        </footer>
      </>
    );
  }
}

export default App;
