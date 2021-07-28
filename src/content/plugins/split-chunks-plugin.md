---
title: SplitChunksPlugin
group: webpack
contributors:
  - sokra
  - jeremenichelli
  - Priestch
  - chrisdothtml
  - EugeneHlushko
  - byzyk
  - jacobangel
  - madhavarshney
  - sakhisheikh
  - superburrito
  - ryandrew14
  - snitin315
  - chenxsan
  - rohrlaf
  - jamesgeorge007
  - anshumanv
translators:
  - 1ilsang
related:
  - title: webpack's automatic deduplication algorithm example
    url: https://github.com/webpack/webpack/blob/master/examples/many-pages/README.md
  - title: 'webpack 4: Code Splitting, chunk graph and the splitChunks optimization'
    url: https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
---

원래 청크(및 그 안에 가져온 모듈)는 webpack 내부 그래프에서 부모-자식 관계로 연결되었습니다. `CommonsChunkPlugin`은 중복되는 의존성을 피하고자 사용되었지만, 추가 최적화는 불가능했습니다.

webpack v4부터 `optimization.splitChunks`를 위해 `CommonsChunkPlugin`은 제거되었습니다.

## Defaults

즉시 사용 가능한 `SplitChunksPlugin`은 대부분의 사용자에게 잘 작동합니다.

초기 청크를 변경하면 HTML 파일이 프로젝트를 실행하기 위해 포함해야 하는 스크립트 태그에 영향을 미치기 때문에 기본적으로 on-demand 청크에만 영향을 미칩니다.

webpack은 다음 조건에 따라 자동으로 청크를 분할합니다.

- 새 청크를 공유 할 수 있거나 모듈이 `node_modules` 폴더에 있는 경우
- 새 청크가 20kb보다 클 경우(min+gz 이전에)
- 요청 시 청크를 로드할 때 최대 병렬 요청 수가 30개 이하일 경우
- 초기 페이지 로드 시 최대 병렬 요청 수가 30개 이하일 경우

마지막 두 가지 조건을 충족하려고 할 때 더 큰 청크가 선호됩니다.

## Configuration

webpack은 이 기능에 대한 더 많은 제어를 원하는 개발자를 위해 옵션 세트를 제공합니다.

W> 웹 성능 모범 사례에 맞게 기본 설정이 선택되어 있지만, 프로젝트에 대한 최적의 전략은 다를 수 있습니다. 설정을 변경하는 경우 실제 이점이 있는지 확인하기 위해 변경 사항의 영향을 측정해야 합니다.

## `optimization.splitChunks`

이 설정 객체는 `SplitChunksPlugin`의 기본 동작을 나타냅니다.

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
```

W> webpack에서 파일 경로를 처리할 때 항상 Unix 시스템에서는 `/`, Windows에서는 `\`를 포함합니다. 그렇기 때문에 `{cacheGroup}.test` 필드에 `[\\/]`를 사용하여 경로 구분자를 나타내야 합니다. `{cacheGroup}.test`의 `/` 또는 `\`는 크로스 플랫폼 사용 시 문제를 유발합니다.

W> webpack 5부터 `{cacheGroup}.test`에 엔트리 이름을 전달하고 `{cacheGroup}.name`에 기존 청크 이름을 사용하는 것은 더는 허용되지 않습니다.

### `splitChunks.automaticNameDelimiter`

`string = '~'`

기본적으로 webpack은 출처와 청크 이름을 사용하여 이름을 생성합니다(예: `vendors~main.js`). 이 옵션을 사용하면 생성된 이름에 사용할 구분 기호를 지정할 수 있습니다.

### `splitChunks.chunks`

`string = 'async'` `function (chunk)`

이것은 최적화를 위해 선택될 청크를 나타냅니다. 문자열이 제공될 때 유효한 값은 `all`, `async` 및 `initial`입니다. `all`을 제공하는 것은 비동기 청크와 동기 청크 간에도 청크를 공유할 수 있다는 것을 의미하기 때문에 특히 강력할 수 있습니다.

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      // 모든 유형의 청크를 포함합니다.
      chunks: 'all',
    },
  },
};
```

