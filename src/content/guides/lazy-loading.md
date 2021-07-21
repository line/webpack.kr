---
title: Lazy Loading
sort: 18
contributors:
  - iammerrick
  - chrisVillanueva
  - skipjack
  - byzyk
  - EugeneHlushko
  - AnayaDesign
  - tapanprakasht
translators:
  - dkstyle
related:
  - title: Lazy Loading ES2015 Modules in the Browser
    url: https://dzone.com/articles/lazy-loading-es2015-modules-in-the-browser
  - title: Asynchronous vs Deferred JavaScript
    url: https://bitsofco.de/async-vs-defer/
---

T> 이 가이드는 [코드 스플리팅](/guides/code-splitting)에 대한 작은 후속 작업입니다. 해당 가이드를 아직 읽지 않았다면, 지금 읽어보세요.

지연 로딩 또는 "온 디맨드" 로딩은 사이트나 애플리케이션을 최적화하는 좋은 방법입니다. 이 방법은 기본적으로 논리적인 중단점에서 코드를 분할한 다음 유저가 새로운 코드 블록을 요구하거나 필요로 하는 작업을 수행한 후 코드를 로딩하는 것입니다. 이렇게 하면 애플리케이션의 초기 로드 속도가 빨라지고 일부 블록이 로드되지 않을 수도 있어서 전체 무게가 줄어 듭니다.

## Example

[코드 스플리팅](/guides/code-splitting/#dynamic-imports)의 예제를 가져와 이 개념을 더욱 잘 보여주기 위해 약간 수정해 보겠습니다. 이 코드는 별도의 청크인 `lodash.bundle.js`를 생성하고 스크립트가 실행되자마자 기술적으로 "지연 로드"됩니다. 문제는 번들을 로드하는데 유저 상호 작용이 필요하지 않다는 것입니다. 즉, 페이지가 로드 될 때마다 요청이 실행됩니다. 이것은 우리에게 큰 도움이 되지 않고 성능에 부정적인 영향을 미치게 됩니다.

다른 것을 시도해 봅시다. 유저가 버튼을 클릭 할 때 일부 텍스트를 콘솔에 기록하는 상호 작용을 추가합니다. 그러나 (`print.js`)를 로드하는 동안 처음 상호작용이 발생하기까지 기다려보겠습니다. 이를 위해 다시 돌아가서 _코드 스플리팅의_ [final _Dynamic Imports_ 예제를](/guides/code-splitting/#dynamic-imports) 다시 작업하고 메인 청크에 `lodash`를 남겨 둡니다.

**프로젝트**

```diff
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
|- /src
  |- index.js
+ |- print.js
|- /node_modules
```

**src/print.js**

```js
console.log(
  'The print.js module has loaded! See the network tab in dev tools...'
);

export default () => {
  console.log('Button Clicked: Here\'s "some text"!');
};
```

**src/index.js**

```diff
+ import _ from 'lodash';
+
- async function getComponent() {
+ function component() {
    const element = document.createElement('div');
-   const _ = await import(/* webpackChunkName: "lodash" */ 'lodash');
+   const button = document.createElement('button');
+   const br = document.createElement('br');

+   button.innerHTML = 'Click me and look at the console!';
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+   element.appendChild(br);
+   element.appendChild(button);
+
+   // Note that because a network request is involved, some indication
+   // of loading would need to be shown in a production-level site/app.
+   button.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
+     const print = module.default;
+
+     print();
+   });

    return element;
  }

- getComponent().then(component => {
-   document.body.appendChild(component);
- });
+ document.body.appendChild(component());
```

W> ES6 모듈에서 `import()` 를 사용할 때 promise가 해결 될 때 반환되는 실제 `module` 객체이므로 `.default` 속성을 참조해야 합니다.

이제 webpack을 실행하고 새로운 지연 로딩 기능을 확인해 보겠습니다.

```bash
...
          Asset       Size  Chunks                    Chunk Names
print.bundle.js  417 bytes       0  [emitted]         print
index.bundle.js     548 kB       1  [emitted]  [big]  index
     index.html  189 bytes          [emitted]
...
```

## Frameworks

많은 프레임워크와 라이브러리에는 방법론 안에서 구현하는 방법에 대한 자체 권고안이 있습니다. 다음은 몇 가지 예시입니다.

- React: [Code Splitting and Lazy Loading](https://reactjs.org/docs/code-splitting.html)
- Vue: [Dynamic Imports in Vue.js for better performance](https://vuedose.tips/tips/dynamic-imports-in-vue-js-for-better-performance/)
- Angular: [Lazy Loading route configuration](https://angular.io/guide/router#milestone-6-asynchronous-routing) 그리고 [AngularJS + webpack = lazyLoad](https://medium.com/@var_bin/angularjs-webpack-lazyload-bb7977f390dd)
