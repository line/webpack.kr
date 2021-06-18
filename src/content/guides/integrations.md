---
title: Integrations
sort: 24
contributors:
  - pksjce
  - bebraw
  - tashian
  - skipjack
  - AnayaDesign
translators:
  - limong
---

일반적인 오해를 푸는 것부터 시작하겠습니다. webpack은 [Browserify](http://browserify.org/)나 [Brunch](https://brunch.io/) 같은 모듈 번들러 입니다. [Make](https://www.gnu.org/software/make/) 및 [Grunt](https://gruntjs.com/), [Gulp](https://gulpjs.com/)와 같은 태스크 러너가 아닙니다. 태스크 러너는 프로젝트의 린트, 빌드, 테스트와 같은 일반적인 태스크의 자동화를 처리합니다. 번들러와 비교하면 태스크 러너는 더 높은 수준에 집중합니다. 번들링의 문제는 webpack에 맡겨두고 더 높은 수준의 툴링에 대한 이점을 가질 수 있습니다.

번들러는 JavaScript와 스타일 시트의 배포를 준비하여 브라우저에 알맞은 형식으로 변환하는 것을 도와줍니다. 예를 들어 JavaScript를 [최소화](/plugins/terser-webpack-plugin/)하거나 [청크로 분리](/guides/code-splitting), 또는 [지연 로드하여](/guides/lazy-loading) 성능을 향상 시킬 수 있습니다. 번들링은 웹 개발 환경에서 가장 중요한 과제 중 하나이며 프로세스에 많은 부하가 가지 않도록 합니다.

좋은 소식은 올바른 방법으로 접근하면 약간 중복이 있더라도 태스크 러너와 번들러를 함께 잘 사용할 수 있습니다. 이 가이드는 널리 사용되는 태스크 러너와 webpack을 어떻게 통합하는지에 대해 이해하기 쉽게 설명합니다.

## NPM Scripts

webpack 사용자는 npm [`scripts`](https://docs.npmjs.com/misc/scripts)를 태스크 러너로 종종 사용합니다. 이것은 좋은 시작점입니다. 크로스 플랫폼(Cross-platform) 지원이 문제가 될 수 있지만, 여기엔 여러 가지 해결 방법이 있습니다. 대부분의 사용자는 아니지만 많은 사용자가 간단한 npm `scripts`와 다양한 수준의 webpack 설정 및 툴링을 사용할 수 있습니다.

따라서 webpack의 핵심은 번들링에 초점을 맞추고 있지만, 태스크 러너의 일반적인 작업을 webpack으로 수행할 수 있도록 하는 다양한 확장 기능이 있습니다. 별도의 도구를 통합하면 복잡성이 늘어나기 때문에 시작하기 전에 장단점을 고려해야 합니다.

## Grunt

Grunt를 사용한다면 [`grunt-webpack`](https://www.npmjs.com/package/grunt-webpack) 패키지를 사용하는 것이 좋습니다. `grunt-webpack`을 사용하면 webpack이나 [webpack-dev-server](https://github.com/webpack/webpack-dev-server)를 태스크로 실행할 수 있으며, [template tags](https://gruntjs.com/api/grunt.template) 내에서 통계에 접근 할 수 있고, 개발과 프로덕션의 설정을 분리하는 등의 작업을 수행할 수 있습니다. 설치하지 않았다면 `grunt-webpack`과 `webpack`의 설치를 시작하세요.

```bash
npm install --save-dev grunt-webpack webpack
```

그리고 설정을 등록하고 태스크를 로드합니다.

**Gruntfile.js**

```js
const webpackConfig = require('./webpack.config.js');

module.exports = function (grunt) {
  grunt.initConfig({
    webpack: {
      options: {
        stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
      },
      prod: webpackConfig,
      dev: Object.assign({ watch: true }, webpackConfig),
    },
  });

  grunt.loadNpmTasks('grunt-webpack');
};
```

자세한 내용은 [grunt-webpack 저장소](https://github.com/webpack-contrib/grunt-webpack)를 참고하세요.

## Gulp

Gulp 역시 [`webpack-stream`](https://github.com/shama/webpack-stream) 패키지를 통해 매우 간단하게 통합할 수 있습니다. (a.k.a. `gulp-webpack`) 이 경우 `webpack`은 `webpack-stream`에 직접적인 의존성이 있으므로 별도로 설치할 필요가 없습니다.

```bash
npm install --save-dev webpack-stream
```

`webpack` 대신 `require('webpack-stream')`을 사용하고 선택적으로 설정을 전달합니다.

**gulpfile.js**

```js
const gulp = require('gulp');
const webpack = require('webpack-stream');
gulp.task('default', function () {
  return gulp
    .src('src/entry.js')
    .pipe(
      webpack({
        // 모든 설정 옵션...
      })
    )
    .pipe(gulp.dest('dist/'));
});
```

자세한 내용은 [webpack-stem 저장소](https://github.com/shama/webpack-stream)를 참고하세요.

## Mocha

[`mocha-webpack`](https://github.com/zinserjan/mocha-webpack) 유틸리티는 webpack을 Mocha와 깔끔하게 통합해줍니다. 저장소는 장단점에 대한 자세한 내용을 제공하지만 본질적으로 `mocha-webpack`은 Mocha 자체와 거의 동일한 CLI를 제공하고 향상된 watch 모드와 경로 분석과 같은 다양한 webpack 기능을 제공하는 간단한 래퍼입니다. 다음은 설치 및 테스트 스위트를 실행하는 방법에 대한 간단한 예입니다. (`./test`에 있음).

```bash
npm install --save-dev webpack mocha mocha-webpack
mocha-webpack 'test/**/*.js'
```

자세한 내용은 [mocha-webpack 저장소](https://github.com/zinserjan/mocha-webpack)를 참고하세요.

## Karma

[`karma-webpack`](https://github.com/webpack-contrib/karma-webpack) 패키지를 사용하면 webpack을 사용하여 [Karma](https://karma-runner.github.io/1.0/index.html)에서 파일을 전처리할 수 있습니다.

```bash
npm install --save-dev webpack karma karma-webpack
```

**karma.conf.js**

```js
module.exports = function (config) {
  config.set({
    frameworks: ['webpack'],
    files: [
      { pattern: 'test/*_test.js', watched: false },
      { pattern: 'test/**/*_test.js', watched: false },
    ],
    preprocessors: {
      'test/*_test.js': ['webpack'],
      'test/**/*_test.js': ['webpack'],
    },
    webpack: {
      // 모든 커스텀 webpack 설정...
    },
    plugins: ['karma-webpack'],
  });
};
```

자세한 내용은 [karma-webpack 저장소](https://github.com/webpack-contrib/karma-webpack)를 참고하세요.
