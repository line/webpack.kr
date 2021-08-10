---
title: Concepts
sort: -1
contributors:
  - TheLarkInn
  - jhnns
  - grgur
  - johnstew
  - jimrfenner
  - TheDutchCoder
  - adambraimbridge
  - EugeneHlushko
  - jeremenichelli
  - arjunsajeev
  - byzyk
  - yairhaimo
  - farskid
  - LukeMwila
  - Jalitha
  - muhmushtaha
  - chenxsan
translators:
  - YukJiSoo
---

**webpack은** 모던 JavaScript 애플리케이션을 위한 _정적 모듈 번들러_ 입니다. webpack이 애플리케이션을 처리할 때, 내부적으로는 프로젝트에 필요한 모든 모듈을 매핑하고 하나 이상의 _번들을_ 생성하는 [디펜던시 그래프](/concepts/dependency-graph/)를 만듭니다.

T> [여기에서](/concepts/modules) JavaScript 모듈 및 webpack 모듈에 대해 자세히 확인할 수 있습니다.

webpack 버전 4.0.0 이후로는 프로젝트를 번들링하기 위한 **설정 파일을 필요로 하지 않습니다.** 하지만 사용자 요구에 따라 기대 이상으로 유연하게 [설정이 가능](/configuration) 합니다.

다음의 **핵심 개념만** 이해하면 시작할 수 있습니다.

