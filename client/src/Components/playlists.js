import React, { Component } from 'react';
import {
    Link
} from "react-router-dom";
import { CSSTransition } from 'react-transition-group';

import '../cssTransition.css';
import noPlaylists from '../no_playlists.svg';

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

        return ( 
            <main className="redirectPlaylists">
                {playlists.length > 1 ?
                <>
                    <h2>Select one of your playlist to PlayLits it!</h2>
                    <CSSTransition 
                                in={this.state.inProp}
                                timeout={750}
                                classNames="playlistAppear"
                                unmountOnExit
                    >
                        <div className="playlistsThumbnails">
                        {
                            playlists.map( (playlist, i) =>
                                <div key={playlist.id+i}>
                                    <Link 
                                        style={{ 
                                            textDecoration: 'none',
                                        }}
                                        className="wrapPlaylist"
                                        onClick={ () => {
                                            this.setState({inProp: false}); // not working
                                            this.props.onSelectPlaylist(playlist.id, playlist.name)
                                        }} 
                                        to={`/playlist/${playlist.id}`} 
                                        key={i}
                                    >
                                        <div className="playlistThumbnail">
                                            <img src={playlist.images[0].url} alt="#"/>
                                            <p>{playlist.name}</p>
                                        </div>
                                    </Link>
                                </div>
                            )
                        }
                        </div>
                    </CSSTransition>
                </>
                : <div className="nothingToShow"><img src={noPlaylists} alt="noPlaylists"/></div>
                }
            </main>
         ); 
    }
}
 
export default Playlists;