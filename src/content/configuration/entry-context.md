---
title: Entry and Context
sort: 4
contributors:
  - sokra
  - skipjack
  - tarang9211
  - byzyk
  - madhavarshney
  - EugeneHlushko
  - smelukov
  - anshumanv
  - snitin315
translators:
  - choilim
---

엔트리 객체는 webpack이 번들 빌드를 시작하는 곳입니다. 컨텍스트는 엔트리 파일을 포함하는 디렉터리에 대한 절대 경로입니다.

## `context`

`string`

설정에서 엔트리 포인트와 로더를 확인하기 위한 **절대 경로의** 기본 디렉터리.

```js
const path = require('path');

module.exports = {
  //...
  context: path.resolve(__dirname, 'app'),
};
```

기본적으로 현재 디렉터리가 사용되지만, 설정에 값을 전달하는 것이 좋습니다. 이렇게 하면 CWD(현재 작업 디렉터리)와 독립적인 설정이 가능합니다.

---

## `entry`

`string` `[string]` `object = { <key> string | [string] | object = { import string | [string], dependOn string | [string], filename string, layer string }}` `(function() => string | [string] | object = { <key> string | [string] } | object = { import string | [string], dependOn string | [string], filename string })`

애플리케이션 번들 처리를 시작할 지점입니다. 배열이 전달되면 배열의 모든 항목이 처리됩니다.

동적으로 로드된 모듈은 엔트리 포인트가 **아닙니다.**

간단한 규칙: HTML 페이지 당 하나의 엔트리 포인트. SPA: 하나의 엔트리 포인트, MPA: 다중 엔트리 포인트.

```js
module.exports = {
  //...
  entry: {
    home: './home.js',
    about: './about.js',
    contact: './contact.js',
  },
};
```

### Naming

문자열 또는 문자열 배열이 전달되면, 청크 이름은 `main`입니다. 객체가 전달되면, 객체의 키는 청크의 이름이 되고, 객체의 값은 청크의 엔트리 포인트를 설명합니다.

### Entry descriptor

객체가 전달되면 객체의 값은 문자열, 문자열 배열 또는 디스크립터가 될 수 있습니다.

```js
module.exports = {
  //...
  entry: {
    home: './home.js',
    shared: ['react', 'react-dom', 'redux', 'react-redux'],
    catalog: {
      import: './catalog.js',
      filename: 'pages/catalog.js',
      dependOn: 'shared',
    },
    personal: {
      import: './personal.js',
      filename: 'pages/personal.js',
      dependOn: 'shared',
      chunkLoading: 'jsonp',
      layer: 'name of layer', // 엔트리 포인트에 대한 레이어 설정
    },
  },
};
```

디스크립터를 사용하여 추가 옵션을 엔트리 포인트에 전달할 수 있습니다.

### Output filename

기본적으로, 엔트리 청크의 출력 파일 이름은 [`output.filename`](/configuration/output/#outputfilename)에서 추출되지만, 특정 엔트리에 대한 커스텀 출력 파일 이름을 지정할 수 있습니다.

```js
module.exports = {
  //...
  entry: {
    app: './app.js',
    home: { import: './contact.js', filename: 'pages/[name][ext]' },
    about: { import: './about.js', filename: 'pages/[name][ext]' },
  },
};
```

여기의 디스크립터는 특정 엔트리 포인트에 `filename` 옵션을 전달하는 데 사용되었습니다.

### Dependencies

기본적으로, 모든 엔트리 청크는 사용하는 모든 모듈을 저장합니다. `dependOn` 옵션을 사용하면 한 엔트리 청크에서 다른 엔트리 청크로 모듈을 공유할 수 있습니다.

```js
module.exports = {
  //...
  entry: {
    app: { import: './app.js', dependOn: 'react-vendors' },
    'react-vendors': ['react', 'react-dom', 'prop-types'],
  },
};
```

`app` 청크에는 `react-vendors`에 있는 모듈이 포함되지 않습니다.

`dependOn` 옵션은 문자열 배열을 허용합니다.

```js
module.exports = {
  //...
  entry: {
    moment: { import: 'moment-mini', runtime: 'runtime' },
    reactvendors: { import: ['react', 'react-dom'], runtime: 'runtime' },
    testapp: {
      import: './wwwroot/component/TestApp.tsx',
      dependOn: ['reactvendors', 'moment'],
    },
  },
};
```

또한, 배열을 사용해서 하나의 엔트리에 여러 개의 파일을 지정할 수 있습니다.

```js
module.exports = {
  //...
  entry: {
    app: { import: ['./app.js', './app2.js'], dependOn: 'react-vendors' },
    'react-vendors': ['react', 'react-dom', 'prop-types'],
  },
};
```

### Dynamic entry

함수가 전달되면 모든 [make](/api/compiler-hooks/#make) 이벤트에서 호출됩니다.

> make 이벤트는 webpack이 시작될 때와 [파일 변경을 감시](/configuration/watch/) 할 때 모든 유효하지 않은 상황에서 호출됩니다.

```js
module.exports = {
  //...
  entry: () => './demo',
};
```

또는

```js
module.exports = {
  //...
  entry: () => new Promise((resolve) => resolve(['./demo', './demo2'])),
};
```

예: 외부 소스(원격 서버, 파일 시스템 콘텐츠 또는 데이터베이스)에서 실제 엔트리를 가져오기 위해 동적 엔트리를 사용할 수 있습니다.

**webpack.config.js**

```js
module.exports = {
  entry() {
    return fetchPathsFromSomeExternalSource(); // returns a promise that will be resolved with something like ['src/main-layout.js', 'src/admin-layout.js']
  },
};
```

[`output.library`](/configuration/output/#outputlibrary) 옵션과 결합하는 경우, 배열이 전달되면 마지막 항목만 내보냅니다.