또는 더 많은 제어를 위한 기능을 제공할 수 있습니다. 반환 값은 각 청크를 포함할지 여부를 나타냅니다.

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks(chunk) {
        // `my-excluded-chunk`를 제외합니다.
        return chunk.name !== 'my-excluded-chunk';
      },
    },
  },
};
```

T> 이 설정을 [HtmlWebpackPlugin](/plugins/html-webpack-plugin/)과 결합할 수 있습니다. 이는 생성 된 모든 vendor 청크를 주입합니다.

### `splitChunks.maxAsyncRequests`

`number = 30`

on-demand 로드 시의 최대 병렬 요청 수입니다.

### `splitChunks.maxInitialRequests`

`number = 30`

엔트리 포인트의 최대 병렬 요청 수입니다.

### `splitChunks.defaultSizeTypes`

`[string] = ['javascript', 'unknown']`

크기에 숫자를 사용할 때 적용되는 크기 유형을 설정합니다.

### `splitChunks.minChunks`

`number = 1`

모듈이 분할 전에 청크간에 공유되어야 하는 최소 시간입니다.

### `splitChunks.hidePathInfo`

`boolean`

maxSize로 분할된 부분의 이름을 만들 때 경로 정보가 노출되지 않도록 합니다.

### `splitChunks.minSize`

`number = 20000`

생성할 청크의 최소 byte 크기입니다.

### `splitChunks.enforceSizeThreshold`

#### `splitChunks.cacheGroups.{cacheGroup}.enforceSizeThreshold`

`number = 50000`

분할이 적용되고 기타 제한(minRemainingSize, maxAsyncRequests, maxInitialRequests)이 무시되는 임계 크기 값입니다.

### `splitChunks.minRemainingSize`

#### `splitChunks.cacheGroups.{cacheGroup}.minRemainingSize`

`number = 0`

`splitChunks.minRemainingSize` 옵션은 분할 후 남아있는 청크의 최소 크기가 제한을 초과하도록 하여 크기가 0인 모듈을 방지하기 위해 webpack 5에 도입되었습니다. ['development' 모드](/configuration/mode/#mode-development)에서 기본값은 `0`입니다. 다른 경우 `splitChunks.minRemainingSize`는 기본적으로 `splitChunks.minSize` 값으로 설정되므로 심층 제어가 필요한 드문 경우를 제외하고는 수동으로 지정할 필요가 없습니다.

W> `splitChunks.minRemainingSize`는 단일 청크가 남아있을 때만 적용됩니다.

### `splitChunks.layer`

#### `splitChunks.cacheGroups.{cacheGroup}.layer`

`RegExp` `string` `function`

모듈 계층별로 캐시 그룹에 모듈을 할당합니다.

### `splitChunks.maxSize`

`number = 0`

`maxSize`를 사용하면(캐시 그룹 `optimization.splitChunks.cacheGroups[x].maxSize`당 전역적으로 `optimization.splitChunks.maxSize` 또는 대체 캐시 그룹 `optimization.splitChunks.fallbackCacheGroup.maxSize`의 경우) webpack이 `maxSize` byte보다 큰 청크를 더 작은 부분으로 분할하도록 합니다. 분할된 크기는 최소 `minSize`(`maxSize` 다음)입니다.
알고리즘은 결정론적이며 모듈 변경은 로컬에만 영향을 미칩니다. 따라서 장기 캐싱을 사용할 때 사용할 수 있으며 기록이 필요하지 않습니다. `maxSize`는 힌트일 뿐이며 모듈이 `maxSize` 보다 크거나 분할이 `minSize`를 벗어날 때 위반될 수 있습니다.

청크에 이미 이름이 있는 경우 각 부분은 해당 이름에서 파생된 새 이름을 얻습니다. `optimization.splitChunks.hidePathInfo`의 값에 따라 첫 번째 모듈 이름이나 해시에서 파생된 키를 추가합니다.

`maxSize` 옵션은 HTTP/2 및 장기 캐싱과 함께 사용하기 위한 것입니다. 더 나은 캐싱을 위해 요청수가 증가합니다. 빠른 재구축을 위해 파일 크기를 줄이는 데도 사용할 수 있습니다.

T> `maxSize`는 `maxInitialRequest/maxAsyncRequests`보다 우선순위가 높습니다. 실제 우선순위는 `maxInitialRequest/maxAsyncRequests < maxSize < minSize`입니다.

T> `maxSize` 값을 설정하면 `maxAsyncSize` 및 `maxInitialSize` 값이 모두 설정됩니다.

### `splitChunks.maxAsyncSize`

`number`

`maxSize`와 마찬가지로 `maxAsyncSize`는 전역적으로(`splitChunks.maxAsyncSize`) 캐시 그룹(`splitChunks.cacheGroups.{cacheGroup}.maxAsyncSize`) 또는 대체 캐시 그룹(`splitChunks.fallbackCacheGroup.maxAsyncSize`)에 적용될 수 있습니다.

`maxAsyncSize`와 `maxSize`의 차이점은 `maxAsyncSize`가 on-demand 로딩 청크에만 영향을 미친다는 점입니다.

### `splitChunks.maxInitialSize`

`number`

`maxSize`와 마찬가지로 `maxInitialSize`는 전역적으로(`splitChunks.maxInitialSize`) 캐시 그룹(`splitChunks.cacheGroups.{cacheGroup}.maxInitialSize`) 또는 대체 캐시 그룹(`splitChunks.fallbackCacheGroup.maxInitialSize`)에 적용될 수 있습니다.

`maxInitialSize`와 `maxSize`의 차이점은 `maxInitialSize`가 초기 로딩 청크 에만 영향을 미친다는 것입니다.

### `splitChunks.name`

`boolean = false` `function (module, chunks, cacheGroupKey) => string` `string`

또한 `splitChunks.cacheGroups.{cacheGroup}.name`와 같이 각 캐시 그룹에 대해서도 사용 가능합니다.

이는 분할 청크의 이름입니다. `false`를 제공하면 청크의 이름이 동일하게 유지되므로 불필요하게 이름이 변경되지 않습니다. 프로덕션 빌드에 권장되는 값입니다.

문자열이나 함수를 제공하면 이름을 커스텀 할 수 있습니다. 항상 같은 문자열을 반환하는 문자열이나 함수를 지정하면 모든 공통 모듈과 vendor가 단일 청크로 병합됩니다. 이로 인해 초기 다운로드가 더 커지고 페이지 로드가 느려질 수 있습니다.

함수를 명시한 경우 청크의 이름을 선택하는 데 특히 유용한 `chunk.name` 및 `chunk.hash` 속성(여기서 `chunk`는 `chunks` 배열의 요소)을 찾을 수 있습니다.

`splitChunks.name`이 [엔트리 포인트](/configuration/entry-context/#entry)와 일치하면 엔트리 포인트가 제거됩니다.

**main.js**

```js
import _ from 'lodash';

