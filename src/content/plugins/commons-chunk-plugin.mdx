---
title: CommonsChunkPlugin
group: webpack
contributors:
  - bebraw
  - simon04
  - christopher4lis
  - kevinzwhuang
  - jdbevan
  - jeremenichelli
  - byzyk
  - madhavarshney
  - snitin315
translators:
  - 1ilsang
---

`CommonsChunkPlugin`은 여러 엔트리 포인트 간에 공유되는 공통 모듈로 이루어진 별도의 파일(청크라고 합니다)을 만드는 opt-in 기능입니다.

W> CommonsChunkPlugin은 webpack v4(legato)에서 제거되었습니다. 최신 버전에서 청크가 처리되는 방식을 알아보려면 [SplitChunksPlugin](/plugins/split-chunks-plugin/)을 확인하세요.

번들에서 공통 모듈을 분리한 결과로 생성된 청크 파일을 처음에 한 번 로드하고 나중에 사용하기 위해 캐시에 저장할 수 있습니다. 이로 인해 브라우저가 새 페이지를 방문할 때마다 더 큰 번들을 로드하지 않고 캐시에서 공유 코드를 빠르게 제공할 수 있으므로 페이지 속도가 최적화됩니다.

```javascript
new webpack.optimize.CommonsChunkPlugin(options);
```

## Options

```ts
{
  name: string, // 또는
  names: string[],
  // 공통 청크의 청크 이름입니다. 청크의 이름을 전달하여 기존 청크를 선택할 수 있습니다.
  // 문자열 배열로 전달되면 각 청크 이름에 대해 플러그인을 여러 번 호출하는 것과 같습니다.
  // 생략하면 `options.async` 또는 `options.children`이 설정되고 모든 청크가 사용됩니다.
  // 그렇지 않으면 청크 이름으로 사용되는 `options.filename`이 사용되게 됩니다.
  // `options.async`를 사용하여 다른 비동기 청크에서 공통 청크를 만들 때 `option.name`을 생략하는 대신 여기에
  // 엔트리 포인트 청크 이름을 지정해야 합니다.

  filename: string,
  // 공통 청크의 파일 이름 템플릿입니다. `output.filename`과 동일한 플레이스홀더를 포함할 수 있습니다.
  // 생략하면 원본 파일 이름은 수정되지 않습니다(일반적으로 `output.filename` 혹은 `output.chunkFilename`).
  // 이 옵션은 `options.async`를 사용하는 경우에도 허용되지 않습니다. 자세한 내용은 아래를 참조하세요.

  minChunks: number|Infinity|function(module, count) => boolean,
  // 공통 청크로 이동하기 전에 모듈을 포함해야 하는 최소 청크 수입니다.
  // 숫자는 2보다 크거나 같고 청크 수보다 작거나 같아야 합니다.
  // `Infinity`를 전달하면 공통 청크가 생성되지만 모듈은 이동하지 않습니다.
  // `function`을 제공하여 맞춤 로직을 추가 할 수 있습니다.(기본값은 청크의 수입니다)

  chunks: string[],
  // 청크 이름으로 소스 청크를 선택합니다. 청크는 공통 청크의 자식이어야 합니다.
  // 생략하면 모든 엔트리 청크가 선택됩니다.

  children: boolean,
  // `true`이면 공통 청크의 모든 자식이 선택됩니다.

  deepChildren: boolean,
  // `true`이면 공통 청크의 모든 자손이 선택됩니다.

  async: boolean|string,
  // `true`이면 새로운 비동기 공통 청크가 `options.name`의 하위 항목 및 `options.chunks`와 동등한 항목으로 생성됩니다.
  // `options.chunks`와 병렬로 로드됩니다.
  // `option.filename`을 사용하는 대신 `true`가 아닌 원하는 문자열을 제공해
  // 출력 파일의 이름을 변경할 수 있습니다.

  minSize: number,
  // 공통 청크가 생성되기 전 모든 공통 모듈의 최소 사이즈입니다.
}
```

## Examples

### Commons chunk for entries

엔트리 포인트 간에 공유되는 공통 모듈을 포함하는 추가 청크를 생성합니다.

```javascript
new webpack.optimize.CommonsChunkPlugin({
  name: 'commons',
  // (공통 청크 이름)

  filename: 'commons.js',
  // (공통 청크의 파일 이름)

  // minChunks: 3,
  // (모듈은 최소 3개의 엔트리 사이에서 공유해야 합니다)

  // chunks: ["pageA", "pageB"],
  // (이 엔트리에서만 사용됩니다)
});
```

생성된 청크는 엔트리 포인트 전에 로드해야 합니다.

```html
<script src="commons.js" charset="utf-8"></script>
<script src="entry.bundle.js" charset="utf-8"></script>
```

### Explicit vendor chunk

코드를 vendor와 애플리케이션으로 분할합니다.

```javascript
module.exports = {
  //...
  entry: {
    vendor: ['jquery', 'other-lib'],
    app: './entry',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      // filename: "vendor.js"
      // (청크에 다른 이름을 지정하세요)

      minChunks: Infinity,
      // (엔트리가 더 많으면 다른 모듈이 vendor 청크로
      //  들어가지 않습니다)
    }),
  ],
};
```

```html
<script src="vendor.js" charset="utf-8"></script>
<script src="app.js" charset="utf-8"></script>
```

T> 장기 캐시와 함께 vendor 청크 변경을 방지하기 위해 `ChunkManifestWebpackPlugin`을 사용해야 할 수 있습니다. 또한 안정적인 모듈 ID를 보장하기 위해 `NamedModulesPlugin` 혹은 [`HashedModuleIdsPlugin`](/plugins/hashed-module-ids-plugin)와 같은 레코드 플러그인을 사용해야 합니다.

