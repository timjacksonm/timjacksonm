import React from 'react';
import styled from 'styled-components';
import { device } from '../globalHelpers';
import TopWave from '../assets/wave1.svg';
import BottomWave from '../assets/wave2.svg';

const SectionContent = styled.div`
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
  @media ${device.tablet} {
    height: 1024px;
  }
  @media ${device.laptop} {
    height: 1440px;
  }
`;
const Container = styled.div`
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
const Title = styled.h3``;
const Summary = styled.h6`
  width: 50%;
`;

const About = () => {
  return (
    <SectionContent>
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
      <Container id="about">
        <Title>About Me</Title>
        <Summary>
          Hey! My name is Tim Jackson. I recently got married on Sept 25th, 2021
          to my wife Brooke. I am currently working at home with my two pets
          Zander(bossy-cat) and Bandit(dog). My working career involves a lot of
          customer service mostly within the insurance realm of Medical and
          Dental. I am highly technical while also creative. I spend most of
          free time working on personal projects with a lineup of interesting
          applications I want to create. I am a self taught developer that is
          friendly and easy to work with - I gaurentee you and your clients will
          love me!
        </Summary>
      </Container>
    </SectionContent>
  );
};

export default About;
