---
title: Development
sort: 4
contributors:
  - SpaceK33z
  - rafde
  - fvgs
  - TheDutchCoder
  - WojciechKo
  - Calinou
  - GAumala
  - EugeneHlushko
  - byzyk
  - trivikr
  - aholzner
  - chenxsan
  - maxloh
translators:
  - choilim
---

T> 이 가이드는 [출력 관리](/guides/output-management) 가이드에 있는 코드 예제를 확장합니다.

가이드를 차례대로 따라왔다면, webpack 기본 사양 중 일부를 확실히 이해하고 있을 것입니다. 계속하기 전 우리의 삶을 좀 더 편안하게 만들 개발 환경 설정을 살펴보겠습니다.

W> 이 가이드의 도구는 **오직 개발을 위한 것입니다**, 프로덕션에서 사용하는 것을 **피하세요!**

먼저 [`mode`를 `'development'`로](/configuration/mode/#mode-development) 설정하고 `title`을 `'Development'`로 설정해보겠습니다.

**webpack.config.js**

```diff
 const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
+  mode: 'development',
   entry: {
     index: './src/index.js',
     print: './src/print.js',
   },
   plugins: [
     new HtmlWebpackPlugin({
-      title: 'Output Management',
+      title: 'Development',
     }),
   ],
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
     clean: true,
   },
 };
```

## Using source maps

webpack이 소스 코드를 번들로 묶을 때, 오류와 경고의 원래 위치를 추적하기 어려울 수 있습니다. 예를 들어, 세 개의 소스 파일(`a.js`, `b.js`, 그리고 `c.js`)을 하나의 번들로 묶고 하나의 소스 파일이 오류가 있는 경우, 스택 추적은 단순히 `bundle.js`를 가리킵니다. 오류가 발생한 소스 파일을 정확히 알고 싶기 때문에 항상 도움이 되는 것은 아닙니다.

오류와 경고를 쉽게 추적할 수 있도록, JavaScript는 컴파일된 코드를 원래 소스로 매핑하는 [소스맵](http://blog.teamtreehouse.com/introduction-source-maps)을 제공합니다. `b.js`에서 오류가 발생한 경우, 소스맵에서 정확히 알려줍니다.

소스맵과 관련하여 사용할 수 있는 [다른 옵션](/configuration/devtool)이 많이 있습니다. 필요에 따라 설정할 수 있도록 확인하세요.

이 가이드에서는, 프로덕션에는 적합하지 않지만 설명 목적으로 유용한 `inline-source-map` 옵션을 사용하겠습니다.

**webpack.config.js**

```diff
 const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
   mode: 'development',
   entry: {
     index: './src/index.js',
     print: './src/print.js',
   },
+  devtool: 'inline-source-map',
   plugins: [
     new HtmlWebpackPlugin({
       title: 'Development',
     }),
   ],
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
     clean: true,
   },
 };
```

이제 디버깅할 내용이 있는지 확인하고, `print.js` 파일에 오류를 생성해 보겠습니다.

**src/print.js**

```diff
 export default function printMe() {
-  console.log('I get called from print.js!');
+  cosnole.log('I get called from print.js!');
 }
```

`npm run build`를 실행하면, 다음과 같이 컴파일됩니다.

```bash
...
[webpack-cli] Compilation finished
asset index.bundle.js 1.38 MiB [emitted] (name: index)
asset print.bundle.js 6.25 KiB [emitted] (name: print)
asset index.html 272 bytes [emitted]
runtime modules 1.9 KiB 9 modules
cacheable modules 530 KiB
  ./src/index.js 406 bytes [built] [code generated]
  ./src/print.js 83 bytes [built] [code generated]
  ./node_modules/lodash/lodash.js 530 KiB [built] [code generated]
webpack 5.4.0 compiled successfully in 706 ms
```

이제 브라우저에서 `index.html` 파일을 엽니다. 버튼을 클릭하고, 오류가 표시된 콘솔을 확인합니다. 오류는 다음과 같이 표시되어야 합니다.

```bash
Uncaught ReferenceError: cosnole is not defined
   at HTMLButtonElement.printMe (print.js:2)
```

오류에서 오류가 발생 한 파일(`print.js`)과 줄 번호(2)에 대한 참조도 포함되어 있음을 알 수 있습니다. 이제 문제를 해결하기 위해 어디를 봐야 하는지 정확히 알 수 있습니다.

## Choosing a Development Tool

W> 일부 텍스트 편집기에는 다음 도구 중 일부를 방해할 수 있는 "안전한 쓰기" 기능이 있습니다. 이런 문제에 대한 해결책은 [텍스트 편집기 조정](#adjusting-your-text-editor)을 참고하십시오.

코드를 컴파일할 때마다 `npm run build`를 수동으로 실행하는 것은 번거롭습니다.

webpack에는 코드가 변경될 때마다 자동으로 컴파일하는 데 도움이 되는 몇 가지 옵션이 있습니다.

1.  webpack의 [watch 모드](/configuration/watch/#watch)
2.  [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
3.  [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware)

대부분의 경우, `webpack-dev-server`를 사용하고 싶겠지만, 위의 모든 옵션을 살펴보겠습니다.

### Using Watch Mode

webpack이 디펜던시 그래프 내의 모든 파일에서의 변경사항을 "감시"하도록 지시할 수 있습니다. 이런 파일 중 하나가 업데이트되면, 코드가 다시 컴파일되므로 전체 빌드를 수동으로 실행할 필요가 없습니다.

webpack의 watch 모드를 시작하는 npm 스크립트를 추가해 보겠습니다.

**package.json**

```diff
 {
   "name": "webpack-demo",
   "version": "1.0.0",
   "description": "",
   "private": true,
   "scripts": {
     "test": "echo \"Error: no test specified\" && exit 1",
+    "watch": "webpack --watch",
     "build": "webpack"
   },
   "keywords": [],
   "author": "",
   "license": "ISC",
   "devDependencies": {
     "html-webpack-plugin": "^4.5.0",
     "webpack": "^5.4.0",
     "webpack-cli": "^4.2.0"
   },
   "dependencies": {
     "lodash": "^4.17.20"
   }
 }
```

커멘드 라인에서 `npm run watch`를 실행하고 webpack이 코드를 컴파일하는 방법을 확인하세요.
스크립트가 현재 파일을 감시하고 있기 때문에 커멘드 라인을 종료하지 않은 것을 확인할 수 있습니다.

이제, webpack이 파일을 감시하는 동안, 앞에서 소개한 오류를 제거해 보겠습니다.

**src/print.js**

```diff
 export default function printMe() {
-  cosnole.log('I get called from print.js!');
+  console.log('I get called from print.js!');
 }
```

이제 파일을 저장하고 터미널 창을 확인하십시오. webpack이 변경된 모듈을 자동으로 재컴파일하는 것을 볼 수 있습니다!

유일한 단점은 변경사항을 확인하려면 브라우저를 새로 고침해야 한다는 것입니다. 이것이 자동으로 된다면 더 좋을 것이므로, `webpack-dev-server`를 사용해 봅시다.

### Using webpack-dev-server

`webpack-dev-server`는 간단한 웹 서버와 실시간 다시 로딩 기능을 제공합니다. 설정해보겠습니다.

```bash
npm install --save-dev webpack-dev-server
```

설정 파일을 변경하여 개발 서버에 파일을 찾을 위치를 알려줍니다.

**webpack.config.js**

```diff
 const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
   mode: 'development',
   entry: {
     index: './src/index.js',
     print: './src/print.js',
   },
   devtool: 'inline-source-map',
+  devServer: {
+    contentBase: './dist',
+  },
   plugins: [
     new HtmlWebpackPlugin({
       title: 'Development',
     }),
   ],
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
     clean: true,
   },
 };
```

이것은 `webpack-dev-server`에게 `dist` 디렉터리의 파일을 `localhost:8080`에서 제공하도록 합니다.

T> `webpack-dev-server`는 [`output.path`](/configuration/output/#outputpath)에 정의된 디렉터리에서 번들된 파일을 제공합니다. 예를 들면, 파일은 `http://[devServer.host]:[devServer.port]/[output.publicPath]/[output.filename]` 주소로 사용할 수 있습니다.

W> webpack-dev-server는 컴파일 후 출력 파일을 작성하지 않습니다. 대신 번들 파일을 메모리에 보관하고 서버의 루트 경로에 마운트 된 실제 파일인 것처럼 제공합니다. 페이지가 다른 경로에서 번들 파일을 찾을 것으로 예상하는 경우 개발 서버 설정에서 [`publicPath`](/configuration/dev-server/#devserverpublicpath-) 옵션을 사용하여 변경할 수 있습니다.

개발 서버를 쉽게 실행할 수 있는 스크립트를 추가해보겠습니다.

**package.json**

```diff
 {
   "name": "webpack-demo",
   "version": "1.0.0",
   "description": "",
   "private": true,
   "scripts": {
     "test": "echo \"Error: no test specified\" && exit 1",
     "watch": "webpack --watch",
+    "start": "webpack serve --open",
     "build": "webpack"
   },
   "keywords": [],
   "author": "",
   "license": "ISC",
   "devDependencies": {
     "html-webpack-plugin": "^4.5.0",
     "webpack": "^5.4.0",
     "webpack-cli": "^4.2.0",
     "webpack-dev-server": "^3.11.0"
   },
   "dependencies": {
     "lodash": "^4.17.20"
   }
 }
```

이제 커멘드 라인에서 `npm start`를 실행할 수 있으며 브라우저가 자동으로 페이지를 로드하는 것을 볼 수 있습니다. 이제 소스 파일을 변경하고 저장하면, 코드가 컴파일된 후 웹 서버가 자동으로 다시 로드됩니다. 시도해 보세요!

`webpack-dev-server`에는 설정 가능한 많은 옵션이 있습니다. 자세한 내용은 [문서](/configuration/dev-server)를 참고하세요.

T> 이제 서버가 작동 중이므로, [Hot module replacement](/guides/hot-module-replacement)를 사용해보세요!

### Using webpack-dev-middleware

`webpack-dev-middleware`는 webpack에서 처리한 파일을 서버로 내보내는 래퍼 입니다. 이것은 내부적으로 `webpack-dev-server`에서 사용되지만, 사용자가 원하는 경우 더 많은 설정을 허용하기 위해 별도의 패키지로 사용할 수 있습니다. `webpack-dev-middleware`와 express 서버를 결합한 예를 살펴보겠습니다.

시작하기 전에 `express`와 `webpack-dev-middleware`를 설치하겠습니다.

```bash
npm install --save-dev express webpack-dev-middleware
```

이제 미들웨어가 올바르게 작동하는지 확인하기 위해 webpack의 설정 파일을 약간 수정해야 합니다.

**webpack.config.js**

```diff
 const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
   mode: 'development',
   entry: {
     index: './src/index.js',
     print: './src/print.js',
   },
   devtool: 'inline-source-map',
   devServer: {
     contentBase: './dist',
   },
   plugins: [
     new HtmlWebpackPlugin({
       title: 'Development',
     }),
   ],
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
     clean: true,
+    publicPath: '/',
   },
 };
```

`http://localhost:3000`에서 파일이 올바르게 제공되는지 확인하기 위해 `publicPath`가 서버 스크립트 내에서도 사용됩니다. 나중에 포트 번호를 지정합니다. 다음 단계는 커스텀 `express` 서버를 설정하는 것입니다.

**project**

```diff
  webpack-demo
  |- package.json
  |- webpack.config.js
+ |- server.js
  |- /dist
  |- /src
    |- index.js
    |- print.js
  |- /node_modules
```

**server.js**

```javascript
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// express에서 webpack-dev-middleware와 webpack.config.js를 사용하도록 설정하세요.
// 기본 설정 파일
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);

// 포트 3000에서 파일 제공
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});
```

이제 서버를 좀 더 쉽게 실행할 수 있도록 npm 스크립트를 추가합니다.

**package.json**

```diff
 {
   "name": "webpack-demo",
   "version": "1.0.0",
   "description": "",
   "private": true,
   "scripts": {
     "test": "echo \"Error: no test specified\" && exit 1",
     "watch": "webpack --watch",
     "start": "webpack serve --open",
+    "server": "node server.js",
     "build": "webpack"
   },
   "keywords": [],
   "author": "",
   "license": "ISC",
   "devDependencies": {
     "express": "^4.17.1",
     "html-webpack-plugin": "^4.5.0",
     "webpack": "^5.4.0",
     "webpack-cli": "^4.2.0",
     "webpack-dev-middleware": "^4.0.2",
     "webpack-dev-server": "^3.11.0"
   },
   "dependencies": {
     "lodash": "^4.17.20"
   }
 }
```

이제 터미널에서 `npm run server`를 실행하면, 다음과 유사한 출력이 표시됩니다.

```bash
Example app listening on port 3000!
...
<i> [webpack-dev-middleware] asset index.bundle.js 1.38 MiB [emitted] (name: index)
<i> asset print.bundle.js 6.25 KiB [emitted] (name: print)
<i> asset index.html 274 bytes [emitted]
<i> runtime modules 1.9 KiB 9 modules
<i> cacheable modules 530 KiB
<i>   ./src/index.js 406 bytes [built] [code generated]
<i>   ./src/print.js 83 bytes [built] [code generated]
<i>   ./node_modules/lodash/lodash.js 530 KiB [built] [code generated]
<i> webpack 5.4.0 compiled successfully in 709 ms
<i> [webpack-dev-middleware] Compiled successfully.
<i> [webpack-dev-middleware] Compiling...
<i> [webpack-dev-middleware] assets by status 1.38 MiB [cached] 2 assets
<i> cached modules 530 KiB (javascript) 1.9 KiB (runtime) [cached] 12 modules
<i> webpack 5.4.0 compiled successfully in 19 ms
<i> [webpack-dev-middleware] Compiled successfully.
```

이제 브라우저를 실행하고 `http://localhost:3000`로 이동합니다. webpack 앱이 실행하고 작동하는 것을 확인할 수 있습니다!

T> Hot Module Replacement 방식에 대해 자세히 알고 싶다면, [Hot Module Replacement](/guides/hot-module-replacement/) 가이드를 읽어보세요.

## Adjusting Your Text Editor

코드 자동 컴파일을 사용하면, 파일을 저장할 때 문제가 발생할 수 있습니다. 일부 편집기에는 잠재적으로 재컴파일을 방해할 수 있는 "안전한 쓰기" 기능이 있습니다.

일부 일반 편집기에서 이 기능을 비활성화하려면, 아래 목록을 참고하십시오.

- **Sublime Text 3**: 사용자 환경 설정에 `atomic_save: 'false'`를 추가하십시오.
- **JetBrains IDEs (e.g. WebStorm)**: `Preferences > Appearance & Behavior > System Settings`에서 "Use safe write" 선택을 해제하십시오.
- **Vim**: 설정에 `:set backupcopy=yes`를 추가하십시오.

## Conclusion

이제 자동으로 코드를 컴파일하고 간단한 개발 서버를 실행하는 방법을 배웠으므로, [코드 스플리팅](/guides/code-splitting/)을 다룰 다음 가이드로 넘어가 볼까요?
