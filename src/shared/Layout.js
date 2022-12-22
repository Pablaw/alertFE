import React from "react";
import styled from "styled-components";
import Footer from "../components/elements/Footer";

const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      {children}
      <Footer>Copyright alert</Footer>
    </LayoutContainer>
  );
};

export default Layout;

const LayoutContainer = styled.div`
  min-height: 1024px;
  width: 100%;
`;
