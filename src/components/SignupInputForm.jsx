import React from "react";
import styled from "styled-components";

const StBox = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid red;
  margin: 20px;
  border: 1px solid var(--color-border);
  font-family: KoPubWorldBatang, sans-serif, Arial;
`;

const SignupInputForm = () => {
  return (
    <div>
      <StBox>박스</StBox>
    </div>
  );
};

export default SignupInputForm;
