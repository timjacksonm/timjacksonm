import React from 'react';
import styled from 'styled-components';
import { device } from '../globalHelpers';

const SectionContent = styled.div`
  height: 90vh;
  position: relative;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: clamp(1rem, 8vw, 3rem);
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 80%;
  z-index: 1;
  @media ${device.laptop} {
    height: 55%;
  }
`;
const Title = styled.h3`
  font-family: CalibreBoldItalic;
  color: #022949;
`;
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 50px auto;
`;
const Name = styled.input`
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 500;
  font-size: 18px;
  border-radius: 5px;
  line-height: 22px;
  background-color: #c8eff9;
  border: 2px solid #55bdca;
  transition: all 0.3s;
  padding: 13px;
  margin-bottom: 15px;
  width: 100%;
  box-sizing: border-box;
  outline: 0;
`;
const Email = styled.input`
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 500;
  font-size: 18px;
  border-radius: 5px;
  line-height: 22px;
  background-color: #c8eff9;
  border: 2px solid #55bdca;
  padding: 13px;
  margin-bottom: 15px;
  width: 100%;
  box-sizing: border-box;
`;
const Message = styled.textarea`
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 500;
  font-size: 18px;
  border-radius: 5px;
  line-height: 22px;
  background-color: #c8eff9;
  border: 2px solid #55bdca;
  padding: 13px;
  margin-bottom: 15px;
  width: 100%;
  box-sizing: border-box;
  height: 150px;
  line-height: 150%;
`;
const InputRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
const Submit = styled.input`
  background: none;
  padding: 0.225em 1em;
  font-weight: 600;
  font-size: 0.525em;
  text-align: center;
  color: #55bdca;
  text-decoration: none;
  border-width: 2px;
  border-style: solid;
  border-image: linear-gradient(135deg, #02aab0, #00cdac);
  border-image-slice: 1;
  cursor: pointer;
  background-size: 200% 100%;
  background-image: linear-gradient(to right, transparent 50%, #55bdca 50%);
  transition: background-position 0.5s;
  z-index: 1;
  &:hover {
    color: #fff;
    background-position: -100% 0;
  }
`;
const Contact = () => {
  return (
    <SectionContent>
      <Container id="contact">
        <Title>Contact Me</Title>
        <FormContainer action="POST" data-netlify="true">
          <InputRow>
            <Name type="text" name="name" id="name" placeholder="Name" />
            <Email type="email" name="email" id="email" placeholder="Email" />
          </InputRow>
          <Message name="message" id="message" placeholder="Message" rows="7" />
          <Submit type="submit" value="Send Message" />
        </FormContainer>
      </Container>
    </SectionContent>
  );
};

export default Contact;
