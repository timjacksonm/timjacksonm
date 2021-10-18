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
  @media ${device.tablet} {
    height: 1024px;
  }
  @media ${device.laptop} {
    height: 1440px;
  }
`;
const SkillsContainer = styled.div`
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
  font-family: CalibreBoldItalic;
`;

const Skills = () => {
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
      <SkillsContainer>
        <Title>Skills</Title>
      </SkillsContainer>
    </SectionContent>
  );
};

export default Skills;
