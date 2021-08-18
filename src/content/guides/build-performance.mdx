---
title: Build Performance
sort: 9
contributors:
  - sokra
  - tbroadley
  - byzyk
  - madhavarshney
  - wizardofhogwarts
  - anikethsaha
translators:
  - YukJiSoo
---

이 가이드에는 빌드/컴파일 성능을 개선하기 위한 몇 가지 유용한 팁이 포함되어 있습니다.

---

## General

다음의 모범 사례는 [development](/guides/development) 또는 [production](/guides/production)에서 빌드 스크립트를 실행하는 경우 도움이 될 것입니다.

### Stay Up to Date

최신 webpack 버전을 사용하세요. 우리는 항상 성능을 개선하고 있습니다. webpack의 권장 최신 버전은 다음과 같습니다.

[![latest webpack version](https://img.shields.io/github/package-json/v/webpack/webpack.svg?label=webpack&style=flat-square&maxAge=3600)](https://github.com/webpack/webpack/releases)

**Node.js를** 최신 상태로 유지하면 성능에 도움이 될 수 있습니다. 또한 패키지 관리자(예: `npm` 또는 `yarn`)를 최신 상태로 유지하는 것도 도움이 될 수 있습니다. 최신 버전은 더 효율적인 모듈 트리를 생성하고 해석하는 속도를 높입니다.

### Loaders

최소한으로 필요한 모듈에만 로더를 적용하세요.

```js
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
    ],
  },
};
```

위와 같은 방식보다는 아래처럼 `include` 필드를 사용하여 실제로 변환해야 하는 모듈에만 로더를 적용합니다.

```js
const path = require('path');

module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
      },
    ],
  },
};
```

### Bootstrap

각각의 추가 로더/플러그인에는 부팅 시간이 있습니다. 가능한 한 도구를 적게 사용하세요.

### Resolving

아래의 단계들로 해석 속도를 향상 시킬 수 있습니다.

- 파일 시스템의 호출 수가 증가되기 때문에 `resolve.modules`, `resolve.extensions`, `resolve.mainFiles`, `resolve.descriptionFiles`의 항목 수를 최소화하세요.
- 심볼릭 링크를 사용하지 않는 경우 `resolve.symlinks: false`를 설정하세요(예: `npm link` 또는 `yarn link`).
- 컨텍스트에 특정적이지 않은 커스텀 해석 플러그인을 사용하는 경우 `resolve.cacheWithContext: false`를 설정하세요.

### Dlls

자주 변경되지 않는 코드를 별도의 컴파일로 이동하려면 `DllPlugin`을 사용하세요. 이렇게 하면 빌드 프로세스가 복잡해 지지만 애플리케이션의 컴파일 속도가 향상됩니다.

### Smaller = Faster

빌드 성능을 높이려면 컴파일의 총 크기를 줄이세요. 청크를 작게 유지하세요.

- 더 적고 작은 라이브러리 사용
- 다중 페이지 애플리케이션에서 `SplitChunksPlugin`을 사용
- 다중 페이지 애플리케이션의 `async` 모드에서 `SplitChunksPlugin`을 사용
- 사용하지 않는 코드를 제거
- 현재 개발중인 코드의 일부만 컴파일

### Worker Pool

`thread-loader`는 작업량이 큰 로더를 worker 풀에 작업을 분담할 때 사용할 수 있습니다.

W> Node.js 런타임 및 로더에 대한 부팅 오버헤드가 있음으로 너무 많은 worker를 사용하지 마세요. worker와 메인 프로세스 간의 모듈 전송을 최소화하세요. IPC는 큰 비용을 필요로 합니다.

### Persistent cache

webpack 설정에서 [`cache`](/configuration/cache) 옵션을 사용하세요. `package.json`의 `"postinstall"`에서 캐시 디렉터리를 지우세요.

T> 영구 캐싱을 위해 yarn PnP 버전 3 [`yarn 2 berry`](https://yarnpkg.com/features/pnp)를 지원합니다.

### Custom plugins/loaders

커스텀 플러그인과 로더에서 성능 문제가 발생하지 않도록 프로파일 하세요.

### Progress plugin

webpack 구성에서 `ProgressPlugin`을 제거하여 빌드 시간을 단축 할 수 있습니다. `ProgressPlugin`은 빠른 빌드에 유용하지 않을 수 있기 때문에 이점을 잘 활용하고 있는지 확인하세요.

---

## Development

다음 단계는 _개발 단계에서_ 특히 유용합니다.

### Incremental Builds

webpack의 watch 모드를 사용하세요. 다른 도구를 사용하여 파일을 보고 webpack을 호출하지 마세요. 내장된 watch 모드는 타임 스탬프를 추적하고 캐시 무효화를 위해 이 정보를 컴파일에 전달합니다.

일부 설정에서는 watch가 폴링 모드로 돌아갑니다. watch 되는 파일이 많으면 이로 인해 많은 CPU 로드가 발생할 수 있습니다. 이 경우 `watchOptions.poll`을 사용하여 폴링 간격을 늘릴 수 있습니다.

### Compile in Memory

아래의 유틸리티는 디스크에 쓰는 대신 메모리에서 애셋을 컴파일하고 제공하여 성능을 향상시킵니다.

- `webpack-dev-server`
- `webpack-hot-middleware`
- `webpack-dev-middleware`

### stats.toJson speed

webpack 4는 기본적으로 `stats.toJson()`을 사용하여 많은 양의 데이터를 출력합니다. 증분 단계에서 필요한 경우가 아니면 `stats` 개체의 일부를 찾지 마세요. v3.1.3 이후의 `webpack-dev-server`에는 증분 빌드 단계에서 `stats` 객체에서 검색되는 데이터의 양을 최소화하기 위한 상당한 성능 수정이 포함되었습니다.

### Devtool

서로 다른 `devtool` 설정 간의 성능 차이에 유의하세요.

- `"eval"`은 성능이 좋지만 트랜스파일 된 코드에는 도움이 되지 않습니다.
- `cheap-source-map` 변형은 매핑의 질이 약간 떨어지지만, 성능이 좋습니다.
- 증분 빌드에서는 `eval-source-map` 변형을 사용합니다.

T> 대부분의 경우 `eval-cheap-module-source-map`이 가장 좋은 옵션입니다.

### Avoid Production Specific Tooling

특정 유틸리티, 플러그인 및 로더는 production으로 빌드할 때만 의미가 있습니다. 예를 들어, 개발 중에 `TerserPlugin`을 사용하여 코드를 축소하고 조작하는 것은 일반적으로 이치에 맞지 않습니다. 이러한 도구는 일반적으로 개발 단계에서 제외되어야 합니다.

- `TerserPlugin`
- `[fullhash]`/`[chunkhash]`/`[contenthash]`
- `AggressiveSplittingPlugin`
- `AggressiveMergingPlugin`
- `ModuleConcatenationPlugin`

### Minimal Entry Chunk

webpack은 파일 시스템에 업데이트된 청크만 내보냅니다. 일부 설정 옵션의 경우(HMR, `output.chunkFilename`,`[fullhash]` 안의 `[name]`/`[chunkhash]`/`[contenthash]`) 변경된 청크와 함께 엔트리 청크가 무효화됩니다.

엔트리 청크를 작게 유지하여 내보내는 비용이 저렴한지 확인하세요. 아래의 설정은 런타임 코드에 대한 추가 청크를 생성하므로 생성 비용이 저렴합니다.

```js
module.exports = {
  // ...
  optimization: {
    runtimeChunk: true,
  },
};
```

### Avoid Extra Optimization Steps

webpack은 크기 및 부하 성능에 대한 출력을 최적화하기 위해 추가 알고리즘 작업을 수행합니다. 이러한 최적화는 작은 코드 베이스에서는 성능이 좋지만 큰 코드에서는 비용이 많이들 수 있습니다.

```js
module.exports = {
  // ...
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
};
```

### Output Without Path Info

webpack은 출력 번들에 경로 정보를 생성하는 기능이 있습니다. 그러나 이것은 수천 개의 모듈을 번들로 묶는 프로젝트에서 가비지 컬렉션에 과부화를 줍니다. `options.output.pathinfo` 설정에서 이 기능을 끄세요.

```js
module.exports = {
  // ...
  output: {
    pathinfo: false,
  },
};
```

### Node.js Versions 8.9.10-9.11.1

Node.js 버전 8.9.10 - 9.11.1의 ES2015 `Map` 및 `Set` 구현에서 [성능 저하](https://github.com/nodejs/node/issues/19769)가 있었습니다. webpack은 이러한 데이터 구조를 자유롭게 사용하므로 이 성능저하는 컴파일 시간에 영향을 줍니다.

이전 및 이후 Node.js 버전은 영향을 받지 않습니다.

### TypeScript Loader

`ts-loader`를 사용할 때 빌드 시간을 개선하려면 `transpileOnly` 로더 옵션을 사용하세요. 이 옵션은 자체적으로 타입 검사를 해제합니다. 타입 검사를 다시 받으려면 [`ForkTsCheckerWebpackPlugin`](https://www.npmjs.com/package/fork-ts-checker-webpack-plugin)을 사용하세요. 이렇게 각각 별도의 프로세스로 이동시키면 TypeScript 유형 검사 및 ESLint linting 속도가 빨라집니다.

```js
module.exports = {
  // ...
  test: /\.tsx?$/,
  use: [
    {
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
      },
    },
  ],
};
```

T> `ts-loader` GitHub 저장소에 [전체 예시](https://github.com/TypeStrong/ts-loader/tree/master/examples/fork-ts-checker-webpack-plugin)가 있습니다.

---

## Production

다음 단계는 _production에서_ 특히 유용합니다.

W> **작은 성능 향상을 위해 애플리케이션의 품질을 희생하지 마세요!** 대부분의 경우 최적화 품질이 빌드 성능보다 더 중요합니다.

### Multiple Compilations

다중 컴파일을 사용할 때 다음 도구가 도움이 될 수 있습니다.

- [`parallel-webpack`](https://github.com/trivago/parallel-webpack): worker 풀에서 컴파일 할 수 있습니다.
- `cache-loader`: 캐시는 여러 컴파일 간에 공유될 수 있습니다.

### Source Maps

소스맵은 비용이 많이 듭니다. 정말로 필요한가요?

---

## Specific Tooling Issues

다음 도구에는 빌드 성능을 저하시킬 수 있는 특정 문제가 있습니다.

### Babel

- preset/plugins 수를 최소화하세요.

### TypeScript

- 별도의 프로세스에서 타입 검사를 위해 `fork-ts-checker-webpack-plugin`을 사용하세요.
- 타입 검사를 건너뛰도록 로더를 설정합니다.
- `happyPackMode: true` / `transpileOnly: true`에서 `ts-loader`를 사용합니다.

### Sass

- `node-sass`에는 Node.js 스레드 풀의 스레드를 차단하는 버그가 있습니다. `thread-loader`와 함께 사용하는 경우 `workerParallelJobs: 2`를 설정하세요.
