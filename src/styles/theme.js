import styled from "styled-components";

// 색상 4가지 위에서 부터 흰색, 하늘색, 노랑색, 검정색
const azur = {
  birch: "#F2F4EF",
  clearDay: "#C2E3F4",
  ronchi: "#EFB730",
  cinder: "#030305",
};
// 자주 쓰는 기본 값
const common = {
  flexCenterColumn: `
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  `,
};
// 사용 예시
// border: 4px solid ${({ theme }) => theme.azur.deep};
// ${({ theme }) => theme.common.flexCenterColumn}

const theme = {
  azur,
  common,
};

export default theme;
