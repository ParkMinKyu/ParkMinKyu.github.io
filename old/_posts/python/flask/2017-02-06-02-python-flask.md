---
layout : post
title : 02.Python Flask parameter받기 및 utf-8 인코딩 설정
author: niee
category : [python,Flask]
tags : ["python","flask","flask parameter","flask utf-8 encoding"]
---

```
이번에는 웹 개발시 기본적으로 필요한
parameter받는 방법과 한글 입력을 위한
utf-8 인코딩 설정법을 알아보겠다.
```

### parameter 규칙
- parameter 추가는 route에 REST 형식으로 ```/path/<variable_name>```을 추가하면 된다.
- 자료형 변환이 필요 할 경우 ```<converter:variable_name>```처럼 표시하면 해당 자료형으로 변환된다.
- 해당 parameter는 함수 인자에 같은 이름으로 적어주면 함수내에서 자동으로 바인딩 된다.
- 사용가능한 converter

converter | 설명
:---------------:|:---------------:
 int |	int형 parameter
 float |	int와 같지만 float 값의 경우
 path |	기본값과 같지만 슬래시도 허용

### utf-8 인코딩 방법
- 자세한 사항은 [flask메뉴얼](http://flask-docs-kr.readthedocs.io/ko/latest/ko/unicode.html?highlight=utf8) 참조
- utf-8 인코딩을 위해선 소스 첫줄에 ```# -- coding: utf-8 --``` 를 추가한다.
- 에디터에서 파일을 저장할 때 역시 utf-8로 저장한다.
- 인코딩이 안되면 ```SyntaxError: Non-ASCII character '\xea' in file .\hello.py on line 1, but no encoding declared; see http://python.org/dev/peps/pep
-0263/ for details``` 같은 ```SyntaxError```가 발생한다.

### parameter와 한글 인코딩 예제

```python
# -- coding: utf-8 --
# 기존에 작성한 hello.py에 추가 하였다.

from flask import Flask
app = Flask(__name__)

#context root
@app.route('/')
def hello_world():
    return 'Hello World!'

# String 타입의 username 파라메터
# http://localhost:5000/user/사용자명
@app.route('/user/<username>')
def show_user_profile(username):
    # show the user profile for that user
    return 'User %s' % username

# int 타입의 post_id 파라메터
# http://localhost:5000/post/19
@app.route('/post/<int:post_id>')
def show_post(post_id):
    # show the post with the given id, the id is an integer
    return 'Post %d' % post_id

# float 타입의 pi 파라메터
# http://localhost:5000/circle/3.14
@app.route('/circle/<float:pi>')
def show_pi(pi):
    # show the post with the given id, the id is an integer
    return 'PI %f' % pi

# path 타입의 path 파라메터
# http://localhost:5000/path/path/test/kkk/
@app.route('/path/<path:path>')
def show_path(path):
    # show the post with the given id, the id is an integer
    return 'path %s' % path

if __name__ == '__main__':
    app.run()
```

----------

- [샘플 소스 확인](https://github.com/ParkMinKyu/flasksample/blob/master/hello.py)

----------

- 이 포스트는 [http://flask-docs-kr.readthedocs.io/ko/latest/index.html](http://flask-docs-kr.readthedocs.io/ko/latest/index.html) 를 참고하여 만들었습니다.
