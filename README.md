## alert | 알럿
여러분의 일정을 등록하고 일정 마감 시간이 임박하면 알려드립니다 !
<br/><br/>
<img width="360" alt="스크린샷 2022-12-22 오후 4 37 01" src="https://user-images.githubusercontent.com/90745936/209082136-0b7a64d1-d26f-4648-a381-017bb4c80534.png">


<br/>

![AlertAlarm-byJS](https://user-images.githubusercontent.com/90745936/209080190-a5b0304c-7ea9-4a8a-9fe8-d75640ee06ab.gif)

일정 마감이 1시간 미만이라면 까먹지 않도록 눈에 띄게 표현합니다.


![c93e437f4dadbc10](https://user-images.githubusercontent.com/90745936/209080163-f068ad90-d16f-4f66-b351-1c9d8784d13f.gif)

일정 마감이 10분 이하로 남았을 때 긴박한 알림으로 알려드립니다.

<br/>

기본 기능
- 일정 등록, 수정, 삭제 기능
- 마감일자가 다가오면 붉은 테두리로 변하면서 시각적 효과 발생
- 마감 시간이 지난 일정은 별도 구역으로 분리
- 로그인 사용자에게만 해당 일정 노출
- JWT 토큰과 쿠키를 사용한 로그인 기능

<br/>

프론트엔드 스택<br/>

프로그래밍 언어: Java Script<br/>
웹개발 프레임워크: React<br/>
전역 상태 라이브러리: Redux<br/>
서버 배포: AWS S3<br/>

백엔드 스택<br/>

프로그래밍 언어: JAVA <br/>
웹개발 프레임워크: Spring Boot<br/>
보안 라이브러리: Sprign Security<br/>
데이터베이스: H2<br/>
서버 배포: AWS EC2<br/>
