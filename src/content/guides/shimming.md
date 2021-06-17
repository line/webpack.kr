---
title: Shimming
sort: 20
contributors:
  - pksjce
  - jhnns
  - simon04
  - jeremenichelli
  - svyandun
  - byzyk
  - EugeneHlushko
  - AnayaDesign
  - dhurlburtusa
  - plr108
  - NicolasLetellier
  - wizardofhogwarts
  - snitin315
  - chenxsan
translators:
  - YukJiSoo
related:
  - title: Reward modern browser users script
    url: https://hackernoon.com/10-things-i-learned-making-the-fastest-site-in-the-world-18a0e1cdf4a7#c665
  - title: useBuiltIns in babel-preset-env
    url: https://babeljs.io/docs/en/babel-preset-env#usebuiltins
---

`webpack` 컴파일러는 ES2015 모듈, CommonJS 또는 AMD로 작성된 모듈을 이해할 수 있습니다. 그러나 일부 써드 파티 라이브러리는 전역 종속성을 필요로 할 수 있습니다. (예: `jQuery`의 경우 `$`) 라이브러리는 내보낼 필요가 있는 전역 변수를 만들 수도 있습니다. 이러한 "깨진 모듈은" _shimming이_ 작동하는 하나의 인스턴스입니다.

W> **전역 변수를 사용하지 않는 것이 좋습니다!** webpack의 전체 개념은 더 많은 모듈식 프런트엔드 개발을 허용하는 것입니다. 이는 응집도가 높고 숨겨진 종속성(예: 전역 변수)에 의존하지 않는 격리 된 모듈을 작성하는 것을 의미합니다. 그러므로 필요한 경우에만 이 기능을 사용하세요.

