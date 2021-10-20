import React from 'react';
import styled from 'styled-components';
import { device } from '../globalHelpers';
import { FaJsSquare, FaReact, FaSass } from 'react-icons/fa';
import { SiStyledcomponents, SiTailwindcss, SiJest } from 'react-icons/si';
import css3 from '../assets/css3.png';
import firebase from '../assets/firebase.png';
import git from '../assets/git.png';
import html5 from '../assets/html5.png';
import nodejs from '../assets/nodejs.svg';
import webpack from '../assets/webpack.png';

const SectionContent = styled.div`
  height: 640px;
  position: relative;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: clamp(1rem, 8vw, 3rem);
  margin: 0 2em;
  @media ${device.tablet} {
    height: 1024px;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 2em 0;
  z-index: 1;
`;
const Title = styled.h3`
  font-family: CalibreBoldItalic;
  color: #f27d42;
  align-self: center;
  margin: 0;
`;
const Heading = styled.h6`
  margin: 0.5em 0;
`;
const IconContainer = styled.div``;
const FrontEnd = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 auto;
  width: 50vw;
  min-width: 14rem;
`;
const Tools = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 auto;
  width: 50vw;
  min-width: 14rem;
`;
const BackEnd = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 auto;
  width: 50vw;
  min-width: 14rem;
`;
const JavascriptIcon = styled(FaJsSquare)`
  fill: #f0db4f;
  min-height: 48px;
  min-width: 48px;
`;
const ReactIcon = styled(FaReact)`
  fill: #61dbfb;
  min-height: 48px;
  min-width: 48px;
`;
const StyledComponentIcon = styled(SiStyledcomponents)`
  fill: #be54a9;
  min-height: 48px;
  min-width: 48px;
`;
const SassIcon = styled(FaSass)`
  fill: #cc6699;
  min-height: 48px;
  min-width: 48px;
`;
const TailwindIcon = styled(SiTailwindcss)`
  fill: #03a9f4;
  min-height: 48px;
  min-width: 48px;
`;
const JestIcon = styled(SiJest)`
  fill: #c63d14;
  min-height: 48px;
  min-width: 48px;
`;
const Html5Icon = styled.img`
  width: 48px;
  height: 48px;
`;
const Css3Icon = styled.img`
  width: 48px;
  height: 48px;
`;
const GitIcon = styled.img`
  width: 48px;
`;
const WebpackIcon = styled.img`
  width: 43px;
`;
const NodejsIcon = styled.img`
  width: 79px;
`;
const FirebaseIcon = styled.img`
  width: 36px;
`;

const Skills = () => {
  return (
    <SectionContent>
      <Container id="container">
        <Title>Skills</Title>

        <FrontEnd id="frontend">
          <Heading>Front End</Heading>
          <IconContainer id="iconContainer">
            <Html5Icon src={html5} data-tip="Html5" />
            <Css3Icon src={css3} data-tip="Css3" />
            <JavascriptIcon data-tip="Javascript" />
            <ReactIcon data-tip="React & React Native" />
            <StyledComponentIcon data-tip="Styled-Components" />
            <SassIcon data-tip="Sass" />
            <TailwindIcon data-tip="Tailwindcss" />
            <JestIcon data-tip="Jest" />
          </IconContainer>
        </FrontEnd>

        <Tools id="tools">
          <Heading>Tools</Heading>
          <IconContainer id="iconContainer">
            <GitIcon src={git} data-tip="Git" />
            <WebpackIcon src={webpack} data-tip="Webpack" />
          </IconContainer>
        </Tools>

        <BackEnd id="backend">
          <Heading>Back End</Heading>
          <IconContainer id="iconContainer">
            <NodejsIcon src={nodejs} data-tip="Node.js" />
            <FirebaseIcon src={firebase} data-tip="Firebase" />
          </IconContainer>
        </BackEnd>
      </Container>
    </SectionContent>
  );
};

export default Skills;
