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
        />
      </div>
    )
  }

  /*
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
  */
}

export default SlidersPanel;