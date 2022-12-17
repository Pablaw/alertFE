import React from "react";
import styled from "styled-components";

import SignupInputForm from "../components/SignupInputForm";

const SignUp = () => {
  return (
    <Container>
      <SignupInputForm />
    </Container>
  );
};

const Container = styled.div`
  height: 1024px;
`;

export default SignUp;
