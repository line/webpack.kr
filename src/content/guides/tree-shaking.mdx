---
title: Tree Shaking
sort: 16
contributors:
  - simon04
  - zacanger
  - alexjoverm
  - avant1
  - MijaelWatts
  - dmitriid
  - probablyup
  - gish
  - lumo10
  - byzyk
  - pnevares
  - EugeneHlushko
  - AnayaDesign
  - torifat
  - rahul3v
translators:
  - limong
related:
  - title: Debugging Optimization Bailouts
    url: https://webpack.js.org/plugins/module-concatenation-plugin/#debugging-optimization-bailouts
  - title: Issue 6074 - Add support for more complex selectors for sideEffects
    url: https://github.com/webpack/webpack/issues/6074
---

_Tree shaking은_ 사용되지 않는 코드를 제거하기 위해 JavaScript 컨텍스트에서 일반적으로 사용되는 용어입니다. ES2015 모듈 구문은 [정적 구조](http://exploringjs.com/es6/ch_modules.html#static-module-structure)에 의존합니다. 예를 들면, [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)와 [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)가 있습니다. 이름과 개념은 ES2015 모듈 번들러의 [rollup](https://github.com/rollup/rollup)에 의해 대중화되었습니다.

webpack 2 릴리스에서는 ES2015 모듈(별칭 _harmony 모듈_)과 사용하지 않는 모듈의 export를 감지하는 기능을 제공합니다. 새로운 webpack 4의 릴리스는 `package.json`의 `"sideEffects"` 프로퍼티를 통해 컴파일러에 힌트를 제공하는 방식으로 기능을 확장합니다. 프로젝트의 어떤 파일이 "순수"한지 나타내며, 만약 사용하지 않는다면 제거해도 괜찮은지 표시합니다.

T> 이 가이드의 나머지 부분은 [Getting Started에서](/guides/getting-started) 시작합니다. 가이드를 아직 읽지 않았다면 지금 읽어보세요.

## Add a Utility

다음 두 함수를 내보내는 새 유틸리티 파일인 `src/math.js`를 프로젝트에 추가해 보겠습니다.

**project**

```diff
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
  |- bundle.js
  |- index.html
|- /src
  |- index.js
+ |- math.js
|- /node_modules
```

**src/math.js**

```javascript
export function square(x) {
  return x * x;
}

export function cube(x) {
  return x * x * x;
}
```

`mode` 옵션을 [development](/configuration/mode/#mode-development)로 설정하여 번들이 압축되지 않도록 합니다.

**webpack.config.js**

```diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
+ mode: 'development',
+ optimization: {
+   usedExports: true,
+ },
};
```

이를 통해 새로운 메소드 중 하나를 사용하도록 entry 스크립트를 업데이트하고, 스크립트를 간단하게 하기 위해 `lodash`를 삭제하겠습니다.

**src/index.js**

```diff
- import _ from 'lodash';
+ import { cube } from './math.js';

  function component() {
-   const element = document.createElement('div');
+   const element = document.createElement('pre');

-   // 이제 Lodash를 스크립트로 가져왔습니다.
-   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+   element.innerHTML = [
+     'Hello webpack!',
+     '5 cubed is equal to ' + cube(5)
+   ].join('\n\n');

    return element;
  }

  document.body.appendChild(component());
```

우리는 `src/math.js` 모듈에서 **`square` 메소드를 `가져오지` 않았습니다**. 이 함수는 "사용하지 않는 코드"로 알려져 있고, 사용하지 않아 삭제되어야 하는 `export`를 의미합니다. 이제 npm 스크립트인 `npm run build`를 실행하여 출력된 번들을 살펴보겠습니다.

**dist/bundle.js (around lines 90 - 100)**

```js
/* 1 */
/***/ (function (module, __webpack_exports__, __webpack_require__) {
  'use strict';
  /* unused harmony export square */
  /* harmony export (immutable) */ __webpack_exports__['a'] = cube;
  function square(x) {
    return x * x;
  }

  function cube(x) {
    return x * x * x;
  }
});
```

위의 `unused harmony export square` 주석을 참고하세요. 아래 코드를 보면 `square`를 가져오지 않지만, 여전히 번들에 포함되어 있습니다. 다음 섹션에서 수정해 보겠습니다.

## Mark the file as side-effect-free

100% ESM 모듈에서는 사이드 이펙트를 쉽게 식별할 수 있습니다. 그러나 우리는 아직 거기까지는 도달하지 않았으므로, 도달하기 까지는 코드의 "순수성"에 대한 힌트를 webpack 컴파일러에 제공해야 합니다.

이를 수행하는 방법은 package.json의 `"sideEffects"` 속성입니다.

```json
{
  "name": "your-project",
  "sideEffects": false
}
```

위에 언급한 코드는 사이드 이펙트를 포함하지 않으므로, 간단하게 `false`로 프로퍼티를 표시하여 사용하지 않는 export는 제거해도 괜찮다는 것을 webpack에 알릴 수 있습니다.

T> "사이드 이펙트"는 하나 이상의 export를 보여주는 것 이외에도 import할 때 특별한 동작을 수행하는 코드입니다. 예를 들면 폴리필이 있습니다. 폴리필은 전체 스코프에 영향을 미치며 일반적으로 export를 제공하지 않습니다.

코드에 사이드 이펙트가 있다면 대신 배열을 사용할 수 있습니다.

```json
{
  "name": "your-project",
  "sideEffects": ["./src/some-side-effectful-file.js"]
}
```

배열은 관련된 파일의 간단한 전역 패턴을 허용합니다. 내부적으로 [glob-to-regexp](https://github.com/fitzgen/glob-to-regexp)을 사용합니다 (사용 가능: `*`, `**`, `{a,b}`, `[a-z]`). `/`을 포함하지 않는 `*.css`와 같은 패턴은 `**/*.css`처럼 취급합니다.

T> 가져온 파일은 tree shaking의 대상이 됩니다. 즉, 프로젝트에서 CSS 파일을 가져오기 위해 `css-loader` 같은 것을 사용하는 경우 side effect 목록에 추가해야 프로덕션 모드에서 실수로 삭제되는 것을 방지할 수 있습니다.

```json
{
  "name": "your-project",
  "sideEffects": ["./src/some-side-effectful-file.js", "*.css"]
}
```

마지막으로 `"sideEffects"`는 [`module.rules` 옵션](https://webpack.js.org/configuration/module/#modulerules)으로도 설정할 수 있습니다.

## Clarifying tree shaking and `sideEffects`

[`sideEffects`](/configuration/optimization/#optimizationsideeffects)와 [`usedExports`](/configuration/optimization/#optimizationusedexports)(트리 쉐이킹으로 알려져 있음)의 최적화는 두 가지 다른 점이 있습니다.

**`sideEffects`는** 전체 모듈 및 파일, 전체 하위 트리를 건너뛸 수 있기 때문에 **훨씬 더 효율적입니다.**

`usedExports`는 [terser](https://github.com/terser-js/terser)를 사용하여 문장에서 사이드 이펙트를 감지합니다. 이것은 JavaScript에서 어려운 작업이며 간단한 `sideEffects` 플래그만큼 효과적이지 않습니다. 또한 사이드 이펙트를 확인해야 하는 명세가 있기 때문에 하위트리 및 의존성을 무시할 수 없습니다. export 기능은 잘 동작하지만, React의 Higher Order Components(HOC)는 이와 관련된 문제가 있습니다.

예를 들어보겠습니다.

```javascript
import { Button } from '@shopify/polaris';
```

미리 번들된 버전은 아래와 같습니다.

```javascript
import hoistStatics from 'hoist-non-react-statics';

function Button(_ref) {
  // ...
}

function merge() {
  var _final = {};

  for (
    var _len = arguments.length, objs = new Array(_len), _key = 0;
    _key < _len;
    _key++
  ) {
    objs[_key] = arguments[_key];
  }

  for (var _i = 0, _objs = objs; _i < _objs.length; _i++) {
    var obj = _objs[_i];
    mergeRecursively(_final, obj);
  }

  return _final;
}

function withAppProvider() {
  return function addProvider(WrappedComponent) {
    var WithProvider =
      /*#__PURE__*/
      (function (_React$Component) {
        // ...
        return WithProvider;
      })(Component);

    WithProvider.contextTypes = WrappedComponent.contextTypes
      ? merge(WrappedComponent.contextTypes, polarisAppProviderContextTypes)
      : polarisAppProviderContextTypes;
    var FinalComponent = hoistStatics(WithProvider, WrappedComponent);
    return FinalComponent;
  };
}

var Button$1 = withAppProvider()(Button);

export {
  // ...,
  Button$1,
};
```

`Button`이 사용되지 않으면 `export { Button$1 };`을 효과적으로 제거하고 나머지 코드를 모두 남길 수 있습니다. "이 코드가 사이드 이펙트가 없거나 안전하게 삭제할 수 있을까요?"라는 질문을 할 수 있습니다. `withAppProvider()(Button)` 라인 때문에 말하기 어렵습니다. `withAppProvider`가 호출되고 리턴 값도 호출됩니다. `merge` 또는 `hoistStatics`를 호출할 때 사이드 이펙트가 있나요? `WrappedComponent.contextTypes` (Getter?)를 읽거나 `WithProvider.contextTypes` (Setter?)를 할당할 때 사이드 이펙트가 있나요?

Terser는 알아내려고 노력하지만 여러 상황에서 장담할 수는 없습니다. 이것은 terser가 알아낼 수 없기 때문에, terser가 역할을 잘 수행하지 못한다는 것이 아닙니다. JavaScript 같은 동적 언어에서 확실하게 판단하는 것은 매우 어렵습니다.

그러나 `/*#__PURE__*/` 어노테이션을 이용하여 terser를 도와줄 수 있습니다. 그 구문은 사이드 이펙트가 없는 것으로 표시합니다. 그래서 간단한 변경만으로 코드를 tree-shake 할 수 있습니다.

```javascript
var Button$1 = /*#__PURE__*/ withAppProvider()(Button);
```

이렇게 하면 이 코드를 제거 할 수 있습니다. 그러나 포함되어야 하거나 평가가 필요한 import는 사이드 이펙트가 있을 수 있기 때문에 여전히 이에 대한 문제가 남아 있습니다.

이 문제를 해결하기 위해 `package.json`의 [`"sideEffects"`](/guides/tree-shaking/#mark-the-file-as-side-effect-free) 프로퍼티를 사용합니다.

이것은 `/*#__PURE__*/`와 비슷하지만, 구문 레벨이 아닌 모듈 레벨에서 사용합니다. `"sideEffects"` 프로퍼티에 대해 "sideEffect가 없다고 플래그된 모듈에서 직접적인 export가 없는 경우 번들러는 사이드 이펙트에 대한 평가를 건너 뛸 수 있다."라고 설명하고 있습니다.

Shopify's Polaris 예시에서 원래 모듈은 다음과 같습니다.

**index.js**

```javascript
import './configure';
export * from './types';
export * from './components';
```

**components/index.js**

```javascript
// ...
export { default as Breadcrumbs } from './Breadcrumbs';
export { default as Button, buttonFrom, buttonsFrom } from './Button';
export { default as ButtonGroup } from './ButtonGroup';
// ...
```

**package.json**

```json
// ...
"sideEffects": [
  "**/*.css",
  "**/*.scss",
  "./esnext/index.js",
  "./esnext/configure.js"
],
// ...
```

`import { Button } from "@shopify/polaris";`는 다음과 같이 동작합니다.

- 포함: 모듈을 포함하고 평가하며 계속 의존성을 분석합니다.
- 건너뛰기: 포함하지 않으며 평가하지 않으나 계속 의존성을 평가합니다.
- 제외: 포함하지 않으며 평가하지 않고 의존성도 분석하지 않습니다.

매칭되는 리소스별로 자세히 보겠습니다.

- `index.js`: 직접 export하여 사용하진 않지만 sideEffect의 플래그는 사용 -> 포함
- `configure.js`: export하여 사용되지 않지만 sideEffect의 플래그는 사용 -> 포함
- `types/index.js`: export하여 사용되지 않고 sideEffect로 플래그도 사용하지 않음 -> 제외
- `components/index.js`: 직접 export하여 사용하지 않고 sideEffect로 플래그도 사용하지 않음, 그러나 다시 export한 export는 사용됨 -> 건너 뜀
- `components/Breadcrumbs.js`: export하여 사용되지 않고 sideEffect로 플래그도 사용하지 않음 -> 제외 sideEffect 플래그가 있더라도 `components/Breadcrumbs.css`와 같은 모든 의존성은 제외됩니다.
- `components/Button.js`: 직접 export를 사용하고 sideEffect 플래그는 사용하지 않음 -> 포함
- `components/Button.css`: 직접 export를 사용하지 않지만 sideEffect 플래그는 사용함 ->포함

위의 경우에 4개 모듈만 번들에 포함됩니다.

- `index.js`: 거의 없음
- `configure.js`
- `components/Button.js`
- `components/Button.css`

이 최적화 후, 다른 최적화도 적용할 수 있습니다. 예를 들면, `buttonFrom`과 `Button.js`에서 export하는 `buttonsFrom`은 사용되지 않습니다. `usedExports` 최적화는 이를 알아채고 terser는 모듈에서 일부 명령문을 삭제할 수 있습니다.

모듈의 연결에도 적용됩니다. 따라서 이 4개의 모듈과 엔트리 모듈(그리고 아마도 좀 더 많은 의존성)을 연결할 수 있습니다. **결국 `index.js`에는 생성되는 코드가 없습니다.**

## Mark a function call as side-effect-free

`/*#__PURE__*/`어노테이션을 사용하여 해당 함수 호출이 사이드 이펙트가 없다(side-effect-free)(순수하다)는 것을 webpack에 알릴 수 있습니다. 함수 호출 앞에 추가하여 사이드 이펙트가 없는 것으로 표시할 수 있습니다. 함수에 전달된 인수는 어노테이션으로 표시되지 않고 개별적으로 표시해야 할 수 있습니다. 사용하지 않는 변수의 초기값이 사이드 이펙트가 없다(순수하다)면, 사용하지 않는 코드로 표시되고 실행되지 않으며 최소화할 때 삭제됩니다.
이런 동작은 [`optimization.innerGraph`](/configuration/optimization/#optimizationinnergraph)가 `true` 일 때 활성화됩니다.

**file.js**

```javascript
/*#__PURE__*/ double(55);
```

## Minify the Output

`import`와 `export` 구문을 통해 "사용하지 않는 코드"를 삭제했습니다. 하지만 번들에서도 삭제해야 합니다. 이렇게 하려면 `mode` 옵션을 [`production`](/configuration/mode/#mode-production)으로 설정해야 합니다.

**webpack.config.js**

```diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
- mode: 'development',
- optimization: {
-   usedExports: true,
- }
+ mode: 'production',
};
```

T> `--optimize-minimize` 플래그를 사용하여 `TerserPlugin`도 활성화 할 수 있습니다.

즉, 다른 `npm run build`를 실행하고 변경된 사항이 있는지 볼 수 있습니다.

`dist/bundle.js`에서 다른 점을 찾았나요? 정확하게 전체 번들이 최소화되고 난독화 되었지만, 자세히 보면 포함되어 있던 `square` 함수가 없으며 난독화 된 `cube` 함수 (`function r(e){return e*e*e}n.a=r`)를 볼 수 있습니다. 최소화와 tree shaking으로 번들은 이제 몇 바이트 더 작아졌습니다! 위의 임의로 만든 예제에서는 큰 변화를 느끼지 못하겠지만 tree shaking은 복잡한 의존성 트리가 있는 커다란 애플리케이션에서 작업할 때 번들의 크기를 많이 줄일 수 있습니다.

T> [`ModuleConcatenationPlugin`](/plugins/module-concatenation-plugin/)은 tree shaking이 동작하기 위해 필요합니다. `mode: 'production'`에 의해 추가됩니다. 만약 사용하지 않는다면, [`ModuleConcatenationPlugin`](/plugins/module-concatenation-plugin/)을 수동으로 추가해야 합니다.

## Conclusion

그래서 _tree shaking의_ 이점을 살리기 위하여

- ES2015 모듈 구문을 사용해야 하는 것을 배웠습니다. (예: `import`와 `export`)
- 컴파일러가 ES2015 모듈 구문을 CommonJS 모듈로 변환하지 않도록 해야 합니다. (이것은 인기 있는 Babel preset @babel/preset-env의 기본 동작입니다. 자세한 내용은 [documentation](https://babeljs.io/docs/en/babel-preset-env#modules)를 참고하세요.)
- `package.json` 파일에 `"sideEffects"` 속성을 추가하세요.
- 최소화와 tree shaking을 포함한 [다양한 최적화를](/configuration/mode/#usage) 사용하려면 [`production`](/configuration/mode/#mode-production) `mode` 설정 옵션을 사용하세요.

애플리케이션을 나무와 같이 생각할 수 있습니다. 실제로 사용되는 소스 코드와 라이브러리는 나무의 살아있는 잎과 같은 녹색을 나타냅니다. 사용하지 않는 코드는 가을에 바싹 마른 나무의 죽은 잎사귀처럼 갈색입니다. 낙엽을 없애기 위해서 나무를 흔들어서 낙엽을 떨어 뜨려야 합니다.

산출물에 대한 최적화에 더 관심이 있다면 [production](/guides/production)을 빌드하기 위한 상세 가이드로 이동하세요.
