import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';

class TrackList extends Component {
    constructor(props){
        super(props);

        this.state = {
            tracks: [],
            filteredTracks: [],
            audio_features: []
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

        let ids = [];

        //Get tracks ids and request audio features
        for(let i = 0; i < this.state.tracks.length; i++){
            //console.log('id', this.state.tracks[i].track.id)
            ids.push(this.state.tracks[i].track.id);
        }

        const idsString = ids.join(",");
        const response1 = await axios.get(`https://api.spotify.com/v1/audio-features/?ids=${idsString}`, {headers: headerContent});
        const data1 = await response1.data;
           
        this.setState({ audio_features:  data1.audio_features});
    }

    sortByAscCriteria = (arr, parameter) => {
        const sorted = arr.sort( ( a, b) =>
        a[parameter] - b[parameter]);

        return sorted
    }

    sortByDescCriteria = (arr, parameter) => {
        const sorted = arr.sort( ( a, b) =>
        b[parameter] - a[parameter]);

        return sorted
    }


    render() { 
        const tracks = this.state.tracks;
        const audio_features = this.state.audio_features;
        let filteredTracks = [];

        if( audio_features.length > 0 ){
            // Filter tracks based on a parameter
            const filtered_features = this.sortByAscCriteria(audio_features, "danceability");
            const filtered_ids = filtered_features.map( (track) =>
                                    track.id);
            const filteredTracks = filtered_ids.map( id => {
                for( let i = 0; i < tracks.length; i++ ){
                    //console.log( id, tracks[i].track.id);
                    if( id === tracks[i].track.id) return tracks[i].track;
                }
            });

            console.log('filteredTracks', filteredTracks);
            this.setState( { filteredTracks });
        }

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
                           filteredTracks && filteredTracks.map( (track, i) => 
                            <tr key={i}>
                                <th scope="row">
                                    <img className="albumThumbnail" src={track.album.images[1].url || track.album.images[0].url}></img>
                                </th>
                                <td>{track.name}</td>
                                <td>{track.artists[0].name}</td>
                                <td>{track.album.name}</td>
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