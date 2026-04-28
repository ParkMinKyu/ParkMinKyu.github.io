# niee.blog

개인 기술 블로그 (`https://parkminkyu.github.io`).

## 새 글 쓰기

가장 간단한 방법은 두 가지입니다.

### 1. 스크립트로 한 번에 만들기 (로컬)

```bash
./bin/new-post.sh "글 제목"
./bin/new-post.sh "Python Flask 시작하기" python,flask
```

스크립트가 `_posts/YYYY-MM-DD-slug.md`를 생성하고 에디터를 열어줍니다.
이후 본문을 쓰고 `git add . && git commit -m "..." && git push`.

### 2. GitHub 웹에서 바로 만들기 (날짜도 자동)

1. https://github.com/ParkMinKyu/ParkMinKyu.github.io 접속
2. `_posts/` 폴더 → **Add file** → **Create new file**
3. 파일명에 **날짜 없이** 그냥 제목만 적기: 예) `flask-debug-tips.md`
4. 본문 작성 → **Commit changes**

푸시되면 GitHub Actions가 자동으로 파일명 앞에 오늘 날짜를 붙여
`2026-04-28-flask-debug-tips.md` 형태로 정리합니다. (`.github/workflows/auto-date-posts.yml`)

날짜를 직접 지정하고 싶으면 `2026-05-01-제목.md` 처럼 그대로 적어도 됩니다.

## 최소 front matter

```markdown
---
title: 글 제목
---

본문을 마크다운으로 작성합니다.
```

`author`, `layout`, `date`(파일명에서 자동)는 `_config.yml`의 defaults에서
자동 채워지므로 적지 않아도 됩니다. 카테고리/태그가 필요하면 다음을 추가:

```markdown
---
title: 글 제목
category: [python, flask]
tags: ["python", "tip"]
---
```

## 로컬 미리보기 (선택)

```bash
bundle install
bundle exec jekyll serve --livereload
# http://localhost:4000
```

## 라이센스

콘텐츠는 별도 명시가 없는 한 운영자 개인 저작물입니다.
