import React from "react";
import styled from "styled-components";

import SignUpForm from "../components/SignUpForm";
import Header from "../components/elements/Header";

const SignUp = () => {
  return (
    <Container>
      <Header />
      <SignUpForm />
    </Container>
  );
};

const Container = styled.div`
  height: 818px;
`;

export default SignUp;
