import React from 'react';
import styled from 'styled-components';
import { device } from '../globalHelpers';
import TopWave from '../assets/wave1.svg';
import BottomWave from '../assets/wave2.svg';

const Section = styled.div`
  height: 640px;
  position: relative;
  background-color: #55bdca;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: clamp(1rem, 8vw, 3rem);
  font-family: CalibreBoldItalic;
  min-height: 568px;
  min-width: 280px;
  @media ${device.tablet} {
    height: 1024px;
  }
  @media ${device.laptop} {
    height: 1440px;
  }
`;
const AboutMeContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 80%;
  z-index: 1;
  @media ${device.laptop} {
    height: 55%;
  }
`;
const Title = styled.h3`
  margin: 1em;
`;
const Summary = styled.p`
  font-size: clamp(1rem, 4vw, 2rem);
  margin: 0 2em;
  font-family: CalibreRegular;
  @media ${device.laptop} {
    max-width: 50vw;
  }
`;

const About = () => {
  return (
    <Section>
      <img
        src={TopWave}
        style={{ position: 'absolute', top: 0, width: '100%' }}
        alt="wave"
      />
      <img
        src={BottomWave}
        style={{ position: 'absolute', bottom: 0, width: '100%' }}
        alt="wave"
      />
      <AboutMeContent id="about">
        <Title>About Me</Title>
        <Summary>
          My name is Tim Jackson. I recently got married on Sept 25th, 2021 to
          my wife Brooke. I am currently working at home with my two pets Zander
          (bossy-cat) and Bandit (dog). <br />
          <br /> My working career involves a lot of customer service mostly
          within the insurance realm of medical and dental. I am friendly and
          easy to work with - I guarantee your team and clients will love me!
          <br />
          <br />I spend most of my free time working on personal projects with a
          lineup of interesting applications I want to create. I am a
          self-taught developer that is creative and enjoys a challenge.
        </Summary>
      </AboutMeContent>
    </Section>
  );
};

export default About;
