import React, { useState } from 'react';
import styled from 'styled-components';
import { device } from '../globalHelpers';
import { ReactComponent as GithubIcon } from '../assets/github-icon.svg';
import { ReactComponent as TwitterIcon } from '../assets/twitter.svg';
import { FaLinkedin, FaFilePdf, FaBars, FaTimes } from 'react-icons/fa';

const SectionContent = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  z-index: 1;
  @media ${device.laptop} {
    top: 38vh;
  }
`;
const HamburgerMenu = styled(FaBars)`
  margin: 1em;
  width: 1.5em;
  height: 1.5em;
  @media ${device.laptop} {
    display: none;
  }
`;
const LinkContainer = styled.div`
  position: relative;
  display: ${({ open }) => (open ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  width: 3em;
  min-height: 11em;
  margin: 1em 0;
  background-color: #c8eff9;
  padding: 1em 0;
  border-radius: 5px;
  @media ${device.laptop} {
    display: flex;
    margin: 3em;
  }
`;
const Line = styled.span`
  @media ${device.laptop} {
    position: absolute;
    top: 50%;
    right: -40px;
    width: 35px;
    border-bottom: 2px solid #f27d42;
  }
`;
const Link = styled.a`
  text-decoration: none;
  cursor: pointer;
  height: 2em;
  color: #fff;
  display: flex;
  align-items: center;
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
      fill: #f27d42;
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
  const [open, setOpen] = useState(false);
  return (
    <SectionContent>
      {!open && <HamburgerMenu onClick={() => setOpen(true)} />}
      <LinkContainer open={open}>
        {open && <FaTimes onClick={() => setOpen(false)} size="1.5em" />}
        <Link target="_blank" href="https://github.com/timjacksonm">
          <GithubIcon />
        </Link>
        <Link target="_blank" href="https://twitter.com/timjacksonm">
          <TwitterIcon />
        </Link>
        <Link target="_blank" href="https://www.linkedin.com/in/timjacksonm/">
          <FaLinkedin color="#0e76a8" />
        </Link>
        <Link href="/">
          <FaFilePdf color=" #272341" />
        </Link>
        <Line />
      </LinkContainer>
    </SectionContent>
  );
};

export default Navbar;
