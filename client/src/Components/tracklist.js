import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button, ButtonGroup } from 'reactstrap';
import { redirectUri } from './../config';
import Charts from './charts';
import HorizontalCustomLabels from './sliders';

const CRITERIA = ["danceability", "energy", "valence"];

class TrackList extends Component {
    constructor(props){
        super(props);

        this.state = {
            tracks: [],
            audio_features: [],
            tracksFeatures: [],
            filteredTracksFeatures: [],
            rSelected: null,
            rDirectionInit: ["desc", "desc", "desc"],
            rDirection: ["desc", "desc", "desc"]
        };
    }

    async componentDidMount() {
        console.log('compo did it');

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


        if( this.state.audio_features.length > 0 ){

            const tracks = this.state.tracks;
            const audio_features = this.state.audio_features;

             
            // No Filter tracks based on a parameter
            //const filtered_features = this.sortByAscCriteria(audio_features, "danceability");
            const filtered_ids = audio_features.map( (track) =>
                                    track.id);
            const filteredTracksFeatures = filtered_ids.map( id => {
                for( let i = 0; i < tracks.length; i++ ){
                    //console.log( id, tracks[i].track.id);
                    if( id === tracks[i].track.id) return [tracks[i].track, audio_features[i]];
                }
            });

            // console.log('filteredTracks', filteredTracksFeatures);
            this.setState( { filteredTracksFeatures, tracksFeatures: filteredTracksFeatures });
        }
    }

    // Sorting functions
    sortByAscCriteria = (arr, parameter) => {
        const sorted = arr.sort( ( a, b) =>{
            return a[1][parameter] - b[1][parameter]
        });
        return sorted;
    }

    sortByDescCriteria = (arr, parameter) => {
        const sorted = arr.sort( ( a, b) =>
        b[parameter] - a[parameter]);
        return sorted;
    }

    reverseOrder = (arr) => {
        const sorted = arr.sort( ( a, b) => -1);
    }

    // Radio Buttons & filtering
    onCheckboxBtnClick = (selected) => {
        let rDirection = this.state.rDirection;
        const selectedDirection = rDirection[selected];
        let  filteredTracksFeatures = this.state.filteredTracksFeatures;
        const tracksFeatures = this.state.tracksFeatures;
        const rSelected = this.state.rSelected;

        // Reset state by spreading init state
        rDirection = [...this.state.rDirectionInit];

        // Modify selected state
        if( selectedDirection === "desc"){
            rDirection[selected] = "asc";
        }
        else rDirection[selected] = "desc";

        this.setState({ rSelected: selected, rDirection });
        
        //console.log('rselected', rSelected);
        // If the selection is the same just reverse the whole playlist order
        if( rSelected === selected){
            filteredTracksFeatures = this.reverseOrder( filteredTracksFeatures);
        }
        else{
            // Otherwise, change the playlist order based on the main criteria selected
            if( selected !== null ){
                //console.log('features', filteredTracksFeatures);
                filteredTracksFeatures = this.sortByAscCriteria( filteredTracksFeatures, CRITERIA[selected]);
                this.setState({ filteredTracksFeatures });
            }
            else {
                filteredTracksFeatures = tracksFeatures;
                //console.log('no selection');
            }
        }
    }


    render() { 
        const  filteredTracksFeatures = this.state.filteredTracksFeatures;
        const rSelected = this.state.rSelected;
        const rDirection = this.state.rDirection;

        console.log('filteredTracksFeatures', filteredTracksFeatures);

        // Reactstrap table with up to a 100 songs displaying the album+title+...
        return (
            <>
                <div className="filterPanel">
                    <div className="filtersKnobs">
                        <HorizontalCustomLabels />
                    </div>
                    { filteredTracksFeatures[0] && <Charts tracksFeatures={filteredTracksFeatures}/>}
                    <div className="mainFilterCriteria">Canvas</div>
                </div>
                <ButtonGroup className="criteriaButtons">
                    <Button 
                        color="success" 
                        onClick={() => this.onCheckboxBtnClick(0)}
                        active={rSelected === 0}>
                        Danceability {rSelected === 0 ? rDirection[rSelected] : ""}
                    </Button>

                    <Button 
                        color="info" 
                        onClick={() => this.onCheckboxBtnClick(1)} 
                        active={rSelected === 1}>
                        Energy {rSelected === 1 ? rDirection[rSelected] : ""}
                    </Button>
                    <Button 
                        color="warning" 
                        onClick={() => this.onCheckboxBtnClick(2)} 
                        active={rSelected === 2}>
                        Mood {rSelected === 2 ? rDirection[rSelected] : ""}
                    </Button>
                </ButtonGroup>
                <div className="tableTracks">
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
                            filteredTracksFeatures[0] && filteredTracksFeatures.map( (track, i) => 
                                <tr key={i}>
                                    <th scope="row">
                                        <img className="albumThumbnail" src={track[0].album.images[1].url || track[0].album.images[0].url}></img>
                                    </th>
                                    <td>{track[0].name}</td>
                                    <td>{track[0].artists[0].name}</td>
                                    <td>{track[0].album.name}</td>
                                </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </div>
            </>
         );
    }
}
 
export default TrackList;