---
title: Configuration Languages
sort: 2
contributors:
  - sokra
  - skipjack
  - tarang9211
  - simon04
  - peterblazejewicz
  - youta1119
  - byzyk
  - Nek-
  - liyiming22
translators:
  - dkstyle
---

webpack은 여러 프로그래밍과 데이터 언어로 작성된 설정 파일을 사용할 수 있습니다. 지원되는 파일 확장자 목록은 [node-interpret](https://github.com/gulpjs/interpret) 패키지에서 확인할 수 있습니다. webpack은 [node-interpret](https://github.com/gulpjs/interpret)를 사용하여, 다양한 유형의 설정 파일을 처리할 수 있습니다.

## TypeScript

[TypeScript](http://www.typescriptlang.org/)에서 webpack 설정을 하기 위해서는, 먼저 필요한 디펜던시, 예를들면 TypeScript와 [DefinitelyTyped](https://definitelytyped.org/)에서 관련있는 타입 정의를 설치해야 합니다.

```bash
npm install --save-dev typescript ts-node @types/node @types/webpack
# and, if using webpack-dev-server
npm install --save-dev @types/webpack-dev-server
```

설치를 마쳤으면, 다음 설정을 작성하세요.

**webpack.config.ts**

```typescript
import * as path from 'path';
import * as webpack from 'webpack';
// just in case you run into any typescript error when configuring `devServer`
import 'webpack-dev-server';

const config: webpack.Configuration = {
  mode: 'production',
  entry: './foo.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'foo.bundle.js',
  },
};

export default config;
```

위 예시는 TypeScript 2.7 이상 버전의 `tsconfig.json` 파일에서 새로운 `esModuleInterop` 및 `allowSyntheticDefaultImports` 컴파일러 옵션과 함께 사용된다고 가정합니다.

`tsconfig.json` 파일도 확인해야 합니다. 만약 `tsconfig.json`에서 `compilerOptions`의 `모듈`이 `commonjs`라면 설정이 완료되지만, 그렇지 않으면 webpack이 에러와 함께 실패하게 됩니다. 이는 `ts-node`가 `commonjs` 이외의 다른 모듈 구문은 지원하지 않기 때문입니다.

이 문제는 두 가지 해결 방법이 있습니다.

- `tsconfig.json`을 수정합니다.
- `tsconfig-paths`를 설치합니다.

**첫번째 방법은** `tsconfig.json` 파일을 열고 `compilerOptions`를 찾는것입니다. `target`을 `"ES5"`로 하고 `module`을 `"CommonJS"`로 설정합니다.(또는 `module` 옵션을 완전히 제거합니다)

**두번째 방법은** `tsconfig-paths` 패키지를 설치합니다.

```bash
npm install --save-dev tsconfig-paths
```

webpack 설정에 맞게 별도의 TypeScript 설정을 만듭니다.

**tsconfig-for-webpack-config.json**

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "esModuleInterop": true
  }
}
```

T> `ts-node`는 `tsconfig-paths`에서 제공하는 환경 변수를 사용하여 `tsconfig.json` 파일을 해석할 수 있습니다.

그런 다음 `tsconfig-paths`에서 제공하는 환경 변수 `process.env.TS_NODE_PROJECT`를 다음과 같이 설정합니다.

**package.json**

```json
{
  "scripts": {
    "build": "cross-env TS_NODE_PROJECT=\"tsconfig-for-webpack-config.json\" webpack"
  }
}
```

W> `TS_NODE_PROJECT`가 `"TS_NODE_PROJECT" unrecognized command` 에러와 함께 작동하지 않을 수 있다는 제보를 받았습니다. `cross-env`로 실행하면 문제를 해결할 수 있습니다. 자세한 내용은 [해당 이슈를](https://github.com/webpack/webpack.js.org/issues/2733) 참고하세요.

## CoffeeScript

마찬가지로, [CoffeeScript](https://coffeescript.org/)를 사용하려면 먼저 필요한 디펜던시를 설치해야 합니다.

```bash
npm install --save-dev coffeescript
```

그리고 다음 설정을 작성하세요.

**webpack.config.coffee**

```coffeescript
HtmlWebpackPlugin = require('html-webpack-plugin')
webpack = require('webpack')
path = require('path')

config =
  mode: 'production'
  entry: './path/to/my/entry/file.js'
  output:
    path: path.resolve(__dirname, 'dist')
    filename: 'my-first-webpack.bundle.js'
  module: rules: [ {
    test: /\.(js|jsx)$/
    use: 'babel-loader'
  } ]
  plugins: [
    new HtmlWebpackPlugin(template: './src/index.html')
  ]

module.exports = config
```

## Babel and JSX

아래 예제에서 JSX (React JavaScript Markup) 및 Babel은 webpack이 이해할 수 있는 JSON 설정을 만드는 데 사용됩니다.

> [Jason Miller](https://twitter.com/_developit) 제공

먼저 필요한 디펜던시를 설치하세요.

```bash
npm install --save-dev babel-register jsxobj babel-preset-es2015
```

**.babelrc**

```json
{
  "presets": ["es2015"]
}
```

**webpack.config.babel.js**

```js
import jsxobj from 'jsxobj';

// import된 plugin의 예시
const CustomPlugin = (config) => ({
  ...config,
  name: 'custom-plugin',
});

export default (
  <webpack target="web" watch mode="production">
    <entry path="src/index.js" />
    <resolve>
      <alias
        {...{
          react: 'preact-compat',
          'react-dom': 'preact-compat',
        }}
      />
    </resolve>
    <plugins>
      <CustomPlugin foo="bar" />
    </plugins>
  </webpack>
);
```

W> 다른 곳에서 Babel을 사용하고 `modules`를 `false`로 설정 한 경우, 두개의 별도 `.babelrc`파일을 유지하거나 새로운 `import` 와 `export` 구문 대신 `const jsxobj = require('jsxobj');` 와 `module.exports`를 반드시 사용해야 합니다. 이는 Node가 새로운 ES6 기능을 다양하게 지원하지만, 아직 ES6 모듈 구문은 지원하지 않기 때문입니다.
