import React from 'react';
import styled from 'styled-components';
import { device } from '../globalHelpers';
import IconsAboutMe from './IconsAboutMe/index';
import { motion } from 'framer-motion';

const Section = styled.div`
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
@media ${device.desktop} {
  font-size: clamp(1rem, 8vw, 4rem);
}
`;
const HomeContent = styled.div`
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
const PageNavigation = styled.div`
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
const PageLink = styled.a`
  padding: 0.225em 1em;
  font-weight: 600;
  font-size: 0.525em;
  text-align: center;
  color: #55bdca;
  text-decoration: none;
  border: 2px solid;
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

const Home = () => {
  const titleVariant = {
    hidden: {
      x: '-40px',
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 13,
        stiffness: 50,
        duration: 1.3,
        when: 'beforeChildren',
      },
    },
  };
  const taglineVariant = {
    hidden: {
      x: '-30px',
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        damping: 13,
        stiffness: 50,
        duration: 0.5,
      },
    },
  };
  return (
    <Section id="home">
      <HomeContent
        as={motion.div}
        variants={titleVariant}
        initial="hidden"
        animate="visible"
      >
        <TitleContainer>
          <Intro>Hi, my name is</Intro>
          <Name>Tim Jackson.</Name>
        </TitleContainer>
        <Tagline>
          Full stack developer with a critical thinking personality.
        </Tagline>
        <PageNavigation as={motion.div} variants={taglineVariant}>
          <PageLink href="/#about">About</PageLink>
          <PageLink href="/#skills">Skills</PageLink>
          <PageLink href="/#projects">Projects</PageLink>
          <PageLink href="/#contact">Contact</PageLink>
        </PageNavigation>
      </HomeContent>
      <IconsAboutMe />
    </Section>
  );
};

export default Home;
