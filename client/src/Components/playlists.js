import React, { Component } from 'react';

const Playlists = ({playlists}) => {
    return ( 
        <>
            <div className="playlistsThumbnails">
                {
                    playlists.map( (playlist) =>
                        <div className="playlistThumbnail">
                            <img src={playlist.images[0].url} />
                            <p>{playlist.name}</p>
                        </div>
                    )
                }
            </div>
        </>
     );
}
 
export default Playlists;