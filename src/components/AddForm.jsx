import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __postcalendars } from "../redux/modules/calendarsSlice";
import Button from "./elements/Button";
import { useCookies } from "react-cookie";

const AddForm = () => {
  const [Cookie] = useCookies(["Authorization"]);

  const [form, setForm] = useState({
    year: "2022",
    month: "01",
    day: "01",
    hour: "00",
    minute: "00",
  });

  const onChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const time = `${form.year}-${form.month}-${form.day}T${form.hour}:${form.minute}`;
  const now = new Date();
  let years = [];
  for (let y = now.getFullYear() + 5; y >= 2000; y -= 1) {
    years.push(y);
  }

  let month = [];
  for (let m = 1; m <= 12; m += 1) {
    if (m < 10) {
      // 날짜가 2자리로 나타나야 했기 때문에 1자리 월에 0을 붙혀준다
      month.push("0" + m.toString());
    } else {
      month.push(m.toString());
    }
  }

  let days = [];
  let date = new Date(form.year, form.month, 0).getDate();
  for (let d = 1; d <= date; d += 1) {
    if (d < 10) {
      // 날짜가 2자리로 나타나야 했기 때문에 1자리 일에 0을 붙혀준다
      days.push("0" + d.toString());
    } else {
      days.push(d.toString());
    }
  }

  let hours = [];
  for (let i = 0; i <= 23; i += 1) {
    if (i < 10) {
      hours.push("0" + i.toString());
    } else {
      hours.push(i.toString());
    }
  }// hours.push(i);

  let minute = [];
  for (let i = 0; i <= 50; i += 10) {
    if (i < 10) {
      minute.push("0" + i.toString());
    } else {
      minute.push(i.toString());
    }
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [calendar, setCalendar] = useState({
    content: "",
    endTime: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setCalendar({ ...calendar, [name]: value });
  };

  const onSubmitHandler = (e) => {
    if (calendar.content === "") {
      return alert("내용을 입력해주세요.");
    }
    calendar.endTime = Date.parse(time);
    dispatch(__postcalendars([{ ...calendar }, Cookie]));
    setCalendar("");
    navigate("/");
  };

  return (
    <StAdd>
      <StAddForm onSubmit={onSubmitHandler}>
        <StComment>
          <StMent>내용:</StMent>
          <CommentInput
            placeholder="내용을 입력해주세요"
            type="text"
            name="content"
            onChange={changeHandler}
            defaultvalue={calendar.content}
          ></CommentInput>
        </StComment>
        <StComment>
          <StMent>마감날짜:</StMent>
          <StSelect value={form.year} name="year" onChange={onChange}>
            {years?.map((year) => (
              <option value={year} key={year}>
                {year}
              </option>
            ))}
          </StSelect>
          <h3>년</h3>
          <StSelect value={form.month} name="month" onChange={onChange}>
            {month?.map((mon) => (
              <option value={mon} key={mon}>
                {mon}
              </option>
            ))}
          </StSelect>
          <h3>월</h3>
          <StSelect value={form.day} name="day" onChange={onChange}>
            {days?.map((day) => (
              <option value={day} key={day}>
                {day}
              </option>
            ))}
          </StSelect>
          <h3>일</h3>
        </StComment>
        <StComment>
          <StMent>마감시간:</StMent>
          <StSelect value={form.hour} name="hour" onChange={onChange}>
            {hours?.map((hour) => (
              <option value={hour} key={hour}>
                {hour}
              </option>
            ))}
          </StSelect>
          <h3>시</h3>
          <StSelect value={form.minute} name="minute" onChange={onChange}>
            {minute?.map((minutes) => (
              <option value={minutes} key={minutes}>
                {minutes}
              </option>
            ))}
          </StSelect>
          <h3>분</h3>
        </StComment>
        <StComment>
          <Button>등록</Button>
          <Button
            onClick={() => {
              navigate("/");
            }}
          >
            취소
          </Button>
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
