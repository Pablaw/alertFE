import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../img/Alert.png";

function Header() {
  return (
    <HeadTitle>
      <Link to="/">
        <LogoImg src={logo} />
      </Link>
      <Link to="/login">
        <LoginBtn>Login</LoginBtn>
      </Link>
    </HeadTitle>
  );
}

function Footer() {
  return <FooterDiv>Copyright alert</FooterDiv>;
}

function Layout({ children }) {
  return (
    <LayoutContainer>
      <Header />
      {children}
      <Footer />
    </LayoutContainer>
  );
}

export default Layout;

const HeadTitle = styled.div`
  width: 100%;
  min-width: 800px;
  height: 80px;
  background-color: var(--color-header);
  overflow: hidden;
  padding: 5px;
  margin: auto;
  font-size: large;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
`;

const LogoImg = styled.img`
  text-align: center;
  align-items: center;
  background-size: cover;
  width: 170px;
  padding: 0px 0px 15px 15px;
`;

const LayoutContainer = styled.div`
  min-height: 1024px;
  width: 100%;
`;

const FooterDiv = styled.div`
  color: var(--color-footer);
  position: relative;
  transform: translateY(-90%);
  display: flex;
  justify-content: center;
`;

const LoginBtn = styled.button`
  height: 50px;
  width: 100px;
  border-radius: 10px;
  background-color: white;
  font-size: 1em;
`;
