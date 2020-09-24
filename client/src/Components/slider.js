import React, { Component } from 'react';
import { Range, Direction, getTrackBackground } from 'react-range';


const STEP = 1;

class SliderRR extends Component {

    constructor (props, context) {
        super(props, context)
        this.state = {
            values: [this.props.min === this.props.current ? this.props.min : this.props.current]
        }
    }

  modifyValue = (value) => {
    this.props.onChange(value);
    this.setState({values: value});
  }

  render() {
    return (
        <div className='sliderPerso'>
            <div className='sliderName'>{this.props.name}</div>
            <Range
                className='sliderRange'
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
                        alignSelf: 'center',
                        height: '120px',
                        margin: '15px 15px'
                }}
            >
            <div
            className='thumbRange'
            ref={props.ref}
            style={{
                width: '5px',
                height: '100%',
                borderRadius: '4px',
                background: getTrackBackground({
                    values: this.state.values,
                    colors: [this.props.colors, '#ccc'],
                    min: this.props.min,
                    max: this.props.max,
                    direction: Direction.Up
                }),
                alignSelf: 'center',
                margin: 'auto'
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
                boxShadow: '0px 2px 6px #2C3049',
                outline: 'none'
                }}
            >
              { this.props.label &&
                <div
                  style={{
                    position: 'absolute',
                    top: '3px',
                    left: '-20px',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '11px',
                    fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                    padding: '4px',
                    borderRadius: '4px',
                    backgroundColor: this.props.colors
                  }}
                  >               
                    {this.state.values[0].toFixed(0)}
                  </div>
               }
              <div
                style={{
                  width: '16px',
                  height: '5px',
                  backgroundColor: isDragged ? this.props.colors : '#CCC'
                }}
              />
            </div>
          )}
        />
      </div>
    );
  }
}

export default SliderRR;


/*
        {
          <output style={{ marginTop: '10px', width: '56px' }} id="output">
            {this.state.values[0].toFixed(0)}
          </output>
        }
*/
