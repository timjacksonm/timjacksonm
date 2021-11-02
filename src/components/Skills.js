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

const Section = styled.div`
  height: 640px;
  position: relative;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: MontserratExtraBoldItalic;
  font-size: clamp(1rem, 8vw, 3rem);
  margin: 0 1em;
  @media ${device.tablet} {
    height: 1024px;
    margin: 0 2em;
  }
`;
const SkillsContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 2em 0;
  z-index: 1;
`;
const SectionTitle = styled.h3`
  color: #f27d42;
  align-self: center;
  margin: 0;
  font-family: CalibreBoldItalic;
`;
const FrontEnd = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 auto;
  width: 70vw;
  min-width: 14rem;
`;
const Tools = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 auto;
  width: 70vw;
  min-width: 14rem;
`;
const BackEnd = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 auto;
  width: 70vw;
  min-width: 14rem;
`;
const Heading = styled.h5`
  margin: 0.5em 0 0 0.2em;
`;
const IconContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  & svg {
    margin: 0.2em;
  }
  & img {
    margin: 0.2em;
  }
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
  height: 48px;
`;
const WebpackIcon = styled.img`
  width: 43px;
  height: 48px;
`;
const NodejsIcon = styled.img`
  width: 79px;
  height: 48px;
`;
const FirebaseIcon = styled.img`
  width: 36px;
  height: 48px;
`;

const Skills = () => {
  return (
    <Section id="skills">
      <SkillsContent>
        <SectionTitle>Skills</SectionTitle>

        <FrontEnd>
          <Heading>Front End</Heading>
          <IconContainer>
            <Html5Icon src={html5} data-tip="Html5" alt="Html5 logo" />
            <Css3Icon src={css3} data-tip="Css3" alt="Css3 logo" />
            <JavascriptIcon data-tip="Javascript" alt="Javascript logo" />
            <ReactIcon data-tip="React & React Native" alt="React logo" />
            <StyledComponentIcon
              data-tip="Styled-Components"
              alt="Styled-Components logo"
            />
            <SassIcon data-tip="Sass" alt="Sass logo" />
            <TailwindIcon data-tip="TailwindCSS" alt="TailwindCSS logo" />
            <JestIcon data-tip="Jest" alt="Jest logo" />
          </IconContainer>
        </FrontEnd>

        <Tools>
          <Heading>Tools</Heading>
          <IconContainer>
            <GitIcon src={git} data-tip="Git" alt="Git logo" />
            <WebpackIcon src={webpack} data-tip="Webpack" alt="Webpack logo" />
          </IconContainer>
        </Tools>

        <BackEnd>
          <Heading>Back End</Heading>
          <IconContainer>
            <NodejsIcon src={nodejs} data-tip="Node.js" alt="Node.js logo" />
            <FirebaseIcon
              src={firebase}
              data-tip="Firebase"
              alt="firebase logo"
            />
          </IconContainer>
        </BackEnd>
      </SkillsContent>
    </Section>
  );
};

export default Skills;
