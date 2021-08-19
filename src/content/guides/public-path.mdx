---
title: Public Path
sort: 23
contributors:
  - rafaelrinaldi
  - chrisVillanueva
  - gonzoyumo
translators:
  - YukJiSoo
---

`publicPath` 설정은 다양한 경우에서 유용하게 사용될 수 있습니다. 애플리케이션의 모든 애셋에 대한 기본 경로를 지정할 수 있습니다.

## Use Cases

이 기능이 특히 유용한 실제 애플리케이션에서의 몇 가지 사용 사례가 있습니다. 기본적으로 `output.path` 디렉터리로 내보내는 모든 파일은 `output.publicPath`에서 참조됩니다. 여기에는 하위 청크 ([코드 스플리팅](/guides/code-splitting/)을 통해 생성됨) 및 디펜던시 그래프의 일부 애셋(예: 이미지, 글꼴 등)이 포함됩니다.

### Environment Based

예를 들어 개발 과정에서 index 페이지와 동일한 수준에 있는 `assets/` 폴더가 있을 수 있습니다. 프로덕션 환경에서 정적 애셋을 CDN에 호스팅하려면 어떻게 해야할까요?

이 문제를 해결하기 위해 오랫동안 사용 중인 환경 변수를 사용해봅시다. `ASSET_PATH` 변수가 있다고 가정해 보겠습니다.

```js
import webpack from 'webpack';

// 환경 변수를 사용하고 존재하지 않는다면 루트를 사용하세요.
const ASSET_PATH = process.env.ASSET_PATH || '/';

export default {
  output: {
    publicPath: ASSET_PATH,
  },

  plugins: [
    // 코드에서 환경 변수를 안전하게 사용할 수 있습니다.
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
    }),
  ],
};
```

### On The Fly

또 다른 사용 사례는 `publicPath`를 직접 설정하는 것입니다. webpack은 이를 가능하게 하는 `__webpack_public_path라는__` 전역 변수를 노출합니다. 따라서 애플리케이션의 엔트리 포인트에서 간단하게 처리할 수 있습니다.

```js
__webpack_public_path__ = process.env.ASSET_PATH;
```

이게 전부입니다. 이미 설정에서 `DefinePlugin`을 사용하고 있음으로 `process.env.ASSET_PATH`는 항상 정의되어 안전하게 사용할 수 있습니다.

W> 엔트리 파일에서 ES6 모듈 가져오기를 사용하는 경우 가져오기 후에 `__webpack_public_path__` 할당이 수행됩니다. 이러한 경우 공용 경로 할당을 전용 모듈로 이동 한 다음 entry.js 위에서 가져와야 합니다.

```js
// entry.js
import './public-path';
import './app';
```

T> `web` 또는 `web-worker`를 대상으로 사용하는 경우, `publicPath`는 `'auto'`로 기본 설정되어 `import.meta.url`, `document.currentScript`, `<script />`, `self.location` 중 하나를 공개 경로로 자동으로 결정합니다.
