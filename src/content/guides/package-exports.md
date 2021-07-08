---
title: Package exports
sort: 25
contributors:
  - sokra
translators:
  - keipark
related:
  - title: Package entry points in Node.js
    url: https://nodejs.org/api/packages.html#packages_package_entry_points
---

`import "package"` 또는 `import "package/sub/path"`와 같이 모듈을 요청할 때,
패키지의 `package.json` 내 `exports` 필드에 어떤 모듈을 사용할지 선언할 수 있습니다.
이를 통해 `main` 필드 응답을 반환하는 기본 구현을 대체합니다.
`index.js` 파일은 `"package"`를, 파일 시스템 조회는 `"package/sub/path"`를 대체합니다.

`exports` 필드가 명시되면 이러한 모듈 요청만 사용 가능합니다.
그 외 다른 요청은 ModuleNotFound 오류가 발생합니다.

## General syntax

일반적으로 `exports` 필드는 객체를 가지며
객체의 각각의 프로퍼티에는 모듈 요청의 하위 경로가 명시되어 있어야 합니다.
위의 예시에서는 다음 프로퍼티를 사용할 수 있습니다.
`import "package"`에는 `"."`을, `import "package/sub/path"`에는 `"./sub/path"`를 사용할 수 있습니다.
`/`로 끝나는 프로퍼티는 요청에 이 접두사를 포함하여 이전 파일 시스템 조회 알고리즘으로 전달합니다.
`*`로 끝나는 프로퍼티의 경우 `*`는 어떤 값이든 가질 수 있으며, 프로퍼티 값의 모든 `*`는 가져온 값으로 대체됩니다.

예제:

```json
{
  "exports": {
    ".": "./main.js",
    "./sub/path": "./secondary.js",
    "./prefix/": "./directory/",
    "./prefix/deep/": "./other-directory/",
    "./other-prefix/*": "./yet-another/*/*.js"
  }
}
```

| 모듈 요청                           | 결과                                             |
| ----------------------------------- | ------------------------------------------------ |
| `package`                           | `.../package/main.js`                            |
| `package/sub/path`                  | `.../package/secondary.js`                       |
| `package/prefix/some/file.js`       | `.../package/directory/some/file.js`             |
| `package/prefix/deep/file.js`       | `.../package/other-directory/file.js`            |
| `package/other-prefix/deep/file.js` | `.../package/yet-another/deep/file/deep/file.js` |
| `package/main.js`                   | Error                                            |

## Alternatives

패키지 작성자는 하나의 결과 대신 여러 개의 결과를 제공할 수 있습니다.
이 경우 결과 목록을 순서대로 시도하고 첫 번째 유효한 결과를 사용합니다.

노트: 모든 유효한 결과가 아니라 첫 번째 유효한 결과만 사용합니다.

예제:

```json
{
  "exports": {
    "./things/": ["./good-things/", "./bad-things/"]
  }
}
```

여기서 `package/things/apple`은 `.../package/good-things/apple` 또는 `.../package/bad-things/apple`에서 찾을 수 있습니다.

## Conditional syntax

`exports` 필드에 직접 결과를 제공하는 대신
패키지 작성자는 모듈 시스템이 환경 조건에 따라 결과를 선택하도록 할 수 있습니다.

이 경우 결과에 대한 객체 매핑 조건을 사용해야 합니다.
조건은 객체 순서대로 시도됩니다.
유효하지 않은 결과가 포함된 조건은 건너뜁니다.
논리적 AND를 만들기 위해 조건이 중첩될 수 있습니다.
객체의 마지막 조건은 특별한 `"default"` 조건일 수 있습니다.
이 조건은 항상 매치됩니다.

예제:

```json
{
  "exports": {
    ".": {
      "red": "./stop.js",
      "yellow": "./stop.js",
      "green": {
        "free": "./drive.js",
        "default": "./wait.js"
      },
      "default": "./drive-carefully.js"
    }
  }
}
```

위 조건은 다음과 같이 번역됩니다.

```js
if (red && valid('./stop.js')) return './stop.js';
if (yellow && valid('./stop.js')) return './stop.js';
if (green) {
  if (free && valid('./drive.js')) return './drive.js';
  if (valid('./wait.js')) return './wait.js';
}
if (valid('./drive-carefully.js')) return './drive-carefully.js';
throw new ModuleNotFoundError();
```

사용 가능한 조건은 모듈 시스템 및 도구에 따라 다릅니다.

## Abbreviation

