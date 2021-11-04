import React from 'react';
import styled from 'styled-components';
import { device } from '../globalHelpers';

const Section = styled.div`
  height: 90vh;
  position: relative;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: clamp(1rem, 8vw, 3rem);
  font-family: CalibreBoldItalic;
  font-weight: 600;
  min-height: 568px;
  min-width: 280px;
`;
const ContactMeContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 1;
`;
const SectionTitle = styled.h3`
  display: flex;
  align-items: center;
  flex: 1;
  color: #f27d42;
`;
const Text = styled.p`
  display: flex;
  align-items: center;
  font-size: clamp(1rem, 4vw, 1.8rem);
  flex: 1;
  margin: 0 1em;
  font-family: MontserratExtraBold;
  color: #55bdca;
  @media ${device.laptop} {
    margin: 0 2em;
  }
`;
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1em auto;
  max-width: 700px;
  font-family: CalibreRegular;
`;
const Name = styled.input`
  font-family: inherit;
  font-size: clamp(1rem, 4vw, 1.3rem);
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
  font-family: inherit;
  font-size: clamp(1rem, 4vw, 1.3rem);
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
  font-family: inherit;
  font-size: clamp(1rem, 4vw, 1.3rem);
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
  font-size: clamp(1rem, 4vw, 1.3rem);
  text-align: center;
  padding: 0.5em;
  color: #55bdca;
  text-decoration: none;
  border: 2px solid;
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
    <Section id="contact">
      <ContactMeContent>
        <SectionTitle>Contact Me</SectionTitle>
        <Text>
          If you are interested in talking to me, I would love to hear from you.{' '}
          <br></br>
          Please send me a message below and I will respond swiftly!
        </Text>
        <FormContainer name="contact" method="POST">
          <input type="hidden" name="form-name" value="contact" />
          <InputRow>
            <Name
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              required
            />
            <Email
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              required
            />
          </InputRow>
          <Message
            name="message"
            id="message"
            placeholder="Message"
            rows="7"
            required
          />
          <Submit type="submit" value="Send Message" />
        </FormContainer>
      </ContactMeContent>
    </Section>
  );
};

export default Contact;
