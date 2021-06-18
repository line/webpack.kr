---
title: TypeScript
sort: 21
contributors:
  - morsdyce
  - kkamali
  - mtrivera
  - byzyk
  - EugeneHlushko
translators:
  - dkstyle
---

T> 이 가이드는 [_시작하기_](/guides/getting-started/) 가이드에서 파생했습니다.

[TypeScript는](https://www.typescriptlang.org) 일반 JavaScript로 컴파일되고 타입이 있는 상위 집합입니다. 이 가이드에서는 TypeScript를 webpack과 통합하는 방법에 대해 알아보겠습니다.

## Basic Setup

먼저 다음을 실행하여 TypeScript 컴파일러와 로더를 설치하세요.

```bash
npm install --save-dev typescript ts-loader
```

이제 디렉터리 구조와 설정 파일을 수정합니다.

**project**

```diff
  webpack-demo
  |- package.json
+ |- tsconfig.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
    |- index.js
+   |- index.ts
  |- /node_modules
```

**tsconfig.json**

JSX를 지원하도록 간단하게 설정하고 TypeScript를 ES5로 컴파일 합니다.

```json
{
  "compilerOptions": {
    "outDir": "./dist/",
    "noImplicitAny": true,
    "module": "es6",
    "target": "es5",
    "jsx": "react",
    "allowJs": true,
    "moduleResolution": "node"
  }
}
```

`tsconfig.json` 설정 옵션에 대한 자세한 내용은 [TypeScript 문서를](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) 참고하세요.

webpack 설정에 대한 자세한 내용은 [설정 콘셉트를](/concepts/configuration/) 참고하세요.

이제 TypeScript를 처리하도록 webpack을 설정해 보겠습니다.

**webpack.config.js**

```js
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

이렇게하면 webpack이 `./index.ts` 를 통해 진입하고, `ts-loader`를 통해 모든 `.ts` 및 `.tsx` 파일을 로드합니다. 그리고 현재 디렉터리에 `bundle.js`파일을 출력합니다.

`lodash`의 정의에는 기본 export 표현이 없기 때문에, 이제 `./index.ts`의 `lodash`를 import하는 부분을 변경해 보겠습니다.

**./index.ts**

```diff
- import _ from 'lodash';
+ import * as _ from 'lodash';

  function component() {
    const element = document.createElement('div');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
  }

  document.body.appendChild(component());
```

T> import 부분에서 기본적으로 이 작업을 하도록 하고 TypeScript에서 `import _ from 'lodash';` 문법을 유지하기 위해 **tsconfig.json** 파일에 `"allowSyntheticDefaultImports" : true` 와 `"esModuleInterop" : true`로 설정 합니다. 이는 TypeScript 설정과 연관이 있기때문에 이 가이드에서는 정보를 제공하기 위해서만 언급하겠습니다.

## Loader

[`ts-loader`](https://github.com/TypeStrong/ts-loader)

이 가이드에서는 `ts-loader`를 사용하여 다른 웹 애셋 import 같은 추가적인 webpack 기능을 조금 더 쉽게 활성화 할 수 있습니다.

W> `ts-loader` 는 TypeScript 컴파일러인 `tsc`를 사용하고, `tsconfig.json`의 설정을 따릅니다. [`모듈을`](https://www.typescriptlang.org/tsconfig#module) "CommonJS"로 설정하지 않도록 주의하세요. 안그러면 webpack이 [코드 tree-shake를](/guides/tree-shaking) 할 수 없습니다.

이미 [`babel-loader`를](https://github.com/babel/babel-loader) 사용하여 코드를 트랜스파일 하는 경우라면 [`@babel/preset-typescript`](https://babeljs.io/docs/en/babel-preset-typescript)를 사용하여 Babel이 추가 로더를 사용하는 대신 JavaScript와 TypeScript 파일을 모두 처리하도록 합니다. `ts-loader`와 달리, 기본 [`@babel/plugin-transform-typescript`](https://babeljs.io/docs/en/babel-plugin-transform-typescript) 플러그인은 어떠한 타입 검사도 수행하지 않습니다.

## Source Maps

소스맵에 대한 자세한 내용은 [개발 가이드를](/guides/development) 참고하세요.

소스맵을 사용하려면 TypeScript가 컴파일된 JavaScript 파일로 인라인 소스맵을 출력하도록 설정해야 합니다. TypeScript 설정에 다음 내용을 꼭 추가해야합니다.

**tsconfig.json**

```diff
  {
    "compilerOptions": {
      "outDir": "./dist/",
+     "sourceMap": true,
      "noImplicitAny": true,
      "module": "commonjs",
      "target": "es5",
      "jsx": "react",
      "allowJs": true,
      "moduleResolution": "node",
    }
  }
```

이제 webpack에 이러한 소스맵을 추출해 최종 번들에 포함되도록 지시해야 합니다.

**webpack.config.js**

```diff
  const path = require('path');

  module.exports = {
    entry: './src/index.ts',
+   devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ],
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };
```

자세한 내용은 [개발자 도구 문서를](/configuration/devtool/) 참고하세요.

## Using Third Party Libraries

npm으로부터 타사 라이브러리를 설치할 때는 해당 라이브러리에 대한 타입 정의를 설치해야 한다는 사실을 기억해야 합니다. 이런 정의는 [TypeSearch에서](https://microsoft.github.io/TypeSearch/) 찾을 수 있습니다.

예를 들어 lodash를 설치하려는 경우 다음 명령을 실행해서 타입을 가져올 수 있습니다.

```bash
npm install --save-dev @types/lodash
```

자세한 내용은 [블로그 포스트를](https://blogs.msdn.microsoft.com/typescript/2016/06/15/the-future-of-declaration-files/) 참고하세요.

## Importing Other Assets

TypeScript와 함께 비코드 애셋을 사용하려면 이러한 import에 대한 타입을 연기해야 합니다. 이를 위해서 프로젝트에 TypeScript에 대한 사용자 정의를 나타내는 `custom.d.ts` 파일이 필요합니다. `.svg` 파일에 대한 선언을 설정해 보겠습니다.

**custom.d.ts**

```typescript
declare module '*.svg' {
  const content: any;
  export default content;
}
```

여기에서는 `.svg`로 끝나는 import를 지정하고 모듈의 `content`를 `any`로 정의하여 SVG를 위한 새로운 모듈을 선언합니다. 타입을 문자열로 정의하여 URL이라는 것을 더 명확하게 할 수 있습니다. CSS, SCSS, JSON 등을 포함한 다른 애셋에도 동일한 개념이 적용됩니다.

## Build Performance

W> 이로 인해 빌드 성능이 저하 될 수 있습니다.

빌드 도구에 대한 [빌드 성능 가이드를](/guides/build-performance/) 참고하세요.
