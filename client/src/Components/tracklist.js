import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';

class TrackList extends Component {
    constructor(props){
        super(props);

        this.state = {
            tracks: [],
            filteredTracks: [],
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
        
        this.setState( { tracks: data.items });

           
    }

    render() { 

        console.log('render tracklist', this.props);
        console.log('tracks', this.state.tracks);
        const tracks = this.state.tracks;

        // Reactstrap table with up to a 100 songs displaying the album+title+...
        return ( 
            <div className="tableTracks">
                <div className="filterPanel">
                    <div className="filtersKnobs">Knobs</div>
                    <div className="graphCanvas">Graph</div>
                    <div className="mainFilterCriteria">Canvas</div>
                </div>
                <Table  hover>
                    <thead>
                    <tr>
                        <th></th>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Album</th>
                    </tr>
                    </thead>

                    <tbody>
                        {
                            tracks.map( (track, i) => 
                            <tr key={i}>
                                <th scope="row">
                                    <img className="albumThumbnail" src={track.track.album.images[1].url}></img>
                                </th>
                                <td>{track.track.name}</td>
                                <td>{track.track.artists[0].name}</td>
                                <td>{track.track.album.name}</td>
                            </tr>
                            )
                        }
                    </tbody>
                </Table>
            </div>
         );
    }
}
 
export default TrackList;