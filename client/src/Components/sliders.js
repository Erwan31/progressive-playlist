import React, { Component } from 'react'
//import Slider from 'react-rangeslider'
//import 'react-rangeslider/lib/index.css'
/*
import { Range, getTrackBackground, Direction } from 'react-range';
import Slider from './slider';
const STEP = 1;
const MIN = 0;
const MAX = 100;
*/

import SliderRR from './slider'
import { ButtonToggle, ButtonGroup } from "reactstrap";


class HorizontalCustomLabels extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      tracksNumMax: this.props.tracksNum,
      tracksNum: this.props.tracksNum,
      danceability: 0,
      energy: 0,
      mood: 0,
      crises: 0,
      reverse: false,
      genre: [true, true, true, true, true]
    }
  }

  handleChangeVertical = (value, parameter) => {
    const values = this.state;
    values[parameter] = value;

    console.log('values', value, parameter);

    this.setState({
        tracksNum: values.tracksNum,
        danceability:  values.danceability,
        energy:  values.energy,
        mood:  values.mood,
        crises: values.crises
    });
  };

  handleAndDelayChangeComplete = () => {
    const state = this.state;

    console.log(state);

    this.props.onChangeSliders(state);
  }

  genreToggle = (num) => {
    const genre = [...this.state.genre];

    genre[num] = !genre[num];

    //console.log("genre", genre);
    this.setState({genre});
  }

  reverseOrder = () => {
    let reverse = this.state.reverse;

    this.props.onReverse();

    reverse = !reverse;

    this.setState({reverse});

  }

  render() {
    const { tracksNum, tracksNumMax,danceability, energy, mood, crises } = this.state;

    //console.log("max tracks", tracksNumMax);

    return (
      <div className="sliders">
        <div className="sliderSideButtons">
          <div className="genreButtons">
            Genre
            <ButtonGroup vertical>
              <ButtonToggle 
                className="buttonToggle" 
                onClick={() => this.genreToggle(0)} active={this.state.genre[0]}>
                  1
              </ButtonToggle>
              <ButtonToggle 
                className="buttonToggle" 
                onClick={() => this.genreToggle(1)} 
                active={this.state.genre[1]}>
                  2
              </ButtonToggle>
              <ButtonToggle 
                className="buttonToggle" 
                onClick={() => this.genreToggle(2)} 
                active={this.state.genre[2]}>
                  3
              </ButtonToggle>
            </ButtonGroup>
          </div>
          <ButtonToggle 
            className="buttonToggle reverse" 
            color="info"  
            onClick={this.reverseOrder} 
            active={this.state.reverse}
            style={{
              fontSize: "12px",
              height: "50px",
              width: "75px",
              borderRadius: "25px",
              margin: "15px"
            }}>
              Reverse
          </ButtonToggle>
        </div>

        <SliderRR 
          name={"Tracks"}
          max={tracksNumMax} 
          min={10} 
          current={tracksNumMax} 
          colors={'#A850FE'} 
          onChange={(value) => this.handleChangeVertical( value, "tracksNum")}
          onFinalChange = { () => this.handleAndDelayChangeComplete() }
        />
        <SliderRR
          name={"Danceability"} 
          max={100} 
          min={0} 
          current={0} 
          colors={'#6EDF36'} 
          onChange={(value) => this.handleChangeVertical( value, "danceability")}
          onFinalChange = { () => this.handleAndDelayChangeComplete() }
        />
        <SliderRR
          name={"Energy"} 
          max={100} 
          min={0} 
          current={0} 
          colors={'#3A77E0'} 
          onChange={(value) => this.handleChangeVertical( value, "energy")}
          onFinalChange = { () => this.handleAndDelayChangeComplete() }
        />
        <SliderRR 
          name={"Mood"}
          max={100} 
          min={0} 
          current={0} 
          colors={'#EB690F'} 
          onChange={(value) => this.handleChangeVertical( value, "mood")}
          onFinalChange = { () => this.handleAndDelayChangeComplete() }
        />
        <SliderRR
          name={"Crises"} 
          max={6} 
          min={1} 
          current={1} 
          colors={'#1F2436'} 
          onChange={(value) => this.handleChangeVertical( value, "crises")}
          onFinalChange = { () => this.handleAndDelayChangeComplete() }
        />
      </div>
    )
  }

  /*
  render () {
    const { tracksNum, tracksNumMax,danceability, energy, mood, crises } = this.state;
    const tLabels = { 0: '10', 100: 'All'};
    const dLabels = { 0: '', 100: 'Booty Shake'};
    const eLabels = { 0: 'Sloth', 100: 'A lot'};
    const mLabels = { 0: 'Sad', 50: 'Neutral', 100: 'Happy'};
    const cLabels = { 0: 'None', 100: 'Many'};

    console.log('tracksNum', tracksNum);

    return (
        <div className="sliders">
            <div className='slider custom-labels sliderPerso'>
                Tracks
                <Slider
                    min={10}
                    max={tracksNumMax}
                    value={tracksNum}
                    orientation='vertical'
                    labels={tLabels}
                    onChange={(tracks) => this.handleChangeVertical( tracks, "tracksNum")}
                    onChangeComplete={ () => this.handleAndDelayChangeComplete()}
                />
            </div>
            <div className='slider custom-labels sliderPerso'>
                Danceability
                <Slider
                    value={danceability}
                    orientation='vertical'
                    labels={dLabels}
                    onChange={(danceability) => this.handleChangeVertical( danceability, "danceability")}
                    onChangeComplete={ () => this.handleAndDelayChangeComplete()}
                />
            </div>
            <div className='slider custom-labels sliderPerso'>
                Energy
                <Slider
                    value={energy}
                    orientation='vertical'
                    labels={eLabels}
                    onChange={(energy) => this.handleChangeVertical( energy, "energy")}
                    onChangeComplete={ () => this.handleAndDelayChangeComplete()}
                />
            </div>
            <div className='slider custom-labels sliderPerso'>
                Mood
                <Slider
                    value={mood}
                    orientation='vertical'
                    labels={mLabels}
                    onChange={(mood) => this.handleChangeVertical( mood, "mood")}
                    onChangeComplete={ () => this.handleAndDelayChangeComplete()}
                />
            </div>
            <div className='slider custom-labels sliderPerso'>
                Crises Rate
                <Slider
                    value={crises}
                    orientation='vertical'
                    labels={cLabels}
                    onChange={(crises) => this.handleChangeVertical( crises, "crises")}
                    onChangeComplete={ () => this.handleAndDelayChangeComplete()}
                />
            </div>
      </div>
    )
  }
  */
}

export default HorizontalCustomLabels