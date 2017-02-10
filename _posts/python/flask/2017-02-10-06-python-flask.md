---
layout : post
title : 06.Python Flask mysql 데이터 입력, 삭제
category : [python,Flask]
tags : ["python","flask","flask Mysql","flask PyMySQL", "flask scheduler"]
date : 2017-02-10T10:30:00+09:00
temps : ["{{","}}"]
---

```
이번에는 지난번에 대충 만들어둔 schedule입력을 완성하고
삭제추가 및 schedulerdao.py의
중복이 일어나는 부분을 리팩토링 해보겠다.
원래 리팩토링 이런거 안하는 사람이니 감수하고 봐주시길...
```

### ```schedulerdao.py``` schedule 삭제 함수 추가 & 리팩토링
1. 커넥션 연결/닫기 쿼리execute 등 중복된 부분 ```sql_template()```함수로 추출
2. 기존 함수 수정
3. schedule 삭제 함수 추가
4. 수정된 ```schedulerdao.py``` [소스확인](https://github.com/ParkMinKyu/scheduler/blob/master/dao/schedulerdao.py)

```python
---- 생략 ----

#sql 중복 부분 리팩토링
# typt 3 = insert, update, delete
# 1 = fetchall() 2 = fetchone()
def sql_template(type, sql, params=None):
    # Connection 연결
    connetion = getConnection()
    try:

        if type == 3 :
            with connetion.cursor() as cursor :
                # 데이터 입력
                rows = cursor.execute(sql, params)
                # commit
                connetion.commit()
                return rows
        else :
            with connetion.cursor(pymysql.cursors.DictCursor) as cursor :
                # SQL 처리
                cursor.execute(sql, params)
                # 처리된 data 가져옴
                if type == 1 :
                    return cursor.fetchall()
                elif type == 2 :
                    return cursor.fetchone()
    finally:
        # Connection 닫기
        connetion.close()

#등록된 schedule을 가져옴
def getScheduler(searchDate):
    sql = "select id, title, start, end, if(allDay = %s,true,false) allDay from my_schedule where to_days(start) >= to_days(%s) and to_days(end) <= to_days(%s)"
    params = ('Y', searchDate['start'], searchDate['end'])
    #처리된 데이터를 json으로 변경 datetime처리를 위해 date_handler지정
    return json.dumps(sql_template(1, sql, params), default=date_handler);

#넘어온 schedule을 등록
def setScheduler(schedule):
    #넘어온 데이터중 빈값이 있으면 0 리턴
    if not bool(schedule['start'].strip()) or not bool(schedule['end'].strip()) or not bool(schedule['title'].strip()) or not bool(schedule['allDay'].strip()) :
        return json.dumps({'rows' : 0})
    else :
        sql = "INSERT INTO my_schedule(title, start, end, allDay) VALUES (%s, %s, %s, %s)"
        params = (schedule['title'], schedule['start'], schedule['end'], schedule['allDay'])
        return json.dumps({'rows' : sql_template(3, sql, params)})

# schedule 삭제
def delScheduler(id):
    #넘어온 데이터중 빈값이 있으면 0 리턴
    if not bool(id.strip()) :
        return json.dumps({'rows' : 0})
    else :
        sql = "DELETE FROM my_schedule WHERE id = %s"
        params = (id)
        return json.dumps({'rows' : sql_template(3, sql, params)})
```

### schedule 삭제 route 추가
1. ```application.py```에 있는 ```scheduler()```함수에 ```delete method```접속추가
2. 데이터 입력 파라메터로 받게 추가
3. ```delete method``` 요청시 삭제 함수 호출
3. 수정된 ```application.py```[소스확인](https://github.com/ParkMinKyu/scheduler/blob/master/application.py)

```python
--------생략-------

# schedule 처리 get/post로 접근가능
@app.route("/scheduler",methods=["GET","POST","PUT","DELETE"])
def scheduler():

    --------생략-------
    #요청이 post면
    if request.method == 'POST':
        start = request.form['start']
        end = request.form['end']
        title = request.form['title']
        allDay = request.form['allDay']

        # Dictoionary 형식의 schedule 변수를 만든다. 추후 parameter를 받게 수정예정
        schedule = {'title' : title, 'start' : start, 'end' : end, 'allDay' : allDay}
        # schedule을 입력한다.
        return  schedulerdao.setScheduler(schedule)

    #요청이 delete면
    if request.method == 'DELETE':
        id = request.form['id']
        return  schedulerdao.delScheduler(id)

--------생략-------
```

### ```index.html``` 수정
1. 이벤트 달력 추가를 위해 [jquery-ui](https://jqueryui.com/)의 [datepicker](https://jqueryui.com/datepicker/)를 추가하겠다.
2. ```eventClick```함수에 삭제 event 추가 [api확인](https://fullcalendar.io/docs/mouse/eventClick/)
3. 등록 버튼 클릭시 ```from``` 데이터를 넘기도록 수정
4. 수정된 ```index.html```[소스확인](https://github.com/ParkMinKyu/scheduler/blob/master/templates/index.html)

```html
----생략----
$('#start, #end').datepicker({
  dateFormat: "yy-mm-dd"
});

$('#start, #end').datepicker('setDate',new Date());

eventClick : function(event){
  if(confirm("일정을 삭제 하시겠습니까?")){
    $.ajax({
      url : '{{page.temps[0]}}url_for('scheduler'){{page.temps[1]}}',
      type : 'delete',
      data :{id:event.id},
      success : function(res){
        let data = JSON.parse(res);
        if(data.rows > 0){
          $("#calendar").fullCalendar( 'refetchEvents' )
        }
        else{
          alert('실패');
        }
      }
    });
  }
}

$('#insertBtn').click(function(){
  $.ajax({
    url : '{{page.temps[0]}}url_for('scheduler'){{page.temps[1]}}',
    type : 'post',
    data :$('#schedulerForm').serialize(),
    success : function(res){
      let data = JSON.parse(res);
      if(data.rows > 0){
        $("#calendar").fullCalendar( 'refetchEvents' )
      }
      else{
        alert('실패');
      }
    }
  });
----생략----
<form name="schedulerForm" id="schedulerForm">
  start : <input type="text" name="start" id="start" readonly="readonly">
  end : <input type="text" name="end" id="end" readonly="readonly">
  title : <input type="text" name="title" id="title">
  <label for="allDay">하루</label>
  <input type="checkbox" name="allDay" id="allDay" checked="checked" value="Y">
  <button type="button" id="insertBtn">스케줄 등록</button>
</form>
<div id="calendar"></div>
```

### 실행 및 확인

```
(schedulerenv) $> python application.py

http://localhost:5000
```

----------

- [샘플 소스 확인](https://github.com/ParkMinKyu/scheduler)

----------

- 이 포스트는 [http://flask-docs-kr.readthedocs.io/ko/latest/index.html](http://flask-docs-kr.readthedocs.io/ko/latest/index.html) 를 참고하여 만들었습니다.
