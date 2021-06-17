---
title: Hot Module Replacement
sort: 15
contributors:
  - jmreidy
  - jhnns
  - sararubin
  - rohannair
  - joshsantos
  - drpicox
  - skipjack
  - sbaidon
  - gdi2290
  - bdwain
  - caryli
  - xgirma
  - EugeneHlushko
  - AnayaDesign
  - aviyacohen
  - dhruvdutt
  - wizardofhogwarts
  - aholzner
translators:
  - YukJiSoo
related:
  - title: Concepts - Hot Module Replacement
    url: /concepts/hot-module-replacement
  - title: API - Hot Module Replacement
    url: /api/hot-module-replacement
---

T> 이 가이드는 [개발 가이드](/guides/development)에 있는 코드 예제를 확장합니다.

Hot Module Replacement(또는 HMR)는 webpack에서 제공하는 가장 유용한 기능 중 하나입니다. 모든 종류의 모듈을 새로고침 할 필요 없이 런타임에 업데이트 할 수 있습니다. 이 페이지는 **구현에** 초점을 맞추고 [개념 페이지](/concepts/hot-module-replacement)는 작동 원리와 왜 유용한지에 대한 자세한 내용을 제공합니다.

W> **HMR**은 프로덕션용이 아니므로 개발용으로만 사용해야 합니다. 자세한 내용은 [프로덕션 구축 가이드](/guides/production)를 참고하세요.

## Enabling HMR

