import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCookies } from "react-cookie";

import { __getcalendars } from "../redux/modules/calendarsSlice";
import MainModal from "./MainModal";

const MainForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { isLoading, error, calendars } = useSelector((state) =>
  //   console.log(state.calendars)
  // );
  const { isLoading, error, calendars } = useSelector(
    (state) => state.calendars
  );

  const [Cookie] = useCookies(["Authorization"]);

  const [modal, setModal] = useState();
  const [mod, setMod] = useState(false);

  const [hasCookie, setHasCookie] = useState("");

  const openModal = (i) => {
    setModal(i);
    setMod(true);
  };
  const gotCookie = () => {
    setHasCookie(true);
    dispatch(__getcalendars(Cookie));
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(__getcalendars(Cookie));
      Cookie.Authorization === undefined ? setHasCookie(false) : gotCookie();
    }, 10);
  }, [dispatch]);

  if (isLoading) {
  return <div>Loading....</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <React.Fragment>
      {hasCookie ? null : (
        <MainPageExample>
          <ExampleContent onClick={() => navigate("/login")}>
            일정을 추가하실려면 로그인해주세요
          </ExampleContent>
        </MainPageExample>
      )}

      <StMain>
        <StSuv>
          <div>진행중인 일정</div>
          {calendars?.map((calendar) => {
            if (calendar.done) {
              if (
                calendar.endTimeMillis - calendar.currentTimeMillis <=
                3600000
              ) {
                return (
                  <StBBox key={calendar.calendarId}>
                    <Stdiv>
                      {calendar.content} - !! 일정까지 남은시간 1시간 미만
                    </Stdiv>
                    <DetailBBBtn
                      type="button"
                      onClick={() => openModal(calendar.calendarId)}
                    >
                      상세보기
                    </DetailBBBtn>
                    <MainModal
                      calendar={calendars}
                      modals={modal}
                      mods={mod}
                    ></MainModal>
                  </StBBox>
                );
              } else {
                return (
                  <StBox key={calendar.calendarId}>
                    <Stdiv>{calendar.content}</Stdiv>
                    <DetailBtn type="button" onClick={() => openModal(calendar.calendarId)}>
                      상세보기
                    </DetailBtn>
                    <MainModal
                      calendar={calendars}
                      modals={modal}
                      mods={mod}
                    ></MainModal>
                  </StBox>
                );
              }
            }
          })}
        </StSuv>
        <div>
          <StButton
            onClick={() => {
              navigate("/Add");
            }}
          >
            --- 일정 추가하기 ---
          </StButton>
        </div>
        <StSuvv>
          <div>지난 일정</div>
          {calendars?.map((calendar) => {
            if (!calendar.done) {
              return (
                <StBoxx key={calendar.calendarId}>
                  <Stdiv>{calendar.content}</Stdiv>
                  <DetailBBtn
                    type="button"
                    onClick={() => openModal(calendar.calendarId)}
                  >
                    상세보기
                  </DetailBBtn>
                  <MainModal
                    calendar={calendars}
                    modals={modal}
                    mods={mod}
                  ></MainModal>
                </StBoxx>
              );
            }
          })}
        </StSuvv>
      </StMain>
    </React.Fragment>
  );
};

export default MainForm;
export const StMain = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 1210px;
  height: 1000px;
  margin: auto;
  font-family: KoPubWorldBatang;
  font-size: 16px;
`;

const MainPageExample = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 165%;
  background-color: rgba(0, 0, 0, 0.15);
`;
const ExampleContent = styled.button`
  position: fixed;
  width: 300px !important;
  height: 100px !important;
  border-radius: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: KoPubWorldBatang;
  font-size: 15px;
  cursor: pointer;
  border: solid 1px white;
  &:hover,
  &:active {
    color: white;
    background: var(--color-header);
    border-color: var(--color-border);
  }
  &:focus {
    outline: none;
  }
`;

const StButton = styled.button`
  width: 1150px;
  height: 50px;
  align-items: flex-end;
  font-size: 1.2em;
  margin-top: 15px;
  margin-bottom: 6px;
  border-radius: 10px;
  background-color: white;
  border-color: black;
  box-shadow: 5px 5px 2px 1px #aaaaaa;

  &:hover,
  &:active {
    color: white;
    background: #000000;
    border-color: #000000;
  }
  &:focus {
    outline: none;
  }
`;

const StSuv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 1150px;
  height: 500px;
  margin-top: 10px;
`;

const StSuvv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 1150px;
  height: 500px;
  border-bottom: 2px solid #efb730;
  margin-top: 10px;
`;

const StBoxx = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 50px;
  padding-right: 30px;
  width: 1100px;
  height: 50px;
  border: 2px solid grey;
  border-radius: 10px;
  margin-top: 10px;
  box-shadow: 5px 5px 2px 1px grey;
`;

const StBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 50px;
  padding-right: 30px;
  width: 1100px;
  height: 50px;
  border: 2px solid #efb730;
  border-radius: 10px;
  margin-top: 10px;
  box-shadow: 5px 5px 2px 1px #fedd89;
`;

const StBBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 50px;
  padding-right: 30px;
  width: 1100px;
  height: 50px;
  border: 5px solid black;
  border-radius: 10px;
  margin-top: 10px;
  box-shadow: 5px 5px 2px 1px black;
`;

const DetailBtn = styled.button`
  font: inherit;
  border: 1px solid var(--color-border);
  border-radius: 15px;
  background: white;
  color: var(--color-font);
  padding: 0.5rem 1.5rem;
  box-shadow: 3px 3px 2px 1px #fedd89;
  cursor: pointer;

  &:hover,
  &:active {
    color: white;
    background: var(--color-border);
    border-color: var(--color-border);
  }
  &:focus {
    outline: none;
  }
`;

const DetailBBtn = styled.button`
  font: inherit;
  border: 1px solid grey;
  border-radius: 15px;
  background: white;
  color: var(--color-font);
  padding: 0.5rem 1.5rem;
  box-shadow: 3px 3px 2px 1px grey;
  cursor: pointer;

  &:hover,
  &:active {
    color: white;
    background: grey;
    border-color: grey;
  }
  &:focus {
    outline: none;
  }
`;

const DetailBBBtn = styled.button`
  font: inherit;
  border: 1px solid grey;
  border-radius: 15px;
  background: white;
  color: var(--color-font);
  padding: 0.5rem 1.5rem;
  box-shadow: 3px 3px 2px 1px black;
  cursor: pointer;

  &:hover,
  &:active {
    color: white;
    background: black;
    border-color: black;
  }
  &:focus {
    outline: none;
  }
`;

const Stdiv = styled.div`
  width: 850px;
  padding: 0px 0px 0px 120px;
  display: flex;
  justify-content: center;
`;
