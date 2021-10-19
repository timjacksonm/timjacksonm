import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import sanityClient from '../client.js';
import imageUrlBuilder from '@sanity/image-url';
const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 5.6rem;
  background-color: #c8eff9;
  font-size: clamp(1rem, 8vw, 3rem);
`;
const Title = styled.h3`
  font-family: CalibreBoldItalic;
  color: #55bdca;
`;

const Projects = () => {
  const [projects, setProjects] = useState([
    { title: 'title' },
    { liveUrl: 'liveUrl' },
    { repoUrl: 'repoUrl' },
    { summary: 'summary' },
    { skills: 'skills' },
    { mainImage: 'mainImage' },
    { gifImage: 'gifImage' },
  ]);

  // useEffect(() => {
  //   sanityClient
  //     .fetch(
  //       `*[_type == "project"]{
  //         title,
  //         liveUrl,
  //         repoUrl,
  //         summary,
  //         skills,
  //         mainImage,
  //         gifImage
  //       }`
  //     )
  //     .then((data) => setProjects(data))
  //     .catch(console.error);
  // }, []);
  // console.log(projects);
  return (
    <SectionContent id="projects">
      <Title>Projects</Title>
      {projects &&
        projects.map(
          (
            { title, liveUrl, repoUrl, summary, skills, mainImage, gifImage },
            i
          ) => (
            <div key={i}>
              <div>{title}</div>
              <div>{liveUrl}</div>
              <div>{repoUrl}</div>
              <div>{summary}</div>
              <div>{skills}</div>
              <div>{mainImage}</div>
              <div>{gifImage}</div>
              {/* <img
                src={urlFor(mainImage.asset)}
                style={{ width: '400px', height: '400px' }}
                alt=""
              /> */}
              {/* <img
                src={urlFor(gifImage.asset)}
                style={{ width: '400px', height: '400px' }}
                alt=""
              /> */}
            </div>
          )
        )}
    </SectionContent>
  );
};

export default Projects;
