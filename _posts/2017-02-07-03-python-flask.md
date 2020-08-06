---
author: niee
layout : post
title : 03.Python Flask Debug 모드와 라우팅
category : [python,Flask]
tags : ["python","flask","flask debug","flask 라우팅","flask http method", "flask url_for"]
date : 2017-02-07T10:00:00+09:00
---

```
이번에는 flask서버를 개발하기 편하게
debug 모드로 실행하는 방법과
라우팅에 대해 알아보겠다.
```

### flask debug 모드로 실행
- flask를 기본으로 ```app.run()```으로 실행할경우 해당 서버는 운영 모드가 되어 개발하며 수정한 파일들이 실시간으로 반영 되지 않고 재기동을 해야한다.
- debug모드를 사용하면 개발중 수정한 사항이 실시간으로 반영되어 서버가 자동으로 재기동 된다.
- debug모드 실행 방법은 두가지가 있는데 먼저 ```app.debug = True``` 후 ```app.run()``` 하는 방법과 한번에 ```app.run(debug=True)``` 하는 방법이 있다.
- debug 적용 방법

```python
# -- coding: utf-8 --
# 디버그 및 route

from flask import Flask
app = Flask(__name__)

#context root
@app.route('/')
def hello_world():
    return 'Hello World!'

if __name__ == '__main__':
    app.debug = True
    app.run()
    #app.run(debug=True)
```

### 라우팅
- ```@app.route('/')```를 함수앞에 사용하면 해당 url을 함수와 연결시켜 준다.
- ```@app.route('/')```의 url에 parameter를 추가하는 기능은 지난 [포스팅](/python/flask/02-python-flask.html)을 참고
- ```@app.route```의 url을 지정할 때 url의 마지막에 ```@app.route('/test1/')```처럼 url의 마지막에 ```/```를 추가할 경우 ```/test1```로 접근할 경우 flask는 자동으로 url의 마지막에```/```를 추가해준다.
- 반대로 ```@app.route('/test2')```처럼 url의 마지막에 ```/```없이 url을 지정할 경우 ```/test2/```로는 접근이 되지 않는다.
- url 샘플

```python
# -- coding: utf-8 --
# 디버그 및 route

from flask import Flask
app = Flask(__name__)

#context root
@app.route('/')
def hello_world():
    return 'Hello World!'

#urltest1
#http://localhost:5000/test1 로 접근시 url끝에 /를 붙여준다
@app.route('/test1/')
def urltest1():
    return 'test1'

#urltest
#http://localhost:5000/test2 로만 접근가능
@app.route('/test2')
def urltest2():
    return 'test2'

if __name__ == '__main__':
    app.debug = True
    app.run()
    #app.run(debug=True)
```

- flask에서는 ```url_for()``` 함수를 사용해서 url을 생성해 주는 기능도 있다. ```Spring HATEOAS 와 비슷한듯```
- 사용방법은 ```url_for()```를 먼저 import 하고 첫 인자는 메서드명, parameter가 필요한 경우 ```paramname='value'``` 형식으로 두번째 인자부터 넘겨준다.
- 해당 메서드의 ```paramname```이 url parameter로 지정이 되어있다면 ```/url/value```형식으로 url을 생성해 준다.
- 이기능이 필요한 이유는 [공식문서](http://flask-docs-kr.readthedocs.io/ko/latest/quickstart.html#url) 참조
- url 생성 방법

```python
# -- coding: utf-8 --
# 디버그 및 route

from flask import Flask, url_for
app = Flask(__name__)

#context root
@app.route('/')
def hello_world():
    return 'Hello World!'

#urltest1
#http://localhost:5000/test1 로 접근시 url끝에 /를 붙여준다
@app.route('/test1/')
def urltest1():
    return 'test1'

#urltest
#http://localhost:5000/test2 로만 접근가능
@app.route('/test2')
def urltest2():
    return 'test2'

#urltest
@app.route('/test3/<param>')
def urltest3(param):
    return 'test3 param %s' % param

#get url
#http://localhost:5000/geturl 각 함수들의 url을 생성해준다
@app.route('/geturl')
def geturl():
    test1url = url_for('urltest1')
    test2url = url_for('urltest2',param='value')
    test3url = url_for('urltest3',param='testparam')
    return 'urltest1 method url %s' % test1url + ' && urltest2 method url %s' % test2url + ' && test3url method url %s' % test3url

if __name__ == '__main__':
    app.debug = True
    app.run()
    #app.run(debug=True)
```

### http method 별 접근 허용하기
- get,post처럼 route에 http method를 지정하기 위해선 우선 request를 import 시켜준다.
- 그 다음 route를 지정할 때 ```@app.route('/getmethod', methods=['GET'])``` 처럼 지정하거나 함수안에서 ```if request.method == 'GET' : ~~~~```를 이용해 분기처리 할수 있다.
- 사용 가능한 method 목록은 [공식문서](http://flask-docs-kr.readthedocs.io/ko/latest/quickstart.html#http
) 참조
- method 샘플

```python
# -- coding: utf-8 --
# 디버그 및 route

from flask import Flask, url_for, request
app = Flask(__name__)

#context root
@app.route('/')
def hello_world():
    return 'Hello World!'

#method
#get 메서드만 접근
@app.route('/getmethod', methods=['GET'])
def getmethod():
    return 'getmethod'

#method
#post 메서드만 접근
@app.route('/postmethod', methods=['POST'])
def postmethod():
    return 'postmethod'

#method
#get or post 메서드 접근
@app.route('/getorpostmethod', methods=['GET','POST'])
def getorpostmethod():
    if request.method == 'GET':
        return 'getmethod'
    elif request.method == 'POST':
        return 'postmethod'

if __name__ == '__main__':
    app.debug = True
    app.run()
    #app.run(debug=True)
```

----------

- [샘플 소스 확인](https://github.com/ParkMinKyu/flasksample/blob/master/route.py)

----------

- 이 포스트는 [http://flask-docs-kr.readthedocs.io/ko/latest/index.html](http://flask-docs-kr.readthedocs.io/ko/latest/index.html) 를 참고하여 만들었습니다.
