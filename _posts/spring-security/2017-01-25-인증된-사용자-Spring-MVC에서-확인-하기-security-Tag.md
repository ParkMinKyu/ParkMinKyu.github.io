---
layout : post
title : 08. spring security 인증된 사용자 Spring MVC에서 확인 하기 & security Tag
category : [spring-security]
tags : ["spring-security","security mvc","security tag"]
date : 2017-01-25T16:35:00+09:00
---

- 이제 인증된 사용자를 실제 Spring MVC에서 어떻게 사용하는지 알아보겠다.
- ```spring security```를 사용하지 않은 프로젝트 들이라면 ```session```에 사용자 정보를 담아두고 사용 할 텐데
(물론 인증 성공 프로세스에서 사용자 정보를 session에 따로 담아 관리해도 상관은 없지만)
```security```를 사용하면 사용자 정보가 인증후 어딘가 보관은 되어있을텐데 어딘지 찾기가 난감하다.

- 사용자 요청이 들어오는 ```Controller```에서 사용법을 보면 요청을 받은 메서드의 파라메터로 ```Authentication```를 지정하면 된다.

```java
ex)

/**
* Simply selects the home view to render by returning its name.
*/
@RequestMapping(value = "/checkAuth", method = RequestMethod.GET)
public String checkAuth(Locale locale, Model model, Authentication auth) {
 UserDetailsVO vo = (UserDetailsVO) auth.getPrincipal();
 logger.info("Welcome checkAuth! Authentication is {}.", auth);
 logger.info("UserDetailsVO == {}.", vo);
 model.addAttribute("auth", auth );
 model.addAttribute("vo", vo );
 return "checkAuth";
}
```

- 위에서 보이듯이 ```Authentication​ getPrincipal()```을 이전 포스팅에서 작성한 ```UserDetailsVO```로 캐스팅하면 간편하게 사용자 정보를 확인 할 수 있다.

- 그리고 자바단이 아닌 ```view단```에서의 접근을 위해 ```taglib```를 제공 하는데
- ```taglib```사용을 위해선 ```pom.xml```에

```xml
<groupid>org.springframework.security</groupid>
 <artifactid>spring-security-taglibs</artifactid>
 <version>${spring.security.version}</version>
 <type>jar</type>
 <scope>compile</scope>
</dependency>
```
가 있어야 한다. 예제를 따라오신 분이면 초기설정때 같이 들어있다.

- ```jsp```에 ```security taglib```를 등록한다.

```html
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>
```
- ```security tag```는 ```authentication```과 ```authorize```,```accesscontrollist```  이렇게 3가지가 지원 된다.
- tag관련해서는 자세한 사용법은 자료를 많이 찾지 못해 모르지만 일단 가장 많이 사용하는 사용자정보를 가져오는 태그는 ```authentication``` 이다.

사용방법은

```html
principal : <sec:authentication property="principal"/>

principal.username : <sec:authentication property="principal.username"/>

principal.password : <sec:authentication property="principal.password"/>

principal.email : <sec:authentication property="principal.email"/>

principal.enabled : <sec:authentication property="principal.enabled"/>

principal.accountNonExpired : <sec:authentication property="principal.accountNonExpired"/>
```

처럼 사용 할 수 있다.(이처럼 ```security```에서 인증된 사용자 정보는 ```principal​```에 저장되어있다.)

다음 태그는 권한이 있는지 없는지 를 확인 할 수 있는 ```authorize```태그이다.​

```html
<sec:authorize url="/user/loginPage" var="t">${t }</sec:authorize>​
<sec:authorize access="hasRole('ROLE_USER')" var="u">${u }</sec:authorize>
<sec:authorize ifnotgranted="hasRole('ROLE_USER')" var="b">${b }</sec:authorize>
```

처럼 사용 할 수 있다. 직접 사용해보면 어떤 태그인지 알수 있다.

마지막으로 ```accesscontrollist```  ​가 있는데 이태그는 정확한 사용법을 모르겠다; 자료를 더 찾아봐야할것같다.

-----------

소스 확인 : [https://github.com/ParkMinKyu/security](https://github.com/ParkMinKyu/security)
