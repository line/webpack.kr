---
title: Mode
sort: 5
contributors:
  - EugeneHlushko
  - byzyk
  - mrichmond
  - Fental
  - snitin315
translators:
  - dkstyle
related:
  - title: 'webpack default options (source code)'
    url: https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsDefaulter.js
---

`mode` 옵션을 사용하면 webpack에 내장된 최적화 기능을 사용할 수 있습니다.

`string = 'production': 'none' | 'development' | 'production'`

## Usage

설정에서 `mode` 옵션을 사용합니다.

```javascript
module.exports = {
  mode: 'development',
};
```

혹은 [CLI](/api/cli/)의 인수로 전달합니다.

```bash
webpack --mode=development
```

지원되는 문자열 값은 다음과 같습니다.

| 옵션          | 설명                                                                                                                                                                                                                                                                          |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `development` | `DefinePlugin`의 `process.env.NODE_ENV`를 `development`로 설정합니다. 모듈과 청크에 유용한 이름을 사용할 수 있습니다.                                                                                                                                                         |
| `production`  | `DefinePlugin`의 `process.env.NODE_ENV`를 `production`으로 설정합니다. 모듈과 청크, `FlagDependencyUsagePlugin`, `FlagIncludedChunksPlugin`, `ModuleConcatenationPlugin`, `NoEmitOnErrorsPlugin`,`TerserPlugin` 등에 대해 결정적 망글이름(mangled name)을 사용할 수 있습니다. |
| `none`        | 기본 최적화 옵션에서 제외                                                                                                                                                                                                                                                     |

설정되지 않은 경우, webpack은 `production`을 `mode`의 기본값으로 설정합니다.

T> 설정이나 CLI를 통해 `mode`가 제공되지 않으면 CLI는 `mode`에 유효한 `NODE_ENV` 값을 사용합니다.

### Mode: development

```diff
// webpack.development.config.js
module.exports = {
+ mode: 'development'
- devtool: 'eval',
- cache: true,
- performance: {
-   hints: false
- },
- output: {
-   pathinfo: true
- },
- optimization: {
-   moduleIds: 'named',
-   chunkIds: 'named',
-   mangleExports: false,
-   nodeEnv: 'development',
-   flagIncludedChunks: false,
-   occurrenceOrder: false,
-   concatenateModules: false,
-   splitChunks: {
-     hidePathInfo: false,
-     minSize: 10000,
-     maxAsyncRequests: Infinity,
-     maxInitialRequests: Infinity,
-   },
-   emitOnErrors: true,
-   checkWasmTypes: false,
-   minimize: false,
-   removeAvailableModules: false
- },
- plugins: [
-   new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
- ]
}
```

### Mode: production

```diff
// webpack.production.config.js
module.exports = {
+  mode: 'production',
- performance: {
-   hints: 'warning'
- },
- output: {
-   pathinfo: false
- },
- optimization: {
-   moduleIds: 'deterministic',
-   chunkIds: 'deterministic',
-   mangleExports: 'deterministic',
-   nodeEnv: 'production',
-   flagIncludedChunks: true,
-   occurrenceOrder: true,
-   concatenateModules: true,
-   splitChunks: {
-     hidePathInfo: true,
-     minSize: 30000,
-     maxAsyncRequests: 5,
-     maxInitialRequests: 3,
-   },
-   emitOnErrors: false,
-   checkWasmTypes: true,
-   minimize: true,
- },
- plugins: [
-   new TerserPlugin(/* ... */),
-   new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
-   new webpack.optimize.ModuleConcatenationPlugin(),
-   new webpack.NoEmitOnErrorsPlugin()
- ]
}
```

### Mode: none

```diff
// webpack.custom.config.js
module.exports = {
+ mode: 'none',
- performance: {
-  hints: false
- },
- optimization: {
-   flagIncludedChunks: false,
-   occurrenceOrder: false,
-   concatenateModules: false,
-   splitChunks: {
-     hidePathInfo: false,
-     minSize: 10000,
-     maxAsyncRequests: Infinity,
-     maxInitialRequests: Infinity,
-   },
-   emitOnErrors: true,
-   checkWasmTypes: false,
-   minimize: false,
- },
- plugins: []
}
```

_webpack.config.js_ 안의 **mode** 변수에 따라 동작을 변경하려면, 객체 대신 함수를 export 해야 합니다.

```javascript
var config = {
  entry: './app.js',
  //...
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'source-map';
  }

  if (argv.mode === 'production') {
    //...
  }

  return config;
};
```
