import React from 'react';
import styled from 'styled-components';
import Logo from '../Logo';

const Wrapper = styled.header`
  position: absolute;
  height: 25%;
  width: 100%;
  background-color: ${props => props.theme.colors.background};
  padding: 10px;
  box-sizing: border-box;
`;

const StyledLogo = styled(Logo)`
  height: 85%;
`;

const Header = () => (
  <Wrapper>
    <a href="#/"><StyledLogo className="logo"/></a>
  </Wrapper>
);

export default Header;
