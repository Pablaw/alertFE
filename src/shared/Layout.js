import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";


function Header () {
  return (
    <HeadTitle>
      <Link to='/'>  
      {/* 이미지 추가 예정 */}
      </Link>
      <Link to="/member/login">Login</Link>
    </HeadTitle>
  )
}

function Footer () {
  return (
    <div>
    </div>
  )
}


function Layout({children}) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}


export default Layout;

const HeadTitle = styled.div`
  width: 1200px;
  height: 75px;
  overflow: hidden;
  padding: 5px;
  margin: auto;
  font-size: large;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
`;