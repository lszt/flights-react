import React, { PropTypes, Component } from 'react';
import './RadioGroup.scss';

class RadioGroup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || null,
    };
  }

  render() {
    return (
      <div className="RadioGroup">
        {this.props.items.map((item, index) => {
          let input;
          if (item.value === this.state.value) {
            input = <input type="radio" name={this.props.name} value={item.value} onChange={this.handleChange.bind(this)} checked="checked"/>;
          } else {
            input = <input type="radio" name={this.props.name} value={item.value} onChange={this.handleChange.bind(this)}/>;
          }
          return <label key={index}>{input} {item.label}</label>;
        }, this)}
      </div>
    );
  }

  handleChange(e) {
    if (e.target.checked === true) {
      this.setState({
        value: e.target.value,
      }, this.fireChangeEvent);
    }
  }

  fireChangeEvent() {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange({
        target: {
          value: this.state.value,
        },
      });
    }
  }
}

RadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default RadioGroup;
