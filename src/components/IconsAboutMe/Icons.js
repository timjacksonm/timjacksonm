import React from 'react';
import styled from 'styled-components';

const Top = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 1em 0;
  & div {
    display: flex;
  }
  & div:nth-child(even) {
    & svg {
      margin: 1.5em 0;
    }
  }
  & div:nth-child(3n - 2) {
    & svg {
      & path {
        fill: #f27d42;
      }
    }
  }
  & div:nth-child(3n - 1) {
    & svg {
      & path {
        fill: #55bdca;
      }
    }
  }
  & div:nth-child(3n - 0) {
    & svg {
      & path {
        fill: #022949;
      }
    }
  }
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: flex-end;
  padding: 1em 0;
  & div {
    display: flex;
  }
  & div:nth-child(even) {
    & svg {
      margin: 1.5em 0;
    }
  }
  & div:nth-child(3n - 2) {
    & svg {
      & path {
        fill: #022949;
      }
    }
  }
  & div:nth-child(3n - 1) {
    & svg {
      & path {
        fill: #f27d42;
      }
    }
  }
  & div:nth-child(3n - 0) {
    & svg {
      & path {
        fill: #55bdca;
      }
    }
  }
`;

const Icons = ({ data, top, bottom }) => {
  return (
    <div>
      {(top && (
        <Top id="top">
          {data.map(({ src }, i) => (
            <div key={i}>{src}</div>
          ))}
        </Top>
      )) ||
        (bottom && (
          <Bottom id="bottom">
            {data.map(({ src }, i) => (
              <div key={i}>{src}</div>
            ))}
          </Bottom>
        ))}
    </div>
  );
};

export default Icons;
