import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { device } from '../globalHelpers';
import TopPeak from '../assets/peak1.svg';
import BottomPeak from '../assets/peak2.svg';
import sanityClient from '../client.js';
import imageUrlBuilder from '@sanity/image-url';
import { useInView } from 'react-intersection-observer';
import { AnimatePresence, motion } from 'framer-motion';
import { FaArrowUp, FaArrowDown, FaPlay } from 'react-icons/fa';

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

const Section = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #022949;
  font-family: CalibreRegular;
  font-size: clamp(1rem, 8vw, 3rem);
  padding: 10rem 0;
  min-height: 568px;
  min-width: 280px;
  @media ${device.laptop} {
    padding: 15rem 0;
  }
  @media ${device.laptopL} {
    padding: 28rem 5.6rem;
  }
`;
const SectionTitle = styled.h3`
  color: #fff;
  margin: 1em 0;
  font-family: CalibreBoldItalic;
`;
const ProjectContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  color: #fff;
  padding: 1em 0;
  @media ${device.laptopL} {
    flex-direction: row;
    margin: 0 2em;
    max-height: 600px;
  }
  @media ${device.desktopL} {
    justify-content: center;
  }
`;
const ProjectTitle = styled.h5`
  margin: 0.5em 0;
  color: #f27d42;
  font-family: CalibreBoldItalic;
  @media ${device.desktop} {
    margin: 0;
  }
`;
const SkillsContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  font-size: 16px;
  padding: 0;
  font-family: Montserrat, sans-serif;
  font-weight: 600;
`;
const Skill = styled.li`
  list-style: none;
  background-color: #55bdca;
  padding: 0.5em;
  margin: 0.2em;
`;
const Summary = styled.p`
  font-size: clamp(1rem, 5vw, 1.6rem);
`;
const ProjectDetails = styled.div`
  margin: 0 1em;
  max-width: 700px;
`;
const Buttons = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 1em 0;
  font-family: MontserratBold;
  @media ${device.laptopL} {
    justify-content: unset;
  }
`;
const Link = styled.a`
  display: block;
  width: 6em;
  font-size: 0.525em;
  padding: 0.225em 1em;
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
  margin-right: 1em;
  &:hover {
    color: #fff;
    background-position: -100% 0;
  }
`;
const LineBreak = styled.div`
  border-bottom: 1px solid #96ffff;
  position: absolute;
  bottom: 0;
  width: 100%;
`;
const ShowContainer = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  z-index: 50;
  color: #fff;
  font-family: MontserratExtraBold;
  font-weight: 600;
  text-decoration: none;
  margin: 1em;
  & svg path {
    fill: #fff;
  }
  &:hover {
    color: #55bdca;
    & svg path {
      fill: #55bdca;
    }
  }
`;
const PreviewContainer = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  max-width: 800px;
  position: relative;
`;
const Preview = styled.img`
  aspect-ratio: 4/3;
  width: 100%;
  height: 100%;
  max-width: 665px;
  max-height: 466px;
`;
const PlayBtn = styled(FaPlay)`
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  text-align: center;
  display: ${({ display }) => display};
  z-index: 50;
  &:hover {
    fill: #55bdca;
  }
`;
const Projects = () => {
  const [projects, setProjects] = useState(null);
  const [projectsToShow, setProjectsToShow] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [imageState, setImageState] = useState(null);
  const [playIcons, setPlayIcons] = useState(null);

  const [projectsRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const motionProps = {
    initial: { x: '-100vw' },
    animate: { x: 0 },
    exit: { x: '-100vw' },
    transition: {
      type: 'spring',
      damping: 13,
      stiffness: 50,
      duration: 1.5,
    },
  };

  const changeImage = (e, index) => {
    if (e.type === 'click') {
      setPlayIcons({ ...playIcons, ...{ [index]: { state: false } } });
      setImageState({
        ...imageState,
        ...{ [index]: { url: urlFor(projectsToShow[index].gifImage) } },
      });
    }
    if (e.type === 'mouseleave') {
      setPlayIcons({ ...playIcons, ...{ [index]: { state: true } } });
      setImageState({
        ...imageState,
        ...{ [index]: { url: urlFor(projectsToShow[index].mainImage) } },
      });
    }
  };

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "project"]{
          title,
          position,
          liveUrl,
          repoUrl,
          summary,
          skills,
          mainImage,
          gifImage
        }`
      )
      .then((data) => setProjects(data.sort((a, b) => a.position - b.position)))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (projects) {
      const firstThree = projects.slice(0, 3);
      setProjectsToShow(showMore ? projects : firstThree);
      setPlayIcons(projects.map(() => ({ state: true })));
      setImageState(projects.map((data) => ({ url: urlFor(data.mainImage) })));
    }
  }, [showMore, projects]);
  return (
    <Section ref={projectsRef}>
      <img
        src={TopPeak}
        style={{ position: 'absolute', top: 0, width: '100%' }}
        alt="wave"
      />
      <img
        src={BottomPeak}
        style={{ position: 'absolute', bottom: 0, width: '100%' }}
        alt="wave"
      />
      <SectionTitle id="projects">Projects</SectionTitle>
      <AnimatePresence>
        {projectsToShow &&
          inView &&
          projectsToShow.map(
            ({ title, liveUrl, repoUrl, summary, skills }, i) => (
              <ProjectContainer
                id={i}
                key={i}
                onMouseLeave={(e) => changeImage(e, i)}
                as={motion.div}
                {...motionProps}
              >
                <PreviewContainer>
                  <PlayBtn
                    onClick={(e) => changeImage(e, i)}
                    display={playIcons[i].state ? 'block' : 'none'}
                  />
                  <Preview
                    src={imageState[i].url}
                    alt={`preview of ${title}`}
                  />
                </PreviewContainer>
                <ProjectDetails>
                  <ProjectTitle>{title}</ProjectTitle>
                  <SkillsContainer>
                    {skills.map((skill, i) => (
                      <Skill key={i}>{skill}</Skill>
                    ))}
                  </SkillsContainer>
                  <Summary>{summary}</Summary>
                  <Buttons>
                    <Link target="_blank" rel="noopener" href={liveUrl}>
                      Live Demo
                    </Link>
                    <Link target="_blank" rel="noopener" href={repoUrl}>
                      Github
                    </Link>
                  </Buttons>
                </ProjectDetails>
                <LineBreak />
              </ProjectContainer>
            )
          )}
      </AnimatePresence>
      {showMore ? (
        <ShowContainer onClick={() => setShowMore(!showMore)} href="#2">
          Show Less
          <FaArrowUp size="2em" />
        </ShowContainer>
      ) : (
        <ShowContainer onClick={() => setShowMore(!showMore)} href="#0">
          Show All
          <FaArrowDown size="2em" />
        </ShowContainer>
      )}
    </Section>
  );
};

export default Projects;
