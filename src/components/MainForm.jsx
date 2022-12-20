import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __getcalendars } from "../redux/modules/calendarsSlice";
import MainModal from "./MainModal";

const MainForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error, calendars } = useSelector(
    (state) => state.calendars
  );

  const [modal, setModal] = useState();
  const [mod, setMod] = useState(false);

  const openModal = (i) => {
    setModal(i);
    setMod(true);
  };

  useEffect(() => {
    dispatch(__getcalendars());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <React.Fragment>
      <StMain>
        <StSuvv>
          <div>진행중</div>
          {calendars?.map((calendar, i) => {
            return (
              <StBox key={calendar.id}>
                <Stdiv>{calendar.content}</Stdiv>
                <DetailBtn type="button" onClick={() => openModal(i)}>상세보기</DetailBtn>
                <MainModal
                  calendar={calendars}
                  modals={modal}
                  mods={mod}
                ></MainModal>
              </StBox>
            );
          })}
        </StSuvv>
        <div>
          <StButton
            onClick={() => {
              navigate("/Add");
            }}
          >
            일정 추가하기
          </StButton>
        </div>
        <StSuv>
          <div>지난일정</div>
          <StBox>
            <Stdiv>test</Stdiv>
            </StBox>
        </StSuv>
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
`;

const StSuv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 1150px;
  height: 500px;
  border-top: 2px solid #efb730;
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

const Stdiv = styled.div`
  width: 850px;
  padding: 0px 0px 0px 120px;
  display: flex;
  justify-content: center;
`
