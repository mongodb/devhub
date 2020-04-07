#!/bin/bash
set -e

STAGING="origin/staging"
PROD="origin/master"

git fetch --quiet &

wait

echo -e staging using branch "\033[1m$STAGING\033[0m"
echo -e production using branch "\033[1m$PROD\033[0m"

log_flags=(
    --pretty=oneline

    # Don't show the commits that were made on branches;
    # only show the commits that merged a branch into master (PRs).
    --first-parent

    # Show abbreviated commit hashes instead of the full 40 characters
    --abbrev-commit

    # Don't show tags or branch names
    --no-decorate
)

echo
echo changes in staging but not production:
git log "${log_flags[@]}" $PROD..$STAGING
