#!/usr/bin/env bash

npm ci

npx eslint --format /action/lib/github-actions-message-command-formatter.js --ext .js,.jsx,.ts,.tsx .
