---
title: Production
sort: 17
contributors:
  - henriquea
  - rajagopal4890
  - makuzaverite
  - markerikson
  - simon04
  - kisnows
  - chrisVillanueva
  - swapnilmishra
  - bring2dip
  - redian
  - skipjack
  - xgqfrms
  - kelset
  - xgirma
  - mehrdaad
  - SevenOutman
  - AnayaDesign
  - wizardofhogwarts
  - aholzner
  - EugeneHlushko
  - snitin315
translators:
  - limong
---

이 가이드에서 프로덕션 사이트나 애플리케이션을 구축하기 위한 유틸리티와 좋은 사례들에 대해서 자세히 알아보겠습니다.

T> 이 연습은 [Tree shaking](/guides/tree-shaking)과 [Development](/guides/development)에서 시작합니다. 계속하기 전에 해당 가이드에 소개된 콘셉트 및 설정을 잘 알고 있어야 합니다.

## Setup

_development와_ _production의_ 빌드 목표는 매우 다릅니다. _development_ 에서는 강력한 소스 매핑, localhost 서버에서는 라이브 리로딩이나 hot module replacement 기능을 원합니다. _production에서의_ 목표는 로드 시간을 줄이기 위해 번들 최소화, 가벼운 소스맵 및 애셋 최적화에 초점을 맞추는 것으로 변경됩니다. 논리적으로 분리를 해야 하면 일반적으로 환경마다 **webpack 설정을 분리하여** 작성하는 것이 좋습니다.

