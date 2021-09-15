GIT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD)
USER=$(shell whoami)
STAGING_URL="http://developer-hub-staging.s3-website-us-east-1.amazonaws.com"
STAGING_BUCKET=developer-hub-staging
include .env.production

.PHONY: stage static

# To stage a specific build, include the commit hash as environment variable when staging
# 	example: COMMIT_HASH=123456 make stage
# Here, generate path prefix according to environment variables
prefix:
ifdef COMMIT_HASH
PREFIX = $(COMMIT_HASH)/$(GATSBY_PARSER_BRANCH)/$(GATSBY_SITE)
else
PREFIX = $(GATSBY_PARSER_BRANCH)/$(GATSBY_SITE)
endif


stage: prefix
	@if [ -z "${GATSBY_SNOOTY_DEV}" ]; then \
		echo "To stage changes to the Snooty frontend, ensure that GATSBY_SNOOTY_DEV=true in your production environment."; exit 1; \
	else \
		AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY} mut-publish public ${STAGING_BUCKET} --prefix=${PREFIX} --stage  ${ARGS}; \
		echo "Hosted at ${STAGING_URL}/${PREFIX}/${USER}/${GIT_BRANCH}/"; \
	fi
