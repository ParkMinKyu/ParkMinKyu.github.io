---
layout : post
title : 08.Python Flask 외부에서 접속하기
category : [python,Flask]
tags : ["python","flask","flask 외부접속"]
date : 2020-08-03T10:45:00+09:00
---

```
Flask서버를 운영서버에 올린후 외부에서 접속하는 방법을 알아보자
```

### 외부 접속 하는방법

- 외부 접속 방법은 별거 없다. application.py의 app.run()안에 바인딩될 호스트 정보를 넣어주면 된다.

```
1. 기본 app.run()의경우 127.0.0.1로 실행되어 로컬에서의 접속만 가능하다.
2. 기본 app.run(host='0.0.0.0')의 경우 모든 호스트로 접속이 가능하다.
```

- 포트를 변경하고 싶을경우는 port 정보를 넣어준다

```
1. 기본 app.run()의경우 포트 5000으로 실행된다
2. 기본 app.run(host='0.0.0.0', port=9900)의 경우 9900번 포트로 실행된다.
```

- python으로 해당파일 실행 하고 브라우저로 접속한다.

```
$ python application.py
  * Serving Flask app "application" (lazy loading)
 * Environment: production
   WARNING: This is a development server. Do not use it in a production deployment.
   Use a production WSGI server instead.
 * Debug mode: off
 * Running on http://0.0.0.0:9900/ (Press CTRL+C to quit)
```

- 외부에서 변경된 정보로 접속해본다
- [http://niee.kr:5000](http://niee.kr:5000)
