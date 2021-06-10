---
title: Under The Hood
sort: 14
contributors:
  - smelukov
  - EugeneHlushko
  - chenxsan
  - amirsaeed671
translators:
  - keipark
---

> 이 섹션은 webpack의 내부 요소를 설명하며 플러그인 개발자에게 유용할 수 있습니다.

번들링은 일부 파일을 가져오고 다른 파일은 내보내는 기능입니다.

그러나 입력과 출력 사이에는 [모듈](/concepts/modules/), [엔트리 포인트](/concepts/entry-points/), 청크, 청크 그룹, 그 외 많은 중간 요소들이 있습니다.

## The main parts

프로젝트에서 사용하는 모든 파일은 [모듈](/concepts/modules/)입니다.

**./index.js**

```js
import app from './app.js';
```

**./app.js**

```js
export default 'the app';
```

모듈은 서로를 사용하여 그래프(`ModuleGraph`)를 형성합니다.

번들링 과정 중에 모듈은 청크로 결합됩니다.
청크는 청크 그룹으로 합쳐지고, 모듈을 통해 서로 연결된 그래프(`ChunkGraph`)를 형성합니다.
내부적으로 엔트리 포인트를 설명할 때는 하나의 청크로 청크 그룹을 만드는 것을 말합니다.

**./webpack.config.js**

```js
module.exports = {
  entry: './index.js',
};
```

`main`이라는 이름으로 하나의 청크 그룹이 생성됩니다. (`main`은 엔트리 포인트의 기본 이름입니다.)
이 청크 그룹에는`./index.js` 모듈이 포함되어 있습니다. 파서가 `./index.js` 내부의 import 문을 처리하면서 새 모듈이 이 청크에 추가됩니다.

다른 예제를 확인해보세요.

**./webpack.config.js**

```js
module.exports = {
  entry: {
    home: './home.js',
    about: './about.js',
  },
};
```

이름이 `home`과 `about`인 두 개의 청크 그룹이 생성됩니다.
각각의 청크 그룹은 모듈이 있는 청크를 가지고 있습니다. `home` 은 `./home.js`를, `about` 은 `./about.js` 청크를 가지고 있습니다.

> 청크 그룹에는 하나 이상의 청크가 있을 수 있습니다. 예를 들어 [SplitChunksPlugin](/plugins/split-chunks-plugin/)은 청크를 하나 또는 그 이상의 청크로 분할합니다.

## Chunks

청크는 두 가지 형태로 제공됩니다.

- `초기 청크`는 엔트리 포인트의 메인 청크입니다. 이 청크는 엔트리 포인트에서 명시된 모든 모듈과 의존성을 포함합니다.
- `비초기 청크`는 지연 로드될 수 있는 청크입니다. [동적 import](/guides/code-splitting/#dynamic-imports) 또는 [SplitChunksPlugin](/plugins/split-chunks-plugin/) 사용 중에 나타날 수 있습니다.

각 청크에는 해당하는 **애셋이** 있습니다. 애셋은 번들링의 결과로 출력된 파일입니다.

**webpack.config.js**

```js
module.exports = {
  entry: './src/index.jsx',
};
```

**./src/index.jsx**

```js
import React from 'react';
import ReactDOM from 'react-dom';

import('./app.jsx').then((App) => {
  ReactDOM.render(<App />, root);
});
```

이름이 `main`인 초기 청크가 생성되며, 이 청크는 다음을 포함합니다.

- `./src/index.jsx`
- `react`
- `react-dom`

그리고 `./app.jsx` 를 제외한 모든 의존성도 포함합니다.

`./app.jsx` 모듈은 동적으로 가져오므로 비초기 청크가 생성됩니다.

**결과:**

- `/dist/main.js` - `초기` 청크
- `/dist/394.js` - `비초기` 청크

기본적으로 `비초기` 청크에는 이름이 없으므로 이름 대신 고유한 ID가 사용됩니다.
동적으로 가져올 때 ["특별한" 주석](/api/module-methods/#magic-comments)을 사용하여 청크 이름을 구체적으로 지정할 수 있습니다.

```js
import(
  /* webpackChunkName: "app" */
  './app.jsx'
).then((App) => {
  ReactDOM.render(<App />, root);
});
```

**결과:**

- `/dist/main.js` - `초기` 청크
- `/dist/app.js` - `비초기` 청크

## Output

출력 파일의 이름은 설정의 두 필드에 영향을 받습니다.

- [`output.filename`](/configuration/output/#outputfilename) - `초기` 청크 파일에서 사용합니다.
- [`output.chunkFilename`](/configuration/output/#outputchunkfilename) - `비초기` 청크 파일에서 사용합니다.
- 경우에 따라서 청크를 `초기`와 `비초기`로 사용합니다. 이 때는 `output.filename`을 사용합니다.

이 필드에는 [몇 개의 플레이스 홀더](/configuration/output/#template-strings)를 제공합니다. 가장 자주 사용하는 것은 아래와 같습니다.

- `[id]` - 청크 ID (예: `[id].js` -> `485.js`)
- `[name]` - 청크 이름 (예: `[name].js` -> `app.js`). 청크에 이름이 없는 경우 ID가 사용됩니다.
- `[contenthash]` - 출력 파일 콘텐츠의 md4-hash (예: `[contenthash].js` -> `4ea6ff1de66c537eb9b2.js`)
