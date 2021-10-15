import React from 'react';
import styled from 'styled-components';
import Home from './components/Home';
import Navbar from './components/Navbar';
import CalibreBoldItalic from './assets/Calibre-BoldItalic.ttf';

const GlobalStyles = styled.div`
  display: flex;
  flex-direction: column;
  @font-face {
    font-family: 'CalibreBoldItalic';
    src: url(${CalibreBoldItalic}) format('truetype');
  }
`;
const App = () => {
  return (
    <GlobalStyles>
      <Navbar />
      <Home />
    </GlobalStyles>
  );
};

export default App;