패키지에 대한 단일 엔트리 (`"."`)만 지원하는 경우 `{ ".": ...}` 객체 중첩을 생략할 수 있습니다.

```json
{
  "exports": "./index.mjs"
}
```

```json
{
  "exports": {
    "red": "./stop.js",
    "green": "./drive.js"
  }
}
```

## Notes about ordering

각 키가 조건인 객체일 경우 프로퍼티 순서가 매우 중요합니다. 조건은 명시된 순서대로 처리됩니다.

예: `{ "red": "./stop.js", "green": "./drive.js"}` != `{"green": "./drive.js", "red": "./stop.js"}`(`red` 및 `green` 조건이 모두 설정된 경우 첫 번째 프로퍼티가 사용됩니다)

각 키가 하위 경로인 객체에서는 프로퍼티(하위 경로) 순서가 크게 중요하지 않습니다. 덜 구체적인 경로보다 더 구체적인 경로가 우선됩니다.

예: `{ "./a/": "./x/", "./a/b/": "./y/", "./a/b/c": "./z" }` == `{ "./a/b/c": "./z", "./a/b/": "./y/", "./a/": "./x/" }` (순서는 항상 `./a/b/c` > `./a/b/` > `./a/` 입니다)

`main`, `module`, `browser` 또는 커스텀 필드와 같은 다른 패키지 엔트리 필드보다 `exports` 필드가 우선됩니다.

## Support

| 기능                                  | 지원                                                                               |
| ------------------------------------- | ---------------------------------------------------------------------------------- |
| `"."` 속성                            | Node.js, webpack, rollup, esinstall, wmr                                           |
| 일반 속성                             | Node.js, webpack, rollup, esinstall, wmr                                           |
| `/`로 끝나는 속성                     | Node.js<sup>(1)</sup>, webpack, rollup, esinstall<sup>(2)</sup>, wmr<sup>(3)</sup> |
| `*`로 끝나는 속성                     | Node.js, webpack, rollup, esinstall                                                |
| alternatives                          | Node.js, webpack, rollup, <strike>esinstall</strike><sup>(4)</sup>                 |
| path에만 축약형 사용                  | Node.js, webpack, rollup, esinstall, wmr                                           |
| 조건에만 축약형 사용                  | Node.js, webpack, rollup, esinstall, wmr                                           |
| 조건 구문                             | Node.js, webpack, rollup, esinstall, wmr                                           |
| 중첩된 조건 구문                      | Node.js, webpack, rollup, wmr<sup>(5)</sup>                                        |
| 조건 순서                             | Node.js, webpack, rollup, wmr<sup>(6)</sup>                                        |
| `"default"` 조건                      | Node.js, webpack, rollup, esinstall, wmr                                           |
| 경로 순서                             | Node.js, webpack, rollup                                                           |
| 매핑되지 않았을 때 오류               | Node.js, webpack, rollup, esinstall, wmr<sup>(7)</sup>                             |
| 조건과 경로를 혼합해서 사용할 때 오류 | Node.js, webpack, rollup                                                           |

(1) Node.js 에서 더 이상 사용되지 않으며 `*`를 사용해야 합니다.

(2) `"./"` 키는 의도적으로 무시됩니다.

(3) 프로퍼티 값은 무시되고 프로퍼티 키가 대상으로 사용됩니다. 키와 값이 동일한 경우에만 효과적으로 매핑을 허용합니다.

(4) 구문을 지원하지만, 항상 첫 번째 엔트리가 사용되므로 실제로는 사용할 수 없습니다.

(5) 다른 형제 부모 조건으로 폴백시 올바르지 않게 처리됩니다.

(6) `require` 조건의 경우 객체 순서가 올바르지 않게 처리됩니다. 이것은 의도적으로, wmr이 참조하는 구문과 다르지 않기 때문입니다.

(7) `"exports": "./file.js"` 축약형을 사용하는 경우 `package/not-existing`과 같은 모든 요청은 이에 맞게 해석됩니다. 축약형을 사용하지 않는 경우 `package/file.js`와 같이 직접 파일에 접근해도 오류로 이어지지 않습니다.

## Conditions

### Reference syntax

모듈을 참조하는 데 사용되는 구문에 따라 다음 조건 중 하나가 설정됩니다.

