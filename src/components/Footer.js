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
  & a {
    text-decoration: none;
  }
`;
// font-family: CalibreRegular;
//     font-family: CalibreBoldItalic;
//     font-family: MontserratBold;
//     font-family: MontserratExtraBold;
//     font-family: MontserratExtraBoldItalic;
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
