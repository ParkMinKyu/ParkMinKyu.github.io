---
layout : post
title : 01.Python Flask 설치 및 hello world
category : [python,Flask]
tags : ["python","flask","flask 설치","flask 웹 기초"]
date : 2017-02-03T09:45:00+09:00
---

```
새로운 공부거리 찾다가 파이썬으로 웹 어플리케이션 만드는걸 봤는데
자바로 개발할 때 보다 훨씬 간편하게 시작할 수 있는것 같아 공부하기로함
그중에 Flask라는 Microframework가 눈에 띄어 간단히 게시판 만들어보는걸 해보기로함 일단 시작하는 시점의 나의 수준은 java로 웹 만들어본 경험은 있어도 python은 한번도 안해본 상태 중간에 어려워지면 때려 칠지도 모르지만 일단 시작이 반이니 시작~
```

### Flask 기본
 - Flask는 [Microframework](http://flask-docs-kr.readthedocs.io/ko/latest/foreword.html#micro)라함
 - Flask는 기본적으로 정적 파일들(html,css,js...)은 어플리 케이션 root폴더 하위에 templates과 statics에 저장된다.
 - 그 외에 웹개발전 한번 읽어볼 만한 글은 [여기](http://flask-docs-kr.readthedocs.io/ko/latest/advanced_foreword.html#flask) 참조
 - 맥북으로 포스팅 하는거라 맥을 기준으로 작성하겠다.
 - 현재 El Capitan이라 python 2.7.10이 기본으로 설치되어있다.
 - python 3이상 버전은 완벽히 지원하지 않는 상태라고 하는것 같다.[참조](http://flask-docs-kr.readthedocs.io/ko/latest/advanced_foreword.html#python3)
 - Flask는 [Werkzeug](http://werkzeug.pocoo.org) 와 [Jinja2](http://jinja.pocoo.org) 라이브러리에 의존적.

### Flask 설치
- Virtualenv를 먼저 설치한다. 아래 두개중 하나 선택

```
1. easy_install을 이용한 방법 : $ sudo easy_install virtualenv
2. pip를 이용한 방법 : $ sudo pip install virtualenv
- pip가 없다면 pip설치 : $ sudo easy_install pip
```

- 설치가 완료되면 웹 어플리케이션을 만들 폴더를 생성하고, 해당 폴더에 virtualenv를 셋팅한다.

```
- 프로젝트명은 web-article로함

$ mkdir web-article
$ cd web-article
$ virtualenv venv
New python executable in /Users/niee/Documents/python-space/web-article/venv/bin/python
Installing setuptools, pip, wheel...done.
```

- virtualenv를 활성화 시킨다

```
$ . venv/bin/activate

- 활성화가 되면 프롬프트 앞에 (venv)가 붙는다
ex)
(venv) bagmingyuui-MacBook-Pro:web-article niee$
```

- virtualenv가 활성화된 상태에서 flask를 설치한다

```
$ pip install Flask

- sudo를 이용하면 전체 시스템에 적용되어 설치되는데 추천하지 않는다함.
```

- 이렇게 해서 flask 설치가 끝났다.

### Flask를 이용해 hello world 웹페이지 띄우기
- 우선 root폴더에 hello.py파일을 만든다.

```python
#hello.py

from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello World!'

if __name__ == '__main__':
    app.run()
```

- python으로 해당파일 실행 하고 브라우저로 접속한다.

```
$ python hello.py
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
127.0.0.1 - - [04/Feb/2017 10:39:16] "GET / HTTP/1.1" 200 -
```

- 그럼 아래처럼 hello word페이지가 보일것이다.

![flask_hello](/images/python/flask/1-1.png)

----------

- [virtualenv](https://virtualenv.pypa.io/en/stable/)란? : 격리 된 Python 환경을 만드는 도구입니다.

----------

- 이 포스트는 [http://flask-docs-kr.readthedocs.io/ko/latest/index.html](http://flask-docs-kr.readthedocs.io/ko/latest/index.html) 를 참고하여 만들었습니다.