| 조건      | 설명                                                         | 지원                                                                 |
| --------- | ------------------------------------------------------------ | -------------------------------------------------------------------- |
| `import`  | ESM 또는 유사한 구문에서 요청이 발생합니다.                  | Node.js, webpack, rollup, esinstall<sup>(1)</sup>, wmr<sup>(1)</sup> |
| `require` | CommonJs/AMD 또는 유사한 구문에서 요청이 발생합니다.         | Node.js, webpack, rollup, esinstall<sup>(1)</sup>, wmr<sup>(1)</sup> |
| `style`   | 스타일시트 참조에서 요청이 발생합니다.                       |
| `sass`    | sass 스타일시트 참조에서 요청이 발생합니다.                  |
| `asset`   | 애셋 참조에서 요청이 발생합니다.                             |
| `script`  | 모듈 시스템 없이 스크립트 태그를 사용할때 요청이 발생합니다. |

부가적으로 아래의 조건도 설정할 수 있습니다.

| 조건        | 설명                                                                                                        | 지원                 |
| ----------- | ----------------------------------------------------------------------------------------------------------- | -------------------- |
| `module`    | javascript를 참조 가능한 모든 모듈 구문은 ESM을 지원합니다.<br>(`import` 또는 `require`와 함께 사용했을 때) | webpack, rollup, wmr |
| `esmodules` | 지원하는 도구에서 항상 설정합니다.                                                                          | wmr                  |
| `types`     | type 선언과 관련 있는 typescript로부터 요청이 발생합니다.                                                   |

(1) 참조 구문에서 `import`와 `require`는 모두 독립적으로 설정됩니다. `require`는 항상 더 낮은 우선순위를 갖습니다.

#### `import`

다음 구문은 `import` 조건을 설정합니다.

- ESM의 ESM `import` 선언
- JS `import()` 표현식
- HTML의 HTML `<script type="module">`
- HTML의 HTML `<link rel="preload/prefetch">`
- JS `new Worker(..., { type: "module" })`
- WASM `import`섹션
- ESM HMR(webpack) `import.hot.accept/decline([...])`
- JS `Worklet.addModule`
- 자바스크립트를 엔트리 포인트로 사용

#### `require`

다음 구문은 `require` 조건을 설정합니다.

- CommonJs `require(...)`
- AMD `define()`
- AMD `require([...])`
- CommonJs `require.resolve()`
- CommonJs (webpack) `require.ensure([...])`
- CommonJs (webpack) `require.context`
- CommonJs HMR (webpack) `module.hot.accept/decline([...])`
- HTML `<script src="...">`

#### `style`

다음 구문은 `style` 조건을 설정합니다.

- CSS `@import`
- HTML `<link rel="stylesheet">`

#### `asset`

다음 구문은 `asset` 조건을 설정합니다.

- CSS `url()`
- ESM `new URL(..., import.meta.url)`
- HTML `<img src="...">`

#### `script`

다음 구문은 `script` 조건을 설정합니다.

- HTML `<script src="...">`

`script`는 모듈 시스템을 지원하지 않는 경우에만 설정해야 합니다.
CommonJs를 지원하는 시스템에서 스크립트를 전처리하는 경우,
`require`로 설정해야 합니다.

이 조건은 HTML 페이지에서 스트립트 태그로 삽입할 수 있고
추가 전처리가 없는 자바스크립트 파일을 찾을 때 사용해야 합니다.

### Optimizations

다양한 최적화를 위해 다음 조건이 설정됩니다.

| 조건          | 설명                                                  | 지원    |
| ------------- | ----------------------------------------------------- | ------- |
| `production`  | 프로덕션 환경.<br>개발 도구를 포함하지 않아야 합니다. | webpack |
| `development` | 개발 환경.<br>개발 도구를 포함해야 합니다.            | webpack |

노트: `production`과 `development`는 모두가 사용하는 것이 아닙니다. 이 중 아무것도 설정되지 않은 경우는 가정하지 않아야 합니다.

### Target environment

대상 환경에 따라 다음 조건이 설정됩니다.

| 조건           | 설명                                          | 지원                                |
| -------------- | --------------------------------------------- | ----------------------------------- |
| `browser`      | Code will run in a browser.                   | webpack, esinstall, wmr             |
| `electron`     | Code will run in electron.<sup>(1)</sup>      | webpack                             |
| `worker`       | Code will run in a (Web)Worker.<sup>(1)</sup> | webpack                             |
| `worklet`      | Code will run in a Worklet.<sup>(1)</sup>     |                                     |
| `node`         | Code will run in Node.js.                     | Node.js, webpack, wmr<sup>(2)</sup> |
| `deno`         | Code will run in Deno.                        |                                     |
| `react-native` | Code will run in react-native.                |                                     |

