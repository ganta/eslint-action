# ESLint Action

[![ESLint Formatter](https://github.com/ganta/eslint-action/actions/workflows/eslint-formatter.yaml/badge.svg)](https://github.com/ganta/eslint-action/actions/workflows/eslint-formatter.yaml)
[![Docker](https://github.com/ganta/eslint-action/actions/workflows/docker.yaml/badge.svg)](https://github.com/ganta/eslint-action/actions/workflows/docker.yaml)

GitHub Action to run ESLint and comment errors to Pull Request.


## Usage

First, you'll need to set up ESLint in your project. (cf. [Getting Started with ESLint](https://eslint.org/docs/user-guide/getting-started))

Then set up the workflow as follows:

```yaml
name: ESLint

on: pull_request

jobs:
  lint:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - uses: ganta/eslint-action@v1
```

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE).
