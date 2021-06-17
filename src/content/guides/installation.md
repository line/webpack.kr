---
title: Installation
sort: 13
contributors:
  - pksjce
  - bebraw
  - simon04
  - EugeneHlushko
  - sibiraj-s
  - chenxsan
translators:
  - dkstyle
---

이 가이드에서는 webpack을 설치하는 데 사용되는 다양한 방법에 대해 설명합니다.

## Prerequisites

시작하기 전에, [Node.js가](https://nodejs.org/en/) 최신 버전으로 설치되어 있는지 확인하세요. 현재 장기 지원 버전(LTS)은 이상적인 시작점입니다. 이전 버전에서는 webpack 혹은 관련 패키지에 필요한 기능이 누락되어 있을 수 있기 때문에 다양한 문제가 발생할 수 있습니다.

## Local Installation

최신 webpack 릴리스는 다음과 같습니다.

[![GitHub release](https://img.shields.io/npm/v/webpack.svg?label=webpack&style=flat-square&maxAge=3600)](https://github.com/webpack/webpack/releases)

최신 릴리스 또는 특정 버전을 설치하려면 다음 명령 중 하나를 실행하세요.

```bash
npm install --save-dev webpack
# 또는 특정 버전
npm install --save-dev webpack@<version>
```

T> `--save-dev`의 사용 여부는 사례에 따라 다릅니다. webpack을 번들링을 위해서만 사용한다고 가정하면, 프로덕션 빌드에 webpack을 포함하지 않을 것이므로 `--save-dev` 옵션으로 설치하는 것이 좋습니다. 그렇지 않으면 `--save-dev` 를 무시할 수 있습니다.

webpack v4 이상을 사용하는 경우 [CLI](/api/cli/)도 설치해야 합니다.

```bash
npm install --save-dev webpack-cli
```

대부분의 프로젝트에서는 로컬 설치를 권장합니다. 이를 통해 주요 변경사항이 있을 때 개별적으로 프로젝트를 쉽게 업그레이드 할 수 있습니다. 일반적으로 webpack은 하나 이상의 [npm scripts](https://docs.npmjs.com/misc/scripts)를 통해 실행되며 이 스크립트는 로컬의 `node_modules` 디렉터리에 설치된 webpack을 찾습니다.

```json
"scripts": {
  "build": "webpack --config webpack.config.js"
}
```

T> webpack의 로컬 설치를 실행하려면, 바이너리 버전인 `node_modules/.bin/webpack`으로 접근할 수 있습니다. 또는 npm v5.2.0이나 이상 버전을 사용하는 경우 `npx webpack`을 실행하여 이 작업을 수행할 수 있습니다.

## Global Installation

다음과 같이 NPM을 설치하면 webpack을 전역적으로 사용할 수 있습니다.

```bash
npm install --global webpack
```

W> 이것을 **권장하지 않는다는 것을** 기억하세요. 전역으로 설치하면 특정 버전의 webpack만 사용할 수 있고 다른 버전을 사용할 경우 실패할 수 있습니다.

## Bleeding Edge

webpack이 제공하는 최신 버전을 사용하는 데 관심이 있다면 다음 명령을 사용하여 베타 버전을 설치하거나 webpack 저장소에서 직접 설치해 볼 수 있습니다.

```bash
npm install --save-dev webpack@next
# 또는 특정 tagname/branchname
npm install --save-dev webpack/webpack#<tagname/branchname>
```

W> 이러한 최신 릴리스를 설치할 때 주의하세요! 여전히 버그가 있을 수 있기 때문에 프로덕션에 사용하면 안됩니다.