(1) `electron`, `worker` 및 `worklet`은 컨텍스트에 따라 `node` 또는 `browser`와 결합합니다.

(2) 브라우저 대상 환경에 대해 설정됩니다.

각 환경에는 여러 버전이 있으므로 다음 가이드라인이 적용됩니다.

- `node`: 호환성은 `engines` 필드를 참고하세요.
- `browser`: 패키지를 배포하는 시점의 현재 Spec 및 4단계 제안과 호환됩니다. 폴리필과 트랜스파일은 소비하는 쪽에서 처리되어야 합니다.
  - 폴리필이나 트랜스파일이 불가능한 기능은 사용이 제한되므로 주의하여 사용해야 합니다.
- `deno`: TBD
- `react-native`: TBD

### Conditions: Preprocessor and runtimes

소스 코드를 전처리하는 도구에 따라 다음 조건이 설정됩니다.

| 조건      | 설명                       | 지원    |
| --------- | -------------------------- | ------- |
| `webpack` | webpack을 통해 처리됩니다. | webpack |

아쉽지만 Node.js 런타임에 대한 `node-js` 조건이 없습니다.
이것은 Node.js에 대한 예외 처리를 단순화합니다.

### Conditions: Custom

다음 도구는 커스텀 조건을 지원합니다.

| 도구      | 지원   | 노트                                                               |
| --------- | ------ | ------------------------------------------------------------------ |
| Node.js   | 지원   | `--conditions` CLI 인자를 사용.                                    |
| webpack   | 지원   | `resolve.conditionNames` 설정 옵션을 사용.                         |
| rollup    | 지원   | `@rollup/plugin-node-resolve` 에서 `exportConditions` 옵션을 사용. |
| esinstall | 미지원 |
| wmr       | 미지원 |

커스텀 조건에는 다음 네이밍 스키마를 권장합니다.

`<company-name>:<condition-name>`

예: `example-corp:beta`, `google:internal`, `

## Common patterns

패키지의 모든 패턴은 단일 `"."` 엔트리로 해석되지만, 각 엔트리의 패턴을 반복하여 복수의 엔트리로 확장할 수도 있습니다.

이 패턴은 엄격한 규칙이 아닌 가이드로 사용해야 합니다.
개별 패키지에 맞게 조정할 수 있습니다.

이러한 패턴은 다음과 같은 목표와 가정을 기반으로 합니다.

- 패키지가 운영되지 않는다.
  - 어떤 시점에서 패키지가 더 이상 운영되지 않는다고 가정합니다. 하지만 패키지는 계속 사용됩니다.
  - `exports`는 향후 알려지지 않은 케이스에 대한 폴백으로 작성되어야 합니다. 이를 위해 `default` 조건을 사용할 수 있습니다.
  - 미래는 알 수 없기 때문에 브라우저와 유사한 환경, ESM과 유사한 모듈 시스템이라고 가정합니다.
- 모든 도구가 모든 조건을 지원하지 않는다.
  - 이러한 케이스를 처리하려면 폴백을 사용해야 합니다.
  - 일반적으로 다음과 같은 폴백이 합리적으로 보입니다.
    - ESM > CommonJs
    - Production > Development
    - 브라우저 > node.js

패키지의 의도에 따라 다른 방법이 알맞을 수 있으며 패턴은 이를 따라야 합니다. 예를 들면, 커맨드라인 도구의 경우 브라우저와 같은 미래 환경에 대한 폴백은 별로 의미가 없으며, 이 경우에는 node.js와 같은 환경 및 폴백을 대신 사용해야 합니다.

사용 케이스가 복잡할 경우 조건을 중첩하여 여러 패턴을 결합해야 합니다.

### Target environment independent packages

이 패턴은 환경별 API를 사용하지 않는 패키지에 적합합니다.

#### Providing only an ESM version

```json
{
  "type": "module",
  "exports": "./index.js"
}
```

노트: ESM만 제공하면 node.js에 대한 제한이 따릅니다.
이러한 패키지는 Node.js >= 14 에서 `import`를 사용할 때만 동작합니다.
`require()`으로는 동작하지 않습니다.

#### Providing CommonJs and ESM version (stateless)

```json
{
  "type": "module",
  "exports": {
    "node": {
      "module": "./index.js",
      "require": "./index.cjs"
    },
    "default": "./index.js"
  }
}
```

대부분의 도구는 ESM 버전을 받습니다.
하지만 Node.js는 예외입니다.
`require()`를 사용할 때 CommonJs 버전을 얻습니다.
`require()` 및 `import`를 참조할 때 패키지의 두 인스턴스로 이어지지만, 패키지에 state가 없기 때문에 문제 되지 않습니다.

`require()` ESM을 지원하는 도구로 노드 대상 코드를 전처리할 때 `module` 조건은 최적화를 위해 사용됩니다. (예: Node.js 용 번들러)
이러한 도구의 경우 예외를 건너뜁니다.
기술적으로 선택 사항이지만 그렇지 않으면 번들러에는 패키지 소스 코드가 두 번 포함됩니다.

JSON 파일에서 패키지 state를 분리할 수 있는 경우 stateless 패턴을 사용할 수도 있습니다.
JSON은 다른 모듈 시스템 그래프에 영향 없이 CommonJs 및 ESM에서 사용할 수 있습니다.

여기서 stateless는 클래스 인스턴스가 `instanceof`로 테스트 되지 않음을 의미합니다. 이중 모듈 인스턴스화로 인해 두 개의 다른 클래스가 있을 수 있기 때문입니다.

#### Providing CommonJs and ESM version (stateful)

```json
{
  "type": "module",
  "exports": {
    "node": {
      "module": "./index.js",
      "import": "./wrapper.js",
      "require": "./index.cjs"
    },
    "default": "./index.js"
  }
}
```

```js
// wrapper.js
import cjs from './index.cjs';

