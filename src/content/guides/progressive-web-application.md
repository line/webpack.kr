---
title: Progressive Web Application
sort: 22
contributors:
  - johnnyreilly
  - chenxsan
  - EugeneHlushko
  - benschac
  - aholzner
translators:
  - choilim
---

T> 이 가이드는 [Output Management](/guides/output-management) 가이드에 있는 코드 예제에 대해 설명합니다.

프로그레시브 웹 애플리케이션(또는 PWA)은 네이티브 애플리케이션과 유사한 경험을 제공하는 웹 앱입니다. PWA에 기여할 수 있는 많은 것들이 있습니다. 이 중에서 가장 중요한 것은 **오프라인** 일 때 앱이 작동할 수 있는 기능입니다. 이는 [Service Workers](https://developers.google.com/web/fundamentals/primers/service-workers/)라는 웹 기술을 사용하여 이루어집니다.

이 섹션에서는 앱에 오프라인 경험을 추가하는 데 중점을 둡니다. 웹 앱에 대한 오프라인 지원을 보다 쉽게 설정하는 데 도움이 될 도구를 제공하는 [Workbox](https://github.com/GoogleChrome/workbox)라는 Google 프로젝트를 사용하여 이 작업을 수행합니다.

## We Don't Work Offline Now

지금까지 로컬 파일 시스템으로 직접 이동하여 출력을 확인했습니다. 일반적으로 실제 사용자는 네트워크를 통해 웹 앱에 접근합니다. 브라우저는 `.html`, `.js`, 그리고 `.css` 파일같은 필요한 애셋을 제공할 **서버와** 통신합니다.

간단한 서버를 사용하여 테스트해 보겠습니다. `npm install http-server --save-dev` 커맨드로 [http-server](https://www.npmjs.com/package/http-server) 패키지를 설치하여 사용해 보겠습니다. 또한 `package.json`의 `scripts` 섹션을 수정하여 `start` 스크립트를 추가하겠습니다.

**package.json**

```diff
{
  ...
  "scripts": {
-    "build": "webpack"
+    "build": "webpack",
+    "start": "http-server dist"
  },
  ...
}
```

참고: [webpack DevServer](/configuration/dev-server/)는 기본적으로 인-메모리를 사용합니다. http-server가 `./dist` 디렉터리 파일을 제공하도록 하려면 [writeToDisk](/configuration/dev-server/#devserverwritetodisk-) 옵션을 활성화해야 합니다.

`npm run build` 커맨드를 실행하여 프로젝트를 빌드합니다. 그런 다음 `npm start` 커맨드를 실행합니다. 그러면 다음과 같이 출력됩니다.

```bash
> http-server dist

Starting up http-server, serving dist
Available on:
  http://xx.x.x.x:8080
  http://127.0.0.1:8080
  http://xxx.xxx.x.x:8080
Hit CTRL-C to stop the server
```

만약 브라우저를 `http://localhost:8080`로 연다면 `dist` 디렉터리에서 제공되는 webpack 애플리케이션을 볼 수 있습니다. 서버를 중지하고 새로 고침하면 webpack 애플리케이션을 더 이상 사용할 수 없습니다.

이것이 변경하고자 하는 것입니다. 이 문서의 끝에서는 이제 서버를 중지하고, 새로 고침을 눌러도 애플리케이션을 계속 볼 수 있습니다.

## Adding Workbox

Workbox webpack 플러그인을 추가하고 `webpack.config.js`파일을 수정해 보겠습니다.

```bash
npm install workbox-webpack-plugin --save-dev
```

**webpack.config.js**

```diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
+ const WorkboxPlugin = require('workbox-webpack-plugin');

  module.exports = {
    entry: {
      app: './src/index.js',
      print: './src/print.js',
    },
    plugins: [
      new HtmlWebpackPlugin({
-       title: 'Output Management',
+       title: 'Progressive Web Application',
      }),
+     new WorkboxPlugin.GenerateSW({
+       // 이 옵션은 ServiceWorkers가 빠르게 도달하도록 장려합니다
+       // 그리고 "오래된" SW가 돌아다니는 것을 허용하지 않습니다
+       clientsClaim: true,
+       skipWaiting: true,
+     }),
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
  };
```

이제 `npm run build`를 수행할 때 어떤 일이 발생하는지 살펴보겠습니다.

```bash
...
                  Asset       Size  Chunks                    Chunk Names
          app.bundle.js     545 kB    0, 1  [emitted]  [big]  app
        print.bundle.js    2.74 kB       1  [emitted]         print
             index.html  254 bytes          [emitted]
precache-manifest.b5ca1c555e832d6fbf9462efd29d27eb.js  268 bytes          [emitted]
      service-worker.js       1 kB          [emitted]
...
```

보다시피 `service-worker.js`와 `precache-manifest.b5ca1c555e832d6fbf9462efd29d27eb.js`라는 2개의 추가 파일이 생성됩니다. `service-worker.js`는 서비스 워커 파일이고 `precache-manifest.b5ca1c555e832d6fbf9462efd29d27eb.js`는 `service-worker.js`가 실행되기 위해 필요한 파일입니다. 사용자가 생성한 파일은 다를 수 있습니다. 하지만 `service-worker.js` 파일은 있어야 합니다.

이제 서비스 워커를 만들었습니다. 다음 단계는 무엇일까요?

## Registering Our Service Worker

서비스 워커를 등록하여 실행 할 수 있도록 합시다. 아래의 등록 코드를 추가하면 됩니다.

**index.js**

```diff
  import _ from 'lodash';
  import printMe from './print.js';

+ if ('serviceWorker' in navigator) {
+   window.addEventListener('load', () => {
+     navigator.serviceWorker.register('/service-worker.js').then(registration => {
+       console.log('SW registered: ', registration);
+     }).catch(registrationError => {
+       console.log('SW registration failed: ', registrationError);
+     });
+   });
+ }
```

한 번 더 `npm run build`를 통해 등록 코드를 포함한 앱 버전을 빌드합니다. 그런 다음 `npm start`를 실행합니다. `http://localhost:8080`로 이동하여 콘솔을 살펴보세요. 어딘가에 다음 내용이 표시됩니다.

```bash
SW registered
```

이제 테스트해 보겠습니다. 서버를 중지하고 페이지를 새로 고침 합니다. 브라우저가 서비스 워커를 지원하는 경우 애플리케이션을 계속해서 확인할 수 있습니다. 하지만 서비스 워커가 서비스를 제공하는 것이지 서버가 **제공하는 것은 아닙니다.**

## Conclusion

Workbox 프로젝트를 사용하여 오프라인 앱을 빌드했습니다. 웹 앱을 PWA로 전환하는 여정을 시작했습니다. 이제 더 나아가는 것에 대해 생각할 수 있습니다. 도움이 되는 유용한 리소스는 [여기](https://developers.google.com/web/progressive-web-apps/)에서 찾을 수 있습니다.
