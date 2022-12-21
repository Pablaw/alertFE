import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  __delcalendars,
  __patchcalendars,
} from "../redux/modules/calendarsSlice";
import Button from "./elements/Button";

const MainModal = (props) => {
  const dispatch = useDispatch();
  const { modals, calendar, mods } = props; //modals = index uint , calendar = [{},{}] , mods = bool: show modal
  const [isEdit, setIsEdit] = useState(true);
  const [content, setContent] = useState();
  const [cald, setCald] = useState({});
  const cal = calendar?.find(
    (calendars) => parseInt(calendars.id) === modals + 1
    );

  const onClickDeleteCalendar = (calId) => {
    dispatch(__delcalendars(calId));
    setCald({ ...cald });
  };

  const onClickEditBtn = (calId, content) => {
    dispatch(__patchcalendars({calId, content, endTime:0 }));
    setIsEdit(!isEdit);
  };

  if (mods) {
    return (
      <>
        <Modal>
          <ModalBody onClick={(e) => e.stopPropagation()}>
            <ModalCloseBtn onClick={() => !mods}>✖</ModalCloseBtn>
            <div>
              <StTime>
                <div>등록시간</div>
                <div>마감시간</div>
              </StTime>
              <StTimee>
                <div>22/12/20 10시 30분</div>
                <div>22/12/20 10시 30분</div>
              </StTimee>
              {isEdit ? (
                <ContentDiv>{cal.content}</ContentDiv>
              ) : (
                <ContentDiv>
                  <StInput
                    type="text"
                    id="content"
                    name="cal.content"
                    defaultValue={content}
                    placeholder={cal.content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </ContentDiv>
              )}
              <BtnDiv>
                <Button onClick={() => onClickDeleteCalendar(cal.id)}>
                  삭제하기
                </Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsEdit((prev) => !prev);
                  }}
                >
                  {isEdit ? "수정하기" : "수정취소"}
                </Button>
                {!isEdit && (
                  <Button
                    onClick={() => {
                      if (cal.content.trim() === "") {
                        alert("내용을 입력해주세요.");
                      } else {
                        setContent(cal.content);
                        onClickEditBtn(cal.id, content);
                      }
                    }}
                  >
                    수정완료
                  </Button>
                )}
              </BtnDiv>
            </div>
          </ModalBody>
        </Modal>
      </>
    );
  } else {
    return null;
  }
};

export default MainModal;

const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBody = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  padding: 40px;
  text-align: center;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  border: 3px solid var(--color-border);
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
`;

const ModalCloseBtn = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  border: none;
  color: rgba(0, 0, 0, 0.7);
  background-color: transparent;
  font-size: 20px;
`;

const BtnDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const ContentDiv = styled.div`
  width: 500px;
  height: 250px;
  margin-top: 180px;
  font-size: 1.5em;
  word-break: break-all;
`;

const StTime = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 40px 0px 40px;
`;

const StTimee = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StInput = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 1em;
  width: 300px;
  height: 50px;
  word-break: break-all;
`;