export const A = cjs.A;
export const B = cjs.B;
```

stateful 패키지에서는 패키지가 두 번 인스턴스화되지 않도록 해야합니다.

대부분의 도구에서 문제가 되지 않지만 Node.js는 여기서도 예외입니다.
Node.js는 항상 CommonJs 버전을 사용하고 ESM 래퍼를 사용하여 ESM에 명명된 export를 노출합니다.

다시 `module` 조건을 최적화를 위해 사용합니다.

#### Providing only a CommonJs version

```json
{
  "type": "commonjs",
  "exports": "./index.js"
}
```

`"type": "commonjs"`를 제공하면 CommonJs 파일을 정적으로 감지할 수 있습니다.

#### Providing a bundled script version for direct browser consumption

```json
{
  "type": "module",
  "exports": {
    "script": "./dist-bundle.js",
    "default": "./index.js"
  }
}
```

`dist-bundle.js`에 `"type": "module"` 및 `.js`를 사용하더라도 이 파일은 ESM 형식이 아닙니다.
스크립트 태그로 직접 사용 할 수 있도록 전역을 사용해야 합니다.

### Providing devtools or production optimizations

이러한 패턴은 패키지에 개발용과 프로덕션용 두 가지 버전이 있을 때 의미가 있습니다.
예를 들면 개발 버전에는 더 나은 오류 메시지 또는 부가적인 경고를 위한 추가 코드가 포함될 수 있습니다.

#### Without Node.js runtime detection

```json
{
  "type": "module",
  "exports": {
    "development": "./index-with-devtools.js",
    "default": "./index-optimized.js"
  }
}
```

`development` 조건을 지원하면 개발을 위해 향상된 버전을 사용합니다.
프로덕션 버전 또는 모드를 알 수 없는 경우에는 최적화된 버전을 사용합니다.

#### With Node.js runtime detection

```json
{
  "type": "module",
  "exports": {
    "development": "./index-with-devtools.js",
    "production": "./index-optimized.js",
    "node": "./wrapper-process-env.cjs",
    "default": "./index-optimized.js"
  }
}
```

```js
// wrapper-process-env.cjs
if (process.env.NODE_ENV !== 'development') {
  module.exports = require('./index-optimized.cjs');
} else {
  module.exports = require('./index-with-devtools.cjs');
}
```

프로덕션/개발 모드를 감지할 때 `production` 또는 `development` 조건을 통한 정적 감지를 선호합니다.

Node.js는 런타임에 `process.env.NODE_ENV`를 통해 프로덕션/개발 모드를 감지할 수 있으므로 Node.js에서 이를 폴백으로 사용합니다. 동기화 조건부 import ESM은 불가능하며 패키지를 두 번 로드하지 않아야 하므로 CommonJs로 런타임을 감지해야 합니다.

모드를 감지할 수 없는 경우 프로덕션 버전으로 대체합니다.

### Providing different versions depending on target environment

패키지가 향후 환경을 지원할 수 있도록 폴백 환경을 선택해야 합니다.
일반적으로 브라우저와 같은 환경을 가정해야 합니다.

#### Providing Node.js, WebWorker and browser versions

```json
{
  "type": "module",
  "exports": {
    "node": "./index-node.js",
    "worker": "./index-worker.js",
    "default": "./index.js"
  }
}
```

#### Providing Node.js, browser and electron versions

```json
{
  "type": "module",
  "exports": {
    "electron": {
      "node": "./index-electron-node.js",
      "default": "./index-electron.js"
    },
    "node": "./index-node.js",
    "default": "./index.js"
  }
}
```

### Combining patterns

#### Example 1

아래 예제는 `process.env`에 대한 런타임 감지와 프로덕션 및 개발을 위해 최적화를 제공하는 패키지입니다. CommonJs 및 ESM 버전도 제공합니다.

```json
{
  "type": "module",
  "exports": {
    "node": {
      "development": {
        "module": "./index-with-devtools.js",
        "import": "./wrapper-with-devtools.js",
        "require": "./index-with-devtools.cjs"
      },
      "production": {
        "module": "./index-optimized.js",
        "import": "./wrapper-optimized.js",
        "require": "./index-optimized.cjs"
      },
      "default": "./wrapper-process-env.cjs"
    },
    "development": "./index-with-devtools.js",
    "production": "./index-optimized.js",
    "default": "./index-optimized.js"
  }
}
```

#### Example 2

이 예제는 Node.js, 브라우저 및 electron을 지원합니다. `process.env`에 대한 런타임 감지와 프로덕션 및 개발을 위한 최적화를 제공하며 CommonJs 및 ESM 버전도 제공합니다.

```json
{
  "type": "module",
  "exports": {
    "electron": {
      "node": {
        "development": {
          "module": "./index-electron-node-with-devtools.js",
          "import": "./wrapper-electron-node-with-devtools.js",
          "require": "./index-electron-node-with-devtools.cjs"
        },
        "production": {
          "module": "./index-electron-node-optimized.js",
          "import": "./wrapper-electron-node-optimized.js",
          "require": "./index-electron-node-optimized.cjs"
        },
        "default": "./wrapper-electron-node-process-env.cjs"
      },
      "development": "./index-electron-with-devtools.js",
      "production": "./index-electron-optimized.js",
      "default": "./index-electron-optimized.js"
    },
    "node": {
      "development": {
        "module": "./index-node-with-devtools.js",
        "import": "./wrapper-node-with-devtools.js",
        "require": "./index-node-with-devtools.cjs"
      },
      "production": {
        "module": "./index-node-optimized.js",
        "import": "./wrapper-node-optimized.js",
        "require": "./index-node-optimized.cjs"
      },
      "default": "./wrapper-node-process-env.cjs"
    },
    "development": "./index-with-devtools.js",
    "production": "./index-optimized.js",
    "default": "./index-optimized.js"
  }
}
```

맞습니다. 복잡해 보이죠. `node`에만 CommonJs 버전이 필요하고 `process.env`를 사용하여 프로덕션/개발 모드를 감지 할 수 있다고 가정하여 복잡성을 줄였습니다.

## Guidelines

- `default` export를 피하십시오. 툴링 마다 다르게 처리됩니다. 명명된 export만 사용하세요.
- 다른 조건에 대해 다른 API 또는 의미를 부여하지 않아야 합니다.
- 소스 코드를 ESM으로 작성하고 babel, typescript 또는 유사한 도구를 통해 CJS로 트랜스파일하세요.
- package.json에서 `.cjs` 또는 `type: "commonjs"`를 사용하여 소스 코드를 CommonJs로 명확하게 표시하세요. CommonJs 또는 ESM을 사용하는 경우 도구가 이를 정적으로 감지 할 수 있습니다. 이는 ESM만 지원하고 CommonJs는 지원하지 않는 도구의 경우 중요합니다.
- 패키지에서 사용하는 ESM은 다음 유형의 요청을 지원합니다.
  - package.json이 있는 다른 패키지를 가리키는 모듈 요청을 지원합니다.
  - 패키지 내의 다른 파일을 가리키는 상대적 요청을 지원합니다.
    - 패키지 외부의 파일을 가리켜서는 안 됩니다.
  - `data:` URL 요청을 지원합니다.
  - 기타 절대적 요청 또는 서버와 관련된 요청은 기본적으로 지원되지 않지만, 일부 도구 또는 환경에서는 지원할 수 있습니다.
