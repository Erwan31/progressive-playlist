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


class Playlists extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const playlists = this.props.playlists;
        //console.log('playlists', this.props);

        return ( 
            <main className="redirectPlaylists">
                <h2>Pick a playlist you want to reorder</h2>
                <div className="playlistsThumbnails">
                    {
                        playlists.map( (playlist, i) =>
                            <Link 
                                style={{ 
                                    textDecoration: 'none',
                                }}
                                className="wrapPlaylist"
                                onClick={ () => this.props.onSelectPlaylist(playlist.id)} 
                                to={`/playlist/${playlist.id}`} 
                                key={i}
                            >
                                <div className="playlistThumbnail">
                                    <img src={playlist.images[0].url} />
                                    <p>{playlist.name}</p>
                                </div>
                            </Link>
                        )
                    }
                </div>
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