_shimming_ 이 유용한 또 다른 경우는 더 많은 사용자를 지원하기 위해 브라우저 기능을 [폴리필](https://en.wikipedia.org/wiki/Polyfill_%28programming%29)하려는 경우입니다. 이 경우 패치가 필요한 브라우저에만 해당 폴리필을 제공할 수 있습니다. (예: 요청 시 로드)

해당 글에서는 이러한 두 가지 사용 사례를 모두 살펴봅니다.

T> 간단하게 시작하기 위해 이 가이드는 [시작하기](/guides/getting-started)의 예에서 시작합니다. 계속해서 진행하기에 앞서 설정에 익숙해져야 합니다.

## Shimming Globals

전역 변수 shimming의 첫 번째 사용 사례부터 시작하겠습니다. 시작하기 전에 프로젝트를 다시 한번 살펴보겠습니다.

**프로젝트**

```diff
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
  |- index.html
|- /src
  |- index.js
|- /node_modules
```

우리가 사용했던 `lodash` 패키지를 기억하시나요? 데모 목적으로 애플리케이션에서 전역적으로 제공하고 싶다고 가정해 보겠습니다. 이를 위해 `ProvidePlugin`을 사용할 수 있습니다.

[`ProvidePlugin`](/plugins/provide-plugin)은 webpack을 통해 컴파일된 모든 모듈에서 패키지를 변수로 사용할 수 있게 해줍니다. 변수가 사용되는 것을 webpack에서 확인하면 최종 번들에 주어진 패키지를 포함합니다. `lodash`에 대한 `import`문을 제거하고 플러그인을 통해 제공해보겠습니다.

**src/index.js**

```diff
-import _ from 'lodash';
-
 function component() {
   const element = document.createElement('div');

-  // 이제 이 스크립트로 Lodash를 가져옵니다.
   element.innerHTML = _.join(['Hello', 'webpack'], ' ');

   return element;
 }

 document.body.appendChild(component());
```

**webpack.config.js**

```diff
 const path = require('path');
+const webpack = require('webpack');

 module.exports = {
   entry: './src/index.js',
   output: {
     filename: 'main.js',
     path: path.resolve(__dirname, 'dist'),
   },
+  plugins: [
+    new webpack.ProvidePlugin({
+      _: 'lodash',
+    }),
+  ],
 };
```

여기서 우리가 실질적으로 한 것은 webpack에게 알려주는 것입니다.

> 변수 `_`의 인스턴스가 하나 이상 존재한다면 `lodash` 패키지를 포함하고 필요한 모듈에 제공합니다.

빌드를 실행해도 동일한 출력이 표시되어야 합니다.

```bash
$ npm run build

..

[webpack-cli] Compilation finished
asset main.js 69.1 KiB [emitted] [minimized] (name: main) 1 related asset
runtime modules 344 bytes 2 modules
cacheable modules 530 KiB
  ./src/index.js 191 bytes [built] [code generated]
  ./node_modules/lodash/lodash.js 530 KiB [built] [code generated]
webpack 5.4.0 compiled successfully in 2910 ms
```

또한 `ProvidePlugin`에서 "배열 경로"(예: `[module, child, ...children?]`)를 구성하여 모듈의 일부분만 내보낼 수 있습니다. 호출될 때마다 `lodash`에서 `join` 메소드만 제공하고 싶다고 가정해 보겠습니다.

**src/index.js**

```diff
 function component() {
   const element = document.createElement('div');

-  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+  element.innerHTML = join(['Hello', 'webpack'], ' ');

   return element;
 }

 document.body.appendChild(component());
```

**webpack.config.js**

```diff
 const path = require('path');
 const webpack = require('webpack');

 module.exports = {
   entry: './src/index.js',
   output: {
     filename: 'main.js',
     path: path.resolve(__dirname, 'dist'),
   },
   plugins: [
     new webpack.ProvidePlugin({
-      _: 'lodash',
+      join: ['lodash', 'join'],
     }),
   ],
 };
```

`lodash` 라이브러리의 나머지는 삭제되므로 [트리 쉐이킹](/guides/tree-shaking)이 잘 수행됩니다.

## Granular Shimming

일부 레거시 모듈은 `this`가 `window` 객체에 의존합니다. `index.js`를 업데이트해 보겠습니다.

```diff
 function component() {
   const element = document.createElement('div');

   element.innerHTML = join(['Hello', 'webpack'], ' ');

+  // `window의` 컨텍스트에 있다고 가정합니다.
+  this.alert("Hmmm, this probably isn't a great idea...");
+
   return element;
 }

 document.body.appendChild(component());
```

이것은 `this`가 `module.exports`와 같은 CommonJS 컨텍스트에서 모듈이 실행될 때 문제가 됩니다. 이 경우 [`imports-loader`](/loaders/imports-loader/)를 사용하여 `this`를 재정의할 수 있습니다.

**webpack.config.js**

```diff
 const path = require('path');
 const webpack = require('webpack');

 module.exports = {
   entry: './src/index.js',
   output: {
     filename: 'main.js',
     path: path.resolve(__dirname, 'dist'),
   },
+  module: {
+    rules: [
+      {
+        test: require.resolve('./src/index.js'),
+        use: 'imports-loader?wrapper=window',
+      },
+    ],
+  },
   plugins: [
     new webpack.ProvidePlugin({
       join: ['lodash', 'join'],
     }),
   ],
 };
```

## Global Exports

라이브러리가 사용자가 사용할 것으로 예상하는 전역 변수를 생성한다고 가정해 보겠습니다. 이를 증명하기 위해 작은 모듈을 추가할 수 있습니다.

**프로젝트**

```diff
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
  |- /src
    |- index.js
+   |- globals.js
  |- /node_modules
```

**src/globals.js**

```js
const file = 'blah.txt';
const helpers = {
  test: function () {
    console.log('test something');
  },
  parse: function () {
    console.log('parse something');
  },
};
```

소스 코드에서 이러한 작업을 수행할 수는 없지만, 위에 표시된 코드와 유사한 오래된 라이브러리를 접했을 수 있습니다. 이 경우 [`exports-loader`](/loaders/exports-loader/)를 사용하여 해당 전역 변수를 일반 모듈로 내보낼 수 있습니다. 예를 들어 `file`을 `file`로, `helpers.parse`를 `parse`로 내보내 봅시다.

**webpack.config.js**

```diff
 const path = require('path');
 const webpack = require('webpack');

 module.exports = {
   entry: './src/index.js',
   output: {
     filename: 'main.js',
     path: path.resolve(__dirname, 'dist'),
   },
   module: {
     rules: [
       {
         test: require.resolve('./src/index.js'),
         use: 'imports-loader?wrapper=window',
       },
+      {
+        test: require.resolve('./src/globals.js'),
+        use:
+          'exports-loader?type=commonjs&exports=file,multiple|helpers.parse|parse',
+      },
     ],
   },
   plugins: [
     new webpack.ProvidePlugin({
       join: ['lodash', 'join'],
     }),
   ],
 };
```

이제 엔트리 스크립트(예: `src/index.js`)에서 `const {file, parse} = require('./globals.js');`를 사용할 수 있으며 원활하게 작동합니다.

## Loading Polyfills

지금까지 논의한 대부분은 레거시 패키지 처리와 관련이 있습니다. 두 번째 주제인 **폴리필로** 넘어가겠습니다.

폴리필을 로드하는 방법에는 여러 가지가 있습니다. 예를 들어 [`babel-polyfill`](https://babeljs.io/docs/en/babel-polyfill/)을 포함하려면 다음과 같이하면 됩니다.

```bash
npm install --save babel-polyfill
```

메인 번들에 포함되도록 `import` 합니다.

**src/index.js**

```diff
+import 'babel-polyfill';
+
 function component() {
   const element = document.createElement('div');

   element.innerHTML = join(['Hello', 'webpack'], ' ');

   // `window`의 컨텍스트에 있다고 가정합니다.
   this.alert("Hmmm, this probably isn't a great idea...");

   return element;
 }

 document.body.appendChild(component());
```

T> `import`한 것을 변수에 바인딩하지 않습니다. 이는 폴리필이 나머지 코드 베이스 이전에 자체적으로 실행되는 특정 기능이 존재한다고 가정하기 때문입니다.

이 접근 방식은 번들 크기보다 정확성을 우선시합니다. 안전과 견고함을 위해서는 폴리필이나 shim이 **다른 모든 코드보다 먼저** 실행되어야 하므로 동기식으로 로드하거나 모든 앱 코드는 모든 폴리필이나 shim이 로드된 후에 로드해야 합니다.
또한 커뮤니티에는 최신 브라우저에 폴리필이 "필요하지 않다"거나 폴리필이나 shim이 누락된 기능을 추가하는 역할 만한다는 오해가 많이 있습니다. 사실, 가장 최신 브라우저에서도 종종 _깨진 구현을 복구_ 합니다.
따라서 번들 크기 비용이 발생하더라도 모든 폴리필이나 shim을 무조건 동기식으로 로드하는 것이 모범 사례입니다.

문제가 해결됐다고 생각하고 위험을 감수하고 싶다면 다음과 같은 방법도 있습니다.
`import`를 새 파일로 이동하고 [`whatwg-fetch`](https://github.com/github/fetch) 폴리필을 추가해 보겠습니다.

```bash
npm install --save whatwg-fetch
```

**src/index.js**

```diff
-import 'babel-polyfill';
-
 function component() {
   const element = document.createElement('div');

   element.innerHTML = join(['Hello', 'webpack'], ' ');

   // `window`의 컨텍스트에 있다고 가정합니다.
   this.alert("Hmmm, this probably isn't a great idea...");

   return element;
 }

 document.body.appendChild(component());
```

**project**

```diff
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
  |- /src
    |- index.js
    |- globals.js
+   |- polyfills.js
  |- /node_modules
```

**src/polyfills.js**

```javascript
import 'babel-polyfill';
import 'whatwg-fetch';
```

**webpack.config.js**

```diff
 const path = require('path');
 const webpack = require('webpack');

 module.exports = {
-  entry: './src/index.js',
+  entry: {
+    polyfills: './src/polyfills',
+    index: './src/index.js',
+  },
   output: {
-    filename: 'main.js',
+    filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
   module: {
     rules: [
       {
         test: require.resolve('./src/index.js'),
         use: 'imports-loader?wrapper=window',
       },
       {
         test: require.resolve('./src/globals.js'),
         use:
           'exports-loader?type=commonjs&exports[]=file&exports[]=multiple|helpers.parse|parse',
       },
     ],
   },
   plugins: [
     new webpack.ProvidePlugin({
       join: ['lodash', 'join'],
     }),
   ],
 };
```

이를 통해 새로운 `polyfills.bundle.js` 파일을 조건부로 로드하는 로직을 추가 할 수 있습니다. 이 결정을 내리는 방법은 지원 기술과 브라우저에 따라 다릅니다. polyfill이 필요한지 여부를 확인하기 위해 몇 가지 간단한 테스트를 수행합니다.

**dist/index.html**

```diff
 <!DOCTYPE html>
 <html>
   <head>
     <meta charset="utf-8" />
     <title>Getting Started</title>
+    <script>
+      const modernBrowser = 'fetch' in window && 'assign' in Object;
+
+      if (!modernBrowser) {
+        const scriptElement = document.createElement('script');
+
+        scriptElement.async = false;
+        scriptElement.src = '/polyfills.bundle.js';
+        document.head.appendChild(scriptElement);
+      }
+    </script>
   </head>
   <body>
-    <script src="main.js"></script>
+    <script src="index.bundle.js"></script>
   </body>
 </html>
```

이제 엔트리 스크립트에서 일부 데이터를 가져올 수 있습니다.

**src/index.js**

```diff
 function component() {
   const element = document.createElement('div');

   element.innerHTML = join(['Hello', 'webpack'], ' ');

   // `window`의 컨텍스트에 있다고 가정합니다.
   this.alert("Hmmm, this probably isn't a great idea...");

   return element;
 }

 document.body.appendChild(component());
+
+fetch('https://jsonplaceholder.typicode.com/users')
+  .then((response) => response.json())
+  .then((json) => {
+    console.log(
+      "We retrieved some data! AND we're confident it will work on a variety of browser distributions."
+    );
+    console.log(json);
+  })
+  .catch((error) =>
+    console.error('Something went wrong when fetching this data: ', error)
+  );
```

빌드를 실행하면 `polyfills.bundle.js` 파일이 생성되고 브라우저에서 원활하게 동작하게 됩니다. 이 설정은 개선될 수 있지만 실제로 필요한 사용자에게만 폴리필을 제공하는 방법에 대한 좋은 아이디어입니다.

## Further Optimizations

`babel-preset-env` 패키지는 [browserslist](https://github.com/browserslist/browserslist)를 사용하여 브라우저 매트릭스에서 지원되지 않는 항목만 트랜스파일합니다. 이 사전 설정은 [`useBuiltIns`](https://babeljs.io/docs/en/babel-preset-env#usebuiltins) 옵션(기본값 `false`)과 함께 제공되며, 전역 `babel-polyfill`을 가져오는 것을 `import` 패턴을 통해 더 세분화 된 기능으로 변환할 수 있습니다.

```js
import 'core-js/modules/es7.string.pad-start';
import 'core-js/modules/es7.string.pad-end';
import 'core-js/modules/web.timers';
import 'core-js/modules/web.immediate';
import 'core-js/modules/web.dom.iterable';
```

자세한 내용은 [babel-preset-env 문서](https://babeljs.io/docs/en/babel-preset-env)를 참고하세요.

## Node Built-Ins

`process`와 같은 Node 내장 기능은 특별한 로더나 플러그인을 사용하지 않고도 설정 파일에서 직접 폴리필 할 수 있습니다. 자세한 내용과 예제는 [node 설정 페이지](/configuration/node)를 참고하세요.

## Other Utilities

레거시 모듈을 다룰 때 도움이 될 수 있는 몇 가지 도구가 있습니다.

모듈에 AMD/CommonJS 버전이 없고 `dist`를 포함하려는 경우 [`noParse`](/configuration/module/#modulenoparse)에서 플래그를 지정할 수 있습니다. 이렇게하면 webpack이 모듈을 파싱하거나 `require()` 및 `import` 문을 해석하지 않고 모듈을 포함하게됩니다. 이 방법은 빌드 성능을 향상시키는데도 사용됩니다.

W> `ProvidePlugin`과 같이 AST가 필요한 기능은 동작하지 않습니다.

마지막으로 여러 [모듈 스타일](/concepts/modules)을 지원하는 모듈이 있습니다. (예: AMD, CommonJS 및 레거시의 조합) 대부분의 경우, 먼저 `define`을 확인한 다음 일부 코드를 사용하여 속성을 내보냅니다. 이 경우 [`imports-loader`](/loaders/imports-loader/)를 통해 `additionalCode=var%define%20=%20false;`를 설정하여 CommonJS 경로를 강제하는 것이 도움이 될 수 있습니다.
