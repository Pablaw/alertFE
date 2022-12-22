import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import logo from "../../img/Alert.png";

const Header = ({ noLogInButton }) => {
  const navigate = useNavigate("");
  const [gotCookie, setGotCookie] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies("Authorization");
  useEffect(() => {
    cookies.Authorization !== undefined
      ? setGotCookie(true)
      : setGotCookie(false);
  }, []);
  const logOutHandler = () => {
    removeCookie("Authorization");
    setGotCookie(false);
    navigate("/login");
  };
  return (
    <Container>
      {/* Link 리다이렉트는 리렌더링이 안일어남, a태그와 Link 차이 검색 */}
      <a href="/">
        <LogoImg src={logo} />
      </a>
      <ButtonDiv>
        {noLogInButton &&
        cookies.Authorization === undefined ? null : gotCookie ? (
          <Button onClick={logOutHandler}>로그아웃</Button>
        ) : (
          <Button onClick={() => navigate("/login")}>로그인</Button>
        )}
      </ButtonDiv>
    </Container>
  );
};

const Container = styled.div`
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
const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;
const Button = styled.button`
  font: inherit;
  width: 130px;
  height: 50px;
  border: 1px solid var(--color-border);
  border-radius: 15px;
  background: white;
  color: var(--color-font);
  font-size: 15px;
  padding: 0.5rem 1.5rem;
  box-shadow: rgba(0, 0, 0, 0.35) 1.95px 1.95px 2.6px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;
export default Header;
