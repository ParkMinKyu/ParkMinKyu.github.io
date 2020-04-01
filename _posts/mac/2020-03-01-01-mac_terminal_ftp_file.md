---
layout : post
title : 01.Mac 터미널 scp 이용한 ftp파일 업로드/다운로드
category : [mac]
tags : ["ftp","mac terminal","scp"]
date : 2020-03-01T11:20:00+09:00
---

```
맥북 사용중 ftp클라이언트 프로그램 설치없이 scp를 사용하여
파일 업로드 다운로드를 하는 방법을 알아본다.
클라이언트 사용하면 편하지만 터미널로 충분히 가능하고 뭔가 있어 보인다고 할까나...
```

### 맥 터미널로 ftp 파일 업/다운 로드 하기
1. 맥 터미널 명령어중 ```scp```를 이용하여 터미널로 ftp파일 업로드 다운로드가 가능하다
2. 사용법은 

```bash
//기본적인 파일 업로드
$ spc 업로드할파일명 ftp계정@호스트:올라갈경로

//ex)
$ spc test.txt niee@host.kr:/home/niee/folder

//기본 ftp포트가 아닌 다른 포트를 사용할 경우
$ spc -P 포트번호 test.txt niee@host.kr:/home/niee/folder

//기본적인 파일 다운로드
$ spc ftp계정@호스트:다운받을경로/파일명 다운받을폴더경로

//ex)
$ spc niee@host.kr:/home/niee/folder/test.txt /local

//기본 ftp포트가 아닌 다른 포트를 사용할 경우
$ spc -P 포트번호 niee@host.kr:/home/niee/folder/test.txt /local

//폴더를 업/다운로드 할경우는 -r옵션

//ex)폴더 다운로드
$ spc -r niee@host.kr:/home/niee/folder/ /local

//ex)폴더 
$ spc -r /local niee@host.kr:/home/niee/folder/
```
