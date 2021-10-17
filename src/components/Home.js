import React from 'react';
import styled from 'styled-components';
import { device } from '../globalHelpers';
import IconsAboutMe from './IconsAboutMe/index';

const SectionContent = styled.div`
position: relative;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
height 100vh;
font-family: 'CalibreBoldItalic';
font-size: clamp(1rem, 8vw, 3rem);
color: #272341;
@media ${device.laptop} {
  align-items: unset;
  margin: 0;
}
`;
const Container = styled.div`
  margin: 0 2em;
`;
const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media ${device.laptop} {
    flex-direction: row;
  }
`;
const Intro = styled.h3`
  color: #f27d42;
  margin: 0;
`;
const Name = styled.h3`
  color: #55bdca;
  margin: 0;
  @media ${device.laptop} {
    margin: 0 0.2em;
  }
`;
const Tagline = styled.h5`
  margin: 0;
  @media ${device.laptop} {
    margin-bottom: 1em;
  }
`;
const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 1em auto;
  font-family: MontserrratBold;
  @media ${device.laptop} {
    flex-direction: row;
    margin: 0;
  }
`;
const NavTitle = styled.div`
  padding: 0.225em 1em;
  font-weight: 600;
  font-size: 0.525em;
  text-align: center;
  color: #55bdca;
  border-width: 2px;
  border-style: solid;
  border-image: linear-gradient(135deg, #02aab0, #00cdac);
  border-image-slice: 1;
  cursor: pointer;
  background-size: 200% 100%;
  background-image: linear-gradient(to right, transparent 50%, #55bdca 50%);
  transition: background-position 0.5s;
  z-index: 1;
  &:hover {
    color: #fff;
    background-position: -100% 0;
  }
`;
const Temporary = styled.h6`
  margin: 0;
  @media ${device.laptop} {
    margin: 1em 0;
  }
`;

const Home = () => {
  return (
    <SectionContent id="section">
      <Container id="container">
        <TitleContainer>
          <Intro id="intro">Hi, my name is</Intro>
          <Name id="name">Tim Jackson.</Name>
        </TitleContainer>
        <Tagline id="tagline">
          Full stack developer with a critical thinking personality.
        </Tagline>
        <NavContainer id="navContainer">
          <NavTitle>Skills</NavTitle>
          <NavTitle>Projects</NavTitle>
          <NavTitle>About</NavTitle>
          <NavTitle>Contact</NavTitle>
        </NavContainer>
        <Temporary>(Full Site Coming Soon!)</Temporary>
      </Container>
      <IconsAboutMe />
    </SectionContent>
  );
};

export default Home;