- [Entry(엔트리)](#entry)
- [Output(출력)](#output)
- [Loaders(로더)](#loaders)
- [Plugins(플러그인)](#plugins)
- [Mode(모드)](#mode)
- [Browser Compatibility(브라우저 호환성)](#browser-compatibility)

이 문서에는 위 개념의 대략적인 개요를 제공하고, 개념별로 최적화된 사용 사례를 확인할 수 있는 링크를 제공하기 위한 목적으로 작성되었습니다.

모듈 번들러의 개념과 내부에서 동작하는 방식을 더 잘 이해하려면 다음 자료를 참고하세요.

- [수동으로 애플리케이션을 번들링하기](https://www.youtube.com/watch?v=UNMkLHzofQI)
- [간단한 모듈 번들러 라이브 코딩](https://www.youtube.com/watch?v=Gc9-7PBqOC8)
- [간단한 모듈 번들러에 대한 자세한 설명](https://github.com/ronami/minipack)

## Entry

**엔트리 포인트는** webpack이 내부의 [디펜던시 그래프](/concepts/dependency-graph/) 를 생성하기 위해 사용해야 하는 모듈입니다. webpack은 엔트리 포인트가 (직간접적으로) 의존하는 다른 모듈과 라이브러리를 찾아냅니다.

기본값은 `./src/index.js`이지만, [webpack 설정에서 `entry` 속성](/configuration/entry-context/#entry)을 설정하여 다른 (또는 여러 엔트리 포인트)를 지정할 수 있습니다. 예를 들어보겠습니다.

**webpack.config.js**

```js
module.exports = {
  entry: './path/to/my/entry/file.js',
};
```

T> [엔트리 포인트](/concepts/entry-points)에서 자세히 알아보세요.

## Output

**output** 속성은 생성된 _번들을_ 내보낼 위치와 이 파일의 이름을 지정하는 방법을 webpack에 알려주는 역할을 합니다. 기본 출력 파일의 경우에는 `./dist/main.js`로 , 생성된 기타 파일의 경우에는 `./dist` 폴더로 설정됩니다.

다음과 같이 설정에서 `output` 필드를 지정할 수 있습니다.

**webpack.config.js**

```javascript
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js',
  },
};
```

위의 예제에서, `output.filename`과 `output.path` 속성을 사용하여 webpack에 번들의 이름과 내보낼 위치를 알려주었습니다. 상단에서 가져오는 path 모듈이 무엇인지 궁금할 수 있는데, 이것은 파일 경로를 지정하기 위해 사용되는 core Node.js 모듈입니다.

T> `output` 속성에는 [설정 가능한 더 많은 기능](/configuration/output)이 있습니다. 그 밖의 개념에 대해 더 배우고 싶다면, [출력](/concepts/output) 을 읽어보세요.

## Loaders

webpack은 기본적으로 JavaScript와 JSON 파일만 이해합니다. **로더를** 사용하면 webpack이 다른 유형의 파일을 처리하거나, 그들을 유효한 [모듈](/concepts/modules)로 변환 하여 애플리케이션에서 사용하거나 디펜던시 그래프에 추가합니다.

W> 모든 유형의 모듈(예: `.css`)을 `import` 하는 기능은 webpack의 고유한 기능이며 다른 번들러나 태스크 러너에서 지원하지 않을 수 있습니다. 개발자들에게 더욱 정확한 디펜던시 그래프를 생성하는 데 도움을 주기 때문에 이러한 언어의 확장이 필요하다고 생각합니다.

상위 수준에서 **로더는** webpack 설정에 두 가지 속성을 가집니다.

1. 변환이 필요한 파일(들)을 식별하는 `test` 속성
2. 변환을 수행하는데 사용되는 로더를 가리키는 `use` 속성

**webpack.config.js**

```javascript
const path = require('path');

module.exports = {
  output: {
    filename: 'my-first-webpack.bundle.js',
  },
  module: {
    rules: [{ test: /\.txt$/, use: 'raw-loader' }],
  },
};
```

위 설정에서는 `test`와 `use`라는 두 가지 필수 속성을 가진 하나의 모듈을 위해 `rules` 속성을 정의했습니다. 이는 webpack의 컴파일러에 다음과 같이 말합니다.

> "이봐 webpack 컴파일러, `require ()`/`import` 문 내에서 '.txt' 파일로 확인되는 경로를 발견하면 번들에 추가하기 전에 `raw-loader`를 **사용하여** 변환해."

W> webpack 설정에서 규칙을 정의할 때 `rules`가 아닌 `module.rules` 아래에 정의한다는 것을 기억하세요. 당신의 편의를 위해 webpack은 잘못 정의한 경우에 경고를 합니다.

W> 정규식을 사용하여 파일을 매칭할 때 따옴표를 사용하지 않도록 주의하세요. 즉, `/\.txt$/`는 `'/\.txt$/'` 또는 `"/\.txt$/"`와 같지 않습니다. 전자는 webpack에 .txt로 끝나는 모든 파일과 일치하도록 지시하고 후자는 webpack에 절대 경로 '.txt'를 가진 단일 파일과 일치하도록 지시합니다. 이는 당신의 의도한 것이 아닐 가능성이 높습니다.

더 상세한 사용자 지정 설정에 대해서는 [로더](/concepts/loaders)에서 확인하실 수 있습니다.

## Plugins

로더는 특정 유형의 모듈을 변환하는 데 사용되지만, 플러그인을 활용하여 번들을 최적화하거나, 애셋을 관리하고, 또 환경 변수 주입등과 같은 광범위한 작업을 수행 할 수 있습니다.

T> [플러그인 인터페이스](/api/plugins)를 사용하여 webpack의 기능을 확장하는 방법을 확인해보세요.

플러그인을 사용하려면 `require ()`를 통해 플러그인을 요청하고 `plugins` 배열에 추가해야 합니다. 대부분의 플러그인은 옵션을 통해 사용자가 지정할 수 있습니다. 다른 목적으로 플러그인을 여러 번 사용하도록 설정할 수 있으므로 `new` 연산자로 호출하여 플러그인의 인스턴스를 만들어야 합니다.

**webpack.config.js**

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin'); // npm을 통해 설치
const webpack = require('webpack'); // 내장 plugin에 접근하는 데 사용

module.exports = {
  module: {
    rules: [{ test: /\.txt$/, use: 'raw-loader' }],
  },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
};
```

위의 예제에서 `html-webpack-plugin`은 생성된 모든 번들을 자동으로 삽입하여 애플리케이션용 HTML 파일을 생성합니다.

T> webpack은 설치 없이 사용할 수 있는 많은 플러그인을 제공합니다! [plugin 목록](/plugins)을 확인해보세요.

webpack 설정에서 플러그인을 사용하는 것은 간단하지만, 추가로 실제 사용 사례들도 살펴볼만한 가치가 있습니다. [여기에서](/concepts/plugins) 자세히 알아보세요.

## Mode

`mode` 파라미터를 `development`, `production` 또는 `none`으로 설정하면 webpack에 내장된 환경별 최적화를 활성화 할 수 있습니다. 기본값은 `production` 입니다.

```javascript
module.exports = {
  mode: 'production',
};
```

[여기에서](/configuration/mode) 모드 구성에 대해 자세히 알아보고 각 값에서 어떤 최적화가 수행되는지 알아보세요.

## Browser Compatibility

webpack은 [ES5](https://kangax.github.io/compat-table/es5/)가 호환되는 모든 브라우저를 지원합니다(IE8 이하는 지원되지 않습니다). webpack은 [`import()` 및 `require.ensure()`](/guides/code-splitting/#dynamic-imports)을 위한 `Promise`를 요구합니다. 구형 브라우저를 지원하려면 이러한 표현식을 사용하기 전에 [폴리필을 로드](/guides/shimming/)해야 합니다.

## Environment

webpack 5는 Node.js 버전 10.13.0 이상에서 실행됩니다.
