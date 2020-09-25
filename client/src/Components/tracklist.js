import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button, ButtonGroup, ButtonToggle } from 'reactstrap';
import { redirectUri } from './../config';
import Charts from './charts';
import SlidersPanel from './sliders';
import { computeTrackFeatureCoefficient } from './scripts/sliderCoef';
import CreatePlaylits from './createPlaylits';
import { CSSTransition } from 'react-transition-group';

import '../cssTransition.css'
import reverseArrows from '.././reverse_arrows.svg'

const CRITERIA = ["danceability", "energy", "valence"];

class TrackList extends Component {
    constructor(props){
        super(props);

        this.state = {
            inProp: false,
            playlistName: "",
            tracks: [],
            tracksIDs: [],
            tracksIDsSorted: [],
            audio_features: [],
            tracksFeatures: [],
            artists: [],
            coefFeatures: [],
            average: {avD: 0, avE: 0, avM: 0},
            filteredTracksFeatures: [],
            rSelected: null,
            rDirectionInit: ["desc", "desc", "desc"],
            rDirection: ["desc", "desc", "desc"],
            slidersInit: {
                danceability: 0,
                energy: 0,
                mood: 0,
                crises: 0,
            },
            sliders: {
                danceability: 0,
                energy: 0,
                mood: 0,
                crises: 0,
            },
            reverse: false,
            playlistCreateEnable: true,
            play: { state: false, id: null, audio: null},
        };
    }

    async componentDidMount() {
        //console.log('compo did it');

        // Get up to 100 tracks from playlist 
        const token = this.props.playlistInfo.token;
        const playlistID = this.props.playlistInfo.selectedPlaylist.id;
        const headerContent = {
            Authorization: "Bearer " + token
        };

        const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
                                 {headers: headerContent});
        const data = await response.data;
        this.setState( { tracks: data.items });

        let idsAF = [];

        //Get tracks ids and request audio features
        for(let i = 0; i < this.state.tracks.length; i++){
            //console.log('id', this.state.tracks[i].track.id)
            idsAF.push(this.state.tracks[i].track.id);
        }

        const idsStringAF = idsAF.join(",");
        const response1 = await axios.get(`https://api.spotify.com/v1/audio-features/?ids=${idsStringAF}`, {headers: headerContent});
        const data1 = await response1.data;
           
        this.setState({ audio_features:  data1.audio_features});

/*
        let idsArtists = [];

        //Get artists ids and request them
        for(let i = 0; i < this.state.tracks.length; i++){
            //console.log('id', this.state.tracks[i].track.id)
            idsArtists.push(this.state.tracks[i].track.artists[0].id);
        }

        const idsStringArtists = idsArtists.join(",");
        const response2 = await axios.get(`https://api.spotify.com/v1/artists/?ids=${idsStringArtists}`, {headers: headerContent});
        const data2 = await response2.data;
           
        console.log("artists", data2);
        this.setState({ artists:  data2.artists});
*/

        /*
        // Get 3 first genre per artists, store them inside an array with a counter
        // Display the 5 main genres on the buttons
        // Init object with genre and counting its occurence
        let genres = [{genre: "", count: 0}];
        // Go through artists
        for( let i = 0; i < this.state.tracks.length; i++){
            // Store artists genres array
            const genresArtist = this.state.artists[i].genres;
            console.log("genreA", genresArtist);

            genres.forEach( genreCount => {
                genresArtist.forEach( genre =>{
                    if(genreCount.genre === genre){
                        genreCount.count++;
                    }
                    else genres.push({genre: genre, count: 1});
                })
                console.log(genreCount, genres);
            })

            // For each genre, store it if it never occured, increment count if it is already there
        }
        */


