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

      values: [50]
    }
  }

  handleChangeVertical = (value, parameter) => {
    const values = this.state;
    values[parameter] = value;

    //console.log('values', value, parameter);

    this.setState({
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

  render() {
    return (
      <>
        <SliderRR 
          max={100} 
          min={0} 
          current={40} 
          colors={'#3A77E0'} 
          onChange={(value) => this.handleChangeVertical( value, "energy")}
          onFinalChange = { () => this.handleAndDelayChangeComplete() }
        />
      </>
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