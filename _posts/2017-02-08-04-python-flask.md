---
author: niee
layout : post
title : 04.Python Flask css,js,html 적용하기
category : [python,Flask]
tags : ["python","flask","flask css","flask js","flask html", "flask scheduler"]
date : 2017-02-08T10:00:00+09:00
temps : ["{{","}}"]
---

```
이제 대충 기초는 알았으니 본격 적으로 웹 개발을 해봐야 겠다.
원래 간단하게 게시판 하려고 했는데 게시판 페이징하고, 검색하고
기능 추가하기가 귀찮아 질것 같아서 UI도 있고 DB도 간단히 만들수 있는
fullcalendar를 이용한 scheduler를 만들기로 변경했다.
```

### virtualenv를 이용한 새로운 프로젝트 설정
1. 기초로 돌아와 새로 셋팅을 시작해보자.
2. scheduler로 새로운 폴더를 생성한다.
3. 해당 폴더에 새로운 가상 파이썬 개발환경을 만든다.
4. flask를 설치한다.

```
# virtualenv는 설치된 상태라 가정

$> mkdir scheduler
$> cd scheduler
$> virtualenv schedulerenv
$> . schedulerenv/bin/activate
(schedulerenv) $> pip install flask
```

### 웹프로젝트 구성
1. flask는 기본 웹 리소스(css,js)는 웹 프로젝트 root폴더의 하위에 static폴더에서 찾는다.
2. html 파일은 templates 폴더에서 찾는다.
3. fullcalendar에 필요한 [jquery](http://jquery.com/download/), [fullcalendar](https://fullcalendar.io/download/), [moment](http://momentjs.com/)는 각 사이트에서 알아서 설치하여 static 폴더 하위에 만든다.
4. templates에 index.html을 만든다.
5. 프로젝트 메인소스가될 application.py 파일을 만든다.
6. 완성된 구조

![프로젝트 구조](/images/python/scheduler/1.png)

### index.html 코딩
1. flask는 [jinja2](http://jinja.pocoo.org/docs/2.9/templates/)를 이용하여 html을 랜더링 해준다.
2. html에 ```{{page.temps[0]}}함수명{{page.temps[1]}}```을 이용하여 python 함수를 사용할 수 있다.```(jsp의 <%%> 같은 기능)```
3. static 폴더는 url_for('static',filename='folder/filename') 형식으로 접근 한다.
4. [fullcalendar 기본 설정](https://fullcalendar.io/docs/usage/)을 참고하여 html을 코딩한다.
5. 완성된 index.html

```html
<!DOCTYPE html>
<html>
<head lang="ko">
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <title>Flask Web Scheduler</title>
  <link rel="stylesheet" href="{{page.temps[0]}} url_for('static',filename='fullcalendar/fullcalendar.css') {{page.temps[1]}}" />
  <script src="{{page.temps[0]}} url_for('static',filename='jquery/jquery.min.js') {{page.temps[1]}}"></script>
  <script src="{{page.temps[0]}} url_for('static',filename='moment/moment.min.js') {{page.temps[1]}}"></script>
  <script src="{{page.temps[0]}}url_for('static',filename='fullcalendar/fullcalendar.js'){{page.temps[1]}}"></script>
  <script>
  $(document).ready(function() {
    $("#calendar").fullCalendar({

    })
  });
  </script>
</head>
<body>
<div id="calendar"></div>
</body>
</html>
```

### application.py 작성
1. flask와 html랜더링에 필요한 ```render_template```, 사용자 요청 처리를 위한 ```request```를 import한다.
2. ```render_template('템플릿명',랜더링에 필요한 변수)``` 처럼 사용한다.
3. 완성된 application.py

```python
# -- coding: utf-8 --
from flask import Flask, request, render_template
app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

if __name__ =='__main__':
    app.run(debug=True)
```

### 실행
1. application.py 실행
2. ```localhost:5000``` 접속
3. 화면 확인

```
(schedulerenv) PS D:\flask\scheduler> python .\application.py
 * Restarting with stat
 * Debugger is active!
 * Debugger pin code: 264-497-455
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)

127.0.0.1 - - [08/Feb/2017 11:21:22] "GET / HTTP/1.1" 200 -
127.0.0.1 - - [08/Feb/2017 11:21:23] "GET /static/fullcalendar/fullcalendar.css HTTP/1.1" 304 -
127.0.0.1 - - [08/Feb/2017 11:21:23] "GET /static/jquery/jquery.min.js HTTP/1.1" 304 -
127.0.0.1 - - [08/Feb/2017 11:21:23] "GET /static/moment/moment.min.js HTTP/1.1" 304 -
127.0.0.1 - - [08/Feb/2017 11:21:23] "GET /static/fullcalendar/fullcalendar.js HTTP/1.1" 304 -
```

![scheduler main](/images/python/scheduler/2.png)

----------

- [샘플 소스 확인](https://github.com/ParkMinKyu/scheduler)

----------

- 이 포스트는 [http://flask-docs-kr.readthedocs.io/ko/latest/index.html](http://flask-docs-kr.readthedocs.io/ko/latest/index.html) 를 참고하여 만들었습니다.