        if( this.state.audio_features.length > 0 ){

            const tracks = this.state.tracks;
            const audio_features = this.state.audio_features;
            const coefFeatures = this.state.coefFeatures;
            const sliders = this.state.sliders;
            const average = {avD: 0, avE: 0, avM: 0};
            const length = tracks.length;
             
            // No Filter tracks based on a parameter
            //const filtered_features = this.sortByAscCriteria(audio_features, "danceability");
            // useful still?????????????????????

            console.log(audio_features);

            const filtered_ids = audio_features.map( (track) => {
                average.avD += track.danceability/length;
                average.avE += track.energy/length;
                average.avM += track.valence/length;
                return track.id;
            });

            this.setState({average});

            const filteredTracksFeatures = filtered_ids.map( (id, j) => {

                coefFeatures[j] = computeTrackFeatureCoefficient( audio_features[j], average, sliders );

                for( let i = 0; i < length; i++ ){
                    //console.log( id, tracks[i].track.id);
                    if( id === tracks[i].track.id) return [tracks[i].track, audio_features[i], coefFeatures[i]];
                }
            });

            //console.log('filteredTracks', filteredTracksFeatures);
            this.setState( { inProp: true, filteredTracksFeatures, tracksFeatures: filteredTracksFeatures });
        }
    }

    // Sorting functions
    sortByAscCriteria = (arr, parameter) => {
        const sorted = arr.sort( ( a, b) =>{
            return a[1][parameter] - b[1][parameter]
        });
        return sorted;
    }

    sortByAscCoef = (arr) => {
        const sorted = arr.sort( ( a, b) =>{
            return a[2]- b[2]
        });
        return sorted;
    }

    sortByDescCriteria = (arr, parameter) => {
        const sorted = arr.sort( ( a, b) =>
        b[parameter] - a[parameter]);
        return sorted;
    }

    reverseOrderButton = (arr) => {
        const sorted = arr.sort( ( a, b) => -1);
        let reverse = this.state.reverse;
        reverse = !reverse;
        this.setState({reverse});
        console.log("reverse state", this.state.reverse, arr, sorted);
        return sorted;
    }

    reverseOrder = (arr) => {
        const sorted = arr.sort( ( a, b) => -1);
        return sorted;
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
        // If the selection is the same just reverse theA whole playlist order
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

    // Sliders
    handleSliderChange = (sliders) => {
        console.log("slidervalue change", sliders);

      //  this.setState({ sliders }); // infinite loop
        const average = this.state.average;
        const nonFilteredTracksFeatures = this.state.tracksFeatures.map( (track) => {
            // Rename better those array values as object, it's confusing
            track[2] = computeTrackFeatureCoefficient( track[1], average, sliders );
            return track;
        });

        //console.log(nonFilteredTracksFeatures);

        let filteredTracksFeatures = this.sortByAscCoef( nonFilteredTracksFeatures );
        const ratio = Math.floor(nonFilteredTracksFeatures.length/sliders.tracksNum);
        //console.log('ratio', ratio);


        // Music types to take out -> necessarly applied on the original playlist
        
        // Get into account the number of tracks chosen to make the playlist
        if( sliders.tracksNum < filteredTracksFeatures.length){
            let reducedArr = filteredTracksFeatures;
            let length = filteredTracksFeatures.length;
            const diff = filteredTracksFeatures.length - sliders.tracksNum;

            for( let k = 0; k < diff; k++){
                length--;
                reducedArr.splice(Math.floor((length-1)*Math.random()), 1);
            }
            filteredTracksFeatures = reducedArr;
        }

        // Crises swaping for a better storytelling
        if( sliders.crises !== 0 && sliders.tracksNum > 11){
            let temp = [];

            //console.log(filteredTracksFeatures);

            // Pass through all songs
            // See at what frequency swapping should happen
            // Swap in between 4 songs around the target track
            // Could it be a propotional function to smooth it out?
            for( let i = 1; i < sliders.tracksNum-2; i++){
                //console.log("track floor", i%(Math.floor(sliders.tracksNum/sliders.crises)));

                if( i>5 && i%(Math.floor(sliders.tracksNum/sliders.crises)) === 0 ){
                    temp[0] = filteredTracksFeatures[i-2];
                    temp[1] = filteredTracksFeatures[i-1];
                    temp[2] = filteredTracksFeatures[i+1];
                    temp[3] = filteredTracksFeatures[i+2];

                    filteredTracksFeatures[i+2] = temp[0];
                    filteredTracksFeatures[i+1] = temp[1];
                    filteredTracksFeatures[i-1] = temp[2];
                    filteredTracksFeatures[i-2] = temp[3];
                }
            }
        }

        // Asc or Desc -> reverse button
        console.log("reverse state filtering", this.state.reverse);
        if( this.state.reverse ){
            filteredTracksFeatures = this.reverseOrder(filteredTracksFeatures);
        }

        let idsSorted = [];
        //Get Ids sorted for playlist export to spotify
        for(let i = 0; i < filteredTracksFeatures.length; i++){
            //console.log('id', this.state.tracks[i].track.id)
            idsSorted.push(filteredTracksFeatures[i][0].id);
        }

        this.setState({tracksIDsSorted: idsSorted});

        //console.log("tracksIDSSorted", this.state.tracksIDsSorted);

        // Track enable or disabled -> hover from reactstrap to see

        this.setState({ filteredTracksFeatures });
/*
        let  filteredTracksFeatures = this.state.filteredTracksFeatures;
        const tracksFeatures = this.state.tracksFeatures;*/

        /* If tracklist is the same as at the beginning, impossible to create a playlist -> also creating bug without! */
        if( sliders !== this.state.slidersInit ){
            console.log("movement on knobs");
            this.setState({ playlistCreateEnable: false });
        }

    }

    playerClick = (id) => {
        const button = document.getElementsByClassName('previewPlayer');
        let playState = this.state.play.state;
        let previous = this.state.play.id;

        // If click on different preview button when already playing
        if( previous !== id && playState){
            // Change playstate to false
            playState = !playState;

            // Remove playing class from the guy
            button.item(previous).classList.remove("pause");
            button.item(previous).classList.add("play");
            // Stop it's audio
            this.state.play.audio.pause();
        }

        // If not playing
        if( !playState ){
            // get mp3 sample and play, also change icon to pause
            button.item(id).classList.remove("play");
            button.item(id).classList.add("pause");

            let audio = new Audio("https://p.scdn.co/mp3-preview/3eb16018c2a700240e9dfb8817b6f2d041f15eb1?cid=774b29d4f13844c495f206cafdad9c86");
            audio.play();

            // Maybe try to add ended eventlistener to the whole tracks
            audio.addEventListener("ended", e => {
                button.item(this.state.play.id).classList.remove("pause");
                button.item(this.state.play.id).classList.add("play");
                this.setState({ play: {state: false, id: null, audio: null} });
            }, false);

            this.setState({ play: {state: true, id, audio} });

        }
        else{
            let audio = this.state.play.audio;
            audio.pause();
         /*   audio.removeEventListener("ended", function(id){
                this.playerClick(id);
            }, false); */
            // change icon to play and stop sample
            button.item(id).classList.remove("pause");
            button.item(id).classList.add("play");

            this.setState({ play: {state :false, id: null, audio: null} });
        }

    }


    render() { 
        const  filteredTracksFeatures = this.state.filteredTracksFeatures;
        const token = this.props.playlistInfo.token;

        //console.log('filteredTracksFeatures', filteredTracksFeatures, filteredTracksFeatures.length);

        // Reactstrap table with up to a 100 songs displaying the album+title+...
        return (
            <main className="tracklist">
                <CSSTransition
                                    in={this.state.inProp}
                                    timeout={750}
                                    classNames="panel-appear"
                                    unmountOnExit
                >
                    <div className="playlistPage">
                        <div>
                                <div className="filterPanel">
                                    <div className="filtersKnobs">
                                        <p>Playlits Panel</p>
                                        <SlidersPanel
                                            tracksNum={filteredTracksFeatures.length} 
                                            onChangeSliders={(sliders) => this.handleSliderChange(sliders)}
                                            onGenreButtons={ (buttons) => console.log("genre change")}
                                        />
                                    </div>
                                    <Charts tracksFeatures={filteredTracksFeatures}/>
                                    <div className="sliderSideButtons">
                                        <ButtonToggle 
                                        className="buttonToggle reverse" 
                                        color="info"  
                                        onClick={ () => this.setState( {filteredTracksFeatures: this.reverseOrderButton(filteredTracksFeatures)})} 
                                        active={this.state.reverse}
                                        style={{
                                            borderRadius: '25px',
                                            boxShadow: '0px 2px 4px 0px rgba(166,82,254,0.5)'
                                        }}
                                        >
                                            <img src={reverseArrows}/>
                                        </ButtonToggle>
                                        <CreatePlaylits 
                                            auth={{Authorization: "Bearer " + token}}
                                            tracksIDs={this.state.tracksIDsSorted}
                                            name={this.props.playlistInfo.selectedPlaylist.name}
                                            playlistCreateEnable={this.state.playlistCreateEnable}
                                        />
                                    </div>
                                </div>
                        </div>
                            <div className="tableTracks">
                                <p>Playlist Tracks</p>
                                <Table
                                className = "tableTrack"  
                                hover
                                borderless
                                size="sm"
                                >
                                    <tbody>
                                        {filteredTracksFeatures.map( (track, i) => 
                                            <tr className="rowTable" key={i}>
                                                <th scope="row">
                                                    <img className="albumThumbnail" src={track[0].album.images[1].url || track[0].album.images[0].url}></img>
                                                </th>
                                                <td className="tableLine">
                                                    <div className="track">
                                                        <div className="trackName">
                                                            {track[0].name}
                                                        </div>
                                                        <div className="trackArtist">
                                                            {track[0].artists[0].name}
                                                        </div>
                                                    </div>
                                                    {track[0].preview_url !== null && 
                                                        <div className="previewPlayer play" onClick={() => this.playerClick(i)}></div>
                                                    }
                                                </td>
                                                <hr/>
                                            </tr>
                                            )
                                        }
                                    </tbody>
                                </Table>
                            </div>
                    </div>
                </CSSTransition>
            </main>
         );
    }
}
 
export default TrackList;