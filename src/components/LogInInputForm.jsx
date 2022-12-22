import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

import Button from "./elements/Button";

const LogInInputForm = () => {
  const navigate = useNavigate();
  const [inputState, setInputState] = useState({ username: "", password: "" });
  // !토큰 선언
  const [cookies, setCookie, removeCookie] = useCookies("");

  //! 쿠키 값 확인 후 페이지 이동
  //   useEffect(
  //     cookies !== ""
  //       ? () => {
  //           alert("비정상적인 접근입니다.");
  //           navigate("/");
  //         }
  //       : null,
  //     []
  //   );
  const onChangeInputHandler = (e) => {
    const logInInputId = e.target.id;
    const logInInputValue = e.target.value;

    setInputState({ ...inputState, [logInInputId]: logInInputValue });
  };
  /* api 서버 통신
http://alertservice.shop:8080/calendars
*/
  /* json-server 통신
http://localhost:3009/calendars
*/
  // ! 호진님 주소 13.209.41.128:8080
  const SubmitHandler = (e) => {
    e.preventDefault();
    if (inputState.username === "" || inputState.password === "") {
      alert("유저정보를 입력해주세요");
    } else {
      axios //! 서버통신
        .post("https://kekeke.gq:8080/auth/login", inputState, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          //! 토큰 저장
          const accessToken = res.headers.authorization.split(" ");
          console.log(accessToken[0]);
          setCookie("Authorization", `${accessToken[0]} ${accessToken[1]}`);
          navigate("/");
        })
        .catch((error) => {
          alert(error.response.data.message);
          console.log(error);
        });
    }

    // ! 1Aa!1Aa!
    //! 인풋 벨류 초기화
    setInputState({ ...inputState, username: "", password: "" });
    //!로그인 후 메인페이지 이동
  };
  const signUpBtnHandler = (e) => {
    // ! 토큰 삭제
    // removeCookie("accessToken");
    navigate("/signup"); //!취소 후 메인페이지 이동
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
          <Button
            color="var(--color-border)"
            borderColor="var(--color-header)"
            fontSize={"18px"}
            onClick={SubmitHandler}
          >
            로그인
          </Button>
          <Button fontSize={"18px"} onClick={signUpBtnHandler}>
            회원가입
          </Button>
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
  flex-direction: column;
  gap: 20px;
  width: 230px;
  align-items: center;
  margin: 50px auto;
`;

export default LogInInputForm;
