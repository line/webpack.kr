---
title: Output Management
sort: 3
contributors:
  - skipjack
  - TheDutchCoder
  - sudarsangp
  - JGJP
  - EugeneHlushko
  - AnayaDesign
  - chenxsan
translators:
  - keipark
---

T> 이 가이드는 [`Asset Management`](/guides/asset-management) 가이드에 있는 코드 예제를 기준으로 합니다.

지금까지 모든 애셋을 `index.html` 파일에 수동으로 포함했습니다. 하지만 애플리케이션이 커지면서 [파일 이름에 해시를 사용](/guides/caching)하거나 [다중 번들](/guides/code-splitting)로 내보내기 시작하면 `index.html` 파일을 수동으로 관리하기 어렵습니다. 이 때 몇 가지 플러그인으로 이 프로세스를 훨씬 쉽게 관리할 수 있습니다.

## Preparation

먼저 프로젝트를 조금 수정해보겠습니다.

**project**

```diff
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
  |- /src
    |- index.js
+   |- print.js
  |- /node_modules
```

`src/print.js` 파일에 로직을 추가합니다.

**src/print.js**

```js
export default function printMe() {
  console.log('I get called from print.js!');
}
```

그리고 `src/index.js` 파일에서 이 함수를 사용합니다.

**src/index.js**

```diff
 import _ from 'lodash';
+import printMe from './print.js';

 function component() {
   const element = document.createElement('div');
+  const btn = document.createElement('button');

   element.innerHTML = _.join(['Hello', 'webpack'], ' ');

+  btn.innerHTML = 'Click me and check the console!';
+  btn.onclick = printMe;
+
+  element.appendChild(btn);
+
   return element;
 }

 document.body.appendChild(component());
```

webpack이 엔트리를 분할할 수 있도록 `dist/index.html` 파일도 업데이트해 보겠습니다.

**dist/index.html**

```diff
 <!DOCTYPE html>
 <html>
   <head>
     <meta charset="utf-8" />
-    <title>Asset Management</title>
+    <title>Output Management</title>
+    <script src="./print.bundle.js"></script>
   </head>
   <body>
-    <script src="bundle.js"></script>
+    <script src="./index.bundle.js"></script>
   </body>
 </html>
```

이제 설정을 수정합니다. `src/print.js`를 새 엔트리 포인트(`print`)로 추가합니다. 그리고 출력 번들 이름이 엔트리 포인트 이름을 기반으로 동적으로 생성되도록 변경합니다.

**webpack.config.js**

```diff
 const path = require('path');

 module.exports = {
-  entry: './src/index.js',
+  entry: {
+    index: './src/index.js',
+    print: './src/print.js',
+  },
   output: {
-    filename: 'bundle.js',
+    filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
 };
```

`npm run build`를 실행하고 무엇이 생성되는지 살펴보겠습니다.

```bash
...
[webpack-cli] Compilation finished
asset index.bundle.js 69.5 KiB [emitted] [minimized] (name: index) 1 related asset
asset print.bundle.js 316 bytes [emitted] [minimized] (name: print)
runtime modules 1.36 KiB 7 modules
cacheable modules 530 KiB
  ./src/index.js 406 bytes [built] [code generated]
  ./src/print.js 83 bytes [built] [code generated]
  ./node_modules/lodash/lodash.js 530 KiB [built] [code generated]
webpack 5.4.0 compiled successfully in 1996 ms
```

webpack이 `print.bundle.js` 과 `index.bundle.js` 파일을 생성하는 것을 볼 수 있습니다. 이 파일은 `index.html` 파일에도 명시되어 있습니다. 브라우저에서 `index.html`을 열고 버튼을 클릭하면 어떻게 되는지 확인할 수 있습니다.

그러나 엔트리 포인트 중 하나의 이름을 변경하거나 새 엔트리 포인트를 추가하면 어떻게 될까요? 생성된 번들은 빌드에서 이름이 변경되지만 `index.html` 파일은 여전히 예전 이름을 참조합니다. [`HtmlWebpackPlugin`](/plugins/html-webpack-plugin)을 사용하여 이 문제를 해결해보겠습니다.

## Setting up HtmlWebpackPlugin

먼저 플러그인을 설치하고 `webpack.config.js` 파일을 수정합니다.

