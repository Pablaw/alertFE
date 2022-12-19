import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { dispatch, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { __gettoken } from "../redux/modules/logInSlice";
import Button from "./elements/Button";

const LogInInputForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputState, setInputState] = useState({ username: "", password: "" });

  const onChangeInputHandler = (e) => {
    const logInInputId = e.target.id;
    const logInInputValue = e.target.value;
    setInputState({ ...inputState, [logInInputId]: logInInputValue });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    // ! 서버통신
    console.log(inputState);
    dispatch(__gettoken(inputState));
    // axios.post("http://alertservice.shop:8080/auth/login", inputState);
    setInputState({ ...inputState, username: "", password: "" });
    navigate("/");
  };
  const cancleBtnHandler = (e) => {
    navigate("/");
  };
  return (
    <Container>
      <InputBox>
        <InputLabel>
          <InputTitle>아이디</InputTitle>
          <InputValue
            id="username"
            minlength={5}
            maxLength={15}
            onChange={onChangeInputHandler}
            value={inputState.username}
          />
        </InputLabel>
        <InputLabel>
          <InputTitle>비밀번호</InputTitle>
          <InputValue
            id="password"
            type="password"
            minLength={8}
            maxLength={15}
            onChange={onChangeInputHandler}
            value={inputState.password}
          />
        </InputLabel>
        <ButtonDiv>
          <Button onClick={submitHandler}>로그인</Button>
          <Button onClick={cancleBtnHandler}>취소</Button>
        </ButtonDiv>
      </InputBox>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  font-family: KoPubWorldBatang;
  font-size: 18px;
`;

const InputBox = styled.form`
  width: 600px;
  height: 450px;
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
  margin: 70px auto;
`;

export default LogInInputForm;
