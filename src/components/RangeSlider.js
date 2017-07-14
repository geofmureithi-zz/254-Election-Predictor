import React from 'react';

import { Input } from 'semantic-ui-react'

class RangeSlider extends React.Component {

  // constructor
  constructor (props) {
    super(props)
    this.state = {
      value: this.props.value
    }
  }


  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
    this.props.onChange(this.props.candidate, event.target.value);
  }

  render() {
    const {value} = this.state;
    const {label, min,  max} = this.props;
    return (
      <div style={{ width: "400px"}}>
        <Input
          fluid
          type='range'
          min={min}
          max={max}
          value={value}
          onChange={this.handleChange.bind(this)}
         />
      </div>
    )
  }
}

export default RangeSlider;
