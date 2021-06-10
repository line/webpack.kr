---
title: Performance
sort: 16
contributors:
  - thelarkinn
  - tbroadley
  - byzyk
  - madhavarshney
  - EugeneHlushko
translators:
  - dkstyle
---

이 옵션을 사용하면 webpack이 정해진 파일 제한을 초과하는 애셋과 엔트리 포인트에 대해 알릴 방법을 제어 할 수 있습니다.
이 기능은 [webpack 성능 버짓](https://github.com/webpack/webpack/issues/3216)의 아이디어에서 영감을 받았습니다.

## `performance`

`object`

성능 힌트가 표시되는 방법을 설정합니다. 예를 들어 애셋이 250kb를 초과하면, webpack이 이를 알리는 경고를 표시합니다.

## `performance.hints`

`string = 'warning': 'error' | 'warning'` `boolean: false`

힌트를 켜거나 끕니다. 또한 힌트가 발견되면 webpack에 오류나 경고를 표시하도록 합니다.

250kb를 초과하는 애셋이 생성된 경우입니다.

```js
module.exports = {
  //...
  performance: {
    hints: false,
  },
};
```

힌트 경고 또는 오류가 표시되지 않습니다

```js
module.exports = {
  //...
  performance: {
    hints: 'warning',
  },
};
```

큰 애셋을 알리는 경고가 표시됩니다. 개발 환경에서는 이처럼 사용하는 것을 권장합니다.

```js
module.exports = {
  //...
  performance: {
    hints: 'error',
  },
};
```

큰 애셋을 알려주는 오류가 표시됩니다. 크기가 너무 커서 웹 페이지 성능에 영향을 미치는 프로덕션 번들을 배포하는 것을 방지하기 위해, 프로덕션 빌드 시에는 `hints: "error"`를 사용하는 것이 좋습니다.

## `performance.maxEntrypointSize`

`number = 250000`

엔트리 포인트는 특정 항목의 초기 로드 시간 동안 사용될 모든 애셋을 나타냅니다. 이 옵션은 webpack이 최대 엔트리 포인트 크기(단위:bytes)를 기준으로 성능 힌트를 내보낼 시기를 제어합니다.

```js
module.exports = {
  //...
  performance: {
    maxEntrypointSize: 400000,
  },
};
```

## `performance.maxAssetSize`

`number = 250000`

애셋은 webpack에서 내보낸 파일입니다. 이 옵션은 webpack이 개별 애셋 크기(단위:bytes)를 기준으로 성능 힌트를 내보낼 시기를 제어합니다.

```js
module.exports = {
  //...
  performance: {
    maxAssetSize: 100000,
  },
};
```

## `performance.assetFilter`

`function(assetFilename) => boolean`

이 속성을 통해 webpack은 성능 힌트를 계산하는 데 사용되는 파일을 제어할 수 있습니다. 기본 기능은 다음과 같습니다.

```js
function assetFilter(assetFilename) {
  return !/\.map$/.test(assetFilename);
}
```

다음과 같이 함수를 전달하여 속성을 재정의할 수 있습니다.

```js
module.exports = {
  //...
  performance: {
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith('.js');
    },
  },
};
```

위의 예에서는 `.js` 파일에 대한 성능 힌트만 제공합니다.
