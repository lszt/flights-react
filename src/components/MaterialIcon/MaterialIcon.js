import React from 'react';
import styled from 'styled-components';

const I = styled.i`
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: ${props => props.size}px;
  display: inline-block;
  width: 1em;
  height: 1em;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: 'liga';
  
  /* align vertically with text */
  vertical-align: middle;
`;

class MaterialIcon extends React.PureComponent {
  render() {
    return <I className={this.props.className} size={this.props.size} title={this.props.title}>{this.props.icon}</I>;
  }
}

MaterialIcon.propTypes = {
  icon: React.PropTypes.string.isRequired,
  className: React.PropTypes.string,
  size: React.PropTypes.number,
  title: React.PropTypes.string
};

MaterialIcon.defaultProps = {
  size: 24
};

export default MaterialIcon;
