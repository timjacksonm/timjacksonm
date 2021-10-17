import React from 'react';
import styled from 'styled-components';
import { device } from '../../globalHelpers';
import { ReactComponent as GithubIcon } from '../../assets/github-icon.svg';
import { ReactComponent as TwitterIcon } from '../../assets/twitter.svg';
import { FaLinkedin, FaFilePdf } from 'react-icons/fa';
import { motion } from 'framer-motion';

const LinkContainer = styled.div`
  position: relative;
  display: none;
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
const Navigation = () => {
  const containerVariant = {
    hidden: {
      x: '100vh',
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        delay: 1,
        damping: 13,
        stiffness: 50,
        duration: 1.3,
        when: 'beforeChildren',
        staggerChildren: 0.2,
      },
    },
  };
  const iconVariant = {
    hidden: {
      x: -10,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
    },
  };
  return (
    <>
      <LinkContainer
        as={motion.div}
        variants={containerVariant}
        initial="hidden"
        animate={'visible'}
      >
        <Link
          target="_blank"
          href="https://github.com/timjacksonm"
          as={motion.a}
          variants={iconVariant}
        >
          <GithubIcon />
        </Link>
        <Link
          target="_blank"
          href="https://twitter.com/timjacksonm"
          as={motion.a}
          variants={iconVariant}
        >
          <TwitterIcon />
        </Link>
        <Link
          target="_blank"
          href="https://www.linkedin.com/in/timjacksonm/"
          as={motion.a}
          variants={iconVariant}
        >
          <FaLinkedin color="#0e76a8" />
        </Link>
        <Link href="/" as={motion.a} variants={iconVariant}>
          <FaFilePdf color=" #272341" />
        </Link>
        <Line />
      </LinkContainer>
    </>
  );
};

export default Navigation;
