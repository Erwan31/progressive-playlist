import React, { Component } from 'react';
import { Range, Direction, getTrackBackground } from 'react-range';


const STEP = 1;
const MIN = 0;
const MAX = 100;

class SliderRR extends Component {

    constructor (props, context) {
        super(props, context)
        this.state = {
            tracksNumMax: this.props.tracksNum,
            tracksNum: this.props.tracksNum,
            danceability: 0,
            energy: 0,
            mood: 0,
            crises: 0,

            values: [0]
        }
    }

  modifyValue = (value) => {
    this.props.onChange(value);
    this.setState({values: value});
  }

  render() {
    return (
        <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          flexDirection: 'column',
          margin: '30px 0px'
        }}
      >
        <Range
          direction={Direction.Up}
          values={this.state.values}
          step={STEP}
          min={this.props.min}
          max={this.props.max}
          onChange={values => this.modifyValue(values)}
          onFinalChange ={ this.props.onFinalChange }
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                flexGrow: 1,
                width: '36px',
                display: 'flex',
                height: '150px'
              }}
            >
              <div
                ref={props.ref}
                style={{
                  width: '5px',
                  height: '100%',
                  borderRadius: '4px',
                  background: getTrackBackground({
                    values: this.state.values,
                    colors: [this.props.colors, '#ccc'],
                    min: MIN,
                    max: MAX,
                    direction: Direction.Up
                  }),
                  alignSelf: 'center'
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props, isDragged }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '30px',
                width: '30px',
                borderRadius: '4px',
                backgroundColor: '#FFF',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0px 2px 6px #2C3049'
              }}
            >
              <div
                style={{
                  width: '16px',
                  height: '5px',
                  backgroundColor: isDragged ? '#3A77E0' : '#CCC'
                }}
              />
            </div>
          )}
        />
        {
          <output style={{ marginTop: '50px', width: '56px' }} id="output">
            {this.state.values[0].toFixed(0)}
          </output>
        }
      </div>
    );
  }
}

export default SliderRR;
