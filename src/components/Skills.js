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
  min-height: 640px;
  position: relative;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: MontserratExtraBoldItalic;
  font-size: clamp(1rem, 8vw, 3rem);
  margin: 0 1em;
  @media ${device.tablet} {
    min-height: 1024px;
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
  width: 100%;
  min-width: 14rem;
`;
const Tools = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  min-width: 14rem;
`;
const BackEnd = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  min-width: 14rem;
`;
const Heading = styled.h5`
  margin: 0.5em;
  text-align: center;
  @media ${device.tablet} {
    text-align: left;
  }
`;
const SkillsContainer = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0;
  & svg {
    margin: 0.2em;
  }
  & img {
    margin: 0.2em;
  }
  @media ${device.tablet} {
    justify-content: unset;
  }
`;
const Skill = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 0.5em;
  font-size: clamp(1rem, 5vw, 1.2rem);
  font-family: CalibreRegular;
  font-weight: 600;
  flex: 1;
  min-height: 100px;
  min-width: 100px;
  max-height: 100px;
  max-width: 100px;
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
  width: 25vw;
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
          <SkillsContainer>
            <Skill>
              <Html5Icon src={html5} alt="Html5 logo" />
              HTML5
            </Skill>
            <Skill>
              <Css3Icon src={css3} alt="Css3 logo" />
              CSS3
            </Skill>
            <Skill>
              <JavascriptIcon alt="Javascript logo" />
              Javascript
            </Skill>
            <Skill>
              <ReactIcon alt="React logo" />
              React & {''} <br></br> React-Native
            </Skill>
            <Skill>
              <StyledComponentIcon alt="Styled-Components logo" />
              Styled-Components
            </Skill>
            <Skill>
              <SassIcon alt="Sass logo" />
              SASS
            </Skill>
            <Skill>
              <TailwindIcon alt="TailwindCSS logo" />
              TailwindCSS
            </Skill>
            <Skill>
              <JestIcon alt="Jest logo" />
              Jest
            </Skill>
          </SkillsContainer>
        </FrontEnd>

        <Tools>
          <Heading>Tools</Heading>
          <SkillsContainer>
            <Skill>
              <GitIcon src={git} alt="Git logo" />
              Git
            </Skill>
            <Skill>
              <WebpackIcon src={webpack} alt="Webpack logo" />
              Webpack
            </Skill>
          </SkillsContainer>
        </Tools>

        <BackEnd>
          <Heading>Back End</Heading>
          <SkillsContainer>
            <Skill>
              <NodejsIcon src={nodejs} alt="Node.js logo" />
              Node.js
            </Skill>
            <Skill>
              <FirebaseIcon src={firebase} alt="firebase logo" />
              Firebase
            </Skill>
          </SkillsContainer>
        </BackEnd>
      </SkillsContent>
    </Section>
  );
};

export default Skills;
