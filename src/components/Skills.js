import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { device } from '../globalHelpers';
import { useInView } from 'react-intersection-observer';
import { FaJsSquare, FaReact, FaSass } from 'react-icons/fa';
import {
  SiStyledcomponents,
  SiTailwindcss,
  SiJest,
  SiNodedotjs,
  SiMongodb,
} from 'react-icons/si';
import css3 from '../assets/css3.webp';
import firebase from '../assets/firebase.webp';
import git from '../assets/git.webp';
import html5 from '../assets/html5.webp';
import nodejs from '../assets/nodejs.svg';
import webpack from '../assets/webpack.webp';

const Section = styled.div`
  min-height: 640px;
  position: relative;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: MontserratExtraBoldItalic;
  font-size: clamp(1rem, 8vw, 3rem);
  min-height: 568px;
  min-width: 280px;
  @media ${device.tablet} {
    margin: 0 2em;
    padding: 0;
  }
`;
const SkillsContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 1em 0;
  z-index: 1;
  @media ${device.tablet} {
    padding: 0;
  }
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
  margin: 0.5em 0;
`;
const Tools = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  margin: 0.5em 0;
`;
const BackEnd = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  margin: 0.5em 0;
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
  margin: 0 1em;
  & svg {
    margin: 0.2em;
  }
  & img {
    margin: 0.2em;
  }
  @media ${device.tablet} {
    justify-content: unset;
    margin: 0;
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
const ExpressIcon = styled(SiNodedotjs)`
  fill: #68a063;
  width: 25vw;
  min-height: 48px;
  min-width: 48px;
`;
const MongodbIcon = styled(SiMongodb)`
  fill: #589636;
  width: 25vw;
  min-height: 48px;
  min-width: 48px;
`;

const Skills = () => {
  const [skill1ref, inViewSkill1] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [skill2ref, inViewSkill2] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const [skill3ref, inViewSkill3] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const titleVariant = {
    hidden: {
      x: '-100px',
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 13,
        stiffness: 50,
        duration: 1,
        when: 'beforeChildren',
        staggerChildren: 0.2,
      },
    },
  };
  const iconVariant = {
    hidden: {
      x: '-100px',
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
    },
  };
  return (
    <Section id="skills">
      <SkillsContent>
        <SectionTitle>Skills</SectionTitle>

        <FrontEnd
          ref={skill1ref}
          as={motion.div}
          variants={titleVariant}
          initial="hidden"
          animate={inViewSkill1 ? 'visible' : 'hidden'}
        >
          <Heading>Front End</Heading>
          <SkillsContainer>
            <Skill as={motion.li} variants={iconVariant}>
              <Html5Icon src={html5} alt="Html5 logo" />
              HTML5
            </Skill>
            <Skill as={motion.li} variants={iconVariant}>
              <Css3Icon src={css3} alt="Css3 logo" />
              CSS3
            </Skill>
            <Skill as={motion.li} variants={iconVariant}>
              <JavascriptIcon alt="Javascript logo" />
              Javascript
            </Skill>
            <Skill as={motion.li} variants={iconVariant}>
              <ReactIcon alt="React logo" />
              React & {''} <br></br> React-Native
            </Skill>
            <Skill as={motion.li} variants={iconVariant}>
              <StyledComponentIcon alt="Styled-Components logo" />
              Styled-Components
            </Skill>
            <Skill as={motion.li} variants={iconVariant}>
              <SassIcon alt="Sass logo" />
              SASS
            </Skill>
            <Skill as={motion.li} variants={iconVariant}>
              <TailwindIcon alt="TailwindCSS logo" />
              TailwindCSS
            </Skill>
            <Skill as={motion.li} variants={iconVariant}>
              <JestIcon alt="Jest logo" />
              Jest
            </Skill>
          </SkillsContainer>
        </FrontEnd>

        <Tools
          ref={skill2ref}
          as={motion.div}
          variants={titleVariant}
          initial="hidden"
          animate={inViewSkill2 ? 'visible' : 'hidden'}
        >
          <Heading>Tools</Heading>
          <SkillsContainer>
            <Skill as={motion.li} variants={iconVariant}>
              <GitIcon src={git} alt="Git logo" />
              Git
            </Skill>
            <Skill as={motion.li} variants={iconVariant}>
              <WebpackIcon src={webpack} alt="Webpack logo" />
              Webpack
            </Skill>
          </SkillsContainer>
        </Tools>

        <BackEnd
          ref={skill3ref}
          as={motion.div}
          variants={titleVariant}
          initial="hidden"
          animate={inViewSkill3 ? 'visible' : 'hidden'}
        >
          <Heading>Back End</Heading>
          <SkillsContainer>
            <Skill as={motion.li} variants={iconVariant}>
              <NodejsIcon src={nodejs} alt="Node.js logo" />
              Node.js
            </Skill>
            <Skill as={motion.li} variants={iconVariant}>
              <FirebaseIcon src={firebase} alt="firebase logo" />
              Firebase
            </Skill>
            <Skill as={motion.li} variants={iconVariant}>
              <ExpressIcon alt="Expressjs logo" />
              Expressjs
            </Skill>
            <Skill as={motion.li} variants={iconVariant}>
              <MongodbIcon alt="MongoDB logo" />
              MongoDB
            </Skill>
          </SkillsContainer>
        </BackEnd>
      </SkillsContent>
    </Section>
  );
};

export default Skills;
