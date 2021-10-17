import React from 'react';
import styled from 'styled-components';
import Home from './components/Home';
import Navbar from './components/Navbar';
import ReactTooltip from 'react-tooltip';
import CalibreBoldItalic from './assets/Calibre-BoldItalic.ttf';
import MontserrratBold from './assets/Montserrat-ExtraBold.ttf';

const GlobalStyles = styled.div`
  display: flex;
  flex-direction: column;
  @font-face {
    font-family: 'CalibreBoldItalic';
    src: url(${CalibreBoldItalic}) format('truetype');
  }
  font-face {
    font-family: 'MontserrratBold';
    src: url(${MontserrratBold}) format('truetype');
  }
`;
const App = () => {
  return (
    <GlobalStyles>
      <Navbar />
      <Home />
      <ReactTooltip />
    </GlobalStyles>
  );
};

export default App;
