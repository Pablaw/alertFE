import React from "react";
import styled from "styled-components";

import SignUpForm from "../components/SignUpForm";

const SignUp = () => {
  return (
    <Container>
      <SignUpForm />
    </Container>
  );
};

const Container = styled.div`
  height: 818px;
`;

export default SignUp;
