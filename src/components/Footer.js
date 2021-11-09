import React from 'react';
import styled from 'styled-components';
import { FaArrowUp } from 'react-icons/fa';

const FooterContent = styled.div`
  background-color: #022949;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1em 0;
  position: relative;
  color: #fff;
  font-family: CalibreRegular;
  fontsize: clamp(1rem, 4vw, 1.25rem);
  min-height: 90px;
  min-width: 280px;
  & a {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: #fff;
    text-decoration: none;
  }
  & a:hover {
    color: #55bdca;
    & svg path {
      fill: #55bdca;
    }
  }
`;
const Icon = styled(FaArrowUp)`
  fill: #fff;
`;
const Text = styled.p`
  margin: 0.5em;
  flex: 1;
  text-align: center;
`;
const Footer = () => {
  return (
    <FooterContent>
      <a href="/#home">
        <Icon size="2rem" />
        Back to top
      </a>
      <Text>Designed & Built by Timothy Jackson</Text>
    </FooterContent>
  );
};

export default Footer;
