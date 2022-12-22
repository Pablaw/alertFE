import React from "react";
import styled from "styled-components";
import LogInInputForm from "../components/LogInInputForm";

import Header from "../components/elements/Header";

const Login = () => {
  return (
    <Container>
      <Header noLogInButton={true} />
      <LogInInputForm></LogInInputForm>
    </Container>
  );
};

const Container = styled.div`
  height: 818px;
`;

export default Login;
