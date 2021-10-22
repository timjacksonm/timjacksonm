import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { device } from '../globalHelpers';
import TopPeak from '../assets/peak1.svg';
import BottomPeak from '../assets/peak2.svg';
import sanityClient from '../client.js';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

const SectionContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #022949;
  font-size: clamp(1rem, 8vw, 3rem);
  padding: 10rem 0;
  @media ${device.laptop} {
    padding: 15rem 0;
  }
  @media ${device.laptopL} {
    padding: 28rem 5.6rem;
  }
`;
const SectionTitle = styled.h3`
  font-family: CalibreBoldItalic;
  color: #fff;
  margin-top: 0;
`;
const ProjectContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: #fff;
  @media ${device.laptopL} {
    flex-direction: row;
    margin: 0 2em;
    justify-content: unset;
  }
`;
const ProjectTitle = styled.h5`
  margin: 0;
  font-family: CalibreBoldItalic;
  color: #f27d42;
`;
const SkillsContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  font-size: 16px;
  padding: 0;
`;
const Skill = styled.li`
  list-style: none;
  background-color: #55bdca;
  padding: 0.5em;
  margin: 0.2em;
`;
const Summary = styled.p`
  font-size: clamp(1rem, 5vw, 1.6rem);
  font-family: CalibreBoldItalic;
`;
const LeftColumn = styled.div`
  margin: 0 1em;
  max-width: 700px;
`;
const Preview = styled.img`
  margin: 1em 0;
  height: 50vh;
  width: 100%;
  max-height: 500px;
  @media ${device.tablet} {
    max-width: 700px;
  }
`;
const Link = styled.a`
  display: block;
  width: 5em;
  padding: 0.225em 1em;
  font-weight: 600;
  font-size: 0.525em;
  text-align: center;
  color: #55bdca;
  text-decoration: none;
  border-width: 2px;
  border-style: solid;
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
const Buttons = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 1em 0;
  @media ${device.laptopL} {
    justify-content: unset;
  }
`;
const LineBreak = styled.div`
  border-bottom: 1px solid #96ffff;
  position: absolute;
  bottom: 0;
  width: 100%;
`;
const Projects = () => {
  const [projects, setProjects] = useState(null);

  const changeImage = (e, gifImage) => {
    e.target.setAttribute('src', urlFor(gifImage));
  };
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "project"]{
          title,
          liveUrl,
          repoUrl,
          summary,
          skills,
          mainImage,
          gifImage
        }`
      )
      .then((data) => setProjects(data))
      .catch(console.error);
  }, []);
  return (
    <SectionContent id="projects">
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
      <SectionTitle>Projects</SectionTitle>
      {projects &&
        projects.map(
          (
            { title, liveUrl, repoUrl, summary, skills, mainImage, gifImage },
            i
          ) => (
            <ProjectContainer key={i} id="container">
              <Preview
                src={urlFor(mainImage)}
                onMouseEnter={(e) => changeImage(e, gifImage)}
                onMouseLeave={(e) => changeImage(e, mainImage)}
                alt=""
              />
              <LeftColumn>
                <ProjectTitle>{title}</ProjectTitle>
                <SkillsContainer>
                  {skills.map((skill, i) => (
                    <Skill key={i}>{skill}</Skill>
                  ))}
                </SkillsContainer>
                <Summary>{summary}</Summary>
                <Buttons>
                  <Link href={liveUrl}>Live Demo</Link>
                  <Link href={repoUrl}>GitHub</Link>
                </Buttons>
              </LeftColumn>
              <LineBreak />
            </ProjectContainer>
          )
        )}
    </SectionContent>
  );
};

export default Projects;
