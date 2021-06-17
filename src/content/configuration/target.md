---
title: Target
sort: 13
contributors:
  - juangl
  - sokra
  - skipjack
  - SpaceK33z
  - pastelsky
  - tbroadley
  - byzyk
  - EugeneHlushko
  - smelukov
translators:
  - limong
---

webpack은 다양한 환경과 _target을_ 컴파일합니다. `target`이 무엇인지 자세히 이해하고 싶다면 [target의 개념에 대한 페이지](/concepts/targets/)를 읽어보세요.

## `target`

`string` `[string]` `false`

특정 환경을 대상으로 하도록 webpack에 지정합니다. browserslist 설정이 없으면 `'browserslist'` 혹은 `'web'`으로 설정됩니다.

### `string`

다음의 문자열은 [`WebpackOptionsApply`](https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsApply.js)를 통해서 지원됩니다.

| Option                     | Description                                                                                                                                                                                                                                                                                   |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `async-node[[X].Y]`        | Node.js와 유사한 환경에서 사용할 수 있도록 컴파일합니다 (`fs`와 `vm`을 사용하여 청크를 비동기식으로 로드합니다.)                                                                                                                                                                              |
| `electron[[X].Y]-main`     | 메인 프로세스를 위해 [Electron](https://electronjs.org/)으로 컴파일합니다.                                                                                                                                                                                                                    |
| `electron[[X].Y]-renderer` | 렌더러 프로세스를 위해 [Electron](https://electronjs.org/)으로 컴파일하여 `JsonpTemplatePlugin`, 브라우저 환경을 위한 `FunctionModulePlugin`, CommonJS와 Electron의 내장 모듈을 위한 `NodeTargetPlugin` 및 `ExternalsPlugin`을 사용하여 대상을 제공합니다.                                    |
| `electron[[X].Y]-preload`  | 렌더러 프로세스를 위해 [Electron](https://electronjs.org/)으로 컴파일하여 `asyncChunkLoading`을 `true`로 설정한 `NodeTemplatePlugin`, 브라우저 환경을 위한`FunctionModulePlugin`, `NodeTargetPlugin`, CommonJS 및 Electron의 내장 모듈을 위한 `ExternalsPlugin`을 사용하여 대상을 제공합니다. |
| `node[[X].Y]`              | Node.js와 유사한 환경에서 사용할 수 있도록 컴파일 합니다. (Node.js `require`를 사용하여 청크를 로드합니다.)                                                                                                                                                                                   |
| `node-webkit[[X].Y]`       | WebKit에서 사용하기 위해 컴파일하고 청크를 로드하기 위해 JSONP를 사용합니다. 내장된 Node.js 모듈 및 (실험적으로) [`nw.gui`](http://docs.nwjs.io/en/latest/)를 가져올 수 있습니다.                                                                                                             |
| `nwjs[[X].Y]`              | `node-webkit`과 동일합니다.                                                                                                                                                                                                                                                                   |
| `web`                      | 브라우저와 동일한 환경에서 사용하기 위하여 컴파일합니다. **(기본값)**                                                                                                                                                                                                                         |
| `webworker`                | 웹 워커로 컴파일합니다.                                                                                                                                                                                                                                                                       |
| `esX`                      | 지정된 ECMAScript 버전으로 컴파일합니다. 예: es5, es2020                                                                                                                                                                                                                                      |
| `browserslist`             | browserslist-config에서 **(browserslist config를 사용할 수 있는 경우 기본값)** 플랫폼과 ES 기능을 추론합니다.                                                                                                                                                                                 |

예를 들어, `target`을 `"electron-main"`으로 설정하면, webpack은 electron의 여러 변수를 추가합니다.

`node`와 `electron`의 버전은 선택할 수 있습니다. 위 표에서 `[[X].Y]`로 표시됩니다.

**webpack.config.js**

```js
module.exports = {
  // ...
  target: 'node12.18',
};
```

런타임 코드를 생성하는데 사용할 수 있는 ES 기능의 결정에 도움을 줍니다. (모든 청크와 모듈은 런타임 코드로 래핑 됩니다)

#### `browserslist`

프로젝트에 browserslist 설정이 있으면, webpack은 이 설정을 사용합니다.

- 런타임 코드를 생성하는데 사용할 수 있는 ES 기능을 결정합니다.
- 환경을 추론합니다. (예를 들어 일부 [`output.environment`](/configuration/output/#outputenvironment) 설정이 있는 `target: "node"`와 동일한 `마지막 2개의 Node 버전`).

지원되는 browserslist

- `browserslist` - 자동으로 browserslist 설정과 환경을 사용 (가장 근접한 `package.json`이나 `BROWSERSLIST` 환경 변수, 자세한 사항은 [browserslist documentation](https://github.com/browserslist/browserslist#queries)을 참고)
- `browserslist:modern` - 자동으로 해석된 browserslist 설정에서 `modern`사용
- `browserslist:last 2 versions` - 명시적으로 browserslist 쿼리 사용(설정은 무시됨)
- `browserslist:/path/to/config` - browserslist 설정을 지정할 수 있음
- `browserslist:/path/to/config:modern` - browserslist 설정 및 환경을 명시적으로 지정

### `[string]`

복수의 target을 작성하면 기능의 공통적인 하위 집합이 사용됩니다.

**webpack.config.js**

```js
module.exports = {
  // ...
  target: ['web', 'es5'],
};
```

webpack은 웹 플랫폼을 위해 런타임 코드를 생성하고 ES5 기능만 사용합니다.

현재로서는 모든 target을 같이 혼용하여 사용하지 못합니다.

**webpack.config.js**

```js
module.exports = {
  // ...
  target: ['web', 'node'],
};
```

에러의 원인이 됩니다. 현재 webpack은 범용적인 target을 지원하지 않습니다.

### `false`

`target`을 `false`로 설정하면, 위 목록에서 미리 정의된 target 중에 원하는 target이 없으면 플러그인이 적용되지 않습니다.

**webpack.config.js**

```js
module.exports = {
  // ...
  target: false,
};
```

혹은 원하는 특정한 플러그인을 적용할 수 있습니다.

**webpack.config.js**

```js
const webpack = require('webpack');

module.exports = {
  // ...
  target: false,
  plugins: [
    new webpack.web.JsonpTemplatePlugin(options.output),
    new webpack.LoaderTargetPlugin('web'),
  ],
};
```

target 또는 [환경](/configuration/output/#outputenvironment)에 대한 정보가 없으면, ES2015를 사용합니다.