console.log(_.join(['Hello', 'webpack'], ' '));
```

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          // 여기서 cacheGroupKey는 cacheGroup의 키로 `commons`입니다.
          name(module, chunks, cacheGroupKey) {
            const moduleFileName = module
              .identifier()
              .split('/')
              .reduceRight((item) => item);
            const allChunksNames = chunks.map((item) => item.name).join('~');
            return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
          },
          chunks: 'all',
        },
      },
    },
  },
};
```

`splitChunks` 구성으로 webpack을 실행하면 다음의 이름으로 공통 그룹 청크도 출력됩니다. `commons-main-lodash.js.e7519d2bb8777058fa27.js`(해시는 실제 출력의 예로 제공됩니다).

W> 다른 분할 청크에 동일한 이름을 할당할 때 모든 vendor 모듈은 단일 공유 청크에 배치되지만, 더 많은 코드가 다운로드될 수 있으므로 권장하지 않습니다.

### `splitChunks.usedExports`

#### `splitChunks.cacheGroups{cacheGroup}.usedExports`

`boolean = true`

모듈이 export 할 파일의 이름을 수정(mangle)하고 사용하지 않는 export를 생략하고 보다 효율적인 코드를 생성하기 위해 어떤 export를 사용하는지 알아봅니다.
`true`인 경우 각 런타임에 대해 사용된 export를 분석하고, `"global"`인 경우 결합한 모든 런타임에 대해 전역적으로 export를 분석합니다.

### `splitChunks.cacheGroups`

