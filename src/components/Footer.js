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
  fontfamily: CalibreBoldItalic;
  fontsize: clamp(1rem, 4vw, 1.25rem);
  & a {
    text-decoration: none;
  }
`;
const Icon = styled(FaArrowUp)`
  fill: #fff;
  &:hover {
    fill: #55bdca;
  }
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
      </a>
      <Text>Designed & Built by Timothy Jackson</Text>
    </FooterContent>
  );
};

export default Footer;
