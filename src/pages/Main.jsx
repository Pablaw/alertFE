import React from "react";
import styled from "styled-components";
import MainForm from "../components/MainForm";
import Header from "../components/elements/Header";

const Main = () => {
  return (
    <HomeWrap>
      <Header noLogInButton={true} />
      <MainForm />
    </HomeWrap>
  );
};

export default Main;

const HomeWrap = styled.div`
  min-height: 818px;
`;
