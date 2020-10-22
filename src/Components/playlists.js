import React, { Component } from 'react';
import {
    Link
} from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import { Button } from 'reactstrap';

import '../cssTransition.css';
import noPlaylists from '../no_playlists.svg';
import noPlaylistThumbnail from '../no_playlist_thumbnail.svg'
import store from "store";

class Playlists extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            inProp: false,
            playlists: this.props.playlists,
         }
    }

    componentDidMount() {
        this.setState({inProp: true})
    }

    /*
    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.playlists !== prevState.playlists){
            return { playlists: nextProps.playlists}
        }
        else return null;
    }
    */

    render() { 
        let playlists = this.props.playlists;
        let localStorage = null;
   
        if(playlists.length < 2){
           // Try to parse previously stored playlists within the storage
            localStorage = store.get("playlists");

            console.log(localStorage);

            if(localStorage) playlists = JSON.parse(localStorage); 
        }
        else{
            // Otherwise store the loaded playlists
            store.set('playlists', JSON.stringify(playlists));
        }
        
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
                                        {
                                            playlist.images[0] !== null && playlist.images[0] !== undefined ?
                                            <div className="playlistThumbnail">
                                                <img src={playlist.images[0].url} alt="#"/>
                                                <p>{playlist.name}</p>
                                            </div>
                                            :
                                            <div className="playlistThumbnail">
                                                <img src={noPlaylistThumbnail} alt="#"/>
                                                <p>{playlist.name}</p>
                                            </div>
                                        }
                                    </Link>
                                </div>
                            )
                        }
                        </div>
                    </CSSTransition>
                </>
                : <CSSTransition 
                    in={this.state.inProp}
                    timeout={3000}
                    classNames="errorAppear"
                    unmountOnExit
                    >
                        <div className="nothingToShow"><img src={noPlaylists} alt="noPlaylists"/></div>
                  </CSSTransition>
                }

                { playlists.length % 20 === 0 && localStorage === null &&
                    <div 
                        className="loadMore"
                        onClick={ () => this.props.loadMorePlaylists() } 
                    >
                            Load More...
                    </div>
                }
                
            </main>
         ); 
    }
}
 
export default Playlists;