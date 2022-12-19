import React from "react";
import styled from "styled-components";

import SignUpInputForm from "../components/SignUpInputForm";

const SignUp = () => {
  return (
    <Container>
      <SignUpInputForm />
    </Container>
  );
};

const Container = styled.div`
  height: 818px;
`;

export default SignUp;
