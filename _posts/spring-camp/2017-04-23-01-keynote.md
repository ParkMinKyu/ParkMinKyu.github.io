---
layout : post
title : Spring Camp 2017 후기
category : [spring-camp]
tags : ["spring camp 2017"]
date : 2017-04-23T12:20:00+09:00
---

```
2017 스프링 캠프 참여 및 요약
- keynote 정상혁
- Reactive Spring ( Spring 5 & Reactor ) 정윤진
- 이벤트 소싱 이규원
```

### 1. keynote

- 오픈소스 코드 기여 방법
- [발표 자료](http://benelog.github.io/docs/spring-camp-2017/)

### 2. Reactive Spring ( Spring 5 & Reactor )

- 스프링 5 : java9, http/2, Reactive
- 코드 베이스에 람다등이 추가되어 업그레이드시 주의(jdk 버전등)
- ```jigsaw``` (새로운 모듈 시스템)?
- ```undertow```??
- 요청 당 하나의 쓰레드 생성, 쓰레드풀 문제 -> 로드 밸런스 적용(구식...) -> 클라우드 도입(어플리케이션 요청량에 따른 자동 스케일, 로드 밸런스와 별차이가 없다?) -> Reactive(느슨한 결합, 비동기로 전달되는 메세지)
- ```Reactive Streams``` : 논-블럭킹 백프래셔, 비동기 스트림 프로세싱 표준
- ```java9의 java.util.concurrent.Flow```
- ```RxJava```
- [예제소스](https://github.com/joshlong/flux-flix-service)

### 3. 이벤트 소싱

- spring camp에 마소직원이??
- 닷넷에서 먼저 시작
- 데이터 저장기법, 메세지가 중심이 아님
- 이벤트 소싱 프로세스 발표자료 6페이지
- 도메인에서 발생하는 사실(이벤트)들을 모두 기록
- 이벤트는 추가만 된다?(삭제,수정 x)
- 버전관리 시스템(git,svn등)
- 이벤트명은 과거형 동사, 이벤트는 검증의 대상이 아니다.
- 이벤트 소싱은 반드시 ```CQRS?```와 조합해서 사용하자
- 가파른 학습, 유일성 상실
- [발표 자료](https://docs.com/gyuwon/5525/event-sourcing-spring-camp-2017)
- [구현 예제 닷넷임](https://github.com/Reacture/Khala.EventSourcing)
