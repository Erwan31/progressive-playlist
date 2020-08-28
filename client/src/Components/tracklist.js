import React, { Component } from 'react';
import axios from 'axios';

class TrackList extends Component {
    constructor(props){
        super(props);

        this.state = {
            tracks: []
        };
    }

    async componentDidMount() {
        // Get up to 100 tracks from playlist 
        const token = this.props.playlistInfo.token;
        const playlistID = this.props.playlistInfo.selectedPlaylist;
        const headerContent = {
            Authorization: "Bearer " + token
        };

        const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {headers: headerContent});
        const data = await response.data;
        console.log('tracklist', data);
           
    }

    render() { 

        console.log('render tracklist', this.props);

        // Reactstrap table with up to a 100 songs displaying the album+title+...
        return ( 
            <div>
                Tracklist
            </div>
         );
    }
}
 
export default TrackList;