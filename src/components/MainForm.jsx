import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __getcalendars } from "../redux/modules/calendarsSlice";

const MainForm = () => {
  const navigate = useNavigate();
  const { isLoading, error, calendars } = useSelector((state) => state.calendars)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getcalendars())
  }, [dispatch])

  if (isLoading) {
    return <div>Loading....</div>
  }

  if (error) {
    return <div>{error.message}</div>
  }
  return (
    <StMain>
      <StSuvv>
      <div>진행중</div>
        {calendars?.map((calendar) => (
            <StBox>{calendar.content}</StBox>
        ))}
          
            
      </StSuvv>
      <div><StButton onClick={()=>{navigate("/Add")}}>일정 추가하기</StButton></div>
      <StSuv>
        <div>지난일정</div>
        {/* <StBox>test</StBox> */}
      </StSuv>
    </StMain>
  )
}

export default MainForm;


export const StMain = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 1210px;
  height: 1000px;
  margin: auto;
`

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
  box-shadow: 5px 5px 2px 1px #AAAAAA;
`

const StSuv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 1150px;
  height: 500px;
  border-top: 2px solid #EFB730;
  margin-top: 10px;
`

const StSuvv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 1150px;
  height: 500px;
  border-bottom: 2px solid #EFB730;
  margin-top: 10px;
`

const StBox = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn}
  width: 1150px;
  height: 50px;
  border: 2px solid #EFB730;
  border-radius: 10px;
  margin-top: 10px;
  box-shadow: 5px 5px 2px 1px #FEDD89;
`