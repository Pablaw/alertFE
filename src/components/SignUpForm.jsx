import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import theme from "../styles/theme";
import Button from "./elements/Button";
import Modal from "./elements/Modal";

const SignupInputForm = () => {
  const [inputSubmitValue, setInputSubmitValue] = useState({
    userName: "",
    nickName: "",
    password: "",
    passwordCheck: "",
  });
  const [inputInvalid, setInputInvalid] = useState({
    userName: false,
    nickName: false,
    password: false,
    passwordCheck: false,
  });
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [logInSubmit, setLogInSubmit] = useState(false);

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

    const signUp = {
      username: inputSubmitValue.userName,
      nickname: inputSubmitValue.nickName,
      password: inputSubmitValue.password,
    };
    console.log(logInSubmit);

    // !아이디는 4~10자 영문 소문자, 숫자를 이용해주세요.
    // !비밀번호는 8~15자 영문 대 소문자, 숫자, 특수문자를 이용해주세요.

    const checkPwReg = //! 대문자, 소문자, 특수문자, 숫자 각 1개 이상 8자리 이상 15이하

      /^(?=.*?[0-9])(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[#?!@$ %^&*-]).{8,15}$/;

    //! 빈 값 유효성 검사
    if (inputSubmitValue.userName === "") {
      setInputInvalid({ ...inputInvalid, userName: true });
    } else if (inputSubmitValue.nickName === "") {
      setInputInvalid({ ...inputInvalid, nickName: true });
    } else if (inputSubmitValue.password === "") {
      setInputInvalid({ ...inputInvalid, password: true });
    } else if (inputSubmitValue.passwordCheck === "") {
      setInputInvalid({ ...inputInvalid, passwordCheck: true });
    }
    //! 비밀번호 유효성 검사
    else if (
      !checkPwReg.test(inputSubmitValue.password) ||
      !checkPwReg.test(inputSubmitValue.passwordCheck)
    ) {
      alert("형식에 맞게 입력해주세요");
    } else if (
      checkPwReg.test(inputSubmitValue.password) &&
      checkPwReg.test(inputSubmitValue.passwordCheck) &&
      inputSubmitValue.password === inputSubmitValue.passwordCheck
    ) {
      setPasswordInvalid(false);
      setLogInSubmit(true);
      axios
        .post("https://kekeke.gq:8080/auth/signup", signUp)
        .then((res) => console.log(res.data.msg))
        .catch((error) => console.log(error));
    } else {
      setPasswordInvalid(true);
    }
    // !  최소 8자리 이상 숫자, 특수문자가 각각 1개 이상
    // ! /^(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
  };
  // http://13.209.41.128:8080/auth/signup"

  const cancleBtnHandler = () => {
    navigate("/login");
  };
  const onChangeInputHandler = (e) => {
    const inputId = e.target.id;
    const Value = e.target.value;
    setInputSubmitValue({ ...inputSubmitValue, [inputId]: Value });
    setInputInvalid({
      ...inputInvalid,
      userName: false,
      nickName: false,
      password: false,
      passwordCheck: false,
    });
    setPasswordInvalid(false);
  };
  // ! ID => 소문자 or 숫자, 필수 X 5~15자리
  // ! PW => 대문자 & 소문자 & 숫자 8자리 ~ 15자리
  return (
    <Container>
      {logInSubmit ? <Modal url={"/login"}>등록되었습니다 !</Modal> : null}
      <InputBox>
        {inputValueArr.map((item) =>
          item.id === "password" || item.id === "passwordCheck" ? (
            <InputLabel key={num++}>
              <InputTitle>{item.title}</InputTitle>
              <InputWrap>
                <InputValue
                  type="password"
                  placeholder="8자리 이상(특수문자, 대•소문자, 숫자 포함 )"
                  id={item.id}
                  minLength={4}
                  maxLength={15}
                  // value={inputSubmitValue}
                  onChange={onChangeInputHandler}
                  required
                />
                {item.id === "password" && inputInvalid.password === true ? (
                  <AlertText>비밀번호를 입력해주세요.</AlertText>
                ) : item.id === "passwordCheck" &&
                  inputInvalid.passwordCheck === true ? (
                  <AlertText>비밀번호 확인을 입력해주세요.</AlertText>
                ) : item.id === "passwordCheck" && passwordInvalid ? (
                  <AlertText>비밀번호가 일치하지 않습니다.</AlertText>
                ) : (
                  <AlertText></AlertText>
                )}
              </InputWrap>
            </InputLabel>
          ) : (
            <InputLabel key={num++}>
              <InputTitle>{item.title}</InputTitle>
              <InputWrap>
                <InputValue
                  type="text"
                  id={item.id}
                  minLength={4}
                  maxLength={15}
                  onChange={onChangeInputHandler}
                />
                {item.id === "userName" && inputInvalid.userName === true ? (
                  <AlertText>아이디를 입력해주세요.</AlertText>
                ) : item.id === "nickName" && inputInvalid.nickName === true ? (
                  <AlertText>닉네임을 입력해주세요.</AlertText>
                ) : (
                  <AlertText></AlertText>
                )}
              </InputWrap>
            </InputLabel>
          )
        )}
        <ButtonDiv>
          <Button fontSize={"16px"} onClick={submitHandler}>
            회원가입
          </Button>
          <Button fontSize={"16px"} onClick={cancleBtnHandler}>
            취소
          </Button>
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
  font-size: 17px;
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
  margin: 30px 50px 0 50px;
  align-items: center;
`;
const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputTitle = styled.span`
  margin-bottom: 20px;
`;
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
const AlertText = styled.div`
  font-family: KoPubWorldBatang;
  font-size: 16px;
  color: #dc1414;
  text-align: left;
  height: 28px;
`;

const ButtonDiv = styled.div`
  display: flex;
  width: 300px;
  justify-content: space-between;
  margin: 50px auto;
  gap: 50px;
`;

export default SignupInputForm;
