import React from 'react';
import styled from 'styled-components';
import { ReactComponent as GithubIcon } from '../assets/github-icon.svg';
import { ReactComponent as TwitterIcon } from '../assets/twitter.svg';
import { FaLinkedin } from 'react-icons/fa';

const SectionContent = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  width: 100%;
  max-height: 10%;
  z-index: 50;
`;
export const LinkContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;
  margin: 3em;
`;
export const Link = styled.a`
  text-decoration: none;
  margin: 0 0.5em;
  cursor: pointer;
  color: #fff;
  & svg {
    width: fit-content;
    height: 2.8vh;
  }
  &:hover {
    color: #f27d42;
    & svg path {
      fill: #f27d42;
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
      </LinkContainer>
    </SectionContent>
  );
};

export default Navbar;
