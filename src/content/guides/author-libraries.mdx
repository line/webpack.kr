---
title: Authoring Libraries
sort: 7
contributors:
  - pksjce
  - johnstew
  - simon04
  - 5angel
  - marioacc
  - byzyk
  - EugeneHlushko
  - AnayaDesign
  - chenxsan
  - wizardofhogwarts
translators:
  - YukJiSoo
---

애플리케이션 외에도 JavaScript 라이브러리를 번들링 할 때도 webpack을 사용할 수 있습니다. 아래의 가이드는 번들링 전략을 간소화하려는 라이브러리 작성자를 위한 것입니다.

## Authoring a Library

사용자가 1부터 5까지의 숫자를 숫자 표현에서 텍스트로 또는 그 반대로 변환할 수 있는 작은 라이브러리 `webpack-numbers`를 작성한다고 가정해 보겠습니다. 예. 2 에서 'two'.

프로젝트의 기본 구조는 다음과 같을 것입니다.

**project**

```diff
+  |- webpack.config.js
+  |- package.json
+  |- /src
+    |- index.js
+    |- ref.json
```

npm을 초기화하고 `webpack`, `webpack-cli`, `lodash`를 설치합니다.

```bash
npm init -y
npm install --save-dev webpack webpack-cli lodash
```

라이브러리에 번들 되는 것을 막고 라이브러리가 비대해지는 것을 방지하기 위해 `lodash`를 `dependencies` 대신 `devDependencies`로 설치합니다.

**src/ref.json**

```json
[
  {
    "num": 1,
    "word": "One"
  },
  {
    "num": 2,
    "word": "Two"
  },
  {
    "num": 3,
    "word": "Three"
  },
  {
    "num": 4,
    "word": "Four"
  },
  {
    "num": 5,
    "word": "Five"
  },
  {
    "num": 0,
    "word": "Zero"
  }
]
```

**src/index.js**

```js
import _ from 'lodash';
import numRef from './ref.json';

export function numToWord(num) {
  return _.reduce(
    numRef,
    (accum, ref) => {
      return ref.num === num ? ref.word : accum;
    },
    ''
  );
}

export function wordToNum(word) {
  return _.reduce(
    numRef,
    (accum, ref) => {
      return ref.word === word && word.toLowerCase() ? ref.num : accum;
    },
    -1
  );
}
```

## Webpack Configuration

아래의 기본적인 webpack 설정으로 시작해봅시다.

**webpack.config.js**

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'webpack-numbers.js',
  },
};
```

webpack으로 애플리케이션을 번들해보았다면 익숙할 것입니다. 기본적으로 webpack에게 `src/index.js`를 `dist/webpack-numbers.js`로 번들하도록 지시합니다.

## Expose the Library

지금까지는 애플리케이션 번들링과 동일하며 다른 점은 [`output.library`](/configuration/output/#outputlibrary) 옵션을 통해 엔트리 포인트를 export 해야 합니다.

**webpack.config.js**

```diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'webpack-numbers.js',
+     library: "webpackNumbers",
    },
  };
```

사용자가 script 태그를 통해 사용할 수 있도록 엔트리 포인트를 `webpackNumbers`로 export 했습니다.

```html
<script src="https://example.org/webpack-numbers.js"></script>
<script>
  window.webpackNumbers.wordToNum('Five');
</script>
```

그러나, script 태그를 통해 참조될 때만 작동하며 CommonJS, AMD, Node.js 등과 같은 다른 환경에서는 사용할 수 없습니다.

라이브러리 작성자는 다양한 환경에서 호환되기를 원합니다. 즉, 사용자가 아래 나열된 여러 방법으로 번들 된 라이브러리를 사용할 수 있어야 합니다.

- **CommonJS module require**:

  ```js
  const webpackNumbers = require('webpack-numbers');
  // ...
  webpackNumbers.wordToNum('Two');
  ```

- **AMD module require**:

  ```js
  require(['webpackNumbers'], function (webpackNumbers) {
    // ...
    webpackNumbers.wordToNum('Two');
  });
  ```

- **script tag**:

  ```html
  <!DOCTYPE html>
  <html>
    ...
    <script src="https://example.org/webpack-numbers.js"></script>
    <script>
      // ...
      // 전역 변수
      webpackNumbers.wordToNum('Five');
      // window 객체의 프로퍼티
      window.webpackNumbers.wordToNum('Five');
      // ...
    </script>
  </html>
  ```

`type`을 [`'umd'`](/configuration/output/#type-amd)로 설정하여 `output.library` 옵션을 업데이트해 보겠습니다.

```diff
 const path = require('path');

 module.exports = {
   entry: './src/index.js',
   output: {
     path: path.resolve(__dirname, 'dist'),
     filename: 'webpack-numbers.js',
-    library: 'webpackNumbers',
+    library: {
+      name: 'webpackNumbers',
+      type: 'umd',
+    },
   },
 };
