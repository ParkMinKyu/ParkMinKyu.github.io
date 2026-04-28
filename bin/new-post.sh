#!/usr/bin/env bash
# bin/new-post.sh — Create a new Jekyll post with minimum boilerplate.
#
# Usage:
#   ./bin/new-post.sh "글 제목"
#   ./bin/new-post.sh "글 제목" python,flask
#   ./bin/new-post.sh "글 제목" python,flask "디버깅,팁,환경변수"
#
# Arguments:
#   1. title         (required) Post title
#   2. categories    (optional) comma-separated, e.g. python,flask
#   3. tags          (optional) comma-separated, e.g. "tip,debug"
#
# The script writes _posts/YYYY-MM-DD-slug.md. Front matter that the
# script omits will be filled in by _config.yml defaults.

set -euo pipefail

if [ $# -lt 1 ]; then
  echo "Usage: $0 \"글 제목\" [category1,category2] [tag1,tag2]" >&2
  exit 1
fi

TITLE="$1"
CATS="${2:-}"
TAGS="${3:-}"
DATE=$(date +%Y-%m-%d)

SLUG=$(echo "$TITLE" \
  | tr '[:upper:]' '[:lower:]' \
  | sed -E 's/[^[:alnum:][:space:]가-힣ㄱ-ㅎㅏ-ㅣ-]+//g' \
  | sed -E 's/[[:space:]]+/-/g' \
  | sed -E 's/-+/-/g' \
  | sed -E 's/^-|-$//g')

if [ -z "$SLUG" ]; then
  SLUG="post"
fi

ROOT_DIR=$(git rev-parse --show-toplevel 2>/dev/null || pwd)
FILE="$ROOT_DIR/_posts/$DATE-$SLUG.md"

if [ -e "$FILE" ]; then
  echo "이미 존재합니다: $FILE" >&2
  exit 1
fi

# Convert "a,b,c" -> [a, b, c] for YAML
to_yaml_list() {
  local raw="$1"
  local IFS=','
  local first=1
  printf '['
  for item in $raw; do
    item=$(echo "$item" | sed -E 's/^[[:space:]]+|[[:space:]]+$//g')
    [ -z "$item" ] && continue
    if [ $first -eq 1 ]; then
      printf '%s' "$item"
      first=0
    else
      printf ', %s' "$item"
    fi
  done
  printf ']'
}

{
  echo "---"
  echo "title: $TITLE"
  if [ -n "$CATS" ]; then
    echo "category: $(to_yaml_list "$CATS")"
  fi
  if [ -n "$TAGS" ]; then
    echo "tags: $(to_yaml_list "$TAGS")"
  fi
  echo "---"
  echo
  echo "여기에 본문을 작성하세요."
} > "$FILE"

echo "생성됨: $FILE"

if [ -n "${EDITOR:-}" ]; then
  "$EDITOR" "$FILE"
elif command -v code >/dev/null 2>&1; then
  code "$FILE"
fi
