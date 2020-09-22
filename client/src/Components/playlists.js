import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import TrackList from './tracklist';
import { CSSTransition } from 'react-transition-group'

import '../App.css'

class Playlists extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            inProp: false,
         }
    }

    componentDidMount() {
        this.setState({inProp: true})
    }

    render() { 
        const playlists = this.props.playlists;
        //console.log('playlists', this.props);

        //this.myTween.kill().clear().pause(0);

        return ( 
            <main className="redirectPlaylists">
                <h2>Select one of your playlist to playlits it!</h2>
                <CSSTransition 
                            in={this.state.inProp}
                            timeout={5000}
                            classNames="playlistAppear"
                        >
                    <div className="playlistsThumbnails">
                    {
                        playlists.map( (playlist, i) =>
                            <div>
                                <Link 
                                    style={{ 
                                        textDecoration: 'none',
                                    }}
                                    className="wrapPlaylist"
                                    onClick={ () => this.props.onSelectPlaylist(playlist.id, playlist.name)} 
                                    to={`/playlist/${playlist.id}`} 
                                    key={i}
                                >
                                    <div className="playlistThumbnail">
                                        <img src={playlist.images[0].url} />
                                        <p>{playlist.name}</p>
                                    </div>
                                </Link>

                            </div>
                        )
                    }
                    </div>
                </CSSTransition>
            </main>
         ); 
    }
}
 
export default Playlists;

/*
const Playlists = ({playlists}) => {

    console.log('playlists', playlists);
    return ( 
        <>
            <h2>Pick a playlist you want to reorder</h2>
            <div className="playlistsThumbnails">
                {
                    playlists.map( (playlist, i) =>
                        <Link 
                            onClick={ () => playlists.onSelectPlaylist(playlist.id)} 
                            to={`/playlist/${playlist.id}`} 
                            className="playlistThumbnail" 
                            key={i}>
                            <img src={playlist.images[0].url} />
                            <p>{playlist.name}</p>
                        </Link>
                    )
                }
            </div>
        </>
     );
}
 
export default Playlists;

*/