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
        src: <FaCat data-tip="My one-eyed cat Zander" size="5vh" />,
      },
      {
        src: <GiCoffeeMug data-tip="Cup of morning wisdom" size="5vh" />,
      },
      { src: <FaRocket data-tip="Space flight" size="5vh" /> },
      {
        src: <IoIosPeople data-tip="Immediate family" size="5vh" />,
      },
      { src: <FaHome data-tip="Home owner" size="5vh" /> },
      {
        src: <IoRestaurant data-tip="Summer grilling" size="5vh" />,
      },
      { src: <FaCode data-tip="Programming" size="5vh" /> },
      { src: <GiDiplodocus data-tip="Dinosaurs" size="5vh" /> },
      { src: <SiRetroarch data-tip="Retro gaming" size="5vh" /> },
      {
        src: <GiRetroController data-tip="Online gaming" size="5vh" />,
      },
      { src: <GiSittingDog data-tip="My dog Bandit" size="5vh" /> },
      { src: <FaSnowboarding data-tip="Snowboarding" size="5vh" /> },
      {
        src: <FaTruckPickup data-tip="1989 Toyota pickup" size="5vh" />,
      },
      { src: <ImWoman data-tip="My wife Brooke" size="5vh" /> },
      { src: <GiDeer data-tip="Nature" size="5vh" /> },
      {
        src: <GiDeerTrack data-tip="Hunting" size="5vh" />,
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
