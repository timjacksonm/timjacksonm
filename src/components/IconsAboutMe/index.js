import React, { useState } from 'react';
import styled from 'styled-components';
import Icons from './Icons';
import shuffle from 'shuffle-array';
import { SiRetroarch } from 'react-icons/si';
import { GiRetroController, GiSittingDog } from 'react-icons/gi';
import {
  FaSnowboarding,
  FaTruckPickup,
  FaCat,
  FaRocket,
  FaCode,
  FaHome,
} from 'react-icons/fa';
import { ImWoman } from 'react-icons/im';
import { GiDeer, GiDeerTrack, GiCoffeeMug, GiDiplodocus } from 'react-icons/gi';
import { IoIosPeople } from 'react-icons/io';
import { IoRestaurant } from 'react-icons/io5';

const Container = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const IconsAboutMe = () => {
  const [iconArray] = useState(
    shuffle([
      {
        src: <FaCat data-tip="My one-eyed cat Zander" />,
      },
      {
        src: <GiCoffeeMug data-tip="Cup of morning wisdom" />,
      },
      { src: <FaRocket data-tip="Space flight" /> },
      {
        src: <IoIosPeople data-tip="Immediate family" />,
      },
      { src: <FaHome data-tip="Home owner" /> },
      {
        src: <IoRestaurant data-tip="Summer grilling" />,
      },
      { src: <FaCode data-tip="Programming" /> },
      { src: <GiDiplodocus data-tip="Dinosaurs" /> },
      { src: <SiRetroarch data-tip="Retro gaming" /> },
      {
        src: <GiRetroController data-tip="Online gaming" />,
      },
      { src: <GiSittingDog data-tip="My dog Bandit" /> },
      { src: <FaSnowboarding data-tip="Snowboarding" /> },
      {
        src: <FaTruckPickup data-tip="1989 Toyota pickup" />,
      },
      { src: <ImWoman data-tip="My wife Brooke" /> },
      { src: <GiDeer data-tip="Nature" /> },
      {
        src: <GiDeerTrack data-tip="Hunting" />,
      },
    ])
  );
  return (
    <Container>
      <Icons data={iconArray.splice(0, 8)} top />
      <Icons data={iconArray} bottom />
    </Container>
  );
};

export default IconsAboutMe;
