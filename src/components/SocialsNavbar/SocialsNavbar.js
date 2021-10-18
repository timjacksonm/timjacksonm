import React from 'react';
import styled from 'styled-components';
import { device } from '../../globalHelpers';
import Navigation from './Navigation';
import MobileNavigation from './MobileNavigation';

const SectionContent = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  z-index: 50;
  @media ${device.laptop} {
    top: 38vh;
  }
`;

const SocialsNavbar = () => {
  return (
    <SectionContent>
      <Navigation />
      <MobileNavigation />
    </SectionContent>
  );
};

export default SocialsNavbar;
