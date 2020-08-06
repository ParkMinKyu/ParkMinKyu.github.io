---
author: niee
layout : post
title : 05.Python Flask Mysql 연동 하기
category : [python,Flask]
tags : ["python","flask","flask Mysql","flask PyMySQL", "flask scheduler"]
date : 2017-02-09T10:00:00+09:00
temps : ["{{","}}"]
---

```
이번에는 scheduler 데이터 관리를 위해 mysql을 연동해서
간단히 select 및 insert 하는 틀을 잡아보겠다.
```

### mysql 설치 및 databse / table 생성
1. mysql을 설치한다.(요건 알아서...)
2. database를 생성한다.
3. table을 생성한다.
4. 테스트용 데이터를 하나 집어넣어 준다.

```sql
/*database 이름은 각자 편하게*/
create database myintranet;

/*테이블 생성*/
CREATE TABLE `my_schedule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `allDay` char(1) NOT NULL DEFAULT 'Y',
  PRIMARY KEY (`id`)
);

insert into my_schedule(title, start, end, allDay) values('my schedule', now(), now(), 'Y');

commit;
```

### mysql python용 드라이버 설치([pymysql](https://github.com/PyMySQL/PyMySQL) 사용)
1. virtualenv activate
2. pymysql설치
3. pymysql설치 이유는 select된 데이터를 바로 [Dictoionary](https://wikidocs.net/16)형태로 넘겨주는 기능이 있어서.(라고쓰고 설치할때 에러가 안나서....) 다른데도 있는진 모르겠음

```
# virtualenv는 설치된 상태라 가정

$> . schedulerenv/bin/activate
(schedulerenv) $> pip install pymysql
```

### schedule data를 처리할 ```dao/schedulerdao.py``` 작성
0. dao폴더에 ```__init__.py```생성
1. db connetion을 담당할 ```getConnection()``` 함수 생성
2. schedule을 가져올 ```getScheduler()``` 함수 생성
3. schedule을 입력할 ```setScheduler()``` 함수 생성
4. python package [참조](https://wikidocs.net/1418)
5. 완성된 ```schedulerdao.py```[소스확인](https://github.com/ParkMinKyu/scheduler/blob/master/dao/schedulerdao.py)

```python
# -- coding: utf-8 --
#처리된 데이터를 json형식으로 리턴해주기위해 사용
import json
#python mysql 연결 드라이버
import pymysql

#db연결을 담당할 함스
def getConnection():
    return pymysql.connect(host='localhost', user='root', password='123456',
                           db='myintranet', charset='utf8')

#select한 데이터중 mysql datetime형식의 값을 fullCalendar에서 처리할수 있도록 포멧 변경
def date_handler(obj):
    return obj.isoformat() if hasattr(obj, 'isoformat') else obj

#등록된 schedule을 가져옴
def getScheduler(searchDate):
    # Connection 연결
    conn = getConnection()

    # select한 데이터를 Dictoionary 형태로 가져옴
    curs = conn.cursor(pymysql.cursors.DictCursor)

    # SQL 처리
    sql = "select id, title, start, end, if(allDay = %s,true,false) allDay from my_schedule where to_days(start) >= to_days(%s) and to_days(end) <= to_days(%s)"
    curs.execute(sql, ('Y', searchDate['start'], searchDate['end']))

    # 처리된 data 가져옴
    rows = curs.fetchall()

    # Connection 닫기
    conn.close()

    #처리된 데이터를 json으로 변경 datetime처리를 위해 date_handler지정
    return json.dumps(rows, default=date_handler);

#넘어온 schedule을 등록
def setScheduler(schedule):
    # connetion 가져옴
    conn = getConnection()
    # cursor 생성
    cur = conn.cursor()
    # 데이터 입력
    ok = cur.execute("INSERT INTO my_schedule(title, start, end, allDay) VALUES (%s, now(), now(), 'Y')",(schedule['title']))
    # commit
    conn.commit()
    # Connection 닫기
    conn.close()
    # 처리 결과를 json형식으로 리턴
    return json.dumps({'rows' : ok})
```

### 클라이언트와 통신할  schedule route생성
1. ```application.py``` 에 신규 ```scheduler route``` 추가
2. ```schedulerdao import```
3. ```get method```접속은 schedule을 가져옴
4. ```post method```접속은 schedule을 입력함
5. 넘어온 ```form/queryString parameter```는 ```request.args.get('paramname')```형식으로 받아옴
6. 수정된 ```application.py```[소스확인](https://github.com/ParkMinKyu/scheduler/blob/master/application.py)

```python
--------생략-------

# schedulerdao import
from dao import schedulerdao

--------생략-------

# schedule 처리 get/post로 접근가능
@app.route("/scheduler",methods=["GET","POST"])
def scheduler():
    # 요청이 get이면
    if request.method == 'GET':
        # fullCalendar에서 start와 end를 yyyy-mm-dd 형식의 parameter로 넘겨준다.
        start = request.args.get('start')
        end = request.args.get('end')
        # schedulerdao.getScheduler에 start와 end를 Dictoionary형식으로 넘겨준다.
        return schedulerdao.getScheduler({'start':start , 'end' : end})

    #요청이 post면
    if request.method == 'POST':
        # Dictoionary 형식의 schedule 변수를 만든다. 추후 parameter를 받게 수정예정
        schedule = {'title' : 'test', 'contents' : 'contents'}
        # schedule을 입력한다.
        return  schedulerdao.setScheduler(schedule)

--------생략-------
```

### fullCalendar 에 events 추가
1. index.html에 fullCalendar이벤트를 가져올수 있게 추가한다.[참고](https://fullcalendar.io/docs/event_data/events_json_feed/)
2. 데이터 입력 테스트를 위한 버튼 추가
3. 버튼 이벤트 추가
4. 수정된 ```index.html```[소스확인](https://github.com/ParkMinKyu/scheduler/blob/master/templates/index.html)

```html
----생략----
<script>
$(document).ready(function() {
  $("#calendar").fullCalendar({
    events : '{{page.temps[0]}}url_for('scheduler'){{page.temps[1]}}'
  })

  $('#insertBtn').click(function(){
    $.ajax({
      url : '{{page.temps[0]}}url_for('scheduler'){{page.temps[1]}}',
      type : 'post',
      success : function(res){
        let data = JSON.parse(res);
        if(data.rows > 0){
          //데이터가 입력되면 이벤트를 다시 가져옴
          $("#calendar").fullCalendar( 'refetchEvents' )
        }
        else{
          alert('실패');
        }
      }
    });
  });
});
</script>
----생략----
<button type="button" id="insertBtn">스케줄 등록</button>
<div id="calendar"></div>

```

### 실행 및 접속 확인

```
(schedulerenv) $> python application.py

http://localhost:5000
```

![schedule 확인](/images/python/scheduler/3.png)

----------

- [샘플 소스 확인](https://github.com/ParkMinKyu/scheduler)

----------

- 이 포스트는 [http://flask-docs-kr.readthedocs.io/ko/latest/index.html](http://flask-docs-kr.readthedocs.io/ko/latest/index.html) 를 참고하여 만들었습니다.
