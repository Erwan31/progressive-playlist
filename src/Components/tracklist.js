import React, { Component } from 'react';
import axios from 'axios';
import { Table, ButtonToggle } from 'reactstrap';
import Charts from './charts';
import SlidersPanel from './sliders';
import { computeTrackFeatureCoefficient } from './scripts/sliderCoef';
import CreatePlaylits from './createPlaylits';
import { CSSTransition } from 'react-transition-group';

import '../cssTransition.css'
import reverseArrows from '../images/reverse_arrows.svg'
import ModalDisplay from './modal';
import parametersDescription from '../images/parameters-description.jpg'
import store from "store"

const CRITERIA = ["danceability", "energy", "valence"];
// Has to be part of the props to make it a reusable element
const items = [
    {
        children: <img src={parametersDescription} alt="parameters-description" style={{width: '100%'}}></img>,
        altText: '',
        caption: '',
        key: '1'
      },
  ];


class TrackList extends Component {
    constructor(props){
        super(props);

        this.state = {
            loadmore: {
                offset: 0,
                nomore: false
            },
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
        // Get up to 100 tracks from playlist 
        const token = this.props.playlistInfo.token !== null ? this.props.playlistInfo.token : store.get("token");
        const playlistID = this.props.playlistInfo.selectedPlaylist.id !== undefined ? this.props.playlistInfo.selectedPlaylist.id : store.get("selectedPlaylist").id;
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
            idsAF.push(this.state.tracks[i].track.id);
        }

        const idsStringAF = idsAF.join(",");
        const response1 = await axios.get(`https://api.spotify.com/v1/audio-features/?ids=${idsStringAF}`, {headers: headerContent});
        const data1 = await response1.data;
           
        this.setState({ audio_features:  data1.audio_features});

/*
        // Failure for genre sorting code...to be continued
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
                    if( id === tracks[i].track.id){
                        return [tracks[i].track, audio_features[i], coefFeatures[i]];
                    };
                }
                return null;
            });
            this.setState( { inProp: true, filteredTracksFeatures, tracksFeatures: filteredTracksFeatures, loadmore: {offset: this.state.tracks.length }});
        }
    }

    componentWillUnmount(){
        // Shut down player altogether when changing page if playing
        const playState = this.state.play;
        if( playState.audio !== null){
            playState.audio.pause();
            playState.audio = null;
        }
    }

    async loadMoreTracks(){
                // Get up to 100 tracks from playlist 
                const token = this.props.playlistInfo.token;
                const playlistID = this.props.playlistInfo.selectedPlaylist.id;
                const offset = this.state.loadmore.offset;
                let tracks = this.state.tracks;

                const headerContent = {
                    Authorization: "Bearer " + token
                };
        
                const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
                                         {
                                             headers: headerContent,
                                            params: {offset: offset,
                                                     limit: 50
                                                    }
                                         });
                const data = await response.data;

                if(data.items.length !== 0){
                    tracks.push(...data.items)
                    this.setState( { tracks });
            
                    let idsAF = [];
            
                    //Get tracks ids and request audio features
                    for(let i = 0; i < data.items.length; i++){
                        idsAF.push(data.items[i].track.id);
                    }
            
                    const idsStringAF = idsAF.join(",");
                    const response1 = await axios.get(`https://api.spotify.com/v1/audio-features/?ids=${idsStringAF}`, {headers: headerContent});
                    const data1 = await response1.data;

                    if( data1.audio_features.length > 0 ){

                        let audioFeatures = this.state.audio_features;
                        audioFeatures.push(...data1.audio_features);
                        this.setState({ audio_features:  data1.audio_features});

                        const tracks = this.state.tracks;
                        const audio_features = audioFeatures;
                        const coefFeatures = this.state.coefFeatures;
                        const sliders = this.state.sliders;
                        const average = {avD: 0, avE: 0, avM: 0};
                        const length = tracks.length;
                        
                        // No Filter tracks based on a parameter
                        //const filtered_features = this.sortByAscCriteria(audio_features, "danceability");
                        // useful still?????????????????????
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
                                if( id === tracks[i].track.id){
                                    return [tracks[i].track, audio_features[i], coefFeatures[i]];
                                };
                            }
                            return null;
                        });

                        const currentFTF = this.state.filteredTracksFeatures.push(filteredTracksFeatures);

                        this.setState( { inProp: true, filteredTracksFeatures: currentFTF, tracksFeatures: currentFTF, loadmore: {offset: this.state.tracks.length } });
                    }

                }
                else{
                    // In case the click on Load more was returning null
                    this.setState({ loadmore: {nomore: true}});
                }

                console.log("!!!!!!!!", this.state);
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
        const sorted = arr.reverse();
        const reverse = !this.state.reverse;

        this.setState({reverse, filteredTracksFeatures: sorted});
    }

    reverseOrder = (arr) => {
        // Used with reverse state condition
        const sorted = arr.reverse();
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
        
        // If the selection is the same just reverse the whole playlist order
        if( rSelected === selected){
            filteredTracksFeatures = this.reverseOrder( filteredTracksFeatures );
        }
        else{
            // Otherwise, change the playlist order based on the main criteria selected
            if( selected !== null ){
                filteredTracksFeatures = this.sortByAscCriteria( filteredTracksFeatures, CRITERIA[selected]);
                this.setState({ filteredTracksFeatures });
            }
            else {
                filteredTracksFeatures = tracksFeatures;
            }
        }
    }

    // Sliders
    handleSliderChange = (sliders) => {
        // In case tracks are filtered while playing, stop and reset play state
        let play = this.state.play;
        if( play.state ){
            // Reset all player buttons with play icon
            const buttons = document.getElementsByClassName('previewPlayer');
            buttons.item(play.id).classList.remove("pause");
            buttons.item(play.id).classList.add("play");

            // Stop current audio if playing
            play.audio.pause();
            play.audio.currentTime = 0;
            play = { state: false, id: null, audio: null};

            this.setState({play});
        }

        const average = this.state.average;
        const nonFilteredTracksFeatures = this.state.tracksFeatures.map( (track) => {
            // Rename better those array values as object, it's confusing
            track[2] = computeTrackFeatureCoefficient( track[1], average, sliders );
            return track;
        });

        let filteredTracksFeatures = this.sortByAscCoef( nonFilteredTracksFeatures );

        // Music types to take out -> necessarly applied on the original playlist
        
        // Get into account the number of tracks chosen to make the playlist
        /*if( sliders.tracksNum < filteredTracksFeatures.length){

            let reducedArr = filteredTracksFeatures;
            let length = filteredTracksFeatures.length;
            const diff = filteredTracksFeatures.length - sliders.tracksNum;

            for( let k = 0; k < diff; k++){
                length--;
                reducedArr.splice(Math.floor((length-1)*Math.random()), 1);
            }
            filteredTracksFeatures = reducedArr;
        }*/

        // New filtering based on the double thumb range of track change
        if( (sliders.tracksMax - sliders.tracksMin) !== filteredTracksFeatures.length){
            let reducedArr = filteredTracksFeatures;
            let min = sliders.tracksMin;
            let max = sliders.tracksMax;
            
            // To always have a minimum of 10 tracks inside the playlist
            // Manage collisions of the thumbs
            if(max - min < 10){
                if(max + 5 < this.state.tracks.length){
                    max = max + 5;
                    min = min - 5;
                }
                else{
                    max = this.state.tracks.length;
                    min = this.state.tracks.length - 10;
                }

                if(min - 5 < 0){
                    max = 10;
                    min = 0;
                }
            }

            reducedArr = reducedArr.slice(min, max);
            filteredTracksFeatures = reducedArr;
        }

        // Crises swaping for a better storytelling
        if( sliders.crises !== 0 && sliders.tracksNum > 11){
            let temp = [];

            // Pass through all songs
            // See at what frequency swapping should happen
            // Swap in between 4 songs around the target track
            // Could it be a propotional function to smooth it out?
            for( let i = 1; i < sliders.tracksNum-2; i++){
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
        if( this.state.reverse ){
            filteredTracksFeatures = this.reverseOrder(filteredTracksFeatures);
        }

        let idsSorted = [];
        //Get Ids sorted for playlist export to spotify
        for(let i = 0; i < filteredTracksFeatures.length; i++){
            idsSorted.push(filteredTracksFeatures[i][0].id);
        }
        this.setState({tracksIDsSorted: idsSorted, filteredTracksFeatures});

        /* If tracklist is the same as at the beginning, impossible to create a playlist -> also creating bug without! */
        if( sliders !== this.state.slidersInit ){
            this.setState({ playlistCreateEnable: false });
        }
    }

    playerClick = (id, preview) => {
        const buttons = document.getElementsByClassName('previewPlayer');
        let playState = this.state.play.state;
        let previous = this.state.play.id;

        // If click on different preview buttons when already playing
        if( previous !== id && playState){
            // Change playstate to false
            playState = !playState;

            // Remove playing class from the guy
            buttons.item(previous).classList.remove("pause");
            buttons.item(previous).classList.add("play");
            // Stop it's audio
            this.state.play.audio.pause();
        }

        // If not playing
        if( !playState ){
            // get mp3 sample and play, also change icon to pause
            buttons.item(id).classList.remove("play");
            buttons.item(id).classList.add("pause");

            let audio = new Audio(preview);
            audio.volume = 0.4;
            audio.play();

            // Maybe try to add ended eventlistener to the whole tracks
            audio.addEventListener("ended", e => {
                buttons.item(this.state.play.id).classList.remove("pause");
                buttons.item(this.state.play.id).classList.add("play");
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
            buttons.item(id).classList.remove("pause");
            buttons.item(id).classList.add("play");

            this.setState({ play: {state :false, id: null, audio: null} });
        }

    }

    hrefToSpotify = (href) => {

    }

    render() { 
        const tracks = this.state.tracks;
        const  filteredTracksFeatures = this.state.filteredTracksFeatures;
        const token = this.props.playlistInfo.token;
        const playListName = this.props.playlistInfo.selectedPlaylist.name;

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
                                        <p className="titlePanel">PlayLits Panel <ModalDisplay items={items} title={"Parameters Description"}/></p>
                                        <SlidersPanel
                                            tracksNumMax={tracks.length}
                                            tracksNum={filteredTracksFeatures.length}
                                            reverse={this.state.reverse} 
                                            onChangeSliders={(sliders) => this.handleSliderChange(sliders)}
                                            //onGenreButtons={ (buttons) => console.log("genre change")}
                                        />
                                    </div>
                                    <Charts tracksFeatures={filteredTracksFeatures}/>
                                    <div className="sliderSideButtons">
                                        <ButtonToggle 
                                        className="buttonToggle reverse" 
                                        color="info"  
                                        onClick={ () => this.reverseOrderButton(filteredTracksFeatures) } 
                                        active={this.state.reverse}
                                        style={{
                                            borderRadius: '25px',
                                            boxShadow: '0px 2px 4px 0px rgba(166,82,254,0.5)'
                                        }}
                                        >
                                            <img src={reverseArrows} alt="#"/>
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
                            <p>Tracks from</p>
                            <p className="playlistName">{playListName}</p>
                            { this.state.loadmore.offset%50 === 0  &&
                               !this.state.loadmore.nomore &&
                                <div 
                                    className="loadMore"
                                    onClick={ () => this.loadMoreTracks() } 
                                >
                                        Load More...
                                </div>
                            }
                            <Table
                                className = "tableTrack"  
                                hover
                                borderless
                                size="sm"
                            >
                                <tbody>
                                    {filteredTracksFeatures.map( (track, i) => 
                                        <tr className="rowTable" key={track[0].id}>
                                            <th scope="row">
                                                <a style={{display: "table-cell"}} href={`https://open.spotify.com/track/${track[0].id}`} target="_blank">
                                                    <img className="albumThumbnail" src={track[0].album.images[1].url || track[0].album.images[0].url} alt="#"></img>
                                                </a>
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
                                                {track[0].preview_url !== null ?
                                                    <div className="player"> 
                                                        <div className="previewPlayer play" onClick={() => this.playerClick(i, track[0].preview_url)}></div>
                                                        <div className="progressBar">
                                                            {// Player timeline if playing 
                                                                /*   (i === this.state.play.id && this.state.play.state) &&
                                                                <Progress animated value={50} />*/
                                                            }
                                                        </div>
                                                    </div>
                                                    :<div className="player"> 
                                                        <div className="previewPlayer"></div>
                                                        </div>
                                                }
                                            </td>
                                            <span className="hr"/>
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