캐시 그룹은 `splitChunks.*`의 모든 옵션을 상속 및(또는) 재정의할 수 있습니다. 그러나 `test`, `priority` 및 `reuseExistingChunk`는 캐시 그룹 수준에서만 구성할 수 있습니다. 기본 캐시 그룹을 비활성화하려면 `false`로 설정하세요.

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
      },
    },
  },
};
```

#### `splitChunks.cacheGroups.{cacheGroup}.priority`

`number = -20`

모듈은 여러 캐시 그룹에 속할 수 있습니다. 최적화는 `priority`(우선순위)가 더 높은 캐시 그룹을 선호합니다. 기본 그룹은 커스텀 그룹이 더 높은 우선순위를 가질 수 있도록 음수 우선순위를 갖습니다(커스텀 그룹일 경우 기본값은 `0`입니다).

#### `splitChunks.cacheGroups.{cacheGroup}.reuseExistingChunk`

`boolean = true`

현재 청크에 이미 기본 번들에서 분리된 모듈이 포함되어 있으면 새로 생성되는 대신 재사용됩니다. 이것은 청크의 파일 이름에 영향을 줄 수 있습니다.

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          reuseExistingChunk: true,
        },
      },
    },
  },
};
```

#### `splitChunks.cacheGroups.{cacheGroup}.type`

`function` `RegExp` `string`

모듈 유형별로 캐시 그룹에 모듈을 할당할 수 있습니다.

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      cacheGroups: {
        json: {
          type: 'json',
        },
      },
    },
  },
};
```

#### `splitChunks.cacheGroups.test`

#### `splitChunks.cacheGroups.{cacheGroup}.test`

`function (module, { chunkGraph, moduleGraph }) => boolean` `RegExp` `string`

캐시 그룹에 의해 선택되는 모듈을 제어합니다. 생략하면 모든 모듈이 선택됩니다. 이는 절대 경로 모듈 리소스 또는 청크 이름과 일치할 수 있습니다. 청크 이름이 일치하면 청크의 모든 모듈이 선택됩니다.

아래와 같이 `{cacheGroup}.test`에 기능을 제공합니다.

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      cacheGroups: {
        svgGroup: {
          test(module) {
            // `module.resource`는 디스크에 있는 파일의 절대 경로를 포함합니다.
            // 플랫폼 간 호환성을 위해 / 또는 \ 대신 `path.sep`을 사용합니다.
            const path = require('path');
            return (
              module.resource &&
              module.resource.endsWith('.svg') &&
              module.resource.includes(`${path.sep}cacheable_svgs${path.sep}`)
            );
          },
        },
        byModuleTypeGroup: {
          test(module) {
            return module.type === 'javascript/auto';
          },
        },
      },
    },
  },
};
```

`module` 및 `chunks` 객체에서 어떤 정보를 사용할 수 있는지 확인하려면 콜백에 `debugger;` 문을 넣으면 됩니다. 그런 다음 [디버그 모드에서 webpack 빌드를 실행](/contribute/debugging/#devtools)하여 Chromium DevTools의 파라미터를 검사합니다.

아래는 `{cacheGroup}.test`에 `RegExp`를 제공한 경우입니다.

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          // 플랫폼 간 호환성을 위한 경로 구분 기호로 `[\\/]`의 사용에 유의하세요.
          test: /[\\/]node_modules[\\/]|vendor[\\/]analytics_provider|vendor[\\/]other_lib/,
        },
      },
    },
  },
};
```

#### `splitChunks.cacheGroups.{cacheGroup}.filename`

`string` `function (pathData, assetInfo) => string`

초기 청크인 경우에만 파일 이름을 재정의할 수 있습니다.
[`output.filename`](/configuration/output/#outputfilename)에서 사용할 수 있는 모든 플레이스홀더는 여기에서도 사용할 수 있습니다.

W> 이 옵션은 `splitChunks.filename`에서 전역적으로 설정할 수도 있지만, 이는 권장되지 않으며 [`splitChunks.chunks`](#splitchunkschunks)가 `'initial'`로 설정되지 않는 경우 오류가 발생할 수 있습니다. 전역으로 설정하지 마세요.

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          filename: '[name].bundle.js',
        },
      },
    },
  },
};
```

아래는 함수로 사용하는 방법입니다.

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          filename: (pathData) => {
            // 요구 사항에 따라 파일 이름 문자열을 생성하기 위해 pathData 객체를 사용하세요.
            return `${pathData.chunk.name}-bundle.js`;
          },
        },
      },
    },
  },
};
```

파일 이름 앞에 경로를 제공하여 폴더 구조를 생성할 수 있습니다(예: `'js/vendor/bundle.js'`).

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          filename: 'js/[name]/bundle.js',
        },
      },
    },
  },
};
```

