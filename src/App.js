import React from 'react';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

const GlobalStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #000;
  color: #fff;
`;
const App = () => {
  return (
    <GlobalStyles>
      <Navbar />
      <Home />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </GlobalStyles>
  );
};

export default App;
