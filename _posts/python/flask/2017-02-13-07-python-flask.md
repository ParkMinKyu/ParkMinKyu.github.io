---
layout : post
title : 07.Python Flask mysql 데이터 수정 & scheduler 마무리
category : [python,Flask]
tags : ["python","flask","flask Mysql","flask PyMySQL", "flask scheduler"]
date : 2017-02-13T10:30:00+09:00
temps : ["{{","}}"]
---

```
이번에는 등록된 schedule 수정기능 추가하고
파라메터에 빈값이 들어오나 체크하는 부분을 공통 함수로 빼고
기타등등잡다한 부분을 마무리 하고
fullcalendar를 이용한 scheduler를 끝내겠다.
```

### ```schedulerdao.py``` schedule 수정/파라메터 체크 함수 추가 & 리팩토링
1. 각 함수마다 길게 나열했던 파라메터 체크 로직을 공통 함수로 빼서 공백이 있나 없나 체크
2. schedule 수정함수 추가
3. 수정된 ```schedulerdao.py``` [소스확인](https://github.com/ParkMinKyu/scheduler/blob/master/dao/schedulerdao.py)

```python
---- 생략 ----

#넘어온 schedule id에 해당하는 schedule을 수정
def putScheduler(schedule):
    #넘어온 데이터중 빈값이 있으면 0 리턴
    if not parameter_checker(schedule) :
        return json.dumps({'rows' : 0})
    else :
        sql = "UPDATE my_schedule SET title = %s, start = %s, end = %s, allDay = %s WHERE id = %s"
        params = (schedule['title'], schedule['start'], schedule['end'], schedule['allDay'], schedule['id'])
        return json.dumps({'rows' : sql_template(3, sql, params)})

# parameter 빈값 확인
def parameter_checker(params):
    #0이거나 공백일경우 false
    if not bool(params):
        return False
    #str 이나 unicode일경우 trim 된 문자열이 공백인지 확인
    elif hasattr(params,'strip') and not bool(params.strip()):
            return False
    # Dictoionary형식의 타입 체크
    elif hasattr(params,'values'):
        for value in params.values() :
            if not parameter_checker(value) :
                return False
        return True
    else:
        return True

```

### schedule 수정 route 추가
1. ```application.py```에 있는 ```scheduler()```함수에 ```put method```접속추가
2. 이번에는 넘어온 ```request.form```을 그대로 넘겨줌 샘플은 이것저것 많이 남겨놓는게 좋으니...(```werkzeug.datastructures.ImmutableMultiDict 타입```)
3. ```put method``` 요청시 수정 함수 호출
3. 수정된 ```application.py```[소스확인](https://github.com/ParkMinKyu/scheduler/blob/master/application.py)

```python
--------생략-------

# schedule 처리 get/post로 접근가능
@app.route("/scheduler",methods=["GET","POST","PUT","DELETE"])
def scheduler():

    --------생략-------
    #요청이 put이면
    if request.method == 'PUT':
        schedule = request.form
        return schedulerdao.putScheduler(schedule)

--------생략-------
```

### ```index.html``` 수정
1. ```eventClick```함수이벤트를 클릭한 event 내용을 입력form에 셋팅하게 수정
3. 수정/삭제 버튼 추가 및 click 이벤트 함수 추가
4. 수정된 ```index.html```[소스확인](https://github.com/ParkMinKyu/scheduler/blob/master/templates/index.html)

### 실행 및 확인

```
(schedulerenv) $> python application.py

http://localhost:5000
```

----------

- [샘플 소스 확인](https://github.com/ParkMinKyu/scheduler)

----------

- 이 포스트는 [http://flask-docs-kr.readthedocs.io/ko/latest/index.html](http://flask-docs-kr.readthedocs.io/ko/latest/index.html) 를 참고하여 만들었습니다.
