import React, { Component } from 'react'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

class HorizontalCustomLabels extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      danceability: 0,
      energy: 0,
      mood: 50,
      crises: 0,
    }
  }

  handleChangeVertical = (value, parameter) => {
    const values = this.state;
    values[parameter] = value;

    console.log('values', value, values[parameter]);

    this.setState({
        danceability:  values.danceability,
        energy:  values.energy,
        mood:  values.mood,
        crises: values.crises});
  };

  render () {
    const { danceability, energy, mood, crises } = this.state
    const dLabels = { 0: '', 100: 'Booty Shake'};
    const eLabels = { 0: 'Sloth', 100: 'A lot'};
    const mLabels = { 0: 'Sad', 50: 'Neutral', 100: 'Happy'};
    const cLabels = { 0: 'None', 100: 'Many'};

    const formatPc = p => p + '%';

    return (
        <div className="sliders">
            <div className='slider custom-labels sliderPerso'>
            Danceability
            <Slider
                value={danceability}
                orientation='vertical'
                labels={dLabels}
                handleLabel={danceability}
                format={formatPc}

                onChange={(danceability) => this.handleChangeVertical( danceability, "danceability")}
            />
            <div className='value'>{formatPc(danceability)}</div>
        </div>
        <div className='slider custom-labels sliderPerso'>
            Energy
            <Slider
                value={energy}
                orientation='vertical'
                labels={eLabels}
                handleLabel={energy}
                format={formatPc}

                onChange={(energy) => this.handleChangeVertical( energy, "energy")}
            />
            <div className='value'>{formatPc(energy)}</div>
        </div>
        <div className='slider custom-labels sliderPerso'>
            Mood
            <Slider
                value={mood}
                orientation='vertical'
                labels={mLabels}
                handleLabel={mood}
                format={formatPc}

                onChange={(mood) => this.handleChangeVertical( mood, "mood")}
            />
            <div className='value'>{formatPc(mood)}</div>
        </div>
        <div className='slider custom-labels sliderPerso'>
            Crises Rate
            <Slider
                value={crises}
                orientation='vertical'
                labels={cLabels}
                handleLabel={crises}
                format={formatPc}

                onChange={(crises) => this.handleChangeVertical( crises, "crises")}
            />
            <div className='value'>{formatPc(crises)}</div>
        </div>
      </div>
    )
  }
}

export default HorizontalCustomLabels