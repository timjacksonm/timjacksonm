import React from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import { SiRetroarch } from 'react-icons/si';
import { GiRetroController, GiSittingDog } from 'react-icons/gi';
import {
  FaSnowboarding,
  FaTruckPickup,
  FaCat,
  FaRocket,
  FaCode,
} from 'react-icons/fa';
import { ImWoman } from 'react-icons/im';
import { GiDeer, GiDeerTrack, GiCoffeeMug, GiDiplodocus } from 'react-icons/gi';
import { RiTeamFill } from 'react-icons/ri';
import { MdCottage } from 'react-icons/md';
import { MdOutdoorGrill } from 'react-icons/md';

const IconContainer = styled.div``;
const IconsAboutMe = () => {
  return (
    <IconContainer>
      <SiRetroarch
        clickable="true"
        data-background-color="#F27D42"
        data-tip="Retro Gaming"
        color="#F27D42"
      />{' '}
      <GiRetroController
        data-background-color="#55BDCA"
        data-tip="Online Gaming"
        color="#55BDCA"
      />{' '}
      <GiSittingDog
        data-background-color="#022949"
        data-tip="Dog Bandit"
        color="#022949"
      />{' '}
      <FaSnowboarding
        data-background-color="#F27D42"
        data-tip="Snowboarding"
        color="#F27D42"
      />{' '}
      <FaTruckPickup
        data-background-color="#55BDCA"
        data-tip="1989 Toyota Pickup"
        color="#55BDCA"
      />{' '}
      <ImWoman
        data-background-color="#022949"
        data-tip="My Wife Brooke"
        color="#022949"
      />
      <GiDeer
        data-background-color="#F27D42"
        data-tip="Nature"
        color="#F27D42"
      />
      <GiDeerTrack
        data-background-color="#55BDCA"
        data-tip="Hunting"
        color="#55BDCA"
      />
      <FaCat
        data-background-color="#022949"
        data-tip="My One-eyed cat Zander"
        color="#022949"
      />
      <GiCoffeeMug
        data-background-color="#F27D42"
        data-tip="Cup of morning wisdom"
        color="#F27D42"
      />
      <FaRocket
        data-background-color="#55BDCA"
        data-tip="Space Flight"
        color="#55BDCA"
      />
      <RiTeamFill
        data-background-color="#022949"
        data-tip="Immediate Family"
        color="#022949"
      />
      <MdCottage
        data-background-color="#F27D42"
        data-tip="Home Owner"
        color="#F27D42"
      />
      <MdOutdoorGrill
        data-background-color="#55BDCA"
        data-tip="Summer Grilling"
        color="#55BDCA"
      />
      <FaCode
        data-background-color="#022949"
        data-tip="Programming"
        color="#022949"
      />
      <GiDiplodocus
        data-background-color="#F27D42"
        color="#F27D42"
        data-tip="Dinosaurs"
      />
      <ReactTooltip />
    </IconContainer>
  );
};

export default IconsAboutMe;
