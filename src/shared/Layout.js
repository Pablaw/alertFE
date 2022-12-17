import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Header() {
  return (
    <HeadTitle>
      <Link to="/">{/* 이미지 추가 예정 */}</Link>
      <Link to="/member/login">Login</Link>
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

const LayoutContainer = styled.div`
  min-height: 1024px;
`;

const FooterDiv = styled.div`
  color: var(--color-footer);
  position: relative;
  transform: translate(50%, -90%);
`;