### Move common modules into the parent chunk

[Code Splitting](/guides/code-splitting)을 사용하면 엔트리 청크의 여러 하위(자식) 청크가 공통 종속성을 가질 수 있습니다. 중복을 방지하기 위해 이들을 부모 청크로 옮길 수 있습니다. 이렇게 하면 전체 크기가 줄어들지만, 초기 로드 시간에 부정적인 영향을 미칩니다. 사용자가 많은 형제 청크(예: 엔트리 청크의 자식)를 다운로드해야 할 것으로 예상되는 경우 전체 로드 시간이 향상됩니다.

```javascript
new webpack.optimize.CommonsChunkPlugin({
  // names: ["app", "subPageA"]
  // (청크를 선택하거나 모든 청크를 생략하세요)

  children: true,
  // (선택된 청크의 모든 자식을 선택합니다)

  // minChunks: 3,
  // (모듈을 옮기기 전에 3명의 자식이 공유해야 합니다)
});
```

### Extra async commons chunk

위의 것과 유사하지만 공통 모듈을 부모로 이동하는 대신(초기 로드 시간을 증가시키게 됩니다) 비동기식으로 로드된 새로운 추가 공통 청크가 사용됩니다. 이는 추가 청크가 다운로드되면 자동으로 병렬로 다운로드됩니다.

```javascript
new webpack.optimize.CommonsChunkPlugin({
  name: 'app',
  // 또는
  names: ['app', 'subPageA'],
  // 단일 이름 또는 배열 형태의 이름은 비동기 청크를 생성하는
  // 엔트리 포인트의 이름과 일치해야 합니다.

  children: true,
  // (청크의 모든 자식을 사용합니다)

  async: true,
  // (비동기 공통 청크를 생성합니다)

  minChunks: 3,
  // (모듈이 분리되기 전에 3명의 자식이 모듈을 공유해야 합니다)
});
```

### Passing the `minChunks` property a function

또한 `minChunks` 속성에 함수를 전달할 수도 있습니다. 이 함수는 `CommonsChunkPlugin`에 의해 호출되며 `module` 및 `count` 인수로 함수를 호출합니다.

`module` 인수는 `name`/`names` 속성을 통해 제공된 청크의 각 모듈을 나타냅니다.
`module`은 [NormalModule](https://github.com/webpack/webpack/blob/master/lib/NormalModule.js)의 형태로, 이 사용 사례에 특히 유용한 두 개의 속성이 있습니다.

- `module.context`: 파일을 저장하는 디렉터리입니다. 예: `'/my_project/node_modules/example-dependency'`
- `module.resource`: 처리중인 파일의 이름입니다. 예: `'/my_project/node_modules/example-dependency/index.js'`

`count` 인수는 `module`이 사용되는 청크 수를 나타냅니다.

이 옵션은 CommonsChunk 알고리즘을 통해 모듈을 이동할 위치를 결정하는 방법을 세밀하게 제어하려는 경우에 유용합니다.

```javascript
new webpack.optimize.CommonsChunkPlugin({
  name: 'my-single-lib-chunk',
  filename: 'my-single-lib-chunk.js',
  minChunks: function (module, count) {
    // 모듈이 경로를 가지고 있고 경로에 "somelib"이 존재하고
    // 3개의 개별 청크/엔트리에서 사용되는 경우
    // 청크의 키 이름이 "my-single-lib-chunk", 파일 이름이 "my-single-lib-chunk.js"로 분할됩니다.
    return module.resource && /somelib/.test(module.resource) && count === 3;
  },
});
```

위에서 볼 수 있듯이 이 예제를 사용하면 함수 내의 모든 조건이 충족되는 경우에만, 하나의 라이브러리를 별도의 파일로 이동할 수 있습니다.

이 개념은 암시적 공통 vendor 청크를 얻는데 사용할 수 있습니다.

```javascript
new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor',
  minChunks: function (module) {
    // 이는 vendor의 import가 node_modules 디렉터리에 존재한다고 가정합니다.
    return module.context && module.context.includes('node_modules');
  },
});
```

## Manifest file

webpack 부트스트랩 로직을 별도의 파일로 추출하려면 `entry`로 정의되어 있지 않은 `name`에 `CommonsChunkPlugin`을 사용하세요. 자세한 내용은 [캐싱 가이드](/guides/caching)를 참조하세요.

```javascript
new webpack.optimize.CommonsChunkPlugin({
  name: 'manifest',
  minChunks: Infinity,
});
```

## Combining implicit common vendor chunks and manifest file

`vendor`와 `manifest` 청크는 `minChunks`에 대해 다른 정의를 사용하므로 플러그인을 두 번 호출해야 합니다.

```javascript
[
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: function (module) {
      return module.context && module.context.includes('node_modules');
    },
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    minChunks: Infinity,
  }),
];
```

## More Examples

- [공통 및 Vendor 청크](https://github.com/webpack/webpack/tree/master/examples/common-chunk-and-vendor-chunk)
- [다중 공통 청크](https://github.com/webpack/webpack/tree/8b888fedfaeaac6bd39168c0952cc19e6c34280a/examples/multiple-commons-chunks)
- [공통 청크가 있는 다중 엔트리 포인트](https://github.com/webpack/webpack/tree/8b888fedfaeaac6bd39168c0952cc19e6c34280a/examples/multiple-entry-points-commons-chunk-css-bundle)
