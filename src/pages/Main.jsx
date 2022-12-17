import React from "react";
import styled from "styled-components";
import MainForm from "../components/MainForm";


const Main = () => {
  return (
    <HomeWrap>
      <MainForm />
    </HomeWrap>
  )
};

export default Main;

const HomeWrap = styled.div`
  width: 1200px;
  height: 800px;
  margin: auto;
`