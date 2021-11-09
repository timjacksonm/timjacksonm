import React from 'react';
import styled from 'styled-components';
import { device } from '../globalHelpers';
import BottomWave from '../assets/wave2.svg';
import IconsAboutMe from './IconsAboutMe/index';

const Section = styled.div`
  height: calc(100vh + 211px);
  position: relative;
  background: linear-gradient(to bottom, #55bdca 1%, #022949 99%);
  display: flex;
  flex-direction: column;
  color: #fff;
  font-size: clamp(1rem, 8vw, 3rem);
  font-family: CalibreBoldItalic;
  min-height: 568px;
  min-width: 280px;
  @media ${device.tablet} {
    height: calc(100vh + 540px);
  }
`;
const AboutMeContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  padding: 20vh 0;
  z-index: 1;
`;
const Title = styled.h3`
  margin: 1em;
  text-align: center;
`;
const Summary = styled.p`
  font-size: clamp(1rem, 4vw, 2rem);
  margin: 0 2em;
  padding: 0.5em 0;
  font-family: CalibreRegular;
  @media ${device.laptop} {
    max-width: 50vw;
  }
`;

const About = () => {
  return (
    <Section>
      <img
        src={BottomWave}
        style={{ position: 'absolute', bottom: 0, width: '100%' }}
        alt="wave"
      />
      <Title id="about">About Me</Title>
      <AboutMeContent>
        <Summary>
          I recently got married on Sept 25th, 2021 to my wife Brooke. I am
          currently working at home with my two pets Zander (bossy-cat) and
          Bandit (dog). Each icon surrounding represents a hobby or something
          that I treasure.
          <br />
          <br /> My working career involves a lot of customer service mostly
          within the insurance realm of medical and dental. I am friendly and
          easy to work with. I guarantee your team and clients will love me!
          <br />
          <br />I spend most of my free time working on personal projects with a
          lineup of interesting applications I want to create. I am a
          self-taught developer that is creative and enjoys a challenge.
        </Summary>
        <IconsAboutMe />
      </AboutMeContent>
    </Section>
  );
};

export default About;
