import React from 'react';
import styled from 'styled-components';
import { device } from '../globalHelpers';
import { ReactComponent as GithubIcon } from '../assets/github-icon.svg';
import { ReactComponent as TwitterIcon } from '../assets/twitter.svg';
import { FaLinkedin, FaFilePdf } from 'react-icons/fa';

const SectionContent = styled.div`
  position: fixed;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  z-index: 50;
`;
const LinkContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  height: 3em;
  max-width: 10em;
  margin: 1em 0;

  @media ${device.laptop} {
    margin: 3em;
    max-width: 13em;
  }
`;
const Line = styled.span`
  @media ${device.laptop} {
    position: absolute;
    top: 50%;
    right: -40%;
    width: 40%;
    border-bottom: 2px solid #f27d42;
  }
`;
const Link = styled.a`
  text-decoration: none;
  cursor: pointer;
  width: 2em;
  color: #fff;
  & svg {
    width: fit-content;
    height: 1.25em;
  }
  &:hover {
    & svg {
      transition: height 0.5s;
      height: 1.5em;
    }
    & svg path {
      fill: #55bdca;
    }
  }
  @media ${device.laptop} {
    & svg {
      height: 1.75em;
    }
    &:hover {
      & svg {
        height: 1.9em;
      }
    }
  }
`;
const Navbar = () => {
  return (
    <SectionContent>
      <LinkContainer>
        <Link target="_blank" href="https://github.com/timjacksonm">
          <GithubIcon />
        </Link>
        <Link target="_blank" href="https://twitter.com/timjacksonm">
          <TwitterIcon />
        </Link>
        <Link target="_blank" href="https://www.linkedin.com/in/timjacksonm/">
          <FaLinkedin color="#0e76a8" />
        </Link>
        <Link target="_blank" href="/">
          <FaFilePdf color=" #272341" />
        </Link>
        <Line />
      </LinkContainer>
    </SectionContent>
  );
};

export default Navbar;
