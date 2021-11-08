import React from 'react';
import styled from 'styled-components';
import Home from './components/Home';
import Skills from './components/Skills';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import ReactTooltip from 'react-tooltip';
import CalibreBoldItalic from './assets/Calibre-BoldItalic.ttf';
import CalibreRegular from './assets/Calibre-Regular.ttf';
import MontserratBold from './assets/Montserrat-Bold.ttf';
import MontserratExtraBold from './assets/Montserrat-ExtraBold.ttf';
import MontserratExtraBoldItalic from './assets/Montserrat-ExtraBoldItalic.ttf';
import Footer from './components/Footer';

const GlobalStyles = styled.div`
  display: flex;
  flex-direction: column;
  @font-face {
    font-family: CalibreRegular;
    font-display: block;
    src: url(${CalibreRegular}) format('truetype');
  }
  @font-face {
    font-family: CalibreBoldItalic;
    font-display: block;
    src: url(${CalibreBoldItalic}) format('truetype');
  }
  @font-face {
    font-family: MontserratBold;
    font-display: block;
    src: url(${MontserratBold}) format('truetype');
  }
  @font-face {
    font-family: MontserratExtraBold;
    font-display: block;
    src: url(${MontserratExtraBold}) format('truetype');
  }
  @font-face {
    font-family: MontserratExtraBoldItalic;
    font-display: block;
    src: url(${MontserratExtraBoldItalic}) format('truetype');
  }
`;
const App = () => {
  return (
    <GlobalStyles>
      <Home />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
      <ReactTooltip />
    </GlobalStyles>
  );
};

export default App;
