import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCookies } from "react-cookie";

import { __getcalendars } from "../redux/modules/calendarsSlice";
import MainModal from "./MainModal";
import alertAlarm from "../img/AlertAlarm.png";
import alertAlarmJS from "../img/AlertAlarm-byJS.gif";
import alertAlarmPG from "../img/BusyPigeon.gif";

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

  useEffect(() => {
    setTimeout(() => {
      dispatch(__getcalendars(Cookie));
    }, 10);
    Cookie.Authorization === undefined
      ? setHasCookie(false)
      : setHasCookie(true);
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading....</div>;
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
          <CardContainer>
            <SpaceDiv />
            진행중인 일정
          </CardContainer>
          {calendars?.map((calendar) => {
            if (calendar.done) {
              if (
                calendar.endTimeMillis - calendar.currentTimeMillis <=
                3600000
              ) {
                if (
                  calendar.endTimeMillis - calendar.currentTimeMillis <=
                  600000
                ) {
                  return (
                    <CardContainer>
                      <AlertAlarm src={alertAlarmPG} />
                      <StBBox key={calendar.calendarId}>
                        <Stdiv>{calendar.content}</Stdiv>
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
                    </CardContainer>
                  );
                } else {
                  return (
                    <CardContainer>
                      <AlertAlarm src={alertAlarmJS} />
                      <StBBox key={calendar.calendarId}>
                        <Stdiv>{calendar.content}</Stdiv>
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
                    </CardContainer>
                  );
                }
              } else {
                return (
                  <CardContainer>
                    <SpaceDiv />
                    <StBox key={calendar.calendarId}>
                      <Stdiv>{calendar.content}</Stdiv>
                      <DetailBtn
                        type="button"
                        onClick={() => openModal(calendar.calendarId)}
                      >
                        상세보기
                      </DetailBtn>
                      <MainModal
                        calendar={calendars}
                        modals={modal}
                        mods={mod}
                      ></MainModal>
                    </StBox>
                  </CardContainer>
                );
              }
            }
          })}
        </StSuv>
        <CardContainer>
          <SpaceDiv />
          <StButton
            onClick={() => {
              navigate("/Add");
            }}
          >
            --- 일정 추가하기 ---
          </StButton>
        </CardContainer>
        <StSuvv>
          <CardContainer>
            <SpaceDiv />
            지난 일정
          </CardContainer>
          {calendars?.map((calendar) => {
            if (!calendar.done) {
              return (
                <CardContainer>
                  <SpaceDiv />
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
                </CardContainer>
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
  border: 2px solid gray;
  border-radius: 10px;
  margin-top: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 1.95px 1.95px 2.6px;
`;

const StBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 50px;
  padding-right: 30px;
  width: 1100px;
  height: 50px;
  border: 2px solid var(--color-border);
  border-radius: 10px;
  margin-top: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 1.95px 1.95px 2.6px;
`;

const CardContainer = styled.div`
  display: flex;
  align-items: center;
`;

const AlertAlarm = styled.img`
  object-fit: cover;

  height: 50px;
  margin-top: 10px;
`;
const SpaceDiv = styled.div`
  width: 39px;
  height: 40px;
  margin: 10px 14px 0 0;
`;
const StBBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 50px;
  padding-right: 30px;
  width: 1100px;
  height: 50px;
  border: 2px solid #fc5230;
  border-radius: 10px;
  margin-top: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 1.95px 1.95px 2.6px;
`;

const DetailBtn = styled.button`
  font: inherit;
  width: 120px;
  height: 41px;
  border: 1px solid var(--color-border);
  border-radius: 15px;
  background: white;
  color: var(--color-font);
  padding: 0.5rem 1.5rem;
  box-shadow: rgba(0, 0, 0, 0.35) 1.95px 1.95px 2.6px;
  cursor: pointer;

  &:hover,
  &:active {
    font-size: 17px;
  }
  &:focus {
    outline: none;
  }
`;

const DetailBBtn = styled.button`
  font: inherit;
  width: 120px;
  height: 41px;
  border: 1px solid grey;
  border-radius: 15px;
  background: white;
  color: var(--color-font);
  padding: 0.5rem 1.5rem;
  box-shadow: rgba(0, 0, 0, 0.35) 1.95px 1.95px 2.6px;
  cursor: pointer;

  &:hover,
  &:active {
    font-size: 17px;
  }
  &:focus {
    outline: none;
  }
`;

const DetailBBBtn = styled.button`
  font: inherit;
  width: 120px;
  height: 41px;
  border: 1px solid #fc5230;
  border-radius: 15px;
  background: white;
  color: var(--color-font);
  padding: 0.5rem 1.5rem;
  box-shadow: rgba(0, 0, 0, 0.35) 1.95px 1.95px 2.6px;
  cursor: pointer;

  &:hover,
  &:active {
    font-size: 17px;
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
