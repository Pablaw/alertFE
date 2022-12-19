import React from "react";
import styled from "styled-components";
import LogInInputForm from "../components/LogInInputForm";

// import LoginInputForm

const Login = () => {
  return (
    <Container>
      <LogInInputForm></LogInInputForm>
    </Container>
  );
};

const Container = styled.div`
  height: 818px;
`;

export default Login;
