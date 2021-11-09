import React from 'react';
import { ReactComponent as GithubIcon } from '../assets/github-icon.svg';
import { ReactComponent as TwitterIcon } from '../assets/twitter.svg';
import { FaLinkedin, FaFilePdf } from 'react-icons/fa';
import styled from 'styled-components';
import { device } from '../globalHelpers';

const LinkContainer = styled.div`
  position: absolute;
  top: 5%;
  width: 80%;
  display: flex;
  justify-content: space-between;
  min-height: 40px;
  font-family: CalibreRegular;
  font-weight: 600;
  @media ${device.laptop} {
    width: 20vw;
    right: 5%;
  }
`;
const Link = styled.a`
  text-decoration: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: clamp(1rem, 4vw, 3rem);
  width: 5vw;
  max-height: 55px;
  color: #000;
  & svg {
    flex: 1;
    width: 100%;
    padding: 0.5em;
  }
  &:hover {
    & svg path {
      fill: #55bdca;
    }
  }
  @media ${device.tablet} {
    max-height: 90px;
  }
  @media ${device.laptop} {
    max-height: 120px;
    width: 2.4vw;
    font-size: clamp(1rem, 1vw, 3rem);
  }
`;

const Socials = () => {
  return (
    <LinkContainer>
      <Link
        target="_blank"
        rel="noopener"
        href="https://www.linkedin.com/in/timjacksonm/"
      >
        <FaLinkedin size="1em" color="#0e76a8" />
        Linkedin
      </Link>
      <Link
        target="_blank"
        rel="noopener"
        href="https://github.com/timjacksonm"
      >
        <GithubIcon size="1em" height="1em" />
        Github
      </Link>
      <Link
        target="_blank"
        rel="noopener"
        href="https://twitter.com/timjacksonm"
      >
        <TwitterIcon size="1em" height="1em" />
        Twitter
      </Link>
      <Link
        target="_blank"
        rel="noopener"
        href="https://drive.google.com/file/d/1mHur6--M3Szi3VzSF6Tw7Dxvb1fwPKNo/view?usp=sharing"
      >
        <FaFilePdf size="1em" color="#272341" />
        Resume
      </Link>
    </LinkContainer>
  );
};

export default Socials;
