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

const Playlists = ({playlists}) => {

    console.log('playlists', playlists);
    return ( 
        <>
            <h2>Pick a playlist you want to reorder</h2>
            <div className="playlistsThumbnails">
                {
                    playlists.map( (playlist) =>
                        <Link to={`/playlist/${playlist.id}`}className="playlistThumbnail" key={playlist.id}>
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