이 기능은 생산성에 많은 도움을 줍니다. [webpack-dev-server](https://github.com/webpack/webpack-dev-server) 설정을 업데이트하고 webpack의 내장 HMR 플러그인을 사용하면 됩니다. `index.js` 모듈에서 사용될 것이므로 `print.js`의 엔트리 포인트도 제거합니다.

T> `webpack-dev-server` 대신 `webpack-dev-middleware`를 사용한다면 [`webpack-hot-middleware`](https://github.com/webpack-contrib/webpack-hot-middleware) 패키지를 사용하여 커스텀 서버 또는 애플리케이션에서 HMR을 활성화하세요.

**webpack.config.js**

```diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: {
       app: './src/index.js',
-      print: './src/print.js',
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
+     hot: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Hot Module Replacement',
      }),
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
  };
```

T> CLI를 사용하여 `webpack serve --hot = only` 명령어로 [webpack-dev-server](https://github.com/webpack/webpack-dev-server) 구성을 수정할 수 있습니다.

이제 `index.js` 파일을 업데이트하여 `print.js` 내부의 변경이 감지되면 webpack에서 업데이트된 모듈을 수락하도록 지시합니다.

**index.js**

```diff
  import _ from 'lodash';
  import printMe from './print.js';

  function component() {
    const element = document.createElement('div');
    const btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;

    element.appendChild(btn);

    return element;
  }

  document.body.appendChild(component());
+
+ if (module.hot) {
+   module.hot.accept('./print.js', function() {
+     console.log('Accepting the updated printMe module!');
+     printMe();
+   })
+ }
```

`print.js`에서 `console.log` 문을 변경하면 브라우저 콘솔에 다음과 같은 출력이 표시됩니다. (당분간 `button.onclick = printMe` 출력에 대해 걱정하지 마세요. 나중에 해당 부분을 변경할 것입니다.)

**print.js**

```diff
  export default function printMe() {
-   console.log('I get called from print.js!');
+   console.log('Updating print.js...');
  }
```

**console**

```diff
[HMR] Waiting for update signal from WDS...
main.js:4395 [WDS] Hot Module Replacement enabled.
+ 2main.js:4395 [WDS] App updated. Recompiling...
+ main.js:4395 [WDS] App hot update...
+ main.js:4330 [HMR] Checking for updates on the server...
+ main.js:10024 Accepting the updated printMe module!
+ 0.4b8ee77….hot-update.js:10 Updating print.js...
+ main.js:4330 [HMR] Updated modules:
+ main.js:4330 [HMR]  - 20
```

## Via the Node.js API

Node.js API와 함께 Webpack Dev Server를 사용하는 경우 webpack 설정 객체에 dev 서버 옵션을 추가하지 마십시오. 대신 생성 시 두 번째 매개 변수로 전달하십시오. 예를 들어 보겠습니다.

`new WebpackDevServer(compiler, options)`

HMR을 활성화하려면 HMR 엔트리 포인트를 포함하도록 webpack 설정 객체도 수정해야 합니다. `webpack-dev-server` 패키지에는 이를 수행하는 데 사용할 수 있는 `addDevServerEntrypoints`라는 메서드가 포함되어 있습니다. 다음은 그 모습에 대한 간단한 예시입니다.

**dev-server.js**

```javascript
const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const config = require('./webpack.config.js');
const options = {
  contentBase: './dist',
  hot: true,
  host: 'localhost',
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(5000, 'localhost', () => {
  console.log('dev server listening on port 5000');
});
```

T> [`webpack-dev-middleware` 사용](/guides/development/#using-webpack-dev-middleware)의 경우 [`webpack-hot-middleware`](https://github.com/webpack-contrib/webpack-hot-middleware) 패키지를 사용하여 커스텀 개발 서버에서 HMR을 활성화합니다.

## Gotchas

Hot Module Replacement는 까다로울 수 있습니다. 이를 보여주기 위해 작업 예제로 돌아갑시다. 계속해서 예제 페이지의 버튼을 클릭하면 콘솔이 이전 `printMe` 함수를 인쇄하고 있음을 알 수 있습니다.

이것은 버튼의 `onclick` 이벤트 핸들러가 여전히 원래의 `printMe` 함수에 바인딩 되어 있기 때문에 발생합니다.

HMR에서 이 작업을 수행하려면 `module.hot.accept`를 사용하여 새 `printMe` 함수에 대한 바인딩을 업데이트해야 합니다.

**index.js**

```diff
  import _ from 'lodash';
  import printMe from './print.js';

  function component() {
    const element = document.createElement('div');
    const btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;  // onclick 이벤트는 원래 printMe 함수에 바인딩 됩니다.

    element.appendChild(btn);

    return element;
  }

- document.body.appendChild(component());
+ let element = component(); // print.js 변경 시 다시 렌더링할 요소 저장
+ document.body.appendChild(element);

  if (module.hot) {
    module.hot.accept('./print.js', function() {
      console.log('Accepting the updated printMe module!');
-     printMe();
+     document.body.removeChild(element);
+     element = component(); // 클릭 핸들러를 업데이트하려면 "component"를 다시 렌더링하십시오.
+     document.body.appendChild(element);
    })
  }
```

이것은 하나의 예시일 뿐이지만 사람들이 실수할 수 있는 상황이 많이 있습니다. 운 좋게도 Hot Module Replacement를 훨씬 쉽게 만들어주는 많은 로더가 있습니다. (그중 일부는 아래에 언급됨).

## HMR with Stylesheets

CSS Hot Module Replacement는 실제로 `style-loader`의 도움으로 상당히 간단합니다. 이 로더는 CSS 의존성이 업데이트될 때 `<style>`태그를 패치하기 위해 백그라운드에서 `module.hot.accept`를 사용합니다.

먼저 다음 명령으로 두 로더를 모두 설치해 보겠습니다.

```bash
npm install --save-dev style-loader css-loader
```

이제 로더를 사용하도록 설정 파일을 업데이트 하겠습니다.

**webpack.config.js**

```diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: {
      app: './src/index.js',
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
      hot: true,
    },
+   module: {
+     rules: [
+       {
+         test: /\.css$/,
+         use: ['style-loader', 'css-loader'],
+       },
+     ],
+   },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Hot Module Replacement',
      }),
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
  };
```

스타일 시트 핫 로딩은 모듈로 가져오는 것만큼 쉽습니다.

**project**

```diff
  webpack-demo
  | - package.json
  | - webpack.config.js
  | - /dist
    | - bundle.js
  | - /src
    | - index.js
    | - print.js
+   | - styles.css
```

**styles.css**

```css
body {
  background: blue;
}
```

**index.js**

```diff
  import _ from 'lodash';
  import printMe from './print.js';
+ import './styles.css';

  function component() {
    const element = document.createElement('div');
    const btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;  // onclick 이벤트는 원래 printMe 함수에 바인딩 됩니다.

    element.appendChild(btn);

    return element;
  }

  let element = component();
  document.body.appendChild(element);

  if (module.hot) {
    module.hot.accept('./print.js', function() {
      console.log('Accepting the updated printMe module!');
      document.body.removeChild(element);
      element = component(); // 클릭 핸들러를 업데이트하려면 "component"를 다시 렌더링하십시오.
      document.body.appendChild(element);
    })
  }

```

`body`의 스타일을 `background : red;`로 변경하면 새로고침 없이도 페이지의 배경색이 변경되는 것을 즉시 확인할 수 있습니다.

**styles.css**

```diff
  body {
-   background: blue;
+   background: red;
  }
```

## Other Code and Frameworks

HMR이 다양한 프레임워크 및 라이브러리와 원활하게 상호 작용할 수 있도록 커뮤니티에는 다른 많은 로더와 예제가 있습니다.

- [React Hot Loader](https://github.com/gaearon/react-hot-loader): 실시간으로 React 컴포넌트를 조정
- [Vue Loader](https://github.com/vuejs/vue-loader): Vue 캄포넌트에 대한 HMR을 즉시 지원하는 로더
- [Elm Hot webpack Loader](https://github.com/klazuka/elm-hot-webpack-loader): Elm 프로그래밍 언어에 대한 HMR 지원
- [Angular HMR](https://github.com/gdi2290/angular-hmr): 로더가 필요 없습니다! 기본 NgModule 파일을 간단히 변경하면 HMR API를 완전히 제어 할 수 있습니다.
- [Svelte Loader](https://github.com/sveltejs/svelte-loader): Svelte 컴포넌트에 대한 HMR을 즉시 지원하는 로더

T> HMR을 돕거나 향상시키는 다른 로더나 플러그인을 알고 있다면 pull request를 제출하여 이 목록에 추가해주세요!