```bash
npm install --save-dev html-webpack-plugin
```

**webpack.config.js**

```diff
 const path = require('path');
+const HtmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
   entry: {
     index: './src/index.js',
     print: './src/print.js',
   },
+  plugins: [
+    new HtmlWebpackPlugin({
+      title: 'Output Management',
+    }),
+  ],
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
 };
```

빌드하기 전에 `dist/` 폴더에 이미 `index.html`이 있더라도 기본적으로 `HtmlWebpackPlugin`이 자체 `index.html` 파일을 생성하는 것을 알아두세요. 이는 `index.html` 파일이 새로 생성된 파일로 대체된다는 의미입니다. `npm run build`를 실행할 때 어떤 일이 발생하는지 살펴보겠습니다.

```bash
...
[webpack-cli] Compilation finished
asset index.bundle.js 69.5 KiB [compared for emit] [minimized] (name: index) 1 related asset
asset print.bundle.js 316 bytes [compared for emit] [minimized] (name: print)
asset index.html 253 bytes [emitted]
runtime modules 1.36 KiB 7 modules
cacheable modules 530 KiB
  ./src/index.js 406 bytes [built] [code generated]
  ./src/print.js 83 bytes [built] [code generated]
  ./node_modules/lodash/lodash.js 530 KiB [built] [code generated]
webpack 5.4.0 compiled successfully in 2189 ms
```

코드 편집기에서 `index.html`을 열면 `HtmlWebpackPlugin`이 완전히 새로운 파일을 생성했으며 모든 번들이 자동으로 추가된 것을 알 수 있습니다.

`HtmlWebpackPlugin`이 제공하는 모든 기능과 옵션에 대해 더 자세히 알아보려면 [`HtmlWebpackPlugin`](https://github.com/jantimonhtml-webpack-plugin) 저장소를 확인해 보세요.

## Cleaning up the `/dist` folder

이전 가이드와 코드 예제에서 눈치챘겠지만 `/dist` 폴더가 상당히 복잡해졌습니다. webpack은 파일을 생성하여 `/dist` 폴더에 저장하지만, 프로젝트에서 실제로 사용하는 파일이 어떤 건지는 알지 못합니다.

일반적으로 사용하는 파일만 생성되도록 각 빌드 전에 `/dist` 폴더를 정리하는 것이 좋습니다. [`output.clean`](/configuration/output/#outputclean) 옵션을 사용하여 처리해보겠습니다.

**webpack.config.js**

```diff
 const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
   entry: {
     index: './src/index.js',
     print: './src/print.js',
   },
   plugins: [
     new HtmlWebpackPlugin({
       title: 'Output Management',
     }),
   ],
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
+    clean: true,
   },
 };
```

이제 `npm run build`를 실행하고 `/dist` 폴더를 확인해보세요. 모든 것이 잘 되었다면 이제 오래된 파일 없이 빌드에서 생성된 파일만 볼 수 있습니다!

## The Manifest

webpack과 플러그인은 어떤 파일이 생성되는 것을 어떻게 "알고 있는지" 궁금할 것입니다. 답은 매니페스트에 있습니다. webpack은 모든 모듈이 출력 번들에 어떻게 매핑되는지 추적합니다. 만약 webpack의 [`output`](/configuration/output)을 다른 방식으로 관리하는데 관심이 있다면 매니페스트부터 시작하는 것이 좋습니다.

매니페스트 데이터는 [`WebpackManifestPlugin`](https://github.com/shellscape/webpack-manifest-plugin)을 사용하여 쉽게 적용 가능한 json 파일로 추출할 수 있습니다.

프로젝트에서 이 플러그인을 사용하는 방법에 대한 모든 예제를 다루지는 않겠지만 [콘셉 페이지](/concepts/manifest) 및 [캐싱 가이드](/guides/caching)를 읽어 보면 이것이 장기 캐싱과 어떻게 연결되는지 확인할 수 있습니다.

## Conclusion

HTML에 번들을 동적으로 추가하는 방법을 배웠으므로 이제 [개발 가이드](/guides/development)를 살펴보세요. 또는 심화 항목을 자세히 알아보고 싶다면 [코드 스플리팅 가이드](/guides/code-splitting)를 추천합니다.
