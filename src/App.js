import React from 'react';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import CalibreBoldItalic from './assets/Calibre-BoldItalic.ttf';

const GlobalStyles = styled.div`
  @font-face {
    font-family: 'CalibreBoldItalic';
    src: url(${CalibreBoldItalic}) format('truetype');
  }
`;
const App = () => {
  return (
    <GlobalStyles>
      {/* <Navbar /> */}
      <Home />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </GlobalStyles>
  );
};

export default App;