#### `splitChunks.cacheGroups.{cacheGroup}.enforce`

`boolean = false`

Webpack에 [`splitChunks.minSize`](#splitchunksminsize), [`splitChunks.minChunks`](#splitchunksminchunks), [`splitChunks.maxAsyncRequests`](#splitchunksmaxasyncrequests) 및 [`splitChunks.maxInitialRequests`](#splitchunksmaxinitialrequests) 옵션을 무시하고 항상 이 캐시 그룹에 대한 청크를 생성하도록 지시합니다.

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          enforce: true,
        },
      },
    },
  },
};
```

#### `splitChunks.cacheGroups.{cacheGroup}.idHint`

`string`

청크 ID에 대한 힌트를 설정합니다. 청크의 파일 이름에 추가됩니다.

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          idHint: 'vendors',
        },
      },
    },
  },
};
```

## Examples

### Defaults: Example 1

```js
// index.js

import('./a'); // 동적 import
```

```js
// a.js
import 'react';

//...
```

**결과:** `react`를 포함하는 별도의 청크가 생성됩니다. import 호출에서 이 청크는 `./a`를 포함하는 원래 청크와 병렬로 로드됩니다.

이유:

- 조건 1: 청크는 `node_modules`의 모듈을 포함합니다
- 조건 2: `react`가 30kb보다 큽니다
- 조건 3: import 호출 시 병렬 요청 수는 2입니다
- 조건 4: 초기 페이지 로드 시 요청에 영향을 주지 않습니다

이 이유는 무엇일까요? `react`는 애플리케이션 코드만큼 자주 변경되지 않을 것입니다. 별도의 청크로 이동하면 이 청크를 앱 코드와 별도로 캐시할 수 있습니다(청크 해시, 레코드, Cache-Control 또는 장기 캐시 접근 방식을 사용한다고 가정합니다).

### Defaults: Example 2

```js
// entry.js

// 동적 imports
import('./a');
import('./b');
```

```js
// a.js
import './helpers'; // helpers의 크기는 40kb입니다

//...
```

```js
// b.js
import './helpers';
import './more-helpers'; // more-helpers 또한 40kb의 크기를 가집니다

//...
```

**결과:** `./helpers`와 이에 대한 모든 의존성을 포함하는 별도의 청크가 생성됩니다. import 호출에서 이 청크는 원래 청크와 병렬로 로드됩니다.

이유:

- 조건 1: 청크는 두 import 호출 간에 공유됩니다
- 조건 2: `helpers`는 30kb보다 큽니다
- 조건 3: import 호출 시 병렬 요청 수는 2입니다
- 조건 4: 초기 페이지 로드 시 요청에 영향을 주지 않습니다

`helpers`의 내용을 각 청크에 넣으면 코드가 두 번 다운로드됩니다. 별도의 청크를 사용하면 한 번만 발생합니다. 우리는 추가 요청 비용을 지불하며 이는 절충안으로 간주할 수 있습니다. 그렇기 때문에 최소 크기는 30kb입니다.

### Split Chunks: Example 1

엔트리 포인트 간에 공유되는 모든 코드를 포함하는 `commons` 청크를 만듭니다.

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2,
        },
      },
    },
  },
};
```

W> 이 구성은 초기 번들을 확장할 수 있으므로 모듈이 즉시 필요하지 않을 때 동적 import를 사용하는 것이 좋습니다.

### Split Chunks: Example 2

전체 애플리케이션에서 `node_modules`의 모든 코드를 포함하는 `vendors` 청크를 만듭니다.

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};
```

W> 이로 인해 모든 외부 패키지가 포함된 큰 청크가 생성될 수 있습니다. 핵심 프레임워크와 유틸리티만 포함하고 나머지 종속성을 동적으로 로드하는 것이 좋습니다.

### Split Chunks: Example 3

`RegExp`와 일치하는 특정 `node_modules` 패키지를 포함하는 `custom vendor` 청크를 만듭니다.

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
};
```

T> 이로 인해 `react`와 `react-dom`이 별도의 청크로 분할됩니다. 어떤 패키지가 청크에 포함되었는지 확실하지 않은 경우 자세한 내용은 [Bundle Analysis](/guides/code-splitting/#bundle-analysis) 섹션을 참고하세요.
