import React, { Component } from 'react';

const Playlists = ({playlists}) => {
    return ( 
        <>
            <div></div>
            {
                playlists.map( (playlist) =>
                    <>
                        <img src={playlist.images[0].url} />
                    </>
                 )
            }
        </>
     );
}
 
export default Playlists;