_production과_ _development에_ 관련된 부분을 분리하더라도, 중복을 제거하기 위해 "공통"의 설정은 계속 유지해야 합니다. 이러한 설정을 합치기 위해 [`webpack-merge`](https://github.com/survivejs/webpack-merge) 유틸리티를 사용합니다. "공통"의 설정을 사용하면 환경별 설정에서 코드를 복사하지 않아도 됩니다.

`webpack-merge`를 설치하고 이전 가이드에서 이미 작업 한 부분을 분리하겠습니다.

```bash
npm install --save-dev webpack-merge
```

**project**

```diff
  webpack-demo
  |- package.json
- |- webpack.config.js
+ |- webpack.common.js
+ |- webpack.dev.js
+ |- webpack.prod.js
  |- /dist
  |- /src
    |- index.js
    |- math.js
  |- /node_modules
```

**webpack.common.js**

```diff
+ const path = require('path');
+ const HtmlWebpackPlugin = require('html-webpack-plugin');
+
+ module.exports = {
+   entry: {
+     app: './src/index.js',
+   },
+   plugins: [
+     new HtmlWebpackPlugin({
+       title: 'Production',
+     }),
+   ],
+   output: {
+     filename: '[name].bundle.js',
+     path: path.resolve(__dirname, 'dist'),
+     clean: true,
+   },
+ };
```

**webpack.dev.js**

```diff
+ const { merge } = require('webpack-merge');
+ const common = require('./webpack.common.js');
+
+ module.exports = merge(common, {
+   mode: 'development',
+   devtool: 'inline-source-map',
+   devServer: {
+     contentBase: './dist',
+   },
+ });
```

**webpack.prod.js**

```diff
+ const { merge } = require('webpack-merge');
+ const common = require('./webpack.common.js');
+
+ module.exports = merge(common, {
+   mode: 'production',
+ });
```

`webpack.common.js`에서 `entry`와 `output`을 설정했으며, 두 환경에서 필요한 플러그인들을 포함했습니다. `webpack.dev.js`에서 `mode`를 `development`으로 설정했습니다. 또한, 해당 환경에 권장(강력한 소스 매핑)되는 `devtool`과 간단한 `devServer` 설정을 추가했습니다. 마지막으로 `webpack.prod.js`에 `mode`를 [Tree shaking](/guides/tree-shaking/) 가이드에서 처음 언급했던 [`TerserPlugin`](/plugins/terser-webpack-plugin/)을 로드하기 위해 `production`으로 설정 합니다.

환경별 설정에서 `merge()`를 사용하여 호출하면 `webpack.dev.js` 및 `webpack.prod.js`에 공통 설정을 포함합니다. `webpack-merge` 툴은 병합을 위한 다양한 고급 기능을 제공하지만, 지금 사례에서는 이런 기능이 필요하지 않습니다.

## NPM Scripts

지금부터 새로운 설정 파일을 사용하기 위해 npm 스크립트를 수정해 보겠습니다. `webpack-dev-server`를 실행하는 `start` 스크립트의 경우 `webpack.dev.js`를 사용하고, 프로덕션 빌드를 만들기 위해 `webpack`을 실행하는 `build` 스크립트의 경우 `webpack.prod.js`를 사용합니다.

**package.json**

```diff
  {
    "name": "development",
    "version": "1.0.0",
    "description": "",
    "main": "src/index.js",
    "scripts": {
-     "start": "webpack serve --open",
+     "start": "webpack serve --open --config webpack.dev.js",
-     "build": "webpack"
+     "build": "webpack --config webpack.prod.js"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "css-loader": "^0.28.4",
      "csv-loader": "^2.1.1",
      "express": "^4.15.3",
      "file-loader": "^0.11.2",
      "html-webpack-plugin": "^2.29.0",
      "style-loader": "^0.18.2",
      "webpack": "^4.30.0",
      "webpack-dev-middleware": "^1.12.0",
      "webpack-dev-server": "^2.9.1",
      "webpack-merge": "^4.1.0",
      "xml-loader": "^1.2.1"
    }
  }
```

_production_ 설정을 계속 추가하는대로 출력이 어떻게 변경되는지 위 스크립트를 자유롭게 실행하여 확인해보세요.

## Specify the Mode

많은 라이브러리는 `process.env.NODE_ENV` 변수를 이용하여 어떤 라이브러리를 포함해야 하는지 결정합니다. 예를 들어 `process.env.NODE_ENV`가 `'production'`으로 설정되지 않으면 몇몇 라이브러리는 디버깅의 편의성을 위해 로그 및 테스트를 추가할 수도 있습니다. 그러나 `process.env.NODE_ENV`가 `'production'`으로 설정되어 있으면 실제 사용자의 작업 실행 방식을 최적화 하기 위해 코드의 중요한 부분을 추가하거나 삭제 할 수 있습니다. webpack v4부터 [`mode`](/configuration/mode/)를 지정하면 [`DefinePlugin`](/plugins/define-plugin)이 자동으로 설정됩니다.

**webpack.prod.js**

```diff
  const { merge } = require('webpack-merge');
  const common = require('./webpack.common.js');

  module.exports = merge(common, {
    mode: 'production',
  });
```

T> 기술적으로 `NODE_ENV`는 Node.js가 실행 중인 스크립트가 참고할 수 있는 시스템 환경 변수입니다. 이것은 서버 툴, 빌드 스크립트 및 클라이언트 라이브러리에 의한 dev-vs-prod의 동작을 결정하는 규칙에 사용됩니다. 예상과 달리 `process.env.NODE_ENV`는 빌드 스크립트인 `webpack.config.js` **안에서** `'production'`으로 설정되지 않습니다. [#2537](https://github.com/webpack/webpack/issues/2537)을 참조해 주세요. 따라서 다음과 같은 조건은 `process.env.NODE_ENV === 'production' ? '[name].[contenthash].bundle.js' : '[name].bundle.js'` webpack 설정에서 예상대로 동작하지 않습니다.

[`react`](https://reactjs.org/)와 같은 라이브러리를 사용한다면 `DefinePlugin`을 추가한 후에 명확하게 번들 크기가 줄어야 합니다. 또한 로컬 `/src`의 코드 역시 제어 할 수 있습니다. 따라서 다음 검사는 유효합니다.

**src/index.js**

```diff
  import { cube } from './math.js';
+
+ if (process.env.NODE_ENV !== 'production') {
+   console.log('Looks like we are in development mode!');
+ }

  function component() {
    const element = document.createElement('pre');

    element.innerHTML = [
      'Hello webpack!',
      '5 cubed is equal to ' + cube(5)
    ].join('\n\n');

    return element;
  }

  document.body.appendChild(component());
```

## Minification

webpack v4+의 [`production mode`](/configuration/mode/#mode-production)에서는 기본으로 코드를 최소화합니다.

[`TerserPlugin`](/plugins/terser-webpack-plugin/)은 최소화를 시작하고 기본으로 사용하기에 좋지만 다른 옵션도 있습니다.

- [`ClosureWebpackPlugin`](https://github.com/webpack-contrib/closure-webpack-plugin)

만약 다른 최소화 플러그인을 사용하기로 결정했다면, 다른 플러그인이 [Tree shaking](/guides/tree-shaking) 가이드에 설명 된 대로 사용하지 않는 코드를 제거하고 [`optimization.minimizer`](/configuration/optimization/#optimizationminimizer)를 제공하는지 확인해야 합니다.

## Source Mapping

소스맵은 디버깅뿐만 아니라 벤치마크 테스트에도 유용하므로 프로덕션에도 활성화하는 것이 좋습니다. 즉, 프로덕션용으로 추천되는 빌드 속도가 가장 빠른 것을 선택해야 합니다. ([`devtool`](/configuration/devtool) 참조) 이 가이드에서는 _development에서_ 사용한 `inline-source-map`이 아닌 _production의_ `source-map`을 사용합니다.

**webpack.prod.js**

```diff
  const { merge } = require('webpack-merge');
  const common = require('./webpack.common.js');

  module.exports = merge(common, {
    mode: 'production',
+   devtool: 'source-map',
  });
```

T> 프로덕션에서 `inline-***`과 `eval-***`은 번들 크기가 커질 수 있으므로 전체 성능을 향상을 위해 사용하지 않습니다.

## Minimize CSS

프로덕션을 위해 CSS를 최소화하는 것이 중요합니다. [Minimizing for Production](/plugins/mini-css-extract-plugin/#minimizing-for-production)을 참고하세요.

## CLI Alternatives

위에서 설명한 대부분의 옵션은 커맨드 라인 인자로 설정할 수 있습니다. 예를 들어 [`optimization.minimize은`](/configuration/optimization/#optimizationminimize) `--optimization-minimize`, 그리고 [`mode는`](/configuration/mode/) `--mode`로 설정할 수 있습니다. CLI 인자의 전체 목록을 보려면 `npx webpack --help=verbose`를 실행하세요.

이런 간단한 방식은 편리하지만, 좀 더 알맞은 설정을 위해 webpack 설정 파일에서 이런 옵션을 설정하는 것이 좋습니다.
