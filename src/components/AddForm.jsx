import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __getcalendars, __postcalendars } from "../redux/modules/calendarsSlice";

function appendYear(){
	var date = new Date();
	var year = date.getFullYear();
	var selectValue = document.getElementById("year");
	var optionIndex = 0;
	for(var i=year-20;i<=year+5;i++){
			selectValue.add(new Option(i,i),optionIndex++); 
  }
}

function appendMonth(){  // window.onload
	var selectValue = document.getElementById("month"); 
	var optionIndex = 0;
	for(var i=1;i<=12;i++){
			selectValue.add(new Option(i,i),optionIndex++);
	}
}

function appendDay(){
	var selectValue = document.getElementById("day");
	var optionIndex = 0;
	for(var i=1;i<=31;i++){
			selectValue.add(new Option(i,i),optionIndex++);
	}
} 

const AddForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [calendar, setCalendar] = useState({
    id: "",
    content: "",
    endTime: "",
  })

  const onsubmit = (e) => {
    e.preventDefault();
    dispatch(__postcalendars(calendar.id, calendar.content, calendar.endTime));
    setCalendar();
  };

  useEffect (() => {

  })

  return (
    <StAdd>
      <StAddForm onsubmit={onsubmit}>
        <StComment>
          <StMent>내용:</StMent>
          <CommentInput 
            placeholder="내용을 입력해주세요"
            type="text"
            name="calendar.content"
            onChange={(e)=>setCalendar(e.target.value)}
            value={calendar.content}
            ></CommentInput>
        </StComment>
        <StComment>
          <StMent>마감날짜:</StMent>
          <StSelect id="year" onChange={appendYear}>
            <option></option>
          </StSelect>
          <h3>년</h3>
          <StSelect id="month" onChange={appendMonth}>
            <option></option>
          </StSelect>
          <h3>월</h3>
          <StSelect id="day" onChange={appendDay}>
            <option></option>
          </StSelect>
          <h3>일</h3>
        </StComment>
        <StComment>
          <StMent>마감시간:</StMent>
          <StSelect>
            <option></option>
          </StSelect>
          <h3>시</h3>
          <StSelect>
            <option></option>
          </StSelect>
          <h3>분</h3>
        </StComment>
        <StComment>
          <CommentBtn>등록</CommentBtn>
          <CommentBtn
            onClick={() => {
              navigate("/");
            }}
          >
            취소
          </CommentBtn>
        </StComment>
      </StAddForm>
    </StAdd>
  );
};

export default AddForm;

const StAdd = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn}
  margin: auto;
  width: 1200px;
  height: 700px;
`;
const StAddForm = styled.form`
  display: flex;
  flex-direction: column;
  border: 2px solid #efb730;
  border-radius: 20px;
  height: 550px;
  width: 600px;
  box-shadow: 12px 12px 2px 1px #fedd89;
`;

const StComment = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

const CommentInput = styled.input`
  width: 270px;
  height: 70px;
  border: 2px solid #efb730;
  border-radius: 20px;
  box-shadow: 5px 5px 2px 1px #fedd89;
`;

const StMent = styled.h2`
  padding: 0px 10px 5px 5px;
`;

const CommentBtn = styled.button`
  width: 85px;
  height: 55px;
  background-color: white;
  font-size: large;
  border: 2px solid #efb730;
  border-radius: 20px;
  box-shadow: 3px 3px 2px 1px #fedd89;
  margin: 0px 20px 0px 20px;

  .hover {
    border-radius: 4px solid black;
    background-color: black;
  }
`;

const StSelect = styled.select`
  width: 60px;
  height: 25px;
  border: 2px solid #efb730;
  border-radius: 20px;
  box-shadow: 2px 2px 2px 1px #fedd89;
`;
