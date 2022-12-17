import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import theme from "../styles/theme";
import Button from "./elements/Button";

const SignupInputForm = () => {
  const [inputValue, setInputValue] = useState({ id: "", value: "" });
  console.log(inputValue);
  const navigate = useNavigate();
  let num = 0;
  const inputValueArr = [
    { id: "userName", title: "아이디" },
    { id: "nickName", title: "닉네임" },
    { id: "password", title: "비밀번호" },
    { id: "passwordCheck", title: "비밀번호 확인" },
  ];
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Submit clicked");
  };
  const cancleBtnHandler = () => {
    navigate("/");
  };
  const onChangeInputHandler = (e) => {
    const inputId = e.target.id;
    const Value = e.target.value;
    setInputValue({ ...inputValue, id: inputId, value: Value });
  };
  return (
    <Container>
      <InputBox>
        {inputValueArr.map((item) =>
          item.id === "password" || item.id === "passwordCheck" ? (
            <InputLabel key={num++}>
              <InputTitle>{item.title}</InputTitle>
              <InputValue
                type="password"
                id={item.id}
                maxLength={12}
                onChange={onChangeInputHandler}
              />
            </InputLabel>
          ) : (
            <InputLabel key={num++}>
              <InputTitle>{item.title}</InputTitle>
              <InputValue
                type="text"
                id={item.id}
                maxLength={12}
                onChange={onChangeInputHandler}
              />
            </InputLabel>
          )
        )}
        <ButtonDiv>
          <Button onClick={submitHandler}>회원가입</Button>
          <Button onClick={cancleBtnHandler}>취소</Button>
        </ButtonDiv>
      </InputBox>
    </Container>
  );
};

// CSS Styles
const Container = styled.div`
  display: flex;
  justify-content: center;
  font-family: KoPubWorldBatang;
  font-size: 18px;
`;
const InputBox = styled.form`
  width: 600px;
  height: 650px;
  border: 1px solid var(--color-border);
  margin-top: 50px;
  border-radius: 20px;
`;
const InputLabel = styled.label`
  display: flex;
  justify-content: space-between;
  margin: 60px 50px 0 50px;
  align-items: center;
`;

const InputTitle = styled.span``;
const InputValue = styled.input`
  font: inherit;
  width: 350px;
  height: 60px;
  border-radius: 20px;
  border: 1px solid var(--color-border);
  &:focus {
    outline: none;
  }
`;
const ButtonDiv = styled.div`
  display: flex;
  width: 300px;
  justify-content: space-between;
  margin: 50px auto;
`;

export default SignupInputForm;
