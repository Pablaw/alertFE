import React from "react";
import styled from "styled-components";

const Footer = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Footer;

const Container = styled.div`
  color: var(--color-footer);
  position: relative;
  transform: translateY(-90%);
  display: flex;
  justify-content: center;
`;
