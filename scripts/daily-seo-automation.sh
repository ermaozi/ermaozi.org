#!/usr/bin/env bash
set -Eeuo pipefail

readonly REPO_DIR="/home/emz/ermaozi.org"
readonly STATE_DIR="/home/emz/.local/state/ermaozi-daily-seo"
readonly CACHE_DIR="/home/emz/.cache/ermaozi-daily-seo"
readonly CODEX_BIN="/home/emz/.npm-global/bin/codex"

mkdir -p "$STATE_DIR" "$CACHE_DIR"

exec 9>"$STATE_DIR/run.lock"
if ! flock -n 9; then
  echo "A daily SEO run is already active; skipping." >&2
  exit 0
fi

readonly RUN_DIR="$(mktemp -d "$CACHE_DIR/run.XXXXXX")"
readonly LOG_FILE="$STATE_DIR/$(date +%Y-%m-%dT%H-%M-%S).log"

cleanup() {
  git -C "$REPO_DIR" worktree remove --force "$RUN_DIR" >/dev/null 2>&1 || true
  git -C "$REPO_DIR" worktree prune >/dev/null 2>&1 || true
}
trap cleanup EXIT

git -C "$REPO_DIR" fetch origin main
git -C "$REPO_DIR" worktree add --detach "$RUN_DIR" origin/main

"$CODEX_BIN" exec \
  --ephemeral \
  --model gpt-5.6-sol \
  --sandbox workspace-write \
  -c 'approval_policy="never"' \
  -c 'sandbox_workspace_write.network_access=true' \
  -C "$RUN_DIR" \
  "$(<"$RUN_DIR/scripts/daily-seo-prompt.md")" \
  2>&1 | tee "$LOG_FILE"

find "$STATE_DIR" -maxdepth 1 -type f -name '*.log' -mtime +30 -delete
