import React, { useState } from 'react';
import styled from 'styled-components';
import { device } from '../../globalHelpers';
import { ReactComponent as GithubIcon } from '../../assets/github-icon.svg';
import { ReactComponent as TwitterIcon } from '../../assets/twitter.svg';
import { FaLinkedin, FaFilePdf, FaBars, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

const HamburgerMenu = styled(FaBars)`
  margin: 1.5em 1em;
  width: 1.5em;
  height: 1.5em;
  @media ${device.laptop} {
    display: none;
  }
`;
const CloseIcon = styled(FaTimes)`
  margin: 1.5em auto;
  width: 1.5em;
  height: 1.5em;
  @media ${device.laptop} {
    display: none;
  }
`;
const LinkContainer = styled.div`
  position: relative;
  display: flex;
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
    display: none;
    margin: 3em;
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
const Line = styled.span`
  @media ${device.laptop} {
    position: absolute;
    top: 50%;
    right: -40px;
    width: 35px;
    border-bottom: 2px solid #f27d42;
  }
`;

const MobileNavigation = () => {
  const [open, setOpen] = useState(false);

  const containerVariant = {
    hidden: {
      x: '100vw',
      opacity: 0,
      transition: {
        duration: 0.8,
      },
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100,
        when: 'beforeChildren',
        staggerChildren: 0.05,
      },
    },
  };
  const iconVariant = {
    hidden: {
      x: 0,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
    },
  };
  return (
    <>
      {!open && <HamburgerMenu onClick={() => setOpen(!open)} />}
      {open && <CloseIcon onClick={() => setOpen(!open)} />}
      <LinkContainer
        open={open}
        as={motion.div}
        variants={containerVariant}
        initial="hidden"
        animate={open ? 'visible' : 'hidden'}
      >
        <Link
          target="_blank"
          rel="noopener"
          href="https://github.com/timjacksonm"
          as={motion.a}
          variants={iconVariant}
          data-tip="Github"
        >
          <GithubIcon />
        </Link>
        <Link
          target="_blank"
          rel="noopener"
          href="https://twitter.com/timjacksonm"
          as={motion.a}
          variants={iconVariant}
          data-tip="Twitter"
        >
          <TwitterIcon />
        </Link>
        <Link
          target="_blank"
          rel="noopener"
          href="https://www.linkedin.com/in/timjacksonm/"
          as={motion.a}
          variants={iconVariant}
          data-tip="LinkedIn"
        >
          <FaLinkedin color="#0e76a8" />
        </Link>
        <Link
          target="_blank"
          rel="noopener"
          href="https://drive.google.com/file/d/1mHur6--M3Szi3VzSF6Tw7Dxvb1fwPKNo/view?usp=sharing"
          as={motion.a}
          variants={iconVariant}
          data-tip="Resume"
        >
          <FaFilePdf color=" #272341" />
        </Link>
        <Line />
      </LinkContainer>
    </>
  );
};

export default MobileNavigation;
