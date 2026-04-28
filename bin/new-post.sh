#!/usr/bin/env bash
# bin/new-post.sh — Create a new Jekyll post with minimum boilerplate.
#
# Usage:
#   ./bin/new-post.sh "글 제목"
#   ./bin/new-post.sh "글 제목" python,flask     # optional category list
#
# The script writes _posts/YYYY-MM-DD-slug.md with just `title:` in the
# front matter (everything else is filled in via _config.yml defaults).

set -euo pipefail

if [ $# -lt 1 ]; then
  echo "Usage: $0 \"글 제목\" [category1,category2]" >&2
  exit 1
fi

TITLE="$1"
CATS="${2:-}"
DATE=$(date +%Y-%m-%d)

# Slug: lowercase, replace spaces with hyphens, drop most punctuation
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

{
  echo "---"
  echo "title: $TITLE"
  if [ -n "$CATS" ]; then
    echo "category: [${CATS//,/, }]"
  fi
  echo "---"
  echo
  echo "여기에 본문을 작성하세요."
} > "$FILE"

echo "생성됨: $FILE"

# Try to open in the user's editor
if [ -n "${EDITOR:-}" ]; then
  "$EDITOR" "$FILE"
elif command -v code >/dev/null 2>&1; then
  code "$FILE"
fi
