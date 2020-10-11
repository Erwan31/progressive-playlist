import React, { Component } from 'react'
import SliderRR from './slider'

class SlidersPanel extends Component {
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
    this.props.onChangeSliders(state);
  }

  genreToggle = (num) => {
    const genre = [...this.state.genre];

    genre[num] = !genre[num];
    this.setState({genre});
  }

  reverseOrder = () => {
    let reverse = this.state.reverse;

    this.props.onReverse();

    reverse = !reverse;

    this.setState({reverse});

  }

  render() {
    const { tracksNumMax } = this.state;

    return (
      <div className="sliders">
        {
          tracksNumMax > 10 ? 
          <SliderRR 
            name={"Tracks"}
            max={tracksNumMax} 
            min={10} 
            current={tracksNumMax}
            disabled={false} 
            colors={'#A850FE'} 
            label={true}
            onChange={(value) => this.handleChangeVertical( value, "tracksNum")}
            onFinalChange = { () => this.handleAndDelayChangeComplete() }
            labelRange={{max: `${tracksNumMax}`, min: "10"}}
          />
          :<SliderRR 
            name={"Tracks"}
            max={10} 
            min={0} 
            current={0} 
            disabled={true}
            colors={'grey'}
            label={false} 
            onChange={() => null}
            onFinalChange = { () => null }
            labelRange={{max: "-", min: "-"}}
          />
        }
        
        <SliderRR
          name={"Danceability"} 
          max={100} 
          min={0} 
          current={0} 
          disabled={false} 
          colors={'#6EDF36'}
          label={false}  
          onChange={(value) => this.handleChangeVertical( value, "danceability")}
          onFinalChange = { () => this.handleAndDelayChangeComplete() }
          labelRange={{max: "Booty Shake", min: "Static"}}
        />
        <SliderRR
          name={"Energy"} 
          max={100} 
          min={0} 
          current={0}
          disabled={false}  
          colors={'#3A77E0'}
          label={false}  
          onChange={(value) => this.handleChangeVertical( value, "energy")}
          onFinalChange = { () => this.handleAndDelayChangeComplete() }
          labelRange={{max: "Intense", min: "Chill"}}
        />
        <SliderRR 
          name={"Mood"}
          max={100} 
          min={0} 
          current={0}
          disabled={false}  
          colors={'#EB690F'}
          label={false}  
          onChange={(value) => this.handleChangeVertical( value, "mood")}
          onFinalChange = { () => this.handleAndDelayChangeComplete() }
          labelRange={{max: "Happy", min: "Sad"}}
        />
        <SliderRR
          name={"Crises"} 
          max={6} 
          min={1} 
          current={1}
          disabled={false}  
          colors={'#1F2436'}
          label={false}  
          onChange={(value) => this.handleChangeVertical( value, "crises")}
          onFinalChange = { () => this.handleAndDelayChangeComplete() }
          labelRange={{max: "Some", min: "None"}}
        />
      </div>
    )
  }
}

export default SlidersPanel;