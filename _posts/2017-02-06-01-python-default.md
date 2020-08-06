---
author: niee
layout : post
title : 01.Python 기본 문법
category : [python]
tags : ["python","Python 기본 문법"]
date : 2017-02-06T13:10:00+09:00
---

```
파이썬 개발시 필요한 기본 문법을 자바와 비교해서 알아 보겠다.
```

### 기본 구조

- 파이썬은 멀티패러다임이고 객체지향을 지원하며, 절차적이고 함수형 프로그래밍 스타일이라고 한다.
- 함수는 ```def 함수명(인자,인자... , 인자=0, 인자="기본값"):```으로 시작하고 ```코드의 구분은 들여쓰기(스페이스나 탭키)```로 구분된다.(매우매우 중요함)
- 파이썬의 ```주석은 #``` 을 이용한다.

### 문법 비교
- java

```java
//java 클래스 선언
//클래스와 메서드의 구분은 {}로 이로어지며, 명령어는 세미콜론(;)으로 끝난다.
//각매서드는 인자와 리턴형을 명시해야한다.

public class Test{
  //기본생성자
  public Test(){

  }

//인자가 하나인 덧셈 메서드
  public int add(int a){
    return a + 10;
  }

//인자가 두개인 덧셈 메서드
  public int add(int a, int b){
    return a + b;
  }

//인자가 하나인 문자열 합치기 메서드
  public String stringAdd(String a){
    return a + " add on";
  }

//인자가 두개인 문자열 합치기 메서드
  public String stringAdd(String a, String b){
    return a + b;
  }

//메인메서드
  public static void main(String args []){
    //객체생성
    Test test = new Test();
    //출력
    System.out.println(test.add(5));
    System.out.println(test.add(5,6));
    System.out.println(test.stringAdd("String1"));
    System.out.println(test.stringAdd("String2"," add Test"));
  }
}
```

- python

```python
# -- coding: utf-8 --
# test.py
# 함수는 def 함수명으로 선언되며 리턴값이나 인자의 자료형을 따로 명시하지 않아도 된다.
# 함수에 필요한 인자가 없을경우 기본값을 지정할 수 있다.
# 함수 명령은 들여쓰기로 구분한다.

#덧셈 함수 두번째 인자가 없을경우 기본값으로 10을 더함
# return a+b의 들여쓰기 중요
def add(a,b=10):
    return a+b

#문자열 합치는 함수 두번째 인자가 없을경우 기본으로 add on을 붙임
def stringAdd(a,b=" add on"):
    return a+b

#하나의 인자 기본 덧셈
addTest1 = add(5);
#두개의 인자 기본 덧셈
addTest2 = add(5,6);
#하나의 인자 문자열 합치기
stringAddTest1 = stringAdd("String1");
#두개의 인자 문자열 합치기
stringAddTest2 = stringAdd("String2"," add Test");

#출력
print(addTest1);
print(addTest2);
print(stringAddTest1);
print(stringAddTest2);
```

-------------------

- [샘플 소스 확인](https://github.com/ParkMinKyu/flasksample/blob/master/test.py)