```

webpack은 라이브러리를 CommonJS, AMD, script 태그에서 사용할 수 있도록 번들할 것입니다.

T> `library` 설정은 `entry` 설정과 연관되어 있습니다. 대부분의 라이브러리의 경우 단일 엔트리 포인트를 지정하는 것으로 충분합니다. [다중 진입 라이브러리](https://github.com/webpack/webpack/tree/master/examples/multi-part-library)도 가능하지만, [index script](https://stackoverflow.com/questions/34072598/es6-exporting-importing-in-index-file)를 통해 부분적으로 export하는 것이 더 간단합니다. 라이브러리의 `entry`를 `array`를 사용하는 것은 **권장되지 않습니다.**

## Externalize Lodash

`npx webpack`을 실행하면 큰 번들이 생성 된 것을 알 수 있습니다. 파일을 검사하면 lodash가 코드와 함께 번들로 제공되는 것을 볼 수 있습니다. 이 경우 `lodash`를 _peer dependency_ 로 취급하는 것이 좋습니다. 사용자는 이미 `lodash`가 설치되어 있어야합니다. 따라서 이 외부 라이브러리의 제어권을 라이브러리 사용자에게 넘겨야합니다.

[`externals`](/configuration/externals/) 설정을 사용하면 됩니다.

**webpack.config.js**

```diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'webpack-numbers.js',
      library: {
        name: "webpackNumbers",
        type: "umd"
      },
    },
+   externals: {
+     lodash: {
+       commonjs: 'lodash',
+       commonjs2: 'lodash',
+       amd: 'lodash',
+       root: '_',
+     },
+   },
  };
```

이는 라이브러리가 사용자 환경에서 `lodash`라는 종속성을 사용할 수 있다고 예상한다는 것을 의미합니다.

### External Limitations

종속성에서 여러 파일을 사용하는 라이브러리의 경우:

```js
import A from 'library/one';
import B from 'library/two';

// ...
```

externals에서 `library`를 지정하여 번들에서 제외할 수 없습니다. 하나씩 또는 정규식을 사용하여 제외해야 합니다.

```js
module.exports = {
  //...
  externals: [
    'library/one',
    'library/two',
    // "library/"로 시작하는 모든 것
    /^library\/.+$/,
  ],
};
```

## Final Steps

[프로덕션 가이드](/guides/production)에 언급된 단계에 따라 프로덕션에 맞게 출력을 최적화하세요. 또한 생성된 번들의 경로를 `package.json`의 `main` 필드에 추가하세요.

**package.json**

```json
{
  ...
  "main": "dist/webpack-numbers.js",
  ...
}
```

또는 [이 가이드](https://github.com/dherman/defense-of-dot-js/blob/master/proposal.md#typical-usage)에 따라 표준 모듈로 추가하세요.

```json
{
  ...
  "module": "src/index.js",
  ...
}
```

키 `main`은 [`package.json`의 표준](https://docs.npmjs.com/files/package.json#main)을, `module`은 JavaScript 생태계 업그레이드가 하위 호환성을 깨지 않고 ES2015 모듈을 사용할 수 있도록 하는 제안[[1]](https://github.com/dherman/defense-of-dot-js/blob/master/proposal.md)[[2]](https://github.com/rollup/rollup/wiki/pkg.module)을 의미합니다.

W> `module` 속성은 ES2015 모듈 구문을 사용하는 스크립트를 가리켜야 하지만 아직 브라우저나 노드에서 지원하지 않는 다른 구문 기능은 없습니다. 이를 통해 webpack은 사용자가 라이브러리의 특정 부분만 소비하는 경우 모듈 구문 자체를 파싱하여 [트리 쉐이킹](https://webpack.js.org/guides/tree-shaking/)을 통해 보다 가벼운 번들을 제공할 수 있습니다.

이제 사용자에게 배포하기 위해 [npm 패키지로 게시하고](https://docs.npmjs.com/getting-started/publishing-npm-packages) [unpkg.com](https://unpkg.com/#/)에서 찾을 수 있습니다.

T> 라이브러리와 관련된 스타일 시트를 노출하려면 [`MiniCssExtractPlugin`](/plugins/mini-css-extract-plugin)을 사용해야 합니다. 사용자는 다른 스타일 시트와 마찬가지로 이를 사용하고 로드 할 수 있습니다.
