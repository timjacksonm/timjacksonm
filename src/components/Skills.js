import React from 'react';
import styled from 'styled-components';
import { device } from '../globalHelpers';

const SectionContent = styled.div`
  height: 640px;
  position: relative;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: clamp(1rem, 8vw, 3rem);
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
const Title = styled.h3`
  font-family: CalibreBoldItalic;
  color: #f27d42;
`;

const Skills = () => {
  return (
    <SectionContent>
      <Container id="skills">
        <Title>Skills</Title>
      </Container>
    </SectionContent>
  );
};

export default Skills;
