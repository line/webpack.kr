---
title: Plugins
sort: 10
contributors:
  - sokra
  - skipjack
  - yatharthk
  - byzyk
  - EugeneHlushko
  - snitin315
translators:
  - keipark
---

`plugins` 옵션은 다양한 방법으로 webpack 빌드 프로세스를 사용자 정의하는 데 사용됩니다. webpack은 사용 가능한 다양한 내장 플러그인을 `webpack.[plugin-name]`으로 제공합니다. 플러그인 및 문서 목록은 [Plugins 페이지](/plugins)를 참고하세요. 커뮤니티에는 더 많은 내용이 있습니다.

T> 참고: 이 페이지에서는 플러그인 사용에 대해서만 설명합니다. 직접 플러그인을 작성하는 데 관심이 있다면 [Writing a Plugin](/contribute/writing-a-plugin/)을 확인해보세요.

## `plugins`

[`[Plugin]`](/plugins/)

webpack 플러그인의 배열입니다. 예를 들어 [`DefinePlugin`](/plugins/define-plugin/)을 사용하면 컴파일 때에 구성 가능한 전역 상수를 만들 수 있습니다. 이는 개발 빌드와 릴리스 빌드 간에 서로 다른 동작을 허용하는 데 유용합니다.

**webpack.config.js**

```js
module.exports = {
  //...
  plugins: [
    new webpack.DefinePlugin({
      // Definitions...
    }),
  ],
};
```

여러 플러그인을 사용하는 더 복잡한 예는 다음과 같습니다.

**webpack.config.js**

```js
var webpack = require('webpack');
// webpack에 기본적으로 제공되지 않는 플러그인을 import
var DashboardPlugin = require('webpack-dashboard/plugin');

// 설정에 플러그인 추가
module.exports = {
  //...
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // 컴파일 타임 플러그인
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    // webpack-dev-server 향상 플러그인
    new DashboardPